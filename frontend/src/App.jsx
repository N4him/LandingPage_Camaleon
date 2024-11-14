import React, { useRef } from 'react';
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
  // Referencias para cada sección
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const thesisRef = useRef(null);  // Referencia para "Trabajos de Grado"
  const researchRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className="App">
      <Encabezado 
        aboutRef={aboutRef} 
        projectsRef={projectsRef} 
        thesisRef={thesisRef} 
        researchRef={researchRef} 
        contactRef={contactRef} 
      />
      <Hero /> 
      <main>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          ref={aboutRef}
        >
          <InformacionGrupo />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <LineasInvestigacion />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          ref={projectsRef}
        >
          <ProyectosInvestigacion />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          ref={thesisRef}
        >
          <TrabajosGrado />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          ref={researchRef}
        >
          <Practicas />
        </motion.div>

       
      </main>
      <PiePagina />
    </div>
  );
}

export default App;
