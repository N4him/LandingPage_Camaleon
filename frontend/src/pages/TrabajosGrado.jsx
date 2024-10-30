import React from 'react';
import { motion } from 'framer-motion';
import '../assets/styles/TrabajosGrado.css';

const TrabajosGrado = () => {
  const trabajos = [
    {
      titulo: "Desarrollo de un Sistema de Realidad Aumentada para Educación",
      estudiantes: ["María López", "Pedro Sánchez"],
      directores: ["Dr. Andrés Ramírez"],
      mencion: "Meritoria",
      descripcion: "Implementación de un sistema de realidad aumentada para mejorar la experiencia educativa en aulas de clase."
    },
    {
      titulo: "Diseño de Interfaces Tangibles para Niños con Discapacidad Visual",
      estudiantes: ["Sofía Hernández"],
      directores: ["Dra. Carmen Ortiz", "Dr. Luis Mendoza"],
      mencion: "Laureada",
      descripcion: "Creación de interfaces tangibles innovadoras para facilitar el aprendizaje en niños con discapacidad visual."
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
    <section id="trabajos-grado" className="seccion trabajos-grado">
      <div className="contenedor">
        <motion.h2 
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Trabajos de Grado
        </motion.h2>
        <motion.div 
          className="lista-trabajos"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {trabajos.map((trabajo, index) => (
            <motion.div 
              key={index} 
              className="trabajo-item"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <h3>{trabajo.titulo}</h3>
              <p><strong>Estudiantes:</strong> {trabajo.estudiantes.join(", ")}</p>
              <p><strong>Directores:</strong> {trabajo.directores.join(", ")}</p>
              <p><strong>Mención:</strong> <span className="mencion">{trabajo.mencion}</span></p>
              <p>{trabajo.descripcion}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrabajosGrado;