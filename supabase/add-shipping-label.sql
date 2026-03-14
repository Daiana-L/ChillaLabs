-- Agrega columna para guardar el método de envío elegido
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_label TEXT;
