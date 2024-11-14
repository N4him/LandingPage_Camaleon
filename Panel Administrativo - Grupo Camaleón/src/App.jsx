import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Practicas from './pages/Practicas';
import TrabajosDeGrado from './pages/TrabajosDeGrado';
import MiembrosGrupo from './pages/MiembroDelGrupo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <div className="flex">
                    <Sidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="p-6">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/practicas" element={<Practicas />} />
                          <Route path="/trabajos-grado" element={<TrabajosDeGrado/>} />
                          <Route path="/proyectos" element={<h1>Proyectos de Investigación</h1>} />
                          <Route path="/lineas" element={<h1>Líneas de Investigación</h1>} />
                          <Route path="/calificaciones" element={<h1>Calificación de Grupo</h1>} />
                          <Route path="/miembros" element={<MiembrosGrupo/>}  />
                          <Route path="/convenios" element={<h1>Convenios/Alianzas</h1>} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;