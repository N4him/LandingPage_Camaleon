import { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const calificacionGrupoApi = axios.create({
  baseURL: "http://localhost:3000/calificacionGrupo",
  withCredentials: true,
});

export default function Calificacion() {
  const [calificaciones, setCalificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCalificacionId, setCurrentCalificacionId] = useState(null);
  const [formData, setFormData] = useState({
    calificacion: '',
    masInformacion: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && currentCalificacionId) {
        await calificacionGrupoApi.put(`/${currentCalificacionId}`, {
          calificacion: {
            calificacion: formData.calificacion,
            masInformacion: formData.masInformacion,
          },
        });
      } else {
        await calificacionGrupoApi.post('/', {
          calificacion: {
            calificacion: formData.calificacion,
            masInformacion: formData.masInformacion,
          },
        });
      }
      setIsFormVisible(false);
      setIsEditing(false);
      setFormData({ calificacion: '', masInformacion: '' });
      await fetchCalificaciones();
    } catch (err) {
      setError('Error al guardar la calificación');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setIsEditing(false);
    setFormData({ calificacion: '', masInformacion: '' });
  };

  const handleEdit = (calificacion) => {
    setIsFormVisible(true);
    setIsEditing(true);
    setCurrentCalificacionId(calificacion.id);
    setFormData({
      calificacion: calificacion.calificacion || '',
      masInformacion: calificacion.masInformacion || '',
    });
  };

  const handleDelete = async (calificacionId) => {
    try {
      await calificacionGrupoApi.delete(`/${calificacionId}`);
      setCalificaciones(calificaciones.filter((c) => c.id !== calificacionId));
    } catch (err) {
      setError('Error al eliminar la calificación');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-8">Cargando...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl mb-8 space-y-6 relative">
          <button
            type="button"
            onClick={handleCancel}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700"
          >
            Cancelar
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">Calificación</label>
            <input
              type="text"
              value={formData.calificacion}
              onChange={(e) => setFormData({ ...formData, calificacion: e.target.value })}
              className="mt-2 block w-full rounded-lg border-2 border-gray-300 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Más Información</label>
            <input
              type="url"
              value={formData.masInformacion}
              onChange={(e) => setFormData({ ...formData, masInformacion: e.target.value })}
              className="mt-2 block w-full rounded-lg border-2 border-gray-300 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700"
          >
            {isEditing ? 'Actualizar Calificación' : 'Crear Calificación'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        <div
          onClick={() => {
            setIsFormVisible(true);
            setIsEditing(false);
            setFormData({ calificacion: '', masInformacion: '' });
          }}
          className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 cursor-pointer min-h-[250px] transition hover:shadow-xl order-last"
        >
          <PlusCircleIcon className="w-12 h-12 text-indigo-600 mb-4" />
          <p className="text-lg font-semibold text-indigo-600">Nueva Calificación</p>
        </div>

        {calificaciones.map((calificacion) => (
          <div
            key={calificacion.id}
            className="relative bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800">Calificación: {calificacion.calificacion}</h3>
            <p className="text-sm text-blue-600">
              <a href={calificacion.masInformacion} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Más Información
              </a>
            </p>
            <div className="absolute bottom-4 right-4 flex space-x-4">
              <button
                onClick={() => handleEdit(calificacion)}
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <PencilIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleDelete(calificacion.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
