import { Product } from '@/types'

export const DESCS: Record<number, string> = {
  1: "El adorable espíritu del bosque de Mi Vecino Totoro. Pintado en tonos grises y blancos con detalles a mano.",
  2: "El Pokémon más famoso en versión figura 3D. Amarillo vibrante con mejillas rojas pintadas a mano.",
  3: "El héroe de Hyrule en versión figura 3D detallada. Túnica verde y espada maestra pintadas meticulosamente.",
  4: "Kirby en todo su esplendor rosa. Figura adorable con expresión feliz y mejillas características.",
  5: "El personaje más adorable de la galaxia. Verde suave con orejas grandes y ojos expresivos.",
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "Totoro Clásico",    series: "Studio Ghibli",        price: 24.99, type: "stock",    category: "Anime",       size: "12 cm", bg: "#E8F5EE" },
  { id: 2, name: "Pikachu",           series: "Pokémon",               price: 19.99, type: "stock",    category: "Anime",       size: "8 cm",  bg: "#FFF8D6" },
  { id: 3, name: "Link – Hyrule",     series: "The Legend of Zelda",   price: 32.99, type: "stock",    category: "Videojuegos", size: "15 cm", bg: "#E6F7EE" },
  { id: 4, name: "Kirby Rosa",        series: "Nintendo",              price: 17.99, type: "stock",    category: "Videojuegos", size: "7 cm",  bg: "#FEE8EF" },
  { id: 5, name: "Baby Yoda – Grogu", series: "The Mandalorian",       price: 26.99, type: "stock",    category: "Originales",  size: "9 cm",  bg: "#E8F5E0" },
  { id: 6, name: "Nezuko",            series: "Demon Slayer",          price: 28.99, type: "preventa", category: "Anime",       size: "14 cm", bg: "#FDE8F0", wait: "3–4 semanas",
    desc: "Nezuko en su forma demonio con su bambú. Detallada con kimono rosado pintado a mano." },
  { id: 7, name: "Hollow Knight",     series: "Team Cherry",           price: 34.99, type: "preventa", category: "Videojuegos", size: "10 cm", bg: "#EBE8F5", wait: "4–5 semanas",
    desc: "El Caballero de Hallownest. Negro profundo con capa blanca y máscara artesanal." },
  { id: 8, name: "Snorlax",           series: "Pokémon",               price: 21.99, type: "preventa", category: "Anime",       size: "11 cm", bg: "#E0EAF8", wait: "2–3 semanas",
    desc: "El Pokémon dormilón más querido de la Gen 1. Azul oscuro con barriga crema." },
]

export function getDesc(p: Product): string {
  return p.desc || DESCS[p.id] || "Figura 3D impresa en PLA y pintada a mano con amor."
}
