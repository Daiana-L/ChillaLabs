-- Agrega política de INSERT para order_items
-- Los usuarios pueden insertar items solo en sus propios pedidos
CREATE POLICY "Users can insert own order items" ON order_items FOR INSERT
  WITH CHECK (order_id IN (SELECT id FROM orders WHERE user_id = auth.uid()));
