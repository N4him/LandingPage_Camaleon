import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import '../assets/styles/PiePagina.css';
import LogoUnivalle from "./../../public/LogoUnivalle.svg";

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
          <motion.div className="logo" variants={itemVariants}>
          <div className="nav-end-logo">
            <img src={LogoUnivalle} alt="Logo u" className="logo-univalle" />
          </div>
          </motion.div>
          <motion.div className="info-universidad" variants={itemVariants}>
            <h4 className='titulos '>Universidad del Valle</h4>
            <p>Cali - Colombia</p>
            <p>© 1994 - 2024</p>
          </motion.div>
          <motion.div className="direcciones" variants={itemVariants}>
            <h4 className='titulos ' >Direcciones</h4>
            <p>Ciudad Universitaria Meléndez<br />Calle 13 # 100-00</p>
            <p>Sede San Fernando<br />Calle 4B N° 36-00</p>
          </motion.div>
          <motion.div className="contacto" variants={itemVariants}>
            <h4 className='titulos ' >Contacto</h4>
            <p>PBX: +57 602 3212100</p>
            <p>Línea gratuita PQRS: 018000 220021</p>
            <p>Apartado Aéreo: 25360</p>
          </motion.div>
          <motion.div className="enlaces-rapidos" variants={itemVariants}>
            <h4 className='titulos ' >Enlaces</h4>
            <ul className="enlaces-rapidos">
              <li><a className="enlaces" href="#">Consejo Superior</a></li>
              <li><a className="enlaces" href="#">Consejo Académico</a></li>
              <li><a className="enlaces" href="#">Rectoría</a></li>
              <li><a className="enlaces" href="#">Nuestros Símbolos</a></li>
              <li><a className="enlaces" href="#">Acerca de Univalle</a></li>
            </ul>
          </motion.div>
          <motion.div className="redes-sociales" variants={itemVariants}>
            <h4 className='titulos ' > Síguenos</h4>
            <div className="iconos-redes">
              <a  href="#" className='titulos ' ><FaFacebookF /></a>
              <a href="#" className='titulos '><FaTwitter /></a>
              <a href="#" className='titulos ' ><FaInstagram /></a>
              <a href="#" className='titulos '><FaLinkedinIn /></a>
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