import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import practicasRoutes from './routes/practicas.js';
import trabajosGradoRoutes from './routes/trabajosGrado.js';
import proyectosInvestigacionRoutes from './routes/proyectosInvestigacion.js';
import lineasInvestigacionRoutes from './routes/lineasInvestigacion.js';
import calificacionGrupoRoutes from './routes/calificacionGrupo.js';
import miembrosGrupoRoutes from './routes/miembrosGrupo.js';
import conveniosAlianzasRoutes from './routes/conveniosAlianzas.js';
import authRoutes from './routes/auth.js'; 
import grupoRoutes from './routes/infoGrupo.js'; 


const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5273', 'https://landingpagecamaleondespliegue-keqxf179n.vercel.app/'],  // Agregar el nuevo puerto
    credentials: true
}));

app.use(bodyParser.json());

// Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));



// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas protegidas por autenticación
app.use('/practicas',  practicasRoutes);
app.use('/trabajosGrado', trabajosGradoRoutes); //desactivación de autenticación momentanea
app.use('/proyectosInvestigacion', proyectosInvestigacionRoutes);
app.use('/lineasInvestigacion', lineasInvestigacionRoutes);
app.use('/calificacionGrupo', calificacionGrupoRoutes);
app.use('/miembrosGrupo', miembrosGrupoRoutes); //desactivación de autenticación momentanea
app.use('/conveniosAlianzas', conveniosAlianzasRoutes); //desactivación de autenticación momentanea
app.use('/grupo', grupoRoutes); 

// Inicializar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});