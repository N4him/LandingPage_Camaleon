import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaGraduationCap } from 'react-icons/fa';
import '../assets/styles/Convenios.css';

const Convenios = () => {
  const convenios = [
    {
      institucion: "Universidad Tecnológica de Pereira",
      objetivos: [
        "Desarrollar proyectos conjuntos en el área de Interfaces de Usuario Tangibles",
        "Intercambio de estudiantes y profesores para actividades de investigación"
      ],
      resultados: [
        "Publicación conjunta de artículo en conferencia internacional",
        "Desarrollo de prototipo de interfaz tangible para educación"
      ],
      icono: <FaGraduationCap />
    },
    {
      institucion: "Empresa de Desarrollo de Software XYZ",
      objetivos: [
        "Implementar metodologías de Experiencia de Usuario en proyectos reales",
        "Ofrecer prácticas profesionales a estudiantes del grupo de investigación"
      ],
      resultados: [
        "Mejora del 30% en la satisfacción del usuario en productos de la empresa",
        "3 estudiantes realizaron prácticas profesionales en la empresa"
      ],
      icono: <FaHandshake />
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
    <section id="convenios" className="seccion convenios">
      <div className="contenedor">
        <motion.h2 
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Convenios y Alianzas Actuales
        </motion.h2>
        <motion.div 
          className="lista-convenios"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {convenios.map((convenio, index) => (
            <motion.div 
              key={index} 
              className="convenio-item"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="convenio-icono">{convenio.icono}</div>
              <h3>{convenio.institucion}</h3>
              <div className="convenio-contenido">
                <div className="convenio-seccion">
                  <h4>Objetivos:</h4>
                  <ul>
                    {convenio.objetivos.map((objetivo, i) => (
                      <li key={i}>{objetivo}</li>
                    ))}
                  </ul>
                </div>
                <div className="convenio-seccion">
                  <h4>Resultados esperados/alcanzados:</h4>
                  <ul>
                    {convenio.resultados.map((resultado, i) => (
                      <li key={i}>{resultado}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Convenios;