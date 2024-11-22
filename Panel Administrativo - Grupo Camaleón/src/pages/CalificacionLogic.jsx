import { useState, useEffect } from 'react';
import axios from 'axios';

const calificacionGrupoApi = axios.create({
  baseURL: "http://localhost:3000/calificacionGrupo",
  withCredentials: true,
});

export const useCalificaciones = () => {
  const [calificaciones, setCalificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCalificaciones();
  }, []);

  async function fetchCalificaciones() {
    try {
      const response = await calificacionGrupoApi.get('/');
      const calificacionesData = response.data.map((item) => ({
        id: item.id,
        calificacion: item.calificacion.calificacion || '',
        masInformacion: item.calificacion.masInformacion || '',
      }));
      setCalificaciones(calificacionesData);
    } catch (err) {
      setError('Error al cargar las calificaciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleAddCalificacion = async (formData) => {
    try {
      await calificacionGrupoApi.post('/', { calificacion: formData });
      await fetchCalificaciones();
    } catch (err) {
      setError('Error al guardar la calificación');
      console.error(err);
    }
  };

  const handleEditCalificacion = async (id, formData) => {
    try {
      await calificacionGrupoApi.put(`/${id}`, { calificacion: formData });
      await fetchCalificaciones();
    } catch (err) {
      setError('Error al actualizar la calificación');
      console.error(err);
    }
  };

  const handleDeleteCalificacion = async (id) => {
    try {
      await calificacionGrupoApi.delete(`/${id}`);
      setCalificaciones(calificaciones.filter((c) => c.id !== id));
    } catch (err) {
      setError('Error al eliminar la calificación');
      console.error(err);
    }
  };

  return {
    calificaciones,
    loading,
    error,
    handleAddCalificacion,
    handleEditCalificacion,
    handleDeleteCalificacion,
  };
};
