import React from 'react';
import { motion } from 'framer-motion';
import LogoCamaleon from "../assets/images/logo.png";
import Chamaleon from '../componentes/Chamaleon';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Hero() {
  const styles = {
    heroContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: '0 2rem',
      height: '100vh',
      background: 'linear-gradient(to bottom, #C20E1A, #C20E1A 60%, rgba(248, 248, 248, 1) 100%)',
    },
    contentContainer: {
      flex: 1,
      paddingRight: '2rem',
      maxWidth: '50%',
      color: 'white',
      paddingTop: '7rem',
      textAlign: 'left',
    },
    title: {
      fontSize: '3rem',
      color: 'white',
      marginBottom: '0.3rem',
      textTransform: 'uppercase',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
    },
    paragraph: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: 'white',
    },
    modelContainer: {
      flex: 0.8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    circle: {
      marginTop: '70px',
      position: 'absolute',
      width: '450px', // Aumentar el tamaño del círculo
      height: '450px',
      borderRadius: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      zIndex: 1,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    },
    groupImage: {
      marginTop: '50px',
      maxWidth: '40%', // Reducir el tamaño de la imagen
      maxHeight: '50%', // Asegurar que la imagen se ajuste bien dentro del círculo
      zIndex: 2,
    },
    button: {
      marginTop: '1rem',
      padding: '0.8rem 1.5rem',
      borderRadius: '10px',
      backgroundColor: '#e63946',
      color: 'white',
      border: 'none',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      fontSize: '1.2rem',
      transition: 'background-color 0.3s',
      textAlign: 'left',
    },
  };

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
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.section
      style={styles.heroContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div style={styles.contentContainer} variants={itemVariants}>
        <motion.h1 style={styles.title}>
          Explorando la Innovación y el Cambio
        </motion.h1>
        <motion.p style={styles.paragraph} variants={itemVariants}>
          Nuestro equipo adapta y evoluciona como un camaleón, enfrentando nuevos retos en la ciencia y la tecnología. Únete a nosotros y sé parte del cambio.
        </motion.p>
        <motion.button style={styles.button} variants={itemVariants} whileHover={{ scale: 1.05 }}>
          Conocer más
        </motion.button>
      </motion.div>
      <motion.div style={styles.modelContainer} variants={itemVariants}>
        <Canvas className='canvas-chamaleon' camera={{ position: [4, 1, -3] }}  >
          <OrbitControls makeDefault target={[0, 1, 0]} enablePan={false} enableZoom={false} autoRotate />
          <ambientLight />
          <spotLight intensity={20} position={[0, 3, -2]} />
          <Chamaleon />
        </Canvas>
        {/* <div style={styles.circle} >
          
        </div> */}
        {/* Forma circular */}
        {/* <img src={LogoCamaleon} alt="Camaleón" style={styles.groupImage} /> */}

      </motion.div>
    </motion.section>
  );
}

export default Hero;
