import { useState, useEffect } from 'react';
import axios from 'axios';

const miembrosGrupoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/miembrosGrupo`
    : "http://localhost:3000/miembrosGrupo",
  withCredentials: true,
});

export default function useMiembrosGrupo() {
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMiembroId, setCurrentMiembroId] = useState(null);
  const [formData, setFormData] = useState({
    nombre_completo: '',
    apellidos: '',
    rol: '',
    foto: null,
    linea_de_investigacion: '',
    cvlac: '',
  });

  useEffect(() => {
    fetchMiembros();
  }, []);

  const fetchMiembros = async () => {
    try {
      const response = await miembrosGrupoApi.get('/');
      setMiembros(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los miembros del grupo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const cleanedFormData = {
      nombre_completo: formData.nombre_completo.trim(),
      apellidos: formData.apellidos.trim(),
      rol: formData.rol.trim(),
      linea_de_investigacion: formData.linea_de_investigacion.trim(),
      cvlac: formData.cvlac.trim(),
      foto: formData.foto,
    };
  
    const emptyFields = Object.entries(cleanedFormData)
      .filter(([key, value]) => !value)
      .map(([key]) => key);
  
    if (emptyFields.length > 0) {
      setError(`Todos los campos son obligatorios. Los siguientes campos están vacíos: ${emptyFields.join(', ')}`);
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('miembro_del_grupo[nombre_completo]', cleanedFormData.nombre_completo);
    formDataToSend.append('miembro_del_grupo[apellidos]', cleanedFormData.apellidos);
    formDataToSend.append('miembro_del_grupo[rol]', cleanedFormData.rol);
    formDataToSend.append('miembro_del_grupo[linea_de_investigacion]', cleanedFormData.linea_de_investigacion);
    formDataToSend.append('miembro_del_grupo[cvlac]', cleanedFormData.cvlac);
  
    // Solo agregar la foto si hay una nueva foto seleccionada
    if (cleanedFormData.foto && cleanedFormData.foto instanceof File) {
      formDataToSend.append('foto', cleanedFormData.foto);
    }
  
    try {
      if (isEditing && currentMiembroId) {
        // Si estamos editando, no enviamos la foto si no se ha cargado una nueva
        await miembrosGrupoApi.put(`/${currentMiembroId}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setIsEditing(false);
        setCurrentMiembroId(null);
      } else {
        await miembrosGrupoApi.post('/', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
  
      await fetchMiembros();
      setShowForm(false);
      resetForm();
      setSuccessMessage('Miembro guardado con éxito');
      setError(null); // Limpiar errores después de guardar con éxito
    } catch (err) {
      setError('Error al guardar el miembro');
      console.error(err);
    }
  };
  

  const handleDelete = async (id, photoURL) => {
    try {
      const deleteResponse = await miembrosGrupoApi.delete(`/${id}`);

      if (deleteResponse.status >= 200 && deleteResponse.status < 300) {
        if (photoURL) {
          try {
            await miembrosGrupoApi.delete('/delete-photo', { data: { photoURL } });
          } catch (err) {
            console.warn("Error al eliminar la foto:", err);
          }
        }

        await fetchMiembros();
        setError(null); // Limpiar error después de eliminación exitosa
        setSuccessMessage('Miembro eliminado con éxito');
      } else {
        setError('Error al eliminar el miembro');
      }
    } catch (err) {
      console.error(err);
      setError('Error inesperado al eliminar el miembro');
    }
  };

  const handleEdit = (miembro) => {
    setIsEditing(true);
    setCurrentMiembroId(miembro.id);
    setFormData({
      nombre_completo: miembro.nombre_completo,
      apellidos: miembro.apellidos,
      rol: miembro.rol,
      foto: miembro.foto || null,
      linea_de_investigacion: miembro.linea_de_investigacion || '',
      cvlac: miembro.cvlac || '',
    });
    setShowForm(true);
    setSuccessMessage(null); // Limpiar mensaje de éxito al iniciar edición
  };

  const resetForm = () => {
    setFormData({
      nombre_completo: '',
      apellidos: '',
      rol: '',
      foto: null,
      linea_de_investigacion: '',
      cvlac: '',
    });
    setSuccessMessage(null); // Limpiar mensaje de éxito al resetear
  };

  return {
    resetForm,
    miembros,
    loading,
    error,
    successMessage,
    showForm,
    setShowForm,
    formData,
    setFormData,
    isEditing,
    handleSubmit,
    handleDelete,
    handleEdit,
  };
}
