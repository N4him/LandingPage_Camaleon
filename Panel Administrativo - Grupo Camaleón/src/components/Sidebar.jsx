import { Link, useLocation } from 'react-router-dom';
import {
  AcademicCapIcon,
  BookOpenIcon,
  BeakerIcon,
  LightBulbIcon,
  StarIcon,
  UserGroupIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Prácticas', href: '/practicas', icon: AcademicCapIcon },
  { name: 'Trabajos de Grado', href: '/trabajos-grado', icon: BookOpenIcon },
  { name: 'Proyectos', href: '/proyectos', icon: BeakerIcon },
  { name: 'Líneas de Investigación', href: '/lineas', icon: LightBulbIcon },
  { name: 'Calificaciones', href: '/calificaciones', icon: StarIcon },
  { name: 'Miembros', href: '/miembros', icon: UserGroupIcon },
  { name: 'Convenios', href: '/convenios', icon: BuildingLibraryIcon },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-gray-800 min-h-screen">
      <div className="flex items-center justify-center h-16 px-4">
        <h1 className="text-white font-bold text-xl">Dashboard Admin</h1>
      </div>
      <nav className="mt-5 flex-1 px-2 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
            >
              <item.icon
                className={`${
                  isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                } mr-3 flex-shrink-0 h-6 w-6`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}