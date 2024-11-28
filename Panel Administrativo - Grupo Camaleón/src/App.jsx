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
import Calificacion from './pages/Calificacion';
import Proyectos from './pages/Proyectos';
import LineaDeInvestigacion from './pages/LineaDeInvestigacion';
import Convenios from './pages/Convenios';
import InformacionGrupo from './pages/infoGrupo';


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
                          <Route path="/grupo" element={<InformacionGrupo/>}/>
                          <Route path="/practicas" element={<Practicas />} />
                          <Route path="/trabajos-grado" element={<TrabajosDeGrado/>} />
                          <Route path="/proyectos" element={<Proyectos/>} />
                          <Route path="/lineas" element={<LineaDeInvestigacion/>} />
                          <Route path="/calificaciones" element={<Calificacion/>} />
                          <Route path="/miembros" element={<MiembrosGrupo/>}  />
                          <Route path="/convenios" element={<Convenios/>} />
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