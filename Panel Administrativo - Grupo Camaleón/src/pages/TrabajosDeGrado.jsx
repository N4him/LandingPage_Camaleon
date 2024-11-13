import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PlusIcon,PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function TrabajosDeGrado() {
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTrabajoId, setCurrentTrabajoId] = useState(null);

  const [formData, setFormData] = useState({
    descripcion: '',
    titulo: '',
    mencion: ['meritoria'], // default value
    estudiantes: [{ "nombre(s)": '', "apellido(s)": '' }],
    "director(es)": [{ "nombre(s)": '', "apellido(s)": '' }]
  });

  useEffect(() => {
    fetchTrabajos();
  }, []);

  async function fetchTrabajos() {
    try {
      const querySnapshot = await getDocs(collection(db, 'Trabajos de Grado'));
      const trabajosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTrabajos(trabajosData);
    } catch (err) {
      setError('Error al cargar los trabajos de grado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && currentTrabajoId) {
        const trabajoRef = doc(db, 'Trabajos de Grado', currentTrabajoId);
        await updateDoc(trabajoRef, formData);
        setIsEditing(false);
        setCurrentTrabajoId(null);
      } else {
        await addDoc(collection(db, 'Trabajos de Grado'), formData);
      }
      await fetchTrabajos();
      setShowForm(false);
      setFormData({
        descripcion: '',
        titulo: '',
        mencion: ['meritoria'],
        estudiantes: [{ "nombre(s)": '', "apellido(s)": '' }],
        "director(es)": [{ "nombre(s)": '', "apellido(s)": '' }]
      });
    } catch (err) {
      setError('Error al guardar el trabajo de grado');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Trabajos de Grado', id));
      await fetchTrabajos();
    } catch (err) {
      setError('Error al eliminar el trabajo de grado');
      console.error(err);
    }
  };

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

  const addEstudiante = () => {
    setFormData({
      ...formData,
      estudiantes: [...formData.estudiantes, { "nombre(s)": '', "apellido(s)": '' }]
    });
  };

  const addDirector = () => {
    setFormData({
      ...formData,
      "director(es)": [...formData["director(es)"], { "nombre(s)": '', "apellido(s)": '' }]
    });
  };

  const getSortedPracticas = () => {
    return [...trabajos].sort((a, b) =>
      a.titulo.localeCompare(b.titulo)
    );
  };
  

  if (loading) return <div className="text-center mt-8 text-lg text-gray-700">Cargando...</div>;
  if (error) return <div className="text-red-600 text-center mt-8 text-lg">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Formulario de creación/edición */}
      {showForm && (
        <form onSubmit={handleSubmit} className="relative bg-white p-8 rounded-lg shadow-lg mb-6 space-y-8">
          {/* Botón Cancelar en la esquina superior derecha */}
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Cancelar
          </button>
  
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
              rows="4"
              required
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
              required
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Mención</label>
            <select
              multiple
              value={formData.mencion}
              onChange={(e) => setFormData({
                ...formData,
                mencion: Array.from(e.target.selectedOptions, option => option.value)
              })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
              required
            >
              <option value="meritoria">Meritoria</option>
              <option value="laureada">Laureada</option>
            </select>
          </div>
  
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Estudiantes</label>
              <button
                type="button"
                onClick={addEstudiante}
                className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-300"
              >
                + Agregar Estudiante
              </button>
            </div>
            {formData.estudiantes.map((estudiante, index) => (
              <div key={index} className="grid grid-cols-2 gap-6 mb-4">
                <input
                  type="text"
                  value={estudiante["nombre(s)"]}
                  onChange={(e) => {
                    const newEstudiantes = [...formData.estudiantes];
                    newEstudiantes[index]["nombre(s)"] = e.target.value;
                    setFormData({ ...formData, estudiantes: newEstudiantes });
                  }}
                  placeholder="Nombres"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
                  required
                />
                <input
                  type="text"
                  value={estudiante["apellido(s)"]}
                  onChange={(e) => {
                    const newEstudiantes = [...formData.estudiantes];
                    newEstudiantes[index]["apellido(s)"] = e.target.value;
                    setFormData({ ...formData, estudiantes: newEstudiantes });
                  }}
                  placeholder="Apellidos"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
                  required
                />
              </div>
            ))}
          </div>
  
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Directores</label>
              <button
                type="button"
                onClick={addDirector}
                className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-300"
              >
                + Agregar Director
              </button>
            </div>
            {formData["director(es)"].map((director, index) => (
              <div key={index} className="grid grid-cols-2 gap-6 mb-4">
                <input
                  type="text"
                  value={director["nombre(s)"]}
                  onChange={(e) => {
                    const newDirectores = [...formData["director(es)"]];
                    newDirectores[index]["nombre(s)"] = e.target.value;
                    setFormData({ ...formData, "director(es)": newDirectores });
                  }}
                  placeholder="Nombres"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
                  required
                />
                <input
                  type="text"
                  value={director["apellido(s)"]}
                  onChange={(e) => {
                    const newDirectores = [...formData["director(es)"]];
                    newDirectores[index]["apellido(s)"] = e.target.value;
                    setFormData({ ...formData, "director(es)": newDirectores });
                  }}
                  placeholder="Apellidos"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
                  required
                />
              </div>
            ))}
          </div>
  
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            {isEditing ? 'Actualizar' : 'Guardar'}
          </button>
        </form>
      )}
  
      {/* Cards de los Trabajos de Grado */}
      {/* Cards de los Trabajos de Grado */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Card para Nuevo Trabajo de Grado */}
  <div
    onClick={() => {
      setShowForm(!showForm);
      if (showForm) {
        setIsEditing(false);
        setCurrentTrabajoId(null);
        setFormData({
          descripcion: '',
          titulo: '',
          mencion: ['meritoria'],
          estudiantes: [{ "nombre(s)": '', "apellido(s)": '' }],
          "director(es)": [{ "nombre(s)": '', "apellido(s)": '' }]
        });
      }
    }}
    className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl cursor-pointer order-last min-h-[200px] h-full"
  >
    <PlusIcon className="w-12 h-12 text-indigo-600 mb-2" />
    <p className="text-lg font-semibold text-indigo-600">Nuevo Trabajo de Grado</p>
  </div>

  {/* Cards de los Trabajos de Grado */}
  {getSortedPracticas().map((trabajo) => (
    <div
      key={trabajo.id}
      className="relative bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl min-h-[200px] h-full"
    >
      <h3 className="text-lg font-semibold text-gray-800">{trabajo.titulo}</h3>
      <p className="text-gray-600 mb-2">{trabajo.descripcion}</p>
      <p className="text-sm text-gray-500">
        <strong>Mención: </strong>{trabajo.mencion.join(', ')}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Estudiantes: </strong>{trabajo.estudiantes.map(est => `${est["nombre(s)"]} ${est["apellido(s)"]}`).join(', ')}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Directores: </strong>{trabajo["director(es)"].map(dir => `${dir["nombre(s)"]} ${dir["apellido(s)"]}`).join(', ')}
      </p>
      {/* Botones Editar y Eliminar */}
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <button
          onClick={() => handleEdit(trabajo)}
          className="text-indigo-600 hover:text-indigo-800 transition duration-300"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleDelete(trabajo.id)}
          className="text-red-600 hover:text-red-800 transition duration-300"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
        ))}
      </div>
    </div>
  );
}  