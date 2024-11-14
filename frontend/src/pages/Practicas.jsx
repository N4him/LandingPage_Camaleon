import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../assets/styles/Practicas.css";

const Practicas = () => {
  const [practicas, setPracticas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/practicas") // Asegúrate de que esta URL sea correcta
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setPracticas(data);
      })
      .catch((error) => {
        console.error("Error al obtener las prácticas:", error);
        setError("No se pudieron cargar las prácticas.");
      });
  }, []);

  return (
    <section id="practicas" className="seccion practicas">
      <div className="contenedor">
        <motion.h2
          className="titulo-seccion"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Prácticas
        </motion.h2>
        {error ? (
          <p className="error">{error}</p>
        ) : practicas.length > 0 ? (
          <motion.div className="lista-practicas">
            {practicas.map((practica, index) => (
              <motion.div key={index} className="practica-item">
                <h3>{practica.practica.tituloPractica}</h3>
                <p>
                  <strong>Estudiante(s):</strong>{" "}
                  {practica.practica.estudiantes
                    .map(
                      (estudiante) =>
                        `${estudiante.nombres} ${estudiante.apellidos}`
                    )
                    .join(", ")}
                </p>
                <p>
                  <strong>Profesor responsable:</strong>{" "}
                  {`${practica.practica.profesor.nombres} ${practica.practica.profesor.apellidos}`}
                </p>
                <p>{practica.practica.resultadoInvestigacion}</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p>No hay prácticas disponibles.</p>
        )}
      </div>
    </section>
  );
};

export default Practicas;
