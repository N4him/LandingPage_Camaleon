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

// Middleware para configurar CORS y limitar los métodos a solo GET
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5273'],  // Agregar el nuevo puerto
    methods: ['GET'],  // Limitar los métodos permitidos a GET
    credentials: true
}));

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Middleware para verificar si el usuario está autenticado
function ensureAuthenticated(req, res, next) {
    const allowedOrigins = ['http://localhost:5173']; // Orígenes permitidos

    // Verificar el origen de la solicitud
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        // Si el origen es permitido, permitir el acceso sin autenticación
        return next();
    }

    // Verificar si el usuario está autenticado
    if (req.session.user) {
        return next();
    }

    res.status(401).json({ message: 'Debe estar autenticado para acceder a esta ruta' });
}

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas protegidas por autenticación
app.use('/practicas', ensureAuthenticated, practicasRoutes);
app.use('/trabajosGrado', ensureAuthenticated, trabajosGradoRoutes); //desactivación de autenticación momentanea
app.use('/proyectosInvestigacion', ensureAuthenticated, proyectosInvestigacionRoutes);
app.use('/lineasInvestigacion', ensureAuthenticated, lineasInvestigacionRoutes);
app.use('/calificacionGrupo', ensureAuthenticated, calificacionGrupoRoutes);
app.use('/miembrosGrupo', ensureAuthenticated, miembrosGrupoRoutes); //desactivación de autenticación momentanea
app.use('/conveniosAlianzas', ensureAuthenticated, conveniosAlianzasRoutes); //desactivación de autenticación momentanea

// Inicializar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
