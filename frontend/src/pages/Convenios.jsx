import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../assets/styles/Convenios.css';
import edit from '../assets/images/edit.png';
import logo from '../assets/images/logoS.png'; 

const Convenios = () => {
  const [convenios, setConvenios] = useState([]);
  const [newConvenio, setNewConvenio] = useState(null); // Estado para el nuevo convenio
  const [editingIndex, setEditingIndex] = useState(null); // Índice del convenio que se está editando

  useEffect(() => {
    fetch('http://localhost:3000/conveniosAlianzas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        setConvenios(data);
      })
      .catch(error => console.error('Error al obtener los convenios:', error));
  }, []);

  const handleAddConvenio = () => {
    setNewConvenio({
      icono: '',
      institucion: '',
      objetivos: [''], // Inicia con un campo vacío
      resultados: [''], // Inicia con un campo vacío
      editing: true // Para habilitar la edición
    });
  };

  const handleEditToggle = (index) => {
    setEditingIndex(editingIndex === index ? null : index); // Alternar el estado de edición
  };

  const handleEditChange = (e, field, index) => {
    const updatedConvenios = [...convenios]; // Copia la lista actual
    updatedConvenios[index][field] = e.target.value; // Actualiza el campo correspondiente
    setConvenios(updatedConvenios); // Establece la lista actualizada
  };

  const handleListaEditChange = (e, index, field) => {
    const updatedConvenios = [...convenios]; // Copia la lista actual
    const newList = [...updatedConvenios[editingIndex][field]]; // Crea una nueva lista para actualizar
    newList[index] = e.target.value; // Actualiza la lista correspondiente
    updatedConvenios[editingIndex][field] = newList; // Establece la nueva lista en el convenio editado
    setConvenios(updatedConvenios); // Establece la lista actualizada
  };

  const handleChange = (e, field) => {
    setNewConvenio({
      ...newConvenio,
      [field]: e.target.value
    });
  };

  const handleListaChange = (e, index, field) => {
    const newList = [...newConvenio[field]];
    newList[index] = e.target.value; // Actualiza la lista correspondiente
    setNewConvenio({ ...newConvenio, [field]: newList });
  };

  const handleAddEditItem = (e) => {
    const updatedConvenios = [...convenios];
    const field = e === 'objetivos' ? 'objetivos' : 'resultados';
    updatedConvenios[editingIndex][field].push(''); // Agrega un nuevo objetivo o resultado
    setConvenios(updatedConvenios); // Actualiza la lista de convenios
  };

  const handleSaveEdit = async (index) => {
    const convenioToUpdate = convenios[index];

    if (!convenioToUpdate || !convenioToUpdate.institucion || !convenioToUpdate.objetivos || !convenioToUpdate.resultados) {
      alert('Por favor, complete todos los campos necesarios.');
      return;
    }

    const data = {
      institucion: convenioToUpdate.institucion,
      objetivos: convenioToUpdate.objetivos,
      resultados: convenioToUpdate.resultados,
    };

    try {
      const response = await fetch(`http://localhost:3000/conveniosAlianzas/${convenioToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedConvenio = await response.json();
        const updatedConvenios = [...convenios];
        updatedConvenios[index] = updatedConvenio; // Actualiza el convenio en la lista
        setConvenios(updatedConvenios); // Establecer la lista actualizada
        alert('Convenio actualizado exitosamente');
        setEditingIndex(null); // Restablecer el índice de edición
      } else {
        const errorResponse = await response.json();
        console.error('Error al actualizar el convenio:', errorResponse);
        alert(`Error al actualizar el convenio: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error al actualizar el convenio. Inténtalo de nuevo.');
    }
  };

  // Función para cancelar la tarea
  const handleCancel = () => {
    setNewConvenio(null); // Elimina la tarjeta de nuevo convenio
  };

  const handleSave = async () => {
    // Validar que todos los campos necesarios estén completos
    if (!newConvenio || !newConvenio.objetivos || !newConvenio.institucion || !newConvenio.resultados) {
      alert('Por favor, complete todos los campos necesarios.');
      return;
    }

    // Crear el objeto de datos según la nueva estructura del backend
    const data = {
      institucion: newConvenio.institucion,
      objetivos: newConvenio.objetivos, // Asumiendo que 'objetivos' es un array de objetivos
      resultados: newConvenio.resultados, // Asegúrate de que este campo esté en el objeto
    };

    // Realizar la solicitud POST al backend
    const response = await fetch('http://localhost:3000/conveniosAlianzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Manejar la respuesta del servidor
    if (response.ok) {
      const savedConvenio = await response.json();
      setConvenios([...convenios, savedConvenio]); // Actualiza la lista de convenios
      alert('Convenio creado exitosamente');
      setNewConvenio(null); // Restablecer el nuevo convenio
    } else {
      const errorResponse = await response.json();
      console.error('Error al guardar el convenio:', errorResponse);
      alert(`Error al crear el convenio: ${errorResponse.error}`);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null); // Cancelar la edición
  };

  const handleAddItem = (field) => {
    setNewConvenio({
      ...newConvenio,
      [field]: [...newConvenio[field], ''] // Agrega un nuevo campo vacío
    });
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
    <section id="convenios" className="seccion convenios">
      <div className="contenedor">
         {/* Línea separadora con la imagen */}
         <div className="linea-separadora-contenedor-Conv">
          <img src={logo} alt="Logo" className="logo-imagen" />
          <div className="linea-roja-Conv"></div>
        </div>
        <motion.h2
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Convenios y Alianzas Actuales
        </motion.h2>
        <motion.div
          className="lista-convenios"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          initial="hidden"
          animate="visible"
        >
          {Array.isArray(convenios) ? (
            convenios.map((convenio, index) => (
              <motion.div
                key={index}
                className="convenio-item"
                whileHover={{ scale: 1.03 }}
              >
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
                    <img src={edit} alt="Edit icon" width={25} height={25} style={{ filter: 'invert(18%) sepia(96%) saturate(7497%) hue-rotate(357deg) brightness(102%) contrast(113%)' }} />
                  </button>
                </div>
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={convenio.institucion}
                      onChange={(e) => handleEditChange(e, 'institucion', index)}
                      placeholder="Institución"
                    />
                    <div className="convenio-contenido">
                      <div className="convenio-seccion">
                        <h4>Objetivos:</h4>
                        <ul>
                          {Array.isArray(convenio.objetivos) && convenio.objetivos.map((objetivo, i) => (
                            <li key={i}>
                              <input
                                type="text"
                                value={objetivo}
                                onChange={(e) => handleListaEditChange(e, i, 'objetivos')}
                                placeholder="Objetivo"
                              />
                            </li>
                          ))}
                          <button onClick={() => handleAddEditItem('objetivos')} className="boton-perfil">Agregar objetivo</button>
                        </ul>
                      </div>
                      <div className="convenio-seccion">
                        <h4>Resultados esperados/alcanzados:</h4>
                        <ul>
                          {Array.isArray(convenio.resultados) && convenio.resultados.map((resultado, i) => (
                            <li key={i}>
                              <input
                                type="text"
                                value={resultado}
                                onChange={(e) => handleListaEditChange(e, i, 'resultados')}
                                placeholder="Resultado"
                              />
                            </li>
                          ))}
                          <button onClick={() => handleAddEditItem('resultados')} className="boton-perfil">Agregar resultado</button>
                        </ul>
                      </div>
                    </div>
                    <button onClick={handleCancelEdit} className="boton-perfil">Cancelar</button>
                    <button onClick={() => handleSaveEdit(index)} className="boton-perfil">Guardar</button>
                  </>
                ) : (
                  <>
                    <h3>{convenio.institucion}</h3>
                    <div className="convenio-contenido">
                      <div className="convenio-seccion">
                        <h4>Objetivos:</h4>
                        <ul>
                          {Array.isArray(convenio.objetivos) && convenio.objetivos.map((objetivo, i) => (
                            <li key={i}>{objetivo}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="convenio-seccion">
                        <h4>Resultados esperados/alcanzados:</h4>
                        <ul>
                          {Array.isArray(convenio.resultados) && convenio.resultados.map((resultado, i) => (
                            <li key={i}>{resultado}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))
          ) : (
            <p>No hay convenios disponibles.</p>
          )}
          {/* Botón para agregar un nuevo convenio */}
          <button onClick={handleAddConvenio} className="boton-agregar">
            +
          </button>

          {/* Tarjeta para agregar un nuevo convenio */}
          {newConvenio && (
            <motion.div className="convenio-item" variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <input
                type="text"
                placeholder="Icono"
                value={newConvenio.icono}
                onChange={(e) => handleChange(e, 'icono')}
              />
              <input
                type="text"
                placeholder="Institución"
                value={newConvenio.institucion}
                onChange={(e) => handleChange(e, 'institucion')}
              />
              <p><strong>Objetivos:</strong></p>
              <ul>
                {Array.isArray(newConvenio.objetivos) && newConvenio.objetivos.map((objetivo, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      placeholder="Objetivo"
                      value={objetivo}
                      onChange={(e) => handleListaChange(e, index, 'objetivos')}
                    />
                  </li>
                ))}
                <button onClick={() => handleAddItem('objetivos')} className="boton-perfil">Agregar objetivo</button>
              </ul>
              <p><strong>Resultados esperados/alcanzados:</strong></p>
              <ul>
                {Array.isArray(newConvenio.resultados) && newConvenio.resultados.map((resultado, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      placeholder="Resultado"
                      value={resultado}
                      onChange={(e) => handleListaChange(e, index, 'resultados')}
                    />
                  </li>
                ))}
                <button onClick={() => handleAddItem('resultados')} className="boton-perfil">Agregar resultado</button>
              </ul>
              <button onClick={handleCancel} className="boton-perfil">Cancelar</button> {/* Botón para cancelar */}
              <button onClick={handleSave} className="boton-perfil">Guardar</button>

            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default Convenios;
