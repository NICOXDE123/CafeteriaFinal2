// frontend/src/pages/SobreNosotros.jsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles.css";

export default function SobreNosotros() {
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Refs para secciones internas
  const valoresRef = useRef(null);
  const historiaRef = useRef(null);
  const equipoRef = useRef(null);
  const visitanosRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 60);
      setShowTopBtn(offset > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll suave a sección
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll to top
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div>
      {/* ───────────────────────────────────────────────────────────────────
          1) BARRA PRINCIPAL (HOME/MENU/PAGAR)
      ──────────────────────────────────────────────────────────────────── */}
      <nav className="main-nav">
        <div className="logo">☕ Café Aroma</div>
        <ul className="main-nav-list">
          <li>
            <NavLink to="/" className="main-nav-link">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" className="main-nav-link">
              Menú
            </NavLink>
          </li>
          <li>
            <NavLink to="/tiendafisica" className="main-nav-link">
              Tienda Física
            </NavLink>
          </li>
          <li>
            <NavLink to="/pagar" className="main-nav-link">
              Pagar
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* ───────────────────────────────────────────────────────────────────
          2) HERO/BANNER PRINCIPAL
      ──────────────────────────────────────────────────────────────────── */}
      <div className="hero-home dark-bg">
        <div className="custom-background" />
        <div className="hero-overlay-dark" />
        <div className="bean bean--one" />
        <div className="bean bean--two" />
        <div className="bean bean--three" />
        <div className="steam steam--one" />
        <div className="steam steam--two" />
        <div className="hero-content-home">
          <h1 className="hero-title-home">Sobre Nosotros</h1>
          <p className="hero-subtitle-home">
            La esencia de nuestro café, la historia de nuestra familia y el compromiso con cada cliente.
          </p>
          <button className="hero-scroll-btn" onClick={() => scrollTo(valoresRef)}>
            ↓
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          3) BARRA SECUNDARIA DE SECCIONES (Valores/Historia/Equipo/Visítanos)
      ──────────────────────────────────────────────────────────────────── */}
      <nav
        className={`page-nav${scrolled ? " page-nav-scrolled" : ""}`}
        style={{ top: scrolled ? "60px" : "80vh" }}
      >
        <ul className="page-nav-list">
          <li>
            <button className="page-nav-link" onClick={() => scrollTo(valoresRef)}>
              Valores
            </button>
          </li>
          <li>
            <button className="page-nav-link" onClick={() => scrollTo(historiaRef)}>
              Historia
            </button>
          </li>
          <li>
            <button className="page-nav-link" onClick={() => scrollTo(equipoRef)}>
              Equipo
            </button>
          </li>
          <li>
            <button className="page-nav-link" onClick={() => scrollTo(visitanosRef)}>
              Visítanos
            </button>
          </li>
        </ul>
      </nav>

      {/* ───────────────────────────────────────────────────────────────────
          4) SECCIÓN: NUESTROS VALORES
      ──────────────────────────────────────────────────────────────────── */}
      <section
        ref={valoresRef}
        className="seccion-valores dark-bg fade-in-section"
        style={{ padding: "6rem 2rem" }}
      >
        <div className="contenedor">
          <h2 className="section-title">Nuestros Valores</h2>
          <div className="destacados-grid">
            {[
              {
                icon: "☕",
                title: "Calidad Suprema",
                desc: "Granos 100% arábica, tueste artesanal y preparación perfecta en cada taza.",
              },
              {
                icon: "🌱",
                title: "Sostenibilidad",
                desc: "Materiales biodegradables, energía renovable y huella de carbono reducida.",
              },
              {
                icon: "👥",
                title: "Comunidad",
                desc: "Atención personalizada, feedback constante y vínculos con productores locales.",
              },
              {
                icon: "🌍",
                title: "Equidad",
                desc: "Pago justo, relaciones de largo plazo y apoyo a pequeños agricultores.",
              },
            ].map((val, i) => (
              <div key={i} className="card-valores">
                <div className="card-icon">{val.icon}</div>
                <h3 className="card-title">{val.title}</h3>
                <p className="card-desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          5) SECCIÓN: NUESTRA HISTORIA
      ──────────────────────────────────────────────────────────────────── */}
      <section
        ref={historiaRef}
        className="seccion-historia light-bg fade-in-section"
        style={{ padding: "6rem 2rem" }}
      >
        <div className="contenedor">
          <h2 className="section-title">Nuestra Historia</h2>
          <div className="texto-historia">
            <p>
              En 2015, comenzamos como un pequeño café familiar en Santiago. Nuestro
              sueño era traer a la ciudad la calidad del café cultivado en las montañas
              de nuestro país. Tras años de investigación, viajes y pruebas de tueste,
              abrimos las puertas de nuestro primer local, con un compromiso claro:
              brindar una experiencia inolvidable en cada sorbo.
            </p>
            <p>
              Con el apoyo de agricultores locales, perfeccionamos nuestras recetas,
              expandimos nuestra oferta y establecimos prácticas sostenibles. Hoy,
              más que un café, somos un punto de encuentro para entusiastas y curiosos
              del buen sabor.
            </p>
            <p>
              Cada mañana, nuestra familia extiende el aroma de granos recién molidos,
              celebrando tradiciones y creando recuerdos. Te invitamos a ser parte de
              esta historia que apenas comienza.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          6) SECCIÓN: NUESTRO EQUIPO
      ──────────────────────────────────────────────────────────────────── */}
      <section
        ref={equipoRef}
        className="seccion-equipo dark-bg fade-in-section"
        style={{ padding: "6rem 2rem" }}
      >
        <div className="contenedor">
          <h2 className="section-title" style={{ color: "#fff" }}>
            Nuestro Equipo
          </h2>
          <div className="equipo-carousel">
            {[
              {
                img: "/images/fundador.png",
                name: "Juan Pérez",
                role: "Fundador & Maestro Tostador",
                desc:
                  "Apasionado por lograr el tueste perfecto. Su visión guía cada partida de granos.",
              },
              {
                img: "/images/gerente.png",
                name: "María García",
                role: "Gerente de Operaciones",
                desc:
                  "Controla la calidad y coordina al equipo para que tu experiencia sea impecable.",
              },
              {
                img: "/images/barista.png",
                name: "Pedro López",
                role: "Barista Principal",
                desc:
                  "Su arte en la espuma y recetas exclusivas hacen de cada taza un momento único.",
              },
              {
                img: "/images/marketing.png",
                name: "Laura Fuentes",
                role: "Encargada de Marketing",
                desc:
                  "Diseña campañas que conectan con nuestra comunidad y reflejan nuestra esencia.",
              },
            ].map((member, i) => (
              <div key={i} className="card-equipo">
                <img src={member.img} alt={member.name} className="equipo-img" />
                <div className="equipo-text">
                  <h3 className="equipo-name">{member.name}</h3>
                  <p className="equipo-role">{member.role}</p>
                  <p className="equipo-desc">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          7) SECCIÓN: LLAMADA A LA ACCIÓN – VISÍTANOS
      ──────────────────────────────────────────────────────────────────── */}
      <section
        ref={visitanosRef}
        className="seccion-visitanos light-bg fade-in-section"
        style={{ padding: "5rem 2rem" }}
      >
        <div className="contenedor">
          <div className="cta-container">
            <h2 className="section-title">¡Visítanos Hoy Mismo!</h2>
            <p className="cta-text">
              Descubre un espacio acogedor, aromas únicos y el mejor ambiente para disfrutar tu
              café favorito. ¡Te esperamos en nuestra tienda principal en Santiago!
            </p>
            <button className="btn-visitanos" onClick={() => scrollTo(valoresRef)}>
              Nuestros Valores
            </button>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          8) FOOTER CON CONTACTO E ÍCONOS
      ──────────────────────────────────────────────────────────────────── */}
      <footer className="footer-home fade-in-section">
        <div className="contenedor footer-content">
          <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
          <p>📞 Teléfono: +56 9 1234 5678</p>
          <p>✉️ contacto@cafearoma.cl</p>
          <p>📍 Av. Café 123, Santiago, Chile</p>
          <div className="social-links">
            <a href="https://www.instagram.com/cafearoma" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <span>|</span>
            <a href="https://www.facebook.com/cafearoma" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </footer>

      {/* ───────────────────────────────────────────────────────────────────
          9) BOTÓN “SCROLL TO TOP”
      ──────────────────────────────────────────────────────────────────── */}
      <button
        className={`scroll-to-top${showTopBtn ? " visible" : ""}`}
        onClick={toTop}
        aria-label="Volver arriba"
      >
        ↑
      </button>
    </div>
  );
}
