import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import edit from '../assets/images/edit.png';
import '../assets/styles/Miembros.css';

const Miembros = () => {
  const [miembros, setMiembros] = useState([]);
  const [newMiembro, setNewMiembro] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingLineIndex, setEditingLineIndex] = useState(null); // Nueva variable de estado
  const [lineasInvestigacion, setLineasInvestigacion] = useState(''); // Nueva variable de estado

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

  const handleEditToggle = (index) => {
    setEditingIndex(index === editingIndex ? null : index);
  };

  const handleEditChange = (e, field) => {
    const updatedMiembros = [...miembros];
    updatedMiembros[editingIndex][field] = e.target.value;
    setMiembros(updatedMiembros);
  };

  const handleEditLineaChange = (e, index) => {
    // Clona el array de líneas de investigación del miembro que se está editando
    const updatedLineas = [...miembros[editingIndex].linea_de_investigacion];
    // Actualiza el valor de la línea de investigación en el índice correspondiente
    updatedLineas[index] = e.target.value;

    // Actualiza el estado del miembro en edición con las líneas de investigación actualizadas
    setMiembros(prevMiembros =>
      prevMiembros.map((miembro, i) =>
        i === editingIndex ? { ...miembro, linea_de_investigacion: updatedLineas } : miembro
      )
    );
  };

  const handleAddEditLinea = () => {
    const updatedMiembros = [...miembros];
    updatedMiembros[editingIndex].linea_de_investigacion.push(''); // Agrega una nueva línea vacía
    setMiembros(updatedMiembros); // Actualiza el estado
  };
  


  const handleSaveEdit = async () => {
    const miembro = miembros[editingIndex];
    try {
      const response = await axios.put(`http://localhost:3000/miembrosGrupo/${miembro.id}`, { miembro_del_grupo: miembro });
      setMiembros(miembros.map((m, i) => (i === editingIndex ? response.data : m)));
      setEditingIndex(null);
      alert('Cambios guardados exitosamente');
    } catch (error) {
      console.error('Error al actualizar el miembro:', error);
      alert('Error al guardar los cambios');
    }
  };


  const handleChange = (e, field) => {
    setNewMiembro({
      ...newMiembro,
      [field]: e.target.value
    });
  };

  const handleCancel = () => {
    setNewMiembro(null);
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

    if (newMiembro.foto) {
      formData.append('foto', newMiembro.foto);
    }

    try {
      const response = await axios.post('http://localhost:3000/miembrosGrupo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMiembros(prevMiembros => [...prevMiembros, response.data]);
      alert('Miembro creado exitosamente');
      setNewMiembro(null);
    } catch (error) {
      console.error('Error al crear el miembro:', error);
      alert('Error al crear el miembro');
    }
  };

  return (
    <section id="miembros" className="seccion miembros">
      <div className="contenedor">
        <motion.h2 className="titulo-seccion">Miembros del Grupo</motion.h2>
        <motion.div className="lista-miembros">
          {Array.isArray(miembros) ? (
            miembros.map((miembro, index) => (
              <motion.div key={index} className="miembro-item">
                <div style={{ display: 'grid', justifyContent: 'end' }}>
                  <button
                    onClick={() => handleEditToggle(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >

                    <img src={edit} alt="Edit icon" width={25}
                      height={25}
                      style={{
                        filter: 'invert(18%) sepia(96%) saturate(7497%) hue-rotate(357deg) brightness(102%) contrast(113%)'
                      }} />
                  </button>
                </div>
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={miembro.nombre_completo}
                      onChange={(e) => handleEditChange(e, 'nombre_completo')}
                    />
                    <input
                      type="text"
                      value={miembro.foto}
                      onChange={(e) => handleEditChange(e, 'foto')}
                    />
                    <p><strong>Líneas de investigación:</strong></p>
                    <ul>
                      {miembro.linea_de_investigacion.map((linea, lineaIndex) => (
                        <li key={lineaIndex}>
                          <input
                            type="text"
                            value={linea}
                            onChange={(e) => handleEditLineaChange(e, lineaIndex)} // Actualiza con el índice de la línea
                            placeholder="Línea de investigación"
                          />
                        </li>
                      ))}
                      <button onClick={handleAddEditLinea} className="boton-perfil">Agregar línea</button>
                    </ul>
                    <input
                      type="text"
                      value={miembro.cvlac}
                      onChange={(e) => handleEditChange(e, 'cvlac')}
                    />
                    <button onClick={() => setEditingIndex(null)} className="boton-perfil">Cancelar</button>
                    <button onClick={handleSaveEdit} className="boton-perfil">Guardar</button>
                  </>
                ) : (
                  <>
                    <img src={miembro.foto} alt={miembro.nombre_completo} className="miembro-foto" />
                    <h3>{miembro.nombre_completo}</h3>
                    <p><strong>Líneas de investigación:</strong></p>
                    <ul>
                      {Array.isArray(miembro.linea_de_investigacion) && miembro.linea_de_investigacion.map((linea, i) => (
                        <li key={i}>{linea}</li>
                      ))}
                    </ul>
                    <a href={miembro.cvlac} target="_blank" rel="noopener noreferrer" className="boton-perfil">Ver perfil académico</a>
                  </>
                )}
              </motion.div>
            ))
          ) : (
            <p>No hay miembros disponibles.</p>
          )}

          <button onClick={handleAddMember} className="boton-agregar">+</button>

          {newMiembro && (
            <motion.div className="miembro-item">
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
              <button onClick={handleCancel} className="boton-perfil">Cancelar</button>
              <button onClick={handleSave} className="boton-perfil">Guardar</button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Miembros;
