import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../assets/styles/Convenios.css';
import logo from '../assets/images/logoS.png';

const conveniosApi = axios.create({
  baseURL: process.env.CALIFICACION_GRUPO_API_URL
    ? `${process.env.CALIFICACION_GRUPO_API_URL}/conveniosAlianzas`
    : "http://localhost:3000/conveniosAlianzas",
  withCredentials: true,
});

const Convenios = () => {
  const [convenios, setConvenios] = useState([]);

  useEffect(() => {
    fetch(conveniosApi)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        setConvenios(data);
      })
      .catch(error => console.error('Error al obtener los convenios:', error));
  }, []);

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
        {/* Línea separadora con la imagen */}
        <div className="linea-separadora-contenedor-Conv">
          <img src={logo} alt="Logo" className="logo-imagen" />
          <div className="linea-roja-Conv"></div>
        </div>
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
          {Array.isArray(convenios) ? (
            convenios.map((convenio, index) => (
              <motion.div
                key={index}
                className="convenio-item"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <h3>{convenio.institucion}</h3>
                <div className="convenio-contenido">
                  <div className="convenio-seccion">
                    <h4>Objetivos:</h4>
                    <ul>
                      {Array.isArray(convenio.objetivos) && convenio.objetivos.map((objetivo, i) => (
                        <li key={i}>{objetivo}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="convenio-seccion">
                    <h4>Resultados esperados/alcanzados:</h4>
                    <ul>
                      {Array.isArray(convenio.resultados) && convenio.resultados.map((resultado, i) => (
                        <li key={i}>{resultado}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No hay convenios disponibles.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Convenios;
