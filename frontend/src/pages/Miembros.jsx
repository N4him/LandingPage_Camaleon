import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../assets/styles/Miembros.css';
import logo from '../assets/images/logoS.png'; // Ensure you have the logo

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
                <h3>{miembro.nombre_completo} {miembro.apellidos}</h3> {/* Cambio aquí */}
                <p><strong>Línea de investigación:</strong> {miembro.linea_de_investigacion}</p>
                <p><strong>Rol:</strong> {miembro.rol}</p>
                <p><strong>CVLAC:</strong> <a href={miembro.cvlac} target="_blank" rel="noopener noreferrer">Ver perfil</a></p>
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
