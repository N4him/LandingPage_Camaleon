import { useState, useEffect } from 'react';
import axios from 'axios';

const trabajosGradoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/trabajosGrado`
    : "http://localhost:3000/trabajosGrado",
  withCredentials: true,
});

export default function useTrabajosDeGrado() {
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTrabajoId, setCurrentTrabajoId] = useState(null);
  const [formData, setFormData] = useState({
    descripcion: '',
    titulo: '',
    mencion: ['meritoria'],
    estudiantes: [{ "nombre(s)": '', "apellido(s)": '' }],
    "director(es)": [{ "nombre(s)": '', "apellido(s)": '' }]
  });

  useEffect(() => {
    fetchTrabajos();
  }, []);

  // Obtener trabajos de grado
  const fetchTrabajos = async () => {
    try {
      const response = await trabajosGradoApi.get('/');
      const trabajosData = response.data.map(item => ({
        id: item.id,
        ...item["Trabajo de Grado"]
      }));
      setTrabajos(trabajosData);
    } catch (err) {
      setError('Error al cargar los trabajos de grado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Enviar trabajo de grado (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const trabajoData = {
        "Trabajo de Grado": {
          descripcion: formData.descripcion,
          titulo: formData.titulo,
          mencion: formData.mencion,
          estudiantes: formData.estudiantes,
          "director(es)": formData["director(es)"]
        }
      };

      if (isEditing && currentTrabajoId) {
        await trabajosGradoApi.put(`/${currentTrabajoId}`, trabajoData);
        setIsEditing(false);
        setCurrentTrabajoId(null);
      } else {
        await trabajosGradoApi.post('/', trabajoData);
      }
      await fetchTrabajos(); // Recargar trabajos
      setShowForm(false);
      resetFormData();
    } catch (err) {
      setError('Error al guardar el trabajo de grado');
      console.error(err);
    }
  };

  // Eliminar trabajo de grado
  const handleDelete = async (id) => {
    try {
      await trabajosGradoApi.delete(`/${id}`);
      await fetchTrabajos(); // Recargar trabajos
    } catch (err) {
      setError('Error al eliminar el trabajo de grado');
      console.error(err);
    }
  };

  // Editar trabajo de grado
  const handleEdit = (trabajo) => {
    setIsEditing(true);
    setCurrentTrabajoId(trabajo.id);
    setFormData({
      descripcion: trabajo.descripcion,
      titulo: trabajo.titulo,
      mencion: trabajo.mencion,
      estudiantes: trabajo.estudiantes,
      "director(es)": trabajo["director(es)"]
    });
    setShowForm(true);
  };

  // Agregar estudiante
  const addEstudiante = () => {
    setFormData({
      ...formData,
      estudiantes: [...formData.estudiantes, { "nombre(s)": '', "apellido(s)": '' }]
    });
  };

  // Agregar director
  const addDirector = () => {
    setFormData({
      ...formData,
      "director(es)": [...formData["director(es)"], { "nombre(s)": '', "apellido(s)": '' }]
    });
  };

  // Obtener trabajos ordenados por título
  const getSortedTrabajos = () => {
    return [...trabajos].sort((a, b) => a.titulo.localeCompare(b.titulo));
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      descripcion: '',
      titulo: '',
      mencion: ['meritoria'],
      estudiantes: [{ "nombre(s)": '', "apellido(s)": '' }],
      "director(es)": [{ "nombre(s)": '', "apellido(s)": '' }]
    });
  };

  return {
    trabajos,
    loading,
    error,
    showForm,
    setShowForm,
    isEditing,
    formData,
    setFormData,
    handleSubmit,
    handleDelete,
    handleEdit,
    addEstudiante,
    addDirector,
    getSortedTrabajos
  };
}

