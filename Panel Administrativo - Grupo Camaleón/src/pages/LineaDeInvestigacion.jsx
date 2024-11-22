import { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const lineasInvestigacionApi = axios.create({
  baseURL: "http://localhost:3000/lineasInvestigacion",
  withCredentials: true,
});

export default function LineaDeInvestigacion() {
    const [lineas, setLineas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [currentLineaId, setCurrentLineaId] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
    });

    useEffect(() => {
        fetchLineas();
    }, []);

    async function fetchLineas() {
        try {
            const response = await lineasInvestigacionApi.get('/');
            const lineasData = response.data.map((linea) => {
                return {
                    id: linea.id,
                    nombre: linea['Linea de Investigacion'].nombre,
                    descripcion: linea['Linea de Investigacion'].descripcion,
                };
            });
            setLineas(lineasData);
        } catch (err) {
            setError('Error al cargar las líneas de investigación');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const lineaData = {
                "Linea de Investigacion": {
                    nombre: formData.nombre,
                    descripcion: formData.descripcion,
                },
            };

            if (isEditing && currentLineaId) {
                await lineasInvestigacionApi.put(`/${currentLineaId}`, lineaData);
                setIsEditing(false);
                setCurrentLineaId(null);
            } else {
                await lineasInvestigacionApi.post('/', lineaData);
            }
            await fetchLineas();
            setShowForm(false);
        } catch (err) {
            setError('Error al guardar la línea de investigación');
            console.error(err);
        }
    };

    const handleEdit = (linea) => {
        setIsEditing(true);
        setShowForm(!showForm);
        setCurrentLineaId(linea.id);
        setFormData({
            nombre: linea.nombre,
            descripcion: linea.descripcion,
        });
    };

    const handleDelete = async (lineaId) => {
        try {
            await lineasInvestigacionApi.delete(`/${lineaId}`);
            await fetchLineas();
        } catch (err) {
            setError('Error al eliminar la línea de investigación');
            console.error(err);
        }
    };

    if (loading) return <div className="text-center mt-8">Cargando...</div>;
    if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Formulario de creación/edición */}
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

                    {/* Campos de Formulario */}
                    {['nombre', 'descripcion'].map((campo) => (
                        <div key={campo}>
                            <label className="block text-sm font-medium text-gray-700 capitalize">{campo}</label>
                            <input
                                type="text"
                                value={formData[campo]}
                                onChange={(e) => setFormData({ ...formData, [campo]: e.target.value })}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
                                required
                            />
                        </div>
                    ))}

                    {/* Botón para guardar */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                        >
                            {isEditing ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            )}

            {/* Cards para visualizar las líneas de investigación */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card para nueva línea de investigación */}
                <div
                    onClick={() => {
                        setIsEditing(false);
                        setShowForm(!showForm);
                        setFormData({ nombre: '', descripcion: '' });
                    }}
                    className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl cursor-pointer order-last min-h-[200px] h-full"
                >
                    <PlusIcon className="w-12 h-12 text-indigo-600 mb-2" />
                    <p className="text-lg font-semibold text-indigo-600">Nueva línea de investigación</p>
                </div>

                {/* Card para cada línea de investigación */}
                {lineas.map((linea) => (
                    <div
                        key={linea.id}
                        className="relative bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl min-h-[200px] h-full"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{linea.nombre}</h3>
                        <p className="text-gray-600 mb-2">{linea.descripcion}</p>
                        {/* Botones para editar y eliminar */}
                        <div className="absolute bottom-4 right-4 flex space-x-4">
                            <button onClick={() => handleEdit(linea)} className="text-gray-500 hover:text-indigo-600">
                                <PencilIcon className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => handleDelete(linea.id)}
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

