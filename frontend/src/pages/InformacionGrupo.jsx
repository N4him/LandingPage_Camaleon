import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../assets/styles/InformacionGrupo.css';
import logo from '../assets/images/logoS.png'

const InformacionGrupo = () => {
  const [grupoInfo, setGrupoInfo] = useState({ presentacion: [], caracteristicas: [] });
  const [calificacionInfo, setCalificacionInfo] = useState(null); // Para almacenar la calificación

  // Obtener información del grupo desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/grupo'); // Ajusta la URL según tu backend
        const data = await response.json();
        if (data.length > 0) {
          setGrupoInfo(data[0]); // Suponiendo que hay un solo documento
        }
      } catch (error) {
        console.error('Error al obtener la información del grupo:', error);
      }
    };

    const fetchCalificacion = async () => {
      try {
        const response = await fetch('http://localhost:3000/calificacionGrupo'); // Ruta para obtener calificación
        const data = await response.json();
        if (data.length > 0) {
          setCalificacionInfo(data[0]); // Suponiendo que hay un solo documento de calificación
        }
      } catch (error) {
        console.error('Error al obtener la calificación del grupo:', error);
      }
    };

    fetchData();
    fetchCalificacion(); // Llamada para obtener la calificación
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
          {grupoInfo.presentacion?.map((parrafo, index) => (
            <motion.p key={index} variants={itemVariants}>
              {parrafo}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          className="caracteristicas"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {grupoInfo.caracteristicas?.map((caracteristica, index) => (
            <motion.div
              key={index}
              className="caracteristica"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>{caracteristica.nombre}</h3>
              <p>{caracteristica.descripcion}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mostrar la calificación del grupo */}
        {calificacionInfo && calificacionInfo.calificacion && (
          <motion.div
            className="clasificacion"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3>Calificación</h3>
            <p>
              {calificacionInfo.calificacion.calificacion} <span>otorgada por MinCiencias</span>
            </p>
            <p>
              {calificacionInfo.calificacion["Más información"] ? (
                <a
                  href={calificacionInfo.calificacion["Más información"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#ffffff', textDecoration: 'underline' }} // Asegura que el enlace sea visible
                >
                  Más Información
                </a>
              ) : (
                <span>No hay más información disponible</span>
              )}
            </p>
          </motion.div>
        )}




      </div>
    </section>
  );
};

export default InformacionGrupo;
