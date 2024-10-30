import React from 'react';
import { motion } from 'framer-motion';
import './ProyectosInvestigacion.css';

const ProyectosInvestigacion = () => {
  const proyectos = [
    {
      titulo: "Desarrollo de Interfaces de Usuario Adaptativas",
      objetivos: [
        "Diseñar algoritmos de adaptación de interfaces basados en el comportamiento del usuario",
        "Implementar un prototipo de sistema con interfaces adaptativas"
      ],
      resultados: [
        "Algoritmo de adaptación de interfaces con 95% de precisión",
        "Prototipo funcional implementado en React Native"
      ],
      produccion: [
        "Artículo publicado en ACM CHI Conference",
        "Software registrado ante la Dirección Nacional de Derechos de Autor"
      ],
      participantes: [
        "Dra. Laura Gómez (Investigadora principal)",
        "Dr. Carlos Rodríguez",
        "Ing. Ana Martínez (Estudiante de doctorado)",
        "Juan Pérez (Estudiante de maestría)"
      ]
    },
    {
      titulo: "Evaluación de Experiencia de Usuario en Aplicaciones de Salud Mental",
      objetivos: [
        "Desarrollar métricas específicas para evaluar la UX en apps de salud mental",
        "Realizar un estudio comparativo de las principales apps de salud mental del mercado"
      ],
      resultados: [
        "Framework de evaluación UX para apps de salud mental",
        "Informe detallado del estudio comparativo de 10 apps líderes"
      ],
      produccion: [
        "Capítulo de libro en 'Advances in Human-Computer Interaction'",
        "Presentación en congreso internacional de e-Health"
      ],
      participantes: [
        "Dr. Andrés Ramírez (Investigador principal)",
        "Dra. Carmen Ortiz",
        "Sofía Hernández (Estudiante de doctorado)",
        "Pedro Sánchez (Asistente de investigación)"
      ]
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
    <section id="proyectos" className="seccion proyectos-investigacion">
      <div className="contenedor">
        <motion.h2 
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Proyectos de Investigación
        </motion.h2>
        <motion.div 
          className="lista-proyectos"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {proyectos.map((proyecto, index) => (
            <motion.div 
              key={index} 
              className="proyecto-item"
              variants={itemVariants}
            >
              <h3>{proyecto.titulo}</h3>
              <div className="proyecto-contenido">
                <motion.div className="proyecto-seccion" whileHover={{ scale: 1.02 }}>
                  <h4>Objetivos principales:</h4>
                  <ul>
                    {proyecto.objetivos.map((objetivo, i) => (
                      <li key={i}>{objetivo}</li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div className="proyecto-seccion" whileHover={{ scale: 1.02 }}>
                  <h4>Resultados alcanzados:</h4>
                  <ul>
                    {proyecto.resultados.map((resultado, i) => (
                      <li key={i}>{resultado}</li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div className="proyecto-seccion" whileHover={{ scale: 1.02 }}>
                  <h4>Producción académica:</h4>
                  <ul>
                    {proyecto.produccion.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div className="proyecto-section" whileHover={{ scale: 1.02 }}>
                  <h4>Participantes:</h4>
                  <ul>
                    {proyecto.participantes.map((participante, i) => (
                      <li key={i}>{participante}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProyectosInvestigacion;