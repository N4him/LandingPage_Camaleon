import { useState, useEffect } from "react";
import axios from "axios";

const practicasApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/practicas`
    : "http://localhost:3000/practicas",
  withCredentials: true,
});

export default function usePracticas() {
  const [practicas, setPracticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPracticaId, setCurrentPracticaId] = useState(null);
  const [formData, setFormData] = useState({
    profesor: [{ nombres: "", apellidos: "" }], // Múltiples profesores permitidos
    resultadoInvestigacion: "",
    tituloPractica: "",
    estudiante: { nombres: "", apellidos: "" }, // Solo un estudiante
  });

  useEffect(() => {
    fetchPracticas();
  }, []);

  const fetchPracticas = async () => {
    try {
      const response = await practicasApi.get("/");
      const practicasData = response.data.map((item) => ({
        id: item.id,
        ...item.practica,
      }));
      setPracticas(practicasData);
    } catch (err) {
      setError("Error al cargar las prácticas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        practica: {
          profesor: formData.profesor,
          resultadoInvestigacion: formData.resultadoInvestigacion,
          tituloPractica: formData.tituloPractica,
          estudiante: formData.estudiante, // Solo un estudiante
        },
      };

      // Validar los datos del formulario
      if (!formData.tituloPractica || formData.profesor.some(prof => !prof.nombres || !prof.apellidos)) {
        setError("Por favor complete todos los campos obligatorios");
        return;
      }

      if (isEditing && currentPracticaId) {
        // PUT request para actualizar la práctica existente
        await practicasApi.put(`/${currentPracticaId}`, dataToSend);
        setIsEditing(false);
        setCurrentPracticaId(null);
      } else {
        // POST request para crear una nueva práctica
        await practicasApi.post("/", dataToSend);
      }

      // Obtener la lista actualizada de prácticas
      await fetchPracticas();
      setShowForm(false);
      resetFormData();
    } catch (err) {
      setError("Error al guardar la práctica");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      setError("ID de práctica inválido");
      return;
    }

    try {
      await practicasApi.delete(`/${id}`);
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
      estudiante: practica.estudiante,
    });
    setShowForm(true);
  };

  const addProfesor = () => {
    setFormData((prevData) => ({
      ...prevData,
      profesor: [...prevData.profesor, { nombres: "", apellidos: "" }],
    }));
  };

  const getSortedPracticas = () => {
    return [...practicas].sort((a, b) =>
      a.tituloPractica.localeCompare(b.tituloPractica)
    );
  };

  const resetFormData = () => {
    setFormData({
      profesor: [{ nombres: "", apellidos: "" }],
      resultadoInvestigacion: "",
      tituloPractica: "",
      estudiante: { nombres: "", apellidos: "" },
    });
  };

  return {
    practicas,
    loading,
    error,
    showForm,
    isEditing,
    currentPracticaId,
    formData,
    setFormData,
    setShowForm,
    handleSubmit,
    handleDelete,
    handleEdit,
    addProfesor,
    getSortedPracticas,
  };
}
