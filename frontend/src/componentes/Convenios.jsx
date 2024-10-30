import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaGraduationCap } from 'react-icons/fa';
import './Convenios.css';





const Convenios = () => {
  // Nuevas alianzas para las tarjetas
  const alianzas = [
    { institucion: "Lorem Ipsum", logo: "/path/to/logo1.png" },
    { institucion: "Lorem Ipsum", logo: "/path/to/logo2.png" },
    { institucion: "Lorem Ipsum", logo: "/path/to/logo3.png" }, 
    { institucion: "Lorem Ipsum", logo: "/path/to/logo3.png" }, 
    { institucion: "Lorem Ipsum", logo: "/path/to/logo3.png" },
    { institucion: "Lorem Ipsum", logo: "/path/to/logo3.png" }, 
    { institucion: "Lorem Ipsum", logo: "/path/to/logo3.png" },
  ];

  return (
    <section id="convenios" className="seccion convenios">
      <div className="contenedor">
        <motion.h2 
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Alianzas Actuales
        </motion.h2>

        {/* Nueva sección de tarjetas de alianzas */}
        <div className="alianzas-tarjetas">
          {alianzas.map((alianza, index) => (
            <motion.div 
              key={index} 
              className="alianza-tarjeta"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={alianza.logo} alt={`Logo de ${alianza.institucion}`} className="alianza-logo" />
              <h3 className="alianza-nombre">{alianza.institucion}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Convenios;
