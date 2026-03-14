-- =============================================
-- ChillaLabs – Seed inicial de productos
-- Ejecutar DESPUÉS de schema.sql
-- =============================================

INSERT INTO products (name, price, category, type, series, size, bg, image, description, wait, stock, active)
VALUES
  ('Reze',            24.99, 'Anime',       'stock',    'ChainsawMan',            '25 cm', '#E8F5EE', '/stock-1.png',    'Figura 3D impresa en PLA y pintada a mano con amor.',                                               NULL,         10, TRUE),
  ('MaoMao',          19.99, 'Anime',       'stock',    'The Apothecary Diaries', '26 cm', '#FFF8D6', '/stock-2.png',    'Figura 3D impresa en PLA y pintada a mano con amor.',                                               NULL,         8,  TRUE),
  ('Link – Hyrule',   32.99, 'Videojuegos', 'stock',    'The Legend of Zelda',    '15 cm', '#E6F7EE', '/stock-3.png',    'El héroe de Hyrule en versión figura 3D detallada. Túnica verde y espada maestra pintadas.',          NULL,         5,  TRUE),
  ('Baby Yoda–Grogu', 26.99, 'Originales',  'stock',    'The Mandalorian',        '9 cm',  '#E8F5E0', '/stock-2.png',    'El personaje más adorable de la galaxia. Verde suave con orejas grandes y ojos expresivos.',          NULL,         3,  TRUE),
  ('Nezuko',          28.99, 'Anime',       'preventa', 'Demon Slayer',            '14 cm', '#FDE8F0', '/preventa-1.png', 'Nezuko en su forma demonio con su bambú. Detallada con kimono rosado pintado a mano.',               '3–4 semanas',0,  TRUE),
  ('Hollow Knight',   34.99, 'Videojuegos', 'preventa', 'Team Cherry',            '10 cm', '#EBE8F5', '/preventa-2.png', 'El Caballero de Hallownest. Negro profundo con capa blanca y máscara artesanal.',                     '4–5 semanas',0,  TRUE),
  ('Snorlax',         21.99, 'Anime',       'preventa', 'Pokémon',                '11 cm', '#E0EAF8', '/preventa-3.png', 'El Pokémon dormilón más querido de la Gen 1. Azul oscuro con barriga crema.',                        '2–3 semanas',0,  TRUE)
ON CONFLICT DO NOTHING;
