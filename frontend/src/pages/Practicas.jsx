import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../assets/styles/Practicas.css';
import logo from '../assets/images/logoS.png';

const Practicas = () => {
  const [practicas, setPracticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Crear instancia de axios para las peticiones GET
  const practicasApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/practicas`
    : "http://localhost:3000/practicas",
    withCredentials: true,
  });

  useEffect(() => {
    fetchPracticas();
  }, []);

  // Función para obtener las prácticas desde el servidor
  const fetchPracticas = async () => {
    try {
      const response = await practicasApi.get("/");
      const practicasData = response.data.map((item) => ({
        id: item.id,
        ...item.practica,
      }));
      setPracticas(practicasData);  // Establecer el estado con los datos obtenidos
    } catch (err) {
      setError("Error al cargar las prácticas");
      console.error(err);
    } finally {
      setLoading(false);  // Finaliza la carga
    }
  };

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

  // Mientras los datos están cargando
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si hay un error al cargar los datos
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section id="practicas" className="seccion practicas">
      <div className="contenedor">
      <div className="linea-separadora-contenedor-Practicas">
          <img src={logo} alt="Logo" className="logo-imagen" />
          <div className="linea-roja-Practicas"></div>
        </div>
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
              <h3>{practica.tituloPractica}</h3>
              <p><strong>Estudiante:</strong> {practica.estudiantes[0].nombres} {practica.estudiantes[0].apellidos}</p>
              <p><strong>Profesor responsable:</strong> {practica.profesor.nombres} {practica.profesor.apellidos}</p>
              <p>{practica.resultadoInvestigacion}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Practicas;
