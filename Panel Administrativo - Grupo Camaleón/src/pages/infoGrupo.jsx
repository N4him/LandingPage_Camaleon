import { useState, useEffect } from 'react';
import axios from 'axios'; // Usamos axios para las solicitudes HTTP
import { PencilIcon } from '@heroicons/react/24/outline';
import { getGrupoInfo, updateGrupoInfo } from '../api/apis';

export default function infoGrupo() {
    const [grupoInfo, setGrupoInfo] = useState(null);  // Ahora el estado se inicializa como null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        caracteristicas: [],
        presentacion: [],
    });
    const [grupoId, setGrupoId] = useState(null); // Estado para guardar el grupoId

    useEffect(() => {
        fetchGrupoInfo();
    }, []);

    // Fetch información del grupo desde el backend
    async function fetchGrupoInfo() {
        try {
            const response = await getGrupoInfo();
            const grupo = response.data[0];  // Accedemos al primer elemento del arreglo
            // Guardamos el grupoId
            setGrupoId(grupo.id); // Aquí guardamos el ID del grupo
            setGrupoInfo(grupo);
            setFormData({
                caracteristicas: grupo.caracteristicas || [],
                presentacion: grupo.presentacion || [],
            });
        } catch (err) {
            setError('Error al cargar la información del grupo');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // Enviar actualización al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Estructura de datos que coincide con lo que espera el backend
                const updatedInfo = {
                    caracteristicas: formData.caracteristicas,
                    presentacion: formData.presentacion,
                };

                // Usar el ID del grupo y la función para actualizar
                await updateGrupoInfo(grupoId, updatedInfo);
                setIsEditing(false);
                await fetchGrupoInfo();  // Recargar la información actualizada
            }
        } catch (err) {
            setError('Error al guardar la información');
            console.error(err);
        }
    };


    // Habilitar el modo de edición para el grupo
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Función para manejar los cambios en las características
    const handleCaracteristicasChange = (index, field, value) => {
        const updatedCaracteristicas = [...formData.caracteristicas];
        updatedCaracteristicas[index] = {
            ...updatedCaracteristicas[index],
            [field]: value,
        };
        setFormData({ ...formData, caracteristicas: updatedCaracteristicas });
    };

    // Función para agregar una nueva característica
    const handleAddCaracteristica = () => {
        setFormData({
            ...formData,
            caracteristicas: [...formData.caracteristicas, { nombre: '', descripcion: '' }],
        });
    };

    // Función para eliminar una característica
    const handleDeleteCaracteristica = (index) => {
        const updatedCaracteristicas = formData.caracteristicas.filter((_, i) => i !== index);
        setFormData({ ...formData, caracteristicas: updatedCaracteristicas });
    };

    // Función para manejar los cambios en la presentación
    const handlePresentacionChange = (index, value) => {
        const updatedPresentacion = [...formData.presentacion];
        updatedPresentacion[index] = value;
        setFormData({ ...formData, presentacion: updatedPresentacion });
    };

    // Función para agregar una nueva presentación
    const handleAddPresentacion = () => {
        setFormData({
            ...formData,
            presentacion: [...formData.presentacion, ''],
        });
    };

    // Función para eliminar una presentación
    const handleDeletePresentacion = (index) => {
        const updatedPresentacion = formData.presentacion.filter((_, i) => i !== index);
        setFormData({ ...formData, presentacion: updatedPresentacion });
    };

    if (loading) return <div className="text-center mt-8">Cargando...</div>;
    if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

    // Aseguramos que grupoInfo no sea null antes de intentar acceder a sus propiedades
    if (!grupoInfo) return <div className="text-center mt-8">No se encontró información del grupo.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isEditing ? (
                <form onSubmit={handleSubmit} className="relative bg-white p-8 rounded-lg shadow-xl mb-8 space-y-6">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Cancelar
                    </button>

                    {/* Presentación */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Presentación</label>
                        {formData.presentacion.map((texto, index) => (
                            <div key={index} className="flex space-x-4 mb-4">
                                <textarea
                                    value={texto}
                                    onChange={(e) => handlePresentacionChange(index, e.target.value)}
                                    placeholder="Texto de Presentación"
                                    className="mt-2 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeletePresentacion(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddPresentacion}
                            className="text-blue-500 hover:text-blue-700 transition"
                        >
                            Agregar Presentación
                        </button>
                    </div>

                    {/* Características */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Características</label>
                        {formData.caracteristicas.map((caracteristica, index) => (
                            <div key={index} className="flex space-x-4 mb-4">
                                <input
                                    type="text"
                                    value={caracteristica.nombre}
                                    onChange={(e) => handleCaracteristicasChange(index, 'nombre', e.target.value)}
                                    placeholder="Nombre"
                                    className="mt-2 block w-1/2 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                />
                                <input
                                    type="text"
                                    value={caracteristica.descripcion}
                                    onChange={(e) => handleCaracteristicasChange(index, 'descripcion', e.target.value)}
                                    placeholder="Descripción"
                                    className="mt-2 block w-1/2 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteCaracteristica(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddCaracteristica}
                            className="text-blue-500 hover:text-blue-700 transition"
                        >
                            Agregar Característica
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-xl mb-8 relative"> {/* Agregamos "relative" aquí */}
                    <button
                        onClick={handleEdit}

                        className="text-gray-500 hover:text-indigo-600 absolute top-4 right-4"
                    >
                        <PencilIcon className="w-6 h-6" />
                    </button>

                    <div className="mt-4">
                        <h3 className="text-xl font-medium text-gray-700">Presentación</h3>
                        <ul className="mt-2">
                            {grupoInfo.presentacion.map((texto, index) => (
                                <li key={index} className="text-gray-600">
                                    {texto}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-xl font-medium text-gray-700">Características</h3>
                        <ul className="mt-2 space-y-2">
                            {grupoInfo.caracteristicas.map((caracteristica, index) => (
                                <li key={index} className="text-gray-600">
                                    <strong>{caracteristica.nombre}:</strong> {caracteristica.descripcion}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            )}
        </div>
    );
}
