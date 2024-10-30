import React from 'react';
import { motion } from 'framer-motion';
import '../assets/styles/Miembros.css';

const Miembros = () => {
  const miembros = [
    {
      nombre: "Dra. Laura Gómez",
      lineas: ["Interfaces de Usuario Tangibles", "Experiencia de Usuario"],
      foto: "https://ejemplo.com/foto-laura-gomez.jpg",
      perfil: "https://cvlac.minciencias.gov.co/laura-gomez"
    },
    {
      nombre: "Dr. Carlos Rodríguez",
      lineas: ["Realidad Aumentada", "Gestión de Proyectos Software"],
      foto: "https://ejemplo.com/foto-carlos-rodriguez.jpg",
      perfil: "https://cvlac.minciencias.gov.co/carlos-rodriguez"
    },
    {
      nombre: "Dra. Carmen Ortiz",
      lineas: ["Experiencia de Usuario", "Interfaces de Usuario Tangibles"],
      foto: "https://ejemplo.com/foto-carmen-ortiz.jpg",
      perfil: "https://cvlac.minciencias.gov.co/carmen-ortiz"
    },
    {
      nombre: "Dr. Andrés Ramírez",
      lineas: ["Gestión de Proyectos Software", "Realidad Aumentada"],
      foto: "https://ejemplo.com/foto-andres-ramirez.jpg",
      perfil: "https://cvlac.minciencias.gov.co/andres-ramirez"
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
    <section id="miembros" className="seccion miembros">
      <div className="contenedor">
        <motion.h2 
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Miembros del Grupo
        </motion.h2>
        <motion.div 
          className="lista-miembros"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {miembros.map((miembro, index) => (
            <motion.div 
              key={index} 
              className="miembro-item"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <img src={miembro.foto} alt={miembro.nombre} className="miembro-foto" />
              <h3>{miembro.nombre}</h3>
              <p><strong>Líneas de investigación:</strong></p>
              <ul>
                {miembro.lineas.map((linea, i) => (
                  <li key={i}>{linea}</li>
                ))}
              </ul>
              <a href={miembro.perfil} target="_blank" rel="noopener noreferrer" className="boton-perfil">Ver perfil académico</a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Miembros;