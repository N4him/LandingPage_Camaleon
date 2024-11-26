import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; // Asegúrate de instalar axios: npm install axios
import '../assets/styles/ProyectosInvestigacion.css';
import logo from '../assets/images/logoS.png';

const ProyectosInvestigacion = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para cargar los proyectos desde el backend
    const fetchProyectos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/proyectosInvestigacion'); // Ajusta la URL según tu configuración
        const proyectosData = response.data.map(item => {
          const { proyecto_de_investigacion } = item;
          return {
            titulo: proyecto_de_investigacion.titulo,
            objetivos: [proyecto_de_investigacion.objetivo],
            resultados: [proyecto_de_investigacion.resultado],
            produccion: [proyecto_de_investigacion.produccion_academica],
            participantes: [
              ...proyecto_de_investigacion.estudiantes.map(e => `${e.nombre} ${e.apellido}`),
              ...proyecto_de_investigacion.profesionales.map(p => `${p.nombre} ${p.apellido}`),
              ...proyecto_de_investigacion.docentes_directores.map(d => `${d.nombre} ${d.apellido}`)
            ]
          };
        });
        setProyectos(proyectosData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los proyectos:', error);
        setError('No se pudieron cargar los proyectos.');
        setLoading(false);
      }
    };

    fetchProyectos();
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

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section id="proyectos" className="seccion proyectos-investigacion">
      <div className="contenedor">
      <div className="linea-separadora-contenedor-ProyectosI">
          <img src={logo} alt="Logo" className="logo-imagen" />
          <div className="linea-roja-Proy"></div>
        </div>
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
