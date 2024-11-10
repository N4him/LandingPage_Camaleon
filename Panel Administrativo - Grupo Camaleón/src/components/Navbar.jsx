import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Panel Administrativo - Grupo Camaleón</h1>
        </div>
        <Button variant="outline" onClick={logout}>
          Cerrar Sesión
        </Button>
      </div>
    </nav>
  );
}