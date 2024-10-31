import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import edit from '../assets/images/edit.png'
import '../assets/styles/Miembros.css';

const Miembros = () => {
  const [miembros, setMiembros] = useState([]);
  const [newMiembro, setNewMiembro] = useState(null);

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

  const handleAddMember = () => {
    setNewMiembro({
      foto: '',
      nombre_completo: '',
      linea_de_investigacion: [''],
      cvlac: '',
      editing: true
    });
  };

  const handleChange = (e, field) => {
    setNewMiembro({
      ...newMiembro,
      [field]: e.target.value
    });
  };

   // Función para cancelar la tarea
   const handleCancel = () => {
    setNewMiembro(null); // Elimina la tarjeta de nuevo convenio
  };

  const handleLineaChange = (e, index) => {
    const newLineas = [...newMiembro.linea_de_investigacion];
    newLineas[index] = e.target.value;
    setNewMiembro({ ...newMiembro, linea_de_investigacion: newLineas });
  };

  const handleAddLinea = () => {
    setNewMiembro({
      ...newMiembro,
      linea_de_investigacion: [...newMiembro.linea_de_investigacion, '']
    });
  };

  const handleSave = async () => {
    const formData = new FormData();
  
    formData.append('miembro_del_grupo[nombre_completo]', newMiembro.nombre_completo);
    formData.append('miembro_del_grupo[cvlac]', newMiembro.cvlac);
    newMiembro.linea_de_investigacion.forEach((linea) => {
      formData.append('miembro_del_grupo[linea_de_investigacion]', linea);
    });
  
    // Si hay una foto, añadirla al FormData
    if (newMiembro.foto) {
      formData.append('foto', newMiembro.foto);
    }

    try {
      const response = await axios.post('http://localhost:3000/miembrosGrupo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Actualiza el estado de miembros con el nuevo miembro creado
      setMiembros(prevMiembros => [...prevMiembros, response.data]);

      alert('Miembro creado exitosamente');
      setNewMiembro(null); // Limpiar el formulario después de guardar

    } catch (error) {
      console.error('Error al crear el miembro:', error);
      alert('Error al crear el miembro');
    }
  };

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

  return (
    <section id="miembros" className="seccion miembros">
      <div className="contenedor">
        <motion.h2
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Miembros del Grupo
        </motion.h2>
        <motion.div
          className="lista-miembros"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.isArray(miembros) ? (
            miembros.map((miembro, index) => (
              <motion.div
                key={index}
                className="miembro-item"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div style={{ display : 'grid' , justifyContent : 'end'}}>
                  <img
                    src={edit}
                    alt="Edit icon"
                    width={25}
                    height={25}
                    style={{
                      filter: 'invert(18%) sepia(96%) saturate(7497%) hue-rotate(357deg) brightness(102%) contrast(113%)'
                    }}
                  />
                </div>
                <br/>
                <img src={miembro.foto} alt={miembro.nombre_completo} className="miembro-foto" />
                <h3>{miembro.nombre_completo}</h3>
                <p><strong>Líneas de investigación:</strong></p>
                <ul>
                  {Array.isArray(miembro.linea_de_investigacion) && miembro.linea_de_investigacion.map((linea, i) => (
                    <li key={i}>{linea}</li>
                  ))}
                </ul>
                <a href={miembro.cvlac} target="_blank" rel="noopener noreferrer" className="boton-perfil">Ver perfil académico</a>
              </motion.div>
            ))
          ) : (
            <p>No hay miembros disponibles.</p>
          )}

          {/* Botón para agregar un nuevo miembro */}
          <button onClick={handleAddMember} className="boton-agregar">
            +
          </button>

          {/* Tarjeta para agregar un nuevo miembro */}
          {newMiembro && (
            <motion.div className="miembro-item" variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <input
                type="text"
                placeholder="Nombre completo"
                value={newMiembro.nombre_completo}
                onChange={(e) => handleChange(e, 'nombre_completo')}
              />
              <input
                type="text"
                placeholder="Foto URL"
                value={newMiembro.foto}
                onChange={(e) => handleChange(e, 'foto')}
              />
              <p><strong>Líneas de investigación:</strong></p>
              <ul>
                {newMiembro.linea_de_investigacion.map((linea, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      placeholder="Línea de investigación"
                      value={linea}
                      onChange={(e) => handleLineaChange(e, index)}
                    />
                  </li>
                ))}
                <button onClick={handleAddLinea} className="boton-perfil">Agregar línea</button>
              </ul>
              <input
                type="text"
                placeholder="CVLAC URL"
                value={newMiembro.cvlac}
                onChange={(e) => handleChange(e, 'cvlac')}
              />
              <button onClick={handleCancel} className="boton-perfil">Cancelar</button> {/* Botón para cancelar */}
              <button onClick={handleSave} className="boton-perfil">Guardar</button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Miembros;
