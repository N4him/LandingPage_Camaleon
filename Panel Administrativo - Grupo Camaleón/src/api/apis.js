import axios from 'axios';

// Configuración de URLs base para cada API con withCredentials: true
const trabajosGradoApi = axios.create({
  baseURL: "http://localhost:3000/trabajosGrado",
  withCredentials: true,
});

const proyectosInvestigacionApi = axios.create({
  baseURL: "http://localhost:3000/proyectosInvestigacion",
  withCredentials: true,
});

const lineasInvestigacionApi = axios.create({
  baseURL: "http://localhost:3000/lineasInvestigacion",
  withCredentials: true,
});

const calificacionGrupoApi = axios.create({
  baseURL: "http://localhost:3000/calificacionGrupo",
  withCredentials: true,
});

const miembrosGrupoApi = axios.create({
  baseURL: "http://localhost:3000/miembrosGrupo",
  withCredentials: true,
});

const conveniosAlianzasApi = axios.create({
  baseURL: "http://localhost:3000/conveniosAlianzas",
  withCredentials: true,
});

const practicasApi = axios.create({
  baseURL: "http://localhost:3000/practicas",
  withCredentials: true,
});

// Funciones para "trabajosGrado"
export const getAllTrabajosGrado = () => trabajosGradoApi.get("/");
export const getTrabajoGrado = (id) => trabajosGradoApi.get(`/${id}/`);
export const createTrabajoGrado = (trabajo) => trabajosGradoApi.post("/", trabajo);
export const updateTrabajoGrado = (id, trabajo) => trabajosGradoApi.put(`/${id}/`, trabajo);
export const deleteTrabajoGrado = (id) => trabajosGradoApi.delete(`/${id}/`);

// Funciones para "proyectosInvestigacion"
export const getAllProyectosInvestigacion = () => proyectosInvestigacionApi.get("/");
export const getProyectoInvestigacion = (id) => proyectosInvestigacionApi.get(`/${id}/`);
export const createProyectoInvestigacion = (proyecto) => proyectosInvestigacionApi.post("/", proyecto);
export const updateProyectoInvestigacion = (id, proyecto) => proyectosInvestigacionApi.put(`/${id}/`, proyecto);
export const deleteProyectoInvestigacion = (id) => proyectosInvestigacionApi.delete(`/${id}/`);

// Funciones para "lineasInvestigacion"
export const getAllLineasInvestigacion = () => lineasInvestigacionApi.get("/");
export const getLineaInvestigacion = (id) => lineasInvestigacionApi.get(`/${id}/`);
export const createLineaInvestigacion = (linea) => lineasInvestigacionApi.post("/", linea);
export const updateLineaInvestigacion = (id, linea) => lineasInvestigacionApi.put(`/${id}/`, linea);
export const deleteLineaInvestigacion = (id) => lineasInvestigacionApi.delete(`/${id}/`);

// Funciones para "calificacionGrupo"
export const getAllCalificacionesGrupo = () => calificacionGrupoApi.get("/");
export const getCalificacionGrupo = (id) => calificacionGrupoApi.get(`/${id}/`);
export const createCalificacionGrupo = (calificacion) => calificacionGrupoApi.post("/", calificacion);
export const updateCalificacionGrupo = (id, calificacion) => calificacionGrupoApi.put(`/${id}/`, calificacion);
export const deleteCalificacionGrupo = (id) => calificacionGrupoApi.delete(`/${id}/`);

// Funciones para "miembrosGrupo"
export const getAllMiembrosGrupo = () => miembrosGrupoApi.get("/");
export const getMiembroGrupo = (id) => miembrosGrupoApi.get(`/${id}/`);
export const createMiembroGrupo = (miembro) => miembrosGrupoApi.post("/", miembro);
export const updateMiembroGrupo = (id, miembro) => miembrosGrupoApi.put(`/${id}/`, miembro);
export const deleteMiembroGrupo = (id) => miembrosGrupoApi.delete(`/${id}/`);

// Funciones para "conveniosAlianzas"
export const getAllConveniosAlianzas = () => conveniosAlianzasApi.get("/");
export const getConvenioAlianza = (id) => conveniosAlianzasApi.get(`/${id}/`);
export const createConvenioAlianza = (convenio) => conveniosAlianzasApi.post("/", convenio);
export const updateConvenioAlianza = (id, convenio) => conveniosAlianzasApi.put(`/${id}/`, convenio);
export const deleteConvenioAlianza = (id) => conveniosAlianzasApi.delete(`/${id}/`);

// Funciones para "practicas"
export const getAllPracticas = () => practicasApi.get("/");
export const getPractica = (id) => practicasApi.get(`/${id}/`);
export const createPractica = (practica) => practicasApi.post("/", practica);
export const updatePractica = (id, practica) => practicasApi.put(`/${id}/`, practica);
export const deletePractica = (id) => practicasApi.delete(`/${id}/`);
