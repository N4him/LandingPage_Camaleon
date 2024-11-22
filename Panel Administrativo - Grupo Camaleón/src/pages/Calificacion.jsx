import React from 'react';
import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCalificaciones } from './CalificacionLogic.jsx';
import { useForm } from './hooks/useForm';

export default function Calificacion() {
  const {
    calificaciones,
    loading,
    error,
    handleAddCalificacion,
    handleEditCalificacion,
    handleDeleteCalificacion,
  } = useCalificaciones();

  const {
    formData,
    isFormVisible,
    isEditing,
    handleSubmit,
    handleFormChange,
    resetForm,
    showFormForCreate,
    showFormForEdit,
  } = useForm({ calificacion: '', masInformacion: '' });

  if (loading) return <div className="text-center mt-8">Cargando...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {isFormVisible && (
        <form
          onSubmit={handleSubmit(isEditing ? handleEditCalificacion : handleAddCalificacion)}
          className="bg-white p-8 rounded-lg shadow-xl mb-8 space-y-6 relative"
        >
          <button
            type="button"
            onClick={resetForm}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700"
          >
            Cancelar
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">Calificación</label>
            <input
              type="text"
              name="calificacion"
              value={formData.calificacion}
              onChange={handleFormChange}
              className="mt-2 block w-full rounded-lg border-2 border-gray-300 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Más Información</label>
            <input
              type="url"
              name="masInformacion"
              value={formData.masInformacion}
              onChange={handleFormChange}
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
          onClick={showFormForCreate}
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
                onClick={() => showFormForEdit(calificacion)}
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <PencilIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleDeleteCalificacion(calificacion.id)}
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
