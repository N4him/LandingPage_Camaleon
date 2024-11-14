import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon,PencilIcon, TrashIcon } from '@heroicons/react/24/outline';


export default function MiembrosGrupo() {
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMiembroId, setCurrentMiembroId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    rol: '',
    foto: null,
    linea_de_investigacion: '', // Nuevo campo
    cvlac: '', // Nuevo campo para el CVLAC
  });

  useEffect(() => {
    fetchMiembros();
  }, []);

  async function fetchMiembros() {
    try {
      const querySnapshot = await getDocs(collection(db, 'Miembros del Grupo'));
      const miembrosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMiembros(miembrosData);
    } catch (err) {
      setError('Error al cargar los miembros del grupo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoURL = formData.foto; // Si no se selecciona una nueva foto, se usa la foto actual

    if (formData.foto && formData.foto instanceof File) { // Si hay una nueva foto
      try {
        const uniqueFileName = `${uuidv4()}-${formData.foto.name}`;
        const storageRef = ref(storage, `fotos/${uniqueFileName}`);
        const metadata = { contentType: formData.foto.type };
        const snapshot = await uploadBytes(storageRef, formData.foto, metadata);
        photoURL = await getDownloadURL(snapshot.ref);
      } catch (err) {
        setError('Error al subir la foto');
        console.error(err);
        return;
      }
    }

    try {
      if (isEditing && currentMiembroId) {
        const miembroRef = doc(db, 'Miembros del Grupo', currentMiembroId);
        await updateDoc(miembroRef, {
          ...formData,
          foto: photoURL, // Usamos la foto actualizada o la original si no hay nueva
        });
        setIsEditing(false);
        setCurrentMiembroId(null);
      } else {
        await addDoc(collection(db, 'Miembros del Grupo'), {
          ...formData,
          foto: photoURL,
        });
      }
      await fetchMiembros();
      setShowForm(false);
      resetForm();
    } catch (err) {
      setError('Error al guardar el miembro');
      console.error(err);
    }
  };

  const handleDelete = async (id, photoURL) => {
    try {
      await deleteDoc(doc(db, 'Miembros del Grupo', id));
      if (photoURL) {
        const photoRef = ref(storage, photoURL);
        await deleteObject(photoRef);
      }
      await fetchMiembros();
    } catch (err) {
      setError('Error al eliminar el miembro');
      console.error(err);
    }
  };

  const handleEdit = (miembro) => {
    setIsEditing(true);
    setCurrentMiembroId(miembro.id);
    setFormData({
      nombre: miembro.nombre,
      apellidos: miembro.apellidos,
      rol: miembro.rol,
      foto: miembro.foto || null, // Mantener la foto actual
      linea_de_investigacion: miembro.linea_de_investigacion || '',
      cvlac: miembro.cvlac || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      apellidos: '',
      rol: '',
      foto: null,
      linea_de_investigacion: '',
      cvlac: '',
    });
  };

  if (loading) return <div className="text-center mt-8">Cargando...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 

  {showForm && (
    <form onSubmit={handleSubmit} className="relative bg-white p-8 rounded-lg shadow-xl mb-8 space-y-6">
      {/* Botón Cancelar en la esquina superior derecha */}
      <button
        type="button"
        onClick={() => setShowForm(false)}
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Cancelar
      </button>

      {/* Formulario de creación/edición */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="mt-2 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellidos</label>
          <input
            type="text"
            value={formData.apellidos}
            onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
            className="mt-2 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rol en el Grupo</label>
        <input
          type="text"
          value={formData.rol}
          onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
          className="mt-2 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Línea de Investigación</label>
        <input
          type="text"
          value={formData.linea_de_investigacion}
          onChange={(e) => setFormData({ ...formData, linea_de_investigacion: e.target.value })}
          className="mt-2 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CVLAC (Link)</label>
        <input
          type="url"
          value={formData.cvlac}
          onChange={(e) => setFormData({ ...formData, cvlac: e.target.value })}
          className="mt-2 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Foto</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, foto: e.target.files[0] })}
          className="mt-2 block w-full rounded-lg border-2 border-gray-300 shadow-sm"
        />
        {formData.foto && (
          <div className="mt-2 text-sm text-gray-600">{formData.foto.name}</div>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isEditing ? 'Actualizar' : 'Crear'} Miembro
        </button>
      </div>
    </form>
  )}

  <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
      {/* Tarjeta para Nuevo Miembro */}
      <div
        onClick={() => {
          setShowForm(!showForm);
          if (showForm) {
            resetForm();
          }
        }}
        className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 cursor-pointer min-h-[250px] transition hover:shadow-xl order-last"
      >
        <PlusIcon className="w-12 h-12 text-indigo-600 mb-4" />
        <p className="text-lg font-semibold text-indigo-600">Nuevo Miembro</p>
      </div>

      {miembros.map((miembro) => (
        <div
          key={miembro.id}
          className="relative bg-white rounded-lg shadow-lg p-6 min-h-[250px]"
        >
          <div className="flex justify-center mb-4">
            {miembro.foto ? (
              <img src={miembro.foto} alt="Foto de Miembro" className="w-24 h-24 rounded-full" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300"></div>
            )}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">{miembro.nombre} {miembro.apellidos}</h3>
            <p className="text-gray-600">{miembro.rol}</p>
            <p className="text-gray-600">Línea de Investigación: {miembro.linea_de_investigacion}</p>
            {miembro.cvlac && (
              <p className="text-sm text-blue-600">
                <a href={miembro.cvlac} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Ver CVLAC
                </a>
              </p>
            )}
          </div>
          {/* Botones con iconos */}
          <div className="absolute bottom-4 right-4 flex space-x-4">
            <button
              onClick={() => handleEdit(miembro)}
              className="text-blue-500 hover:text-blue-700 transition"
            >
              <PencilIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleDelete(miembro.id, miembro.foto)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
  
}  
