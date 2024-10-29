import React from 'react';
import { motion } from 'framer-motion';
import './Practicas.css';

const Practicas = () => {
  const practicas = [
    {
      titulo: "Desarrollo de Interfaz de Usuario para Sistema de Monitoreo",
      estudiante: "Ana Martínez",
      profesor: "Dr. Carlos Rodríguez",
      descripcion: "Implementación de una interfaz intuitiva para un sistema de monitoreo en tiempo real."
    },
    {
      titulo: "Diseño de Experiencia de Usuario para Aplicación Móvil Educativa",
      estudiante: "Juan Pérez",
      profesor: "Dra. Laura Gómez",
      descripcion: "Creación de una experiencia de usuario atractiva y funcional para una app educativa."
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
    <section id="practicas" className="seccion practicas">
      <div className="contenedor">
        <motion.h2 
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Prácticas
        </motion.h2>
        <motion.div 
          className="lista-practicas"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {practicas.map((practica, index) => (
            <motion.div 
              key={index} 
              className="practica-item"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <h3>{practica.titulo}</h3>
              <p><strong>Estudiante:</strong> {practica.estudiante}</p>
              <p><strong>Profesor responsable:</strong> {practica.profesor}</p>
              <p>{practica.descripcion}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Practicas;