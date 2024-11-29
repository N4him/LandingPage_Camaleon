import React, { useEffect, useState } from 'react'; 
import { motion } from 'framer-motion';
import '../assets/styles/InformacionGrupo.css';
import logo from '../assets/images/logoS.png';

const InformacionGrupo = () => {
  const [grupoInfo, setGrupoInfo] = useState({ presentacion: [], caracteristicas: [] });
  const infoGrupoApi = 
    import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL}`
      : "http://localhost:3000";

  // Obtener información del grupo desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(infoGrupoApi + '/grupo'); // Ajusta la URL según tu backend
        const data = await response.json();
        if (data.length > 0) {
          setGrupoInfo(data[0]); // Suponiendo que hay un solo documento
        }
      } catch (error) {
        console.error('Error al obtener la información del grupo:', error);
      }
    };

    fetchData();
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
      </div>
    </section>
  );
};

export default InformacionGrupo;
