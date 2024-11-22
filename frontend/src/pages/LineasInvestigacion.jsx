import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCubes, FaVrCardboard, FaUserAlt, FaTasks } from 'react-icons/fa';
import '../assets/styles/LineasInvestigacion.css';
import logo from '../assets/images/logoS.png';

// Create an Axios instance for your API
const lineasInvestigacionApi = axios.create({
  baseURL: "http://localhost:3000/lineasInvestigacion",
  withCredentials: true,
});

const LineasInvestigacion = () => {
  // Set state for the lines of investigation, loading, and error states
  const [lineas, setLineas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchLineas = async () => {
      try {
        const response = await lineasInvestigacionApi.get('/');
        // Map the data to match your component structure
        const lineasData = response.data.map((linea) => ({
          id: linea.id,
          nombre: linea['Linea de Investigacion'].nombre,
          descripcion: linea['Linea de Investigacion'].descripcion,
        }));
        setLineas(lineasData);
      } catch (err) {
        setError('Error al cargar las líneas de investigación');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLineas();
  }, []);

  // Loading and error handling
  if (loading) return <div className="text-center mt-8">Cargando...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
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
              {/* Conditionally render the icon */}
              <div className="linea-icono">
                {index === 0 ? (
                  <FaCubes />
                ) : index === 1 ? (
                  <FaVrCardboard />
                ) : index === 2 ? (
                  <FaUserAlt />
                ) : (
                  <FaTasks />
                )}
              </div>
              <h3>{linea.nombre}</h3>
              <p>{linea.descripcion}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LineasInvestigacion;
