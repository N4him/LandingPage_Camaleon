import axios from 'axios';

// Configuración de URLs base para cada API con withCredentials: true
const trabajosGradoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/trabajosGrado`
    : "http://localhost:3000/trabajosGrado",
  withCredentials: true,
});

const proyectosInvestigacionApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/proyectosInvestigacion`
    : "http://localhost:3000/proyectosInvestigacion",
  withCredentials: true,
});

const lineasInvestigacionApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/lineasInvestigacion`
    : "http://localhost:3000/lineasInvestigacion",
  withCredentials: true,
});

const calificacionGrupoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/calificacionGrupo`
    : "http://localhost:3000/calificacionGrupo",
  withCredentials: true,
});

const miembrosGrupoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/miembrosGrupo`
    : "http://localhost:3000/miembrosGrupo",
  withCredentials: true,
});

const conveniosAlianzasApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/conveniosAlianzas`
    : "http://localhost:3000/conveniosAlianzas",
  withCredentials: true,
});

const practicasApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/practicas`
    : "http://localhost:3000/practicas",
  withCredentials: true,
});

const grupoInfoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/grupo`
    : "http://localhost:3000/grupo",
  withCredentials: true,
});

// Nueva API de "users"
const usersApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/users`
    : "http://localhost:3000/users",
  withCredentials: true,
});

export default usersApi;

// Funciones para "grupoInfo"
export const getGrupoInfo = () => grupoInfoApi.get("/");  // Obtener la información del grupo
export const updateGrupoInfo = (id, grupoInfo) => grupoInfoApi.put(`/${id}`, grupoInfo);  // Actualizar información del grupo

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

// Funciones para "usuarios"
export const getAllUsers = () => usersApi.get('/getUsers');
export const getUser = (uid) => usersApi.get(`/getUser/${uid}`);
export const createUser = (data) => usersApi.post('/createUser', data);
export const updateUser = (uid, data) => usersApi.put(`/updateUser/${uid}`, data);
export const deleteUser = (uid) => usersApi.delete(`/deleteUser/${uid}`);