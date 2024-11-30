import React, { useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import useMiembrosGrupo from '../pages/MiembrosGrupoLogic';

export default function MiembrosGrupoInterface() {
  const {
    miembros,
    loading,
    error,
    showForm,
    setShowForm,
    formData,
    setFormData,
    isEditing,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm, // Asumiendo que se ha creado una función resetForm en useMiembrosGrupo
  } = useMiembrosGrupo();

  // Reseteamos la foto solo cuando el formulario se vuelve a abrir para edición
  useEffect(() => {
    if (isEditing && formData.foto === undefined) {
      // Si estamos en edición y no se ha seleccionado una foto nueva, mantén la foto existente
      setFormData((prevState) => ({
        ...prevState,
        foto: formData.foto || prevState.foto, // Usa la foto existente si no se carga una nueva
      }));
    }
  }, [isEditing, formData.foto, setFormData]);

  if (loading) return <div className="text-center mt-8">Cargando...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, foto: file });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Formulario de creación/edición */}
      {showForm && (
        <form onSubmit={handleSubmit} className="relative bg-white p-8 rounded-lg shadow-xl mb-8 space-y-6">
          {/* Botón Cancelar en la esquina superior derecha, solo si no es edición */}
          {!isEditing && (
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm(); // Reseteamos el formulario cuando se cancela
              }}
              className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Cancelar
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={formData.nombre_completo}
                onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
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
              className="mt-2 block w-full rounded-lg border-2 border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange} // Usamos la función manejadora para actualizar solo si hay una nueva foto
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

      {/* Vista de los miembros */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {/* Tarjeta para Nuevo Miembro */}
          <div
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) resetForm(); // Resetear formulario si se cierra el modal
            }}
            className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 cursor-pointer min-h-[250px] transition hover:shadow-xl order-last"
          >
            <PlusIcon className="w-12 h-12 text-indigo-600 mb-4" />
            <p className="text-lg font-semibold text-indigo-600">Nuevo Miembro</p>
          </div>

          {/* Miembros listados */}
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
                <h3 className="text-xl font-bold text-gray-800">{miembro.nombre_completo}</h3>
                <p className="text-gray-600">{miembro.apellidos}</p>
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
              {/* Botones de edición y eliminación */}
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
