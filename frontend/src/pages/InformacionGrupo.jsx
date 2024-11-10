import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaChartLine, FaLightbulb } from 'react-icons/fa';
import '../assets/styles/InformacionGrupo.css';
import logo from '../assets/images/logoS.png'

const InformacionGrupo = () => {
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
      y: 4,
      opacity: 1
    }
  };

  return (
    <section id="informacion" className="seccion informacion-grupo">
      <div className="contenedor">
        <motion.h2 
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Información del Grupo
        </motion.h2>

        <div className="linea-separadora-contenedor">
          <img src={logo} alt="Logo" className="logo-imagen" />
          <div className="linea-roja"></div>
          <div className="circulo-rojo"></div>
        </div>

        <motion.div 
          className="presentacion"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants}>
            Camaleón tiene como objetivo proponer modelos y métodos de diseño e implementación de interfaces de usuario, así como técnicas de evaluación de la experiencia de usuario. Además, se interesa en estudiar los procesos de gestión de proyectos software relacionados con este tipo de interfaces.
          </motion.p>
          <motion.p variants={itemVariants}>
            El grupo ofrece un espacio para actividades de investigación y desarrollo, enfocándose en interfaces innovadoras en los contextos de educación, arte y salud. También busca explorar diversas técnicas y métodos de gestión, aprovechando la naturaleza multidisciplinaria de estos proyectos.
          </motion.p>
        </motion.div>

        <motion.div 
          className="caracteristicas"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Características del grupo */}
          <motion.div 
            className="caracteristica"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUsers className="icono" />
            <h3>Colaboración</h3>
            <p>Fomentamos la colaboración interdisciplinaria para lograr resultados innovadores.</p>
          </motion.div>
          <motion.div 
            className="caracteristica"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChartLine className="icono" />
            <h3>Innovación</h3>
            <p>Buscamos constantemente nuevas formas de mejorar la interacción humano-computadora.</p>
          </motion.div>
          <motion.div 
            className="caracteristica"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLightbulb className="icono" />
            <h3>Investigación</h3>
            <p>Desarrollamos investigación de vanguardia en interfaces de usuario y experiencia de usuario.</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="clasificacion"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3>Clasificación</h3>
          <p>C (otorgada por Minciencias)</p>
        </motion.div>
      </div>
    </section>
  );
};

export default InformacionGrupo;
