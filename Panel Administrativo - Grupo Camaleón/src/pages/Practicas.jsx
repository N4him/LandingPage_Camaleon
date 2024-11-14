import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,query, orderBy
} from "firebase/firestore";
import { db } from "../firebase";
import { PlusIcon,PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { BarLoader  } from "react-spinners"; // Importa el spinner

export default function Practicas() {
  const [practicas, setPracticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPracticaId, setCurrentPracticaId] = useState(null);

  const [formData, setFormData] = useState({
    profesor: { nombres: "", apellidos: "" },
    resultadoInvestigacion: "",
    tituloPractica: "",
    estudiantes: [{ nombres: "", apellidos: "" }],
  });

  useEffect(() => {
    fetchPracticas();
  }, []);

  async function fetchPracticas() {
    try {
      const querySnapshot = await getDocs(collection(db, "Practicas"));
      const practicasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPracticas(practicasData);
    } catch (err) {
      setError("Error al cargar las prácticas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && currentPracticaId) {
        // Editar práctica existente
        const practicaRef = doc(db, "Practicas", currentPracticaId);
        await updateDoc(practicaRef, formData);
        setIsEditing(false);
        setCurrentPracticaId(null);
      } else {
        // Crear nueva práctica
        await addDoc(collection(db, "Practicas"), formData);
      }
      await fetchPracticas();
      setShowForm(false);
      setFormData({
        profesor: { nombres: "", apellidos: "" },
        resultadoInvestigacion: "",
        tituloPractica: "",
        estudiantes: [{ nombres: "", apellidos: "" }],
      });
    } catch (err) {
      setError("Error al guardar la práctica");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Practicas", id));
      await fetchPracticas();
    } catch (err) {
      setError("Error al eliminar la práctica");
      console.error(err);
    }
  };

  const handleEdit = (practica) => {
    setIsEditing(true);
    setCurrentPracticaId(practica.id);
    setFormData({
      profesor: practica.profesor,
      resultadoInvestigacion: practica.resultadoInvestigacion,
      tituloPractica: practica.tituloPractica,
      estudiantes: practica.estudiantes,
    });
    setShowForm(true);
  };

  const addEstudiante = () => {
    setFormData({
      ...formData,
      estudiantes: [...formData.estudiantes, { nombres: "", apellidos: "" }],
    });
  };

  const getSortedPracticas = () => {
    return [...practicas].sort((a, b) =>
      a.tituloPractica.localeCompare(b.tituloPractica)
    );
  };
  

  if (loading)
    return (
      <div className="text-center mt-8 flex flex-col items-center">
        <BarLoader  color="#4F46E5" size={50} /> {/* Spinner */}
        <p className="mt-4 text-indigo-600 font-semibold">Cargando...</p>
      </div>
    );

  if (error)
    return <div className="text-red-600 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      

      
  
      {showForm && (
        <div className="relative bg-white p-10 rounded-xl shadow-2xl mb-10 space-y-8">
          
          {/* Botón Cancelar arriba a la derecha */}
          <button
            onClick={() => {
              setShowForm(false);
              setIsEditing(false);
              setCurrentPracticaId(null);
              setFormData({
                profesor: { nombres: "", apellidos: "" },
                resultadoInvestigacion: "",
                tituloPractica: "",
                estudiantes: [{ nombres: "", apellidos: "" }],
              });
            }}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Cancelar
          </button>
  
          {/* Contenido del formulario */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Nombres del Profesor
                </label>
                <input
                  type="text"
                  value={formData.profesor.nombres}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profesor: {
                        ...formData.profesor,
                        nombres: e.target.value,
                      },
                    })
                  }
                  className="mt-2 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Apellidos del Profesor
                </label>
                <input
                  type="text"
                  value={formData.profesor.apellidos}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profesor: {
                        ...formData.profesor,
                        apellidos: e.target.value,
                      },
                    })
                  }
                  className="mt-2 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Título de la Práctica
              </label>
              <input
                type="text"
                value={formData.tituloPractica}
                onChange={(e) =>
                  setFormData({ ...formData, tituloPractica: e.target.value })
                }
                className="mt-2 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Resultado de Investigación
              </label>
              <textarea
                value={formData.resultadoInvestigacion}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    resultadoInvestigacion: e.target.value,
                  })
                }
                className="mt-2 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                rows="4"
                required
              />
            </div>
  
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Estudiantes
                </label>
                <button
                  type="button"
                  onClick={addEstudiante}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  + Agregar Estudiante
                </button>
              </div>
              {formData.estudiantes.map((estudiante, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4"
                >
                  <input
                    type="text"
                    value={estudiante.nombres}
                    onChange={(e) => {
                      const newEstudiantes = [...formData.estudiantes];
                      newEstudiantes[index].nombres = e.target.value;
                      setFormData({ ...formData, estudiantes: newEstudiantes });
                    }}
                    placeholder="Nombres"
                    className="mt-2 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                    required
                  />
                  <input
                    type="text"
                    value={estudiante.apellidos}
                    onChange={(e) => {
                      const newEstudiantes = [...formData.estudiantes];
                      newEstudiantes[index].apellidos = e.target.value;
                      setFormData({ ...formData, estudiantes: newEstudiantes });
                    }}
                    placeholder="Apellidos"
                    className="mt-2 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                    required
                  />
                </div>
              ))}
            </div>
  
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-400"
            >
              {isEditing ? "Actualizar Práctica" : "Guardar Práctica"}
            </button>
          </form>
        </div>
      )}
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {getSortedPracticas().map((practica) => (
    <div
      key={practica.name}

      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px] flex flex-col justify-between"
    >
      <h3 className="text-lg font-semibold text-indigo-700 mb-4">
        {practica.tituloPractica}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Profesor:</strong> {practica.profesor.nombres}{" "}
        {practica.profesor.apellidos}
      </p>
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-1">
          Estudiantes:
        </h4>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {practica.estudiantes.map((estudiante, index) => (
            <li key={index}>
              {estudiante.nombres} {estudiante.apellidos}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Resultado:</strong> {practica.resultadoInvestigacion}
      </p>
      <div className="flex justify-between">
        <button
          onClick={() => handleEdit(practica)}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          <PencilIcon className="w-6 h-6 text-indigo-600 hover:text-indigo-800" />
        </button>
        <button
          onClick={() => handleDelete(practica.id)}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          <TrashIcon className="w-6 h-6 text-red-600 hover:text-red-800" />
        </button>
      </div>
    </div>
  ))}

  {/* Tarjeta para Nueva Práctica */}
  <div
    onClick={() => {
      setShowForm(true);
    }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px] flex items-center justify-center cursor-pointer"
  >
    <div className="text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-600 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
      <p className="text-indigo-600 font-semibold mt-4">Nueva Práctica</p>
    </div>
  </div>
</div>
</div>
);
}
