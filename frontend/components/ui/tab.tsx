"use client";
import React, { useState } from "react";
import { Button } from "./button"; 

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("trabajoDeGrado");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [titulo, setTitulo] = useState("TG1");
  const [estudiantes, setEstudiantes] = useState("Estudiante 1, Estudiante 2");
  const [profesores, setProfesores] = useState("Profesor 1, Profesor 2");
  const [tipoMencion, setTipoMencion] = useState("laureada");
  const [descripcion, setDescripcion] = useState("Descripción del trabajo de grado");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  const handleUpdate = () => {
    // Logica de actualizar la información
    toggleAdminMode(); // Salir del modo administrador tras la actualización.
  };

  const handleCancel = () => {
    // Restaurar los valores originales si es necesario.
    setIsAdminMode(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 text-lg font-semibold ${
            activeTab === "trabajoDeGrado"
              ? "bg-blue-500 text-white rounded-t-lg"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("trabajoDeGrado")}
        >
          Trabajo de Grado
        </button>
        <button
          className={`px-4 py-2 text-lg font-semibold ${
            activeTab === "proyectosDeGrado"
              ? "bg-blue-500 text-white rounded-t-lg"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("proyectosDeGrado")}
        >
          Proyectos de Grado
        </button>
      </div>

      {activeTab === "trabajoDeGrado" && (
        <div className="p-4">
          <h2 className="text-center text-2xl font-bold mb-4">TRABAJO DE GRADO</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="titulo">
                Título
              </label>
              <input
                type="text"
                id="titulo"
                value={titulo}
                onChange={isAdminMode ? (e) => setTitulo(e.target.value) : undefined}
                readOnly={!isAdminMode}
                className={`w-full p-2 border border-gray-300 rounded ${isAdminMode ? '' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="estudiantes">
                Estudiantes Encargados
              </label>
              <input
                type="text"
                id="estudiantes"
                value={estudiantes}
                onChange={isAdminMode ? (e) => setEstudiantes(e.target.value) : undefined}
                readOnly={!isAdminMode}
                className={`w-full p-2 border border-gray-300 rounded ${isAdminMode ? '' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="profesores">
                Profesores que Dirigieron
              </label>
              <input
                type="text"
                id="profesores"
                value={profesores}
                onChange={isAdminMode ? (e) => setProfesores(e.target.value) : undefined}
                readOnly={!isAdminMode}
                className={`w-full p-2 border border-gray-300 rounded ${isAdminMode ? '' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tipo de Mención</label>
              <div className="flex space-x-4">
                <div>
                  <input
                    type="radio"
                    id="laureada"
                    name="tipoMencion"
                    value="laureada"
                    checked={tipoMencion === "laureada"}
                    onChange={isAdminMode ? (e) => setTipoMencion(e.target.value) : undefined}
                    disabled={!isAdminMode}
                    className="mr-2"
                  />
                  <label htmlFor="laureada">Laureada</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="meritoria"
                    name="tipoMencion"
                    value="meritoria"
                    checked={tipoMencion === "meritoria"}
                    onChange={isAdminMode ? (e) => setTipoMencion(e.target.value) : undefined}
                    disabled={!isAdminMode}
                    className="mr-2"
                  />
                  <label htmlFor="meritoria">Meritoria</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="descripcion">
                Descripción
              </label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={isAdminMode ? (e) => setDescripcion(e.target.value) : undefined}
                readOnly={!isAdminMode}
                className={`w-full p-2 border border-gray-300 rounded ${isAdminMode ? '' : 'bg-gray-100 cursor-not-allowed'}`}
                rows={4}
              />
            </div>

            {isAdminMode && (
              <div className="flex justify-end space-x-4">
                <Button variant="default" onClick={handleUpdate}>
                  Actualizar
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            )}
          </form>
        </div>
      )}

      {activeTab === "proyectosDeGrado" && (
        <div className="p-4">
          <h2 className="text-center text-2xl font-bold mb-4">PROYECTOS DE GRADO</h2>
          <p className="text-center">Contenido para sección de proyectos de grado.</p>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Button variant="secondary" onClick={toggleAdminMode}>
          {isAdminMode ? "Exit Admin Mode" : "Enter Admin Mode"}
        </Button>
      </div>
    </div>
  );
};

export default TabComponent;
