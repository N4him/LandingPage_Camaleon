import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function ProyectoInvestigacion() {
    const [proyectos, setProyectos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [currentProyectoId, setCurrentProyectoId] = useState(null);
    const [formData, setFormData] = useState({
        docentesDirectores: [],
        estudiantes: [],
        objetivo: '',
        produccionAcademica: '',
        profesionales: [],
        titulo: '',
        resultado: '',
    });

    useEffect(() => {
        fetchProyectos();
    }, []);

    async function fetchProyectos() {
        try {
            const querySnapshot = await getDocs(collection(db, 'Proyectos de Investigacion'));
            const proyectosData = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    docentesDirectores: data.docentes_directores || [],
                    estudiantes: data.estudiantes || [],
                    objetivo: data.objetivo || '',
                    produccionAcademica: data.produccion_academica || '',
                    profesionales: data.profesionales || [],
                    titulo: data.titulo || '',
                    resultado: data.resultado || '',
                };
            });
            setProyectos(proyectosData);
        } catch (err) {
            setError('Error al cargar los proyectos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const proyectoData = {
                docentes_directores: formData.docentesDirectores,
                estudiantes: formData.estudiantes,
                objetivo: formData.objetivo,
                produccion_academica: formData.produccionAcademica,
                profesionales: formData.profesionales,
                titulo: formData.titulo,
                resultado: formData.resultado,
            };

            if (isEditing && currentProyectoId) {
                const proyectoRef = doc(db, 'Proyectos de Investigacion', currentProyectoId);
                await updateDoc(proyectoRef, proyectoData);
                setIsEditing(false);
                setCurrentProyectoId(null);
            } else {
                await addDoc(collection(db, 'Proyectos de Investigacion'), proyectoData);
            }
            await fetchProyectos();
            setShowForm(false)
        } catch (err) {
            setError('Error al guardar el proyecto');
            console.error(err);
        }
    };

    const handleEdit = (proyecto) => {
        setIsEditing(true);
        setShowForm(!showForm);
        setCurrentProyectoId(proyecto.id);
        setFormData({
            docentesDirectores: proyecto.docentesDirectores,
            estudiantes: proyecto.estudiantes,
            objetivo: proyecto.objetivo,
            produccionAcademica: proyecto.produccionAcademica,
            profesionales: proyecto.profesionales,
            titulo: proyecto.titulo,
            resultado: proyecto.resultado,
        });
    };

    const handleDelete = async (proyectoId) => {
        try {
            const proyectoRef = doc(db, 'Proyectos de Investigacion', proyectoId);
            await deleteDoc(proyectoRef);
            await fetchProyectos();
        } catch (err) {
            setError('Error al eliminar el proyecto');
            console.error(err);
        }
    };

    const handleArrayChange = (arrayKey, index, field, value) => {
        const updatedArray = formData[arrayKey].map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setFormData({ ...formData, [arrayKey]: updatedArray });
    };

    const addArrayItem = (arrayKey) => {
        setFormData({ ...formData, [arrayKey]: [...formData[arrayKey], { nombre: '', apellido: '', titulo: '', resultado: '' }] });
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
                    {['objetivo', 'titulo', 'resultado', 'produccionAcademica'].map((campo) => (
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

                    {/* Campos Dinámicos */}
                    {['docentesDirectores', 'estudiantes', 'profesionales'].map((arrayKey) => (
                        <div key={arrayKey}>
                            <h3 className="font-semibold text-lg text-center capitalize">{arrayKey}</h3>
                            {formData[arrayKey].map((item, index) => (
                                <div key={index} className="flex flex-col space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            placeholder="Nombre"
                                            value={item.nombre}
                                            onChange={(e) => handleArrayChange(arrayKey, index, 'nombre', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Apellido"
                                            value={item.apellido}
                                            onChange={(e) => handleArrayChange(arrayKey, index, 'apellido', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
                                        />
                                        {arrayKey === 'profesionales' && (
                                            <input
                                                type="text"
                                                placeholder="Título"
                                                value={item.titulo}
                                                onChange={(e) => handleArrayChange(arrayKey, index, 'titulo', e.target.value)}
                                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-4"
                                            />
                                        )}
                                        <button type="button" onClick={() => removeArrayItem(arrayKey, index)} className="text-red-500 hover:text-red-700">
                                            <TrashIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={() => addArrayItem(arrayKey)} className="flex items-center mt-2 text-blue-500 hover:text-blue-700">
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

            {/* Cards para visualizar los proyectos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card para nuevo proyecto */}
                <div
                    onClick={() => {
                        setIsEditing(false);
                        setShowForm(!showForm);
                        setFormData({
                            objetivo: '',
                            titulo: '',
                            resultado: '',
                            produccionAcademica: '',
                            docentesDirectores: [{ nombre: '', apellido: '' }],
                            estudiantes: [{ nombre: '', apellido: '' }],
                            profesionales: [{ nombre: '', apellido: '', titulo: '' }]
                        });

                    }}
                    className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl cursor-pointer order-last min-h-[200px] h-full"
                >
                    <PlusIcon className="w-12 h-12 text-indigo-600 mb-2" />
                    <p className="text-lg font-semibold text-indigo-600">Nuevo proyecto</p>
                </div>

                {/* Card para cada proyecto */}
                {proyectos.map((proyecto) => (
                    <div
                        key={proyecto.id}
                        className="relative bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl min-h-[200px] h-full"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{proyecto.titulo}</h3>
                        <p className="text-gray-600 mb-2">{proyecto.objetivo}</p>
                        <p className="text-sm text-gray-500">
                            <strong>Docentes/Directores:</strong>
                            {proyecto.docentesDirectores.map((dir, index) => (
                                <span key={index}>
                                    - {dir.nombre} {dir.apellido}
                                    <br />
                                </span>
                            ))}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Estudiantes:</strong>
                            {proyecto.estudiantes.map((est, index) => (
                                <span key={index}>
                                    - {est.nombre} {est.apellido}
                                    <br />
                                </span>
                            ))}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Profesionales:</strong>
                            {proyecto.profesionales.map((prof, index) => (
                                <span key={index}>
                                    - {prof.nombre} {prof.apellido}
                                    <br />
                                </span>
                            ))}
                        </p>

                        <p className="text-sm text-gray-500">
                            <strong>Resultados: </strong>{proyecto.resultado}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Porducción Academica: </strong>{proyecto.produccion_academica}
                        </p>
                        {/* Botones para editar y eliminar */}
                        <div className="absolute bottom-4 right-4 flex space-x-4">
                            <button onClick={() => handleEdit(proyecto)} className="text-gray-500 hover:text-indigo-600">
                                <PencilIcon className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => handleDelete(proyecto.id)}
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
