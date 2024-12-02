import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { BarLoader } from "react-spinners";
import usePracticas from './PracticasLogic';

export default function Practicas() {
  const {
    practicas,
    loading,
    error,
    showForm,
    isEditing,
    formData,
    setFormData,
    setShowForm,
    handleSubmit,
    handleDelete,
    handleEdit,
    addProfesor,
    getSortedPracticas
  } = usePracticas();

  if (loading)
    return (
      <div className="text-center mt-8 flex flex-col items-center">
        <BarLoader color="#4F46E5" size={50} />
        <p className="mt-4 text-indigo-600 font-semibold">Cargando...</p>
      </div>
    );

  if (error)
    return <div className="text-red-600 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {showForm && (
        <div className="relative bg-white p-10 rounded-xl shadow-2xl mb-10 space-y-8">
          <button
            onClick={() => {
              setShowForm(false);
              setFormData({
                estudiante: { nombres: "", apellidos: "" }, // Renombrado a 'estudiante'
                resultadoInvestigacion: "",
                tituloPractica: "",
                profesor: [{ nombres: "", apellidos: "" }],
              });
            }}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Cancelar
          </button>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Nombres del Estudiante
                </label>
                <input
                  type="text"
                  value={formData.estudiante.nombres} // Ajustado para 'estudiante'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estudiante: { 
                        ...formData.estudiante, 
                        nombres: e.target.value 
                      },
                    })
                  }
                  className="mt-2 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Apellidos del Estudiante
                </label>
                <input
                  type="text"
                  value={formData.estudiante.apellidos} // Ajustado para 'estudiante'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estudiante: { 
                        ...formData.estudiante, 
                        apellidos: e.target.value 
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
                  Profesores
                </label>
                <button
                  type="button"
                  onClick={addProfesor}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  + Agregar Profesor
                </button>
              </div>
              {formData.profesor.map((profesor, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <input
                    type="text"
                    value={profesor.nombres}
                    onChange={(e) => {
                      const newProfesor = [...formData.profesor];
                      newProfesor[index].nombres = e.target.value;
                      setFormData({ ...formData, profesor: newProfesor });
                    }}
                    placeholder="Nombres"
                    className="mt-2 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                    required
                  />
                  <input
                    type="text"
                    value={profesor.apellidos}
                    onChange={(e) => {
                      const newProfesor = [...formData.profesor];
                      newProfesor[index].apellidos = e.target.value;
                      setFormData({ ...formData, profesor: newProfesor });
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
            key={practica.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px] flex flex-col justify-between"
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">
              {practica.tituloPractica}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Estudiante:</strong> {practica.estudiante.nombres}{" "}
              {practica.estudiante.apellidos}
            </p>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                Profesores:
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {practica.profesor.map((prof, idx) => (
                  <li key={idx}>
                    {prof.nombres} {prof.apellidos}
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
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-indigo-600 font-semibold">Agregar Práctica</p>
          </div>
        </div>
      </div>
    </div>
  );
}
