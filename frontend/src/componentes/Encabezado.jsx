import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Encabezado.css';

const Encabezado = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.header 
      className={`encabezado ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contenedor encabezado-contenido">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Grupo Camaleón
        </motion.h1>
        <AnimatePresence>
          {menuAbierto && (
            <motion.nav
              className="menu-movil"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
            >
              <ul>
                <li><a href="#informacion" onClick={toggleMenu}>Información</a></li>
                <li><a href="#practicas" onClick={toggleMenu}>Prácticas</a></li>
                <li><a href="#trabajos-grado" onClick={toggleMenu}>Trabajos de Grado</a></li>
                <li><a href="#proyectos" onClick={toggleMenu}>Proyectos</a></li>
                <li><a href="#lineas" onClick={toggleMenu}>Líneas de Investigación</a></li>
                <li><a href="#miembros" onClick={toggleMenu}>Miembros</a></li>
                <li><a href="#convenios" onClick={toggleMenu}>Convenios</a></li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
        <nav className="menu-escritorio">
          <ul>
            <li><a href="#informacion">Información</a></li>
            <li><a href="#practicas">Prácticas</a></li>
            <li><a href="#trabajos-grado">Trabajos de Grado</a></li>
            <li><a href="#proyectos">Proyectos</a></li>
            <li><a href="#lineas">Líneas de Investigación</a></li>
            <li><a href="#miembros">Miembros</a></li>
            <li><a href="#convenios">Convenios</a></li>
          </ul>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </motion.header>
  );
};

export default Encabezado;