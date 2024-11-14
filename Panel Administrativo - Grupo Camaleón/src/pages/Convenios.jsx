import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Convenios() {
    const [convenios, setConvenios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [currentConvenioId, setCurrentConvenioId] = useState(null);
    const [formData, setFormData] = useState({
        institucion: '',
        objetivos: [],
        resultados: [],
    });

    useEffect(() => {
        fetchConvenios();
    }, []);

    async function fetchConvenios() {
        try {
            const querySnapshot = await getDocs(collection(db, 'Convenios y Alianzas'));
            const conveniosData = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    institucion: data.institucion || '',
                    objetivos: data.objetivos || [],
                    resultados: data.resultados || [],
                };
            });
            setConvenios(conveniosData);
        } catch (err) {
            setError('Error al cargar los convenios');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const convenioData = {
                institucion: formData.institucion,
                objetivos: formData.objetivos,
                resultados: formData.resultados,
            };

            if (isEditing && currentConvenioId) {
                const convenioRef = doc(db, 'Convenios y Alianzas', currentConvenioId);
                await updateDoc(convenioRef, convenioData);
                setIsEditing(false);
                setCurrentConvenioId(null);
            } else {
                await addDoc(collection(db, 'Convenios y Alianzas'), convenioData);
            }
            await fetchConvenios();
            setShowForm(false);
        } catch (err) {
            setError('Error al guardar el convenio');
            console.error(err);
        }
    };

    const handleEdit = (convenio) => {
        setIsEditing(true);
        setShowForm(!showForm);
        setCurrentConvenioId(convenio.id);
        setFormData({
            institucion: convenio.institucion,
            objetivos: convenio.objetivos,
            resultados: convenio.resultados,
        });
    };

    const handleDelete = async (convenioId) => {
        try {
            const convenioRef = doc(db, 'Convenios y Alianzas', convenioId);
            await deleteDoc(convenioRef);
            await fetchConvenios();
        } catch (err) {
            setError('Error al eliminar el convenio');
            console.error(err);
        }
    };

    const handleArrayChange = (arrayKey, index, value) => {
        const updatedArray = formData[arrayKey].map((item, i) =>
            i === index ? value : item
        );
        setFormData({ ...formData, [arrayKey]: updatedArray });
    };

    const addArrayItem = (arrayKey) => {
        setFormData({ ...formData, [arrayKey]: [...formData[arrayKey], ''] });
    };

    const removeArrayItem = (arrayKey, index) => {
        const updatedArray = formData[arrayKey].filter((_, i) => i !== index);
        setFormData({ ...formData, [arrayKey]: updatedArray });
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Institución</label>
                        <input
                            type="text"
                            value={formData.institucion}
                            onChange={(e) => setFormData({ ...formData, institucion: e.target.value })}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
                            required
                        />
                    </div>

                    {/* Campos Dinámicos para Objetivos y Resultados */}
                    {['objetivos', 'resultados'].map((arrayKey) => (
                        <div key={arrayKey}>
                            <h3 className="font-semibold text-lg text-center capitalize">{arrayKey}</h3>
                            {formData[arrayKey].map((item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder={`Nuevo ${arrayKey.slice(0, -1)}`}
                                        value={item}
                                        onChange={(e) => handleArrayChange(arrayKey, index, e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem(arrayKey, index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <TrashIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem(arrayKey)}
                                className="flex items-center mt-2 text-blue-500 hover:text-blue-700"
                            >
                                <PlusIcon className="w-6 h-6 mr-1" />
                                Agregar {arrayKey.slice(0, -1)}
                            </button>
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

            {/* Cards para visualizar los convenios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card para nuevo convenio */}
                <div
                    onClick={() => {
                        setIsEditing(false);
                        setShowForm(!showForm);
                        setFormData({
                            institucion: '',
                            objetivos: [''],
                            resultados: [''],
                        });
                    }}
                    className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl cursor-pointer order-last min-h-[200px] h-full"
                >
                    <PlusIcon className="w-12 h-12 text-indigo-600 mb-2" />
                    <p className="text-lg font-semibold text-indigo-600">Nuevo convenio</p>
                </div>

                {/* Card para cada convenio */}
                {convenios.map((convenio) => (
                    <div
                        key={convenio.id}
                        className="relative bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl min-h-[200px] h-full"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{convenio.institucion}</h3>
                        <p className="text-sm text-gray-500">
                            <strong>Objetivos:</strong>
                            {convenio.objetivos.map((objetivo, index) => (
                                <span key={index}>
                                    - {objetivo}
                                    <br />
                                </span>
                            ))}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Resultados:</strong>
                            {convenio.resultados.map((resultado, index) => (
                                <span key={index}>
                                    - {resultado}
                                    <br />
                                </span>
                            ))}
                        </p>

                        {/* Botones para editar y eliminar */}
                        <div className="absolute bottom-4 right-4 flex space-x-4">
                            <button onClick={() => handleEdit(convenio)} className="text-gray-500 hover:text-indigo-600">
                                <PencilIcon className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => handleDelete(convenio.id)}
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
