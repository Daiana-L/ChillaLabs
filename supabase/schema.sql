-- =============================================
-- ChillaLabs – Database Schema
-- Ejecutar en Supabase → SQL Editor
-- =============================================

-- Tabla de perfiles de usuario (extiende auth.users de Supabase)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  province TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  badge TEXT,
  badge_type TEXT,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('stock', 'preventa')),
  series TEXT NOT NULL,
  size TEXT NOT NULL,
  bg TEXT DEFAULT '#F5EBFD',
  description TEXT,
  tags TEXT[],
  stock INTEGER DEFAULT 0,
  eta TEXT,
  wait TEXT,
  image TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_num TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  date TEXT NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  shipping_cost NUMERIC(10,2) DEFAULT 0,
  discount_amount NUMERIC(10,2) DEFAULT 0,
  discount_code TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'elaborando', 'en_camino', 'delivered', 'cancelled')),
  payment TEXT NOT NULL CHECK (payment IN ('mp', 'transfer')),
  buyer_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  province TEXT,
  cp TEXT,
  mp_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Items de cada pedido
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  qty INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

-- Códigos de descuento
CREATE TABLE IF NOT EXISTS discount_codes (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_percent INTEGER NOT NULL DEFAULT 15,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar códigos de descuento iniciales
INSERT INTO discount_codes (code, discount_percent) VALUES ('CHILLA15', 15) ON CONFLICT DO NOTHING;

-- =============================================
-- Row Level Security (RLS)
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- Profiles: cada usuario ve y edita solo el suyo
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Products: todos pueden leer, solo admin escribe (via service_role)
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (active = TRUE);

-- Orders: cada usuario ve solo los suyos
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items: cada usuario ve los items de sus pedidos
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT
  USING (order_id IN (SELECT id FROM orders WHERE user_id = auth.uid()));

-- Discount codes: todos pueden leer los activos
CREATE POLICY "Anyone can view active discount codes" ON discount_codes FOR SELECT USING (active = TRUE);

-- =============================================
-- Función para crear perfil automáticamente al registrarse
-- =============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
