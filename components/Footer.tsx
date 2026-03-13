'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/chilla-logo.png" alt="ChillaLabs" onError={e => { (e.target as HTMLImageElement).style.display='none' }} />
            <span className="footer-logo-text">ChillaLabs</span>
          </div>
          <p>Figuras 3D impresas y pintadas a mano.<br />
             Cada pieza es única, hecha con amor para los fans del anime y los videojuegos.</p>
        </div>
        <div className="footer-col">
          <h4>Tienda</h4>
          <Link href="/stock">En Stock</Link>
          <Link href="/preventas">Preventas</Link>
          <Link href="/carrito">Carrito</Link>
        </div>
        <div className="footer-col">
          <h4>Info</h4>
          <Link href="/sobre-mi">Sobre mí</Link>
          <Link href="/contacto">Contacto</Link>
          <a>Política de envíos</a>
          <a>Preguntas frecuentes</a>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 ChillaLabs – Figuras 3D · Hecho con amor
      </div>
    </footer>
  )
}
