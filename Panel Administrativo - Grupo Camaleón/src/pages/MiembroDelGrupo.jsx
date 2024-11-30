import React, { useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import useMiembrosGrupo from '../pages/MiembrosGrupoLogic';
import '../styles/MiembrosGrupoInterface.css';  // Ruta relativa si está en la subcarpeta 'styles'

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
      setFormData((prevState) => ({
        ...prevState,
        foto: formData.foto || prevState.foto,
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
    <div className="container">
      {/* Formulario de creación/edición */}
      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          {/* Botón Cancelar en la esquina superior derecha, solo si no es edición */}
          {!isEditing && (
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm(); // Reseteamos el formulario cuando se cancela
              }}
              className="cancel-btn"
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
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Apellidos</label>
              <input
                type="text"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className="form-input"
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
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Línea de Investigación</label>
            <input
              type="text"
              value={formData.linea_de_investigacion}
              onChange={(e) => setFormData({ ...formData, linea_de_investigacion: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">CVLAC (Link)</label>
            <input
              type="url"
              value={formData.cvlac}
              onChange={(e) => setFormData({ ...formData, cvlac: e.target.value })}
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange} // Usamos la función manejadora para actualizar solo si hay una nueva foto
              className="form-input"
            />
            {formData.foto && (
              <div className="mt-2 text-sm text-gray-600">{formData.foto.name}</div>
            )}
          </div>

          <div>
            <button type="submit" className="form-submit-btn">
              {isEditing ? 'Actualizar miembro' : 'Crear miembro'}
            </button>
          </div>
        </form>
      )}

      {/* Lista de miembros */}
      <div className="grid-container">
        {miembros.map((miembro) => (
          <div key={miembro.id} className="member-card">
            <div className="member-photo">
              {miembro.foto ? (
                <img
                  src={miembro.foto} // Este es el enlace de la foto del miembro
                  alt="Foto de miembro"
                  className="rounded-full"
                />
              ) : (
                <div className="placeholder"></div>
              )}
            </div>
            <div className="member-details">
              <h3>{miembro.nombre_completo} {miembro.apellidos}</h3> {/* Aquí mostramos los apellidos junto al nombre */}
              <p>{miembro.rol}</p>
              <p><strong>Línea de Investigación:</strong> {miembro.linea_de_investigacion}</p>
              <p><strong>CVLAC:</strong> <a href={miembro.cvlac} target="_blank" rel="noopener noreferrer" className="form-input-link">Ver CVLAC</a></p>
            </div>
            <div className="member-actions">
              <button onClick={() => handleEdit(miembro)} title="Editar">
                <PencilIcon className="h-5 w-5 text-blue-600" />
              </button>
              <button onClick={() => handleDelete(miembro)} title="Eliminar">
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}
        {/* Opción para agregar nuevo miembro */}
        <div className="new-member-card" onClick={() => setShowForm(true)}>
          <PlusIcon className="h-10 w-10 text-gray-600" />
          <p>Nuevo Miembro</p>
        </div>
      </div>
    </div>
  );
}