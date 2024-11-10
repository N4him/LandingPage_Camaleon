import { useState, useRef, useEffect } from "react";
import "../assets/styles/Encabezado.css";
import LogoCamaleon from "./../../public/Group.svg";
import Menuburger from "./../assets/burger_menu.svg";

export default function Navbar({ aboutRef, projectsRef, thesisRef, researchRef, contactRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const sections = [
    { name: "Acerca de Nosotros", ref: aboutRef },
    { name: "Proyectos de Investigación", ref: projectsRef },
    { name: "Trabajos de Grado", ref: thesisRef },
    { name: "Prácticas de Investigación", ref: researchRef },
    { name: "Contáctanos", ref: contactRef },
  ];

  const handleClick = (index, ref) => {
    setActiveIndex(index);
    setIsOpen(false); // Cierra el menú al hacer clic en un enlace
    // Desplazamiento hacia la sección con scroll suave
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const currentLink = document.querySelectorAll('.nav-link')[activeIndex];
    if (currentLink) {
      const { offsetWidth, offsetLeft } = currentLink;
      setIndicatorStyle({
        width: `${offsetWidth}px`,
        transform: `translateX(${offsetLeft}px)`,
        transition: 'transform 0.3s ease, width 0.3s ease',
      });
    }
  }, [activeIndex]);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <a href="/" className="nav-logo">
          <img src={LogoCamaleon} alt="Logo Camaleón" className="logo-encima" />
          <span>Grupo Camaleón</span>
        </a>
      </div>

      <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        <img src={Menuburger} alt="Icono del menú" />
      </button>

      <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <div
          className="indicator"
          style={{
            ...indicatorStyle,
            backgroundColor: "white",
          }}
        ></div>
        {sections.map((item, index) => (
          <a
            href="#"
            className={`nav-link ${activeIndex === index ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(index, item.ref);
            }}
            key={index}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
