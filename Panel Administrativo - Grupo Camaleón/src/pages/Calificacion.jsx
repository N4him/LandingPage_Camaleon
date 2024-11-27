import { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { getAllCalificacionesGrupo, updateCalificacionGrupo } from '../api/apis';

export default function Calificacion() {
    const [calificaciones, setCalificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCalificacionId, setCurrentCalificacionId] = useState(null);
    const [formData, setFormData] = useState({
        calificacion: '', // Asegúrate de que sea un string vacío
        masInformacion: '', // Asegúrate de que sea un string vacío
    });

    useEffect(() => {
        fetchCalificaciones();
    }, []);

    async function fetchCalificaciones() {
        try {
            const response = await getAllCalificacionesGrupo();
            // Asegúrate de acceder a los valores correctamente en la respuesta
            setCalificaciones(response.data.map(cal => ({
                id: cal.id,
                calificacion: cal.calificacion.calificacion, // Accede a "calificacion" directamente
                masInformacion: cal.calificacion.masInformacion // Accede a "masInformacion" directamente
            })));
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
                // Aquí estamos asegurándonos de que los datos que envías coincidan con lo que espera el backend
                const updatedCalificacion = {
                    calificacion: {
                        calificacion: formData.calificacion,  // Valor de la calificación
                        masInformacion: formData.masInformacion  // URL
                    }
                };

                // Llamada a la API para actualizar la calificación en el backend
                await updateCalificacionGrupo(currentCalificacionId, updatedCalificacion);

                // Cerrar la edición y limpiar el estado
                setIsEditing(false);
                setCurrentCalificacionId(null);
                setFormData({ calificacion: '', masInformacion: '' }); // Limpiar el formulario
            }

            // Recargar las calificaciones después de la actualización
            await fetchCalificaciones();
        } catch (err) {
            setError('Error al guardar la calificación');
            console.error(err);
        }
    };

    const handleEdit = (calificacion) => {
        setIsEditing(true);
        setCurrentCalificacionId(calificacion.id);
        setFormData({
            calificacion: calificacion.calificacion || '', // Asegúrate de que sea un string
            masInformacion: calificacion.masInformacion || '', // Asegúrate de que sea un string
        });
    };

    if (loading) return <div className="text-center mt-8">Cargando...</div>;
    if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isEditing && (
                <form onSubmit={handleSubmit} className="relative bg-white p-8 rounded-lg shadow-xl mb-8 space-y-6">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Cancelar
                    </button>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Calificación</label>
                        <input
                            type="text"
                            value={formData.calificacion} // Aquí es donde ya es un string
                            onChange={(e) => setFormData({ ...formData, calificacion: e.target.value })}
                            className="mt-2 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Más Información</label>
                        <input
                            type="url"
                            value={formData.masInformacion} // Esto también es un string
                            onChange={(e) => setFormData({ ...formData, masInformacion: e.target.value })}
                            className="mt-2 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Actualizar Calificación
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                {calificaciones.map((calificacion) => (
                    <div
                        key={calificacion.id}
                        className="relative bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl min-h-[200px] h-full"
                    >
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-800">Calificación: {calificacion.calificacion}</h3>
                            <p className="text-sm text-blue-600">
                                <a href={calificacion.masInformacion} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    Más Información
                                </a>
                            </p>
                        </div>
                        {/* Botón para editar */}
                        <div className="absolute bottom-4 right-4 flex space-x-4">
                            <button
                                onClick={() => handleEdit(calificacion)}
                                className="text-blue-500 hover:text-blue-700 transition"
                            >
                                <PencilIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
