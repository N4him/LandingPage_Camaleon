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

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173', // Permite frontend
        credentials: true // Permite enviar cookies y sesiones
    }
))

app.use(bodyParser.json());

// Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Middleware para verificar si el usuario está autenticado
function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.status(401).json({ message: 'Debe estar autenticado para acceder a esta ruta' });
}

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas protegidas por autenticación
app.use('/practicas', ensureAuthenticated, practicasRoutes);
app.use('/trabajosGrado', ensureAuthenticated, trabajosGradoRoutes);
app.use('/proyectosInvestigacion', ensureAuthenticated, proyectosInvestigacionRoutes);
app.use('/lineasInvestigacion', ensureAuthenticated, lineasInvestigacionRoutes);
app.use('/calificacionGrupo', ensureAuthenticated, calificacionGrupoRoutes);
app.use('/miembrosGrupo', miembrosGrupoRoutes); //desactivación de autenticación momentanea
app.use('/conveniosAlianzas', conveniosAlianzasRoutes); //desactivación de autenticación momentanea

// Inicializar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
