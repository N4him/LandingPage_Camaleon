import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../assets/styles/TrabajosGrado.css';
import logo from '../assets/images/logoS.png';

const TrabajosGrado = React.forwardRef((props, ref) => { 
  const [trabajos, setTrabajos] = useState([]);
  const [error, setError] = useState(null);
  const trabajosGradoApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL}/trabajosGrado`
      : "http://localhost:3000/trabajosGrado",
    withCredentials: true,
  });
  
  useEffect(() => {
    trabajosGradoApi.get()  // Use the API instance directly here
      .then(response => {
        setTrabajos(response.data);  
        setError(null);  
      })
      .catch(error => {
        console.error("Error al obtener los trabajos de grado:", error);
        setError('No se pudo obtener los trabajos de grado. Asegúrese de estar autenticado.');
      });
  }, []);
  

  return (
    <section id="trabajos-grado" ref={ref} className="seccion trabajos-grado">
      <div className="contenedor">
        <div className="linea-separadora-contenedor-TrabajosG">
          <img src={logo} alt="Logo" className="logo-imagen" />
          <div className="linea-roja"></div>
        </div>
        <motion.h2 
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Trabajos de Grado
        </motion.h2>
        {error && <p className="error-message">{error}</p>}
        <motion.div className="lista-trabajos">
          {trabajos.length === 0 ? (
            <motion.div className="trabajo-item">
              <p>No hay trabajos de grado disponibles.</p>
            </motion.div>
          ) : (
            trabajos.map((trabajoData, index) => {
              const trabajo = trabajoData["Trabajo de Grado"]; // Accediendo al objeto "Trabajo de Grado"
              return (
                <motion.div key={index} className="trabajo-item">
                  <h3>{trabajo.titulo || 'No disponible'}</h3>
                  <p><strong>Estudiantes:</strong> 
                    {trabajo.estudiantes && trabajo.estudiantes.length > 0
                      ? trabajo.estudiantes.map((estudiante, idx) => `${estudiante["nombre(s)"]} ${estudiante["apellido(s)"]}`).join(", ")
                      : 'No hay estudiantes asignados.'}
                  </p>
                  <p><strong>Directores:</strong> 
                    {trabajo["director(es)"] && trabajo["director(es)"].length > 0
                      ? trabajo["director(es)"].map((director, idx) => `${director["nombre(s)"]} ${director["apellido(s)"]}`).join(", ")
                      : 'No hay directores asignados.'}
                  </p>
                  {trabajo.mencion && trabajo.mencion[0] !== "" && (
                    <p><strong>Mención:</strong> {trabajo.mencion.join(", ")}</p>
                  )}
                  <p><strong>Descripción:</strong> {trabajo.descripcion || 'No especificada'}</p>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </div>
    </section>
  );
});

export default TrabajosGrado;
