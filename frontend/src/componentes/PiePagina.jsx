import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './PiePagina.css';

const PiePagina = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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
    <footer className="pie-pagina">
      <div className="contenedor">
        <motion.div 
          className="pie-contenido"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="info-universidad" variants={itemVariants}>
            <h3>Universidad del Valle</h3>
            <p>Cali - Colombia</p>
            <p>© 1994 - 2024</p>
          </motion.div>
          <motion.div className="direcciones" variants={itemVariants}>
            <h4>Direcciones:</h4>
            <p>Ciudad Universitaria Meléndez<br />Calle 13 # 100-00</p>
            <p>Sede San Fernando<br />Calle 4B N° 36-00</p>
          </motion.div>
          <motion.div className="contacto" variants={itemVariants}>
            <h4>Contacto:</h4>
            <p>PBX: +57 602 3212100</p>
            <p>Línea gratuita PQRS: 018000 220021</p>
            <p>Apartado Aéreo: 25360</p>
          </motion.div>
          <motion.div className="enlaces-rapidos" variants={itemVariants}>
            <h4>Enlaces Rápidos:</h4>
            <ul>
              <li><a href="#">Consejo Superior</a></li>
              <li><a href="#">Consejo Académico</a></li>
              <li><a href="#">Rectoría</a></li>
              <li><a href="#">Nuestros Símbolos</a></li>
              <li><a href="#">Acerca de Univalle</a></li>
            </ul>
          </motion.div>
          <motion.div className="redes-sociales" variants={itemVariants}>
            <h4>Síguenos:</h4>
            <div className="iconos-redes">
              <a href="#" className="red-social"><FaFacebookF /></a>
              <a href="#" className="red-social"><FaTwitter /></a>
              <a href="#" className="red-social"><FaInstagram /></a>
              <a href="#" className="red-social"><FaLinkedinIn /></a>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div 
        className="derechos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>Todos los derechos reservados © 2024 Universidad del Valle</p>
      </motion.div>
    </footer>
  );
};

export default PiePagina;