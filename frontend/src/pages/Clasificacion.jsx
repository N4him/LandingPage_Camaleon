import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';
import '../assets/styles/clasificacion.css'; 

const calificacionGrupoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/calificacionGrupo`
    : "http://localhost:3000/calificacionGrupo",
  withCredentials: true,
});

const Clasificacion = () => {
  const [clasificacion, setClasificacion] = useState('');
  const [masInformacion, setMasInformacion] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerClasificacion = async () => {
      try {
        const response = await calificacionGrupoApi.get('/');

        if (response.data && response.data.length > 0) {
          const { calificacion } = response.data[0];
          setClasificacion(calificacion.calificacion);
          setMasInformacion(calificacion.masInformacion);
        } else {
          setError("Datos no válidos recibidos");
        }
      } catch (error) {
        setError("Error al cargar los datos de la API");
      }
    };

    obtenerClasificacion();
  }, []);

  const redirigirAlLink = () => {
    if (masInformacion && masInformacion.startsWith('http')) {
      window.location.href = masInformacion;
    } else {
      console.log("La URL de más información no es válida");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      {/* Clasificación */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="title">Clasificación:</h3>
        <span className="subtitle">
          {clasificacion || 'C (otorgada por Minciencias)'}
        </span>
      </div>

      {/* Más informació */}
      {masInformacion ? (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
          <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: 0 }}>
          GrupLAC:
          </p>
          <button
            onClick={redirigirAlLink}
            className="button"
          >
            <FaExternalLinkAlt /> Ir al enlace
          </button>
        </div>
      ) : (
        <p style={{ marginTop: '20px', fontSize: '1.1rem' }}>No hay más información disponible</p>
      )}
    </div>
  );
};

export default Clasificacion;