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

import LogoCamaleon from "./../../public/Group.svg";

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
    <div className="flex flex-col w-64 bg-mainColor min-h-screen">
      {/* Logo y título */}
      <div className="flex items-center h-20 px-5">
        <img 
          src={LogoCamaleon} 
          alt="Logo" 
          className="w-15 h-12 mr-2" // Ajusta el tamaño del logo según sea necesario
        />
        <h1 className="text-white font-bold text-xl">Dashboard Administrador</h1>
      </div>

      {/* Navegación */}
      <nav className="mt-5 flex-1 px-4 space-y-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive
                  ? 'bg-white text-red-500 scale-105 shadow-lg'
                  : 'text-white hover:bg-white hover:text-red-500 hover:scale-105'
              } transform transition-all duration-300 flex flex-col items-center justify-center px-4 py-6 text-sm font-medium rounded-lg group`}
            >
              <item.icon
                className={`${
                  isActive
                    ? 'text-red-500'
                    : 'text-white group-hover:text-red-500'
                } h-8 w-8 transition-colors duration-300`}
                aria-hidden="true"
              />
              <span className="mt-2">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
