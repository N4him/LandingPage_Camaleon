import { Link } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Calificación del Grupo', path: '/calificacion' },
  { name: 'Convenios y Alianzas', path: '/convenios' },
  { name: 'Líneas de Investigación', path: '/lineas' },
  { name: 'Miembros del Grupo', path: '/miembros' },
  { name: 'Proyectos', path: '/proyectos' },
  { name: 'Trabajos de Grado', path: '/trabajos' },
  { name: 'Prácticas', path: '/practicas' },
];

export default function Sidebar() {
  return (
    <div className="w-64 border-r bg-background h-[calc(100vh-4rem)]">
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}