import React from 'react';
import { motion } from 'framer-motion';
import { FaCubes, FaVrCardboard, FaUserAlt, FaTasks } from 'react-icons/fa';
import '../assets/styles/LineasInvestigacion.css';
import logo from '../assets/images/logoS.png'; 

const LineasInvestigacion = () => {
  const lineas = [
    {
      titulo: "Interfaces de Usuario Tangibles",
      descripcion: "Investigación y desarrollo de interfaces que combinan elementos físicos y digitales para una interacción más natural y directa.",
      icono: <FaCubes />
    },
    {
      titulo: "Realidad Aumentada",
      descripcion: "Exploración de aplicaciones y técnicas de realidad aumentada para mejorar la interacción y la experiencia del usuario en diversos contextos.",
      icono: <FaVrCardboard />
    },
    {
      titulo: "Experiencia de Usuario",
      descripcion: "Estudio y aplicación de metodologías para evaluar y mejorar la experiencia del usuario en sistemas interactivos.",
      icono: <FaUserAlt />
    },
    {
      titulo: "Gestión de Proyectos Software",
      descripcion: "Investigación sobre métodos y prácticas efectivas para la gestión de proyectos de software, con énfasis en el desarrollo de interfaces de usuario.",
      icono: <FaTasks />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="lineas" className="seccion lineas-investigacion">
      <div className="contenedor">

        <div className="linea-separadora-contenedor-lineasInv">
          <img src={logo} alt="Logo" className="logo-imagen" />
          <div className="linea-roja"></div>
        </div>

        <motion.h2 
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Líneas de Investigación
        </motion.h2>
        
        <motion.div 
          className="lista-lineas"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {lineas.map((linea, index) => (
            <motion.div 
              key={index} 
              className="linea-item"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="linea-icono">{linea.icono}</div>
              <h3>{linea.titulo}</h3>
              <p>{linea.descripcion}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LineasInvestigacion;
