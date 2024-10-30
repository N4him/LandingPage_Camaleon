import React from 'react';
import { motion } from 'framer-motion';
import Encabezado from './pages/Encabezado';
import Hero from './pages/hero'; 
import InformacionGrupo from './pages/InformacionGrupo';
import Practicas from './pages/Practicas';
import TrabajosGrado from './pages/TrabajosGrado';
import ProyectosInvestigacion from './pages/ProyectosInvestigacion';
import LineasInvestigacion from './pages/LineasInvestigacion';
import Miembros from './pages/Miembros';
import Convenios from './pages/Convenios';
import PiePagina from './pages/PiePagina';
import './App.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function App() {
  return (
    <div className="App">
      <Encabezado />
      <Hero /> 
      <main>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <InformacionGrupo />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <Practicas />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <TrabajosGrado />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <ProyectosInvestigacion />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <LineasInvestigacion />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <Miembros />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <Convenios />
        </motion.div>
      </main>
      <PiePagina />
    </div>
  );
}

export default App;
