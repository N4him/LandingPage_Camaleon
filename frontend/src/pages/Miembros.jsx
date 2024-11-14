import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/logoS.png'; // Asegúrate de tener el logo
import '../assets/styles/Miembros.css';

const Miembros = () => {
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/miembrosGrupo')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        setMiembros(data);
      })
      .catch(error => console.error('Error al obtener los miembros:', error));
  }, []);

  return (
    <section id="miembros" className="seccion miembros">
      <div className="contenedor">
        <div className="linea-separadora-contenedor-Miembros">
          <img src={logo} alt="Logo" className="logo-imagen" />
          <div className="linea-roja"></div>
        </div>
        <motion.h2 className="titulo-seccion">Miembros del Grupo</motion.h2>
        <motion.div className="lista-miembros">
          {Array.isArray(miembros) ? (
            miembros.map((miembro, index) => (
              <motion.div key={index} className="miembro-item">
                <img src={miembro.foto} alt={miembro.nombre_completo} className="miembro-foto" />
                <h3>{miembro.nombre_completo}</h3>
                <p><strong>Líneas de investigación:</strong></p>
                <ul>
                  {Array.isArray(miembro.linea_de_investigacion) && miembro.linea_de_investigacion.map((linea, i) => (
                    <li key={i}>{linea}</li>
                  ))}
                </ul>
                <a href={miembro.cvlac} target="_blank" rel="noopener noreferrer" className="boton-perfil">
                  Ver perfil académico
                </a>
              </motion.div>
            ))
          ) : (
            <p>No hay miembros disponibles.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Miembros;
