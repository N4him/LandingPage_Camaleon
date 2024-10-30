import React from 'react';
import { motion } from 'framer-motion';
import Encabezado from './componentes/Encabezado';
import InformacionGrupo from './componentes/InformacionGrupo';
import Practicas from './componentes/Practicas';
import TrabajosGrado from './componentes/TrabajosGrado';
import ProyectosInvestigacion from './componentes/ProyectosInvestigacion';
import LineasInvestigacion from './componentes/LineasInvestigacion';
import Miembros from './componentes/Miembros';
import Convenios from './componentes/Convenios';
import PiePagina from './componentes/PiePagina';
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