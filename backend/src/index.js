import express from 'express';
import practicasRoutes from './routes/practicas.js';
import trabajosGradoRoutes from './routes/trabajosGrado.js';
import proyectosInvestigacionRoutes from './routes/proyectosInvestigacion.js';
import lineasInvestigacionRoutes from './routes/lineasInvestigacion.js';
import calificacionGrupoRoutes from './routes/calificacionGrupo.js';
import miembrosGrupoRoutes from './routes/miembrosGrupo.js';
import conveniosAlianzasRoutes from './routes/conveniosAlianzas.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());

// Rutas de cada colección
app.use('/api/practicas', practicasRoutes);
app.use('/api/trabajos-grado', trabajosGradoRoutes);
app.use('/api/proyectos-investigacion', proyectosInvestigacionRoutes);
app.use('/api/lineas-investigacion', lineasInvestigacionRoutes);
app.use('/api/calificacion-grupo', calificacionGrupoRoutes);
app.use('/api/miembros-grupo', miembrosGrupoRoutes);
app.use('/api/convenios-alianzas', conveniosAlianzasRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
