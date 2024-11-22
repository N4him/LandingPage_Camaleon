import { useState, useEffect } from 'react';
import axios from 'axios';

const lineasInvestigacionApi = axios.create({
  baseURL: "http://localhost:3000/lineasInvestigacion",
  withCredentials: true,
});

export default function LineaDeInvestigacionLogic() {
  const [lineas, setLineas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentLineaId, setCurrentLineaId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });

  useEffect(() => {
    fetchLineas();
  }, []);

  // Fetch líneas from the API
  const fetchLineas = async () => {
    try {
      const response = await lineasInvestigacionApi.get('/');
      setLineas(response.data);
    } catch (err) {
      setError('Error al cargar las líneas de investigación');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const lineaData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
    };

    try {
      if (isEditing && currentLineaId) {
        await lineasInvestigacionApi.put(`/${currentLineaId}`, lineaData);
        setIsEditing(false);
        setCurrentLineaId(null);
      } else {
        await lineasInvestigacionApi.post('/', lineaData);
      }
      await fetchLineas();
      setShowForm(false);
    } catch (err) {
      setError('Error al guardar la línea de investigación');
      console.error(err);
    }
  };

  // Handle edit action
  const handleEdit = (linea) => {
    setIsEditing(true);
    setShowForm(!showForm);
    setCurrentLineaId(linea.id);
    setFormData({
      nombre: linea.nombre,
      descripcion: linea.descripcion,
    });
  };

  // Handle delete action
  const handleDelete = async (lineaId) => {
    try {
      await lineasInvestigacionApi.delete(`/${lineaId}`);
      await fetchLineas();
    } catch (err) {
      setError('Error al eliminar la línea de investigación');
      console.error(err);
    }
  };

  return {
    lineas,
    loading,
    error,
    isEditing,
    showForm,
    currentLineaId,
    formData,
    setFormData,
    setShowForm,
    handleSubmit,
    handleEdit,
    handleDelete,
  };
}
