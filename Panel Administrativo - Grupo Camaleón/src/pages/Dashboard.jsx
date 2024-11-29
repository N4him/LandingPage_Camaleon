import { useNavigate } from 'react-router-dom';
import {
  AcademicCapIcon,
  BookOpenIcon,
  BeakerIcon,
  LightBulbIcon,
  StarIcon,
  UserGroupIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Grupo',
    description: 'Gestión de información general del grupo',
    icon: UserGroupIcon,
    href: '/grupo'
  },
  {
    name: 'Prácticas',
    description: 'Gestión de prácticas académicas y profesionales',
    icon: AcademicCapIcon,
    href: '/practicas'
  },
  {
    name: 'Trabajos de Grado',
    description: 'Administración de trabajos de grado',
    icon: BookOpenIcon,
    href: '/trabajos-grado'
  },
  {
    name: 'Proyectos',
    description: 'Control de proyectos de investigación',
    icon: BeakerIcon,
    href: '/proyectos'
  },
  {
    name: 'Líneas de Investigación',
    description: 'Gestión de líneas de investigación',
    icon: LightBulbIcon,
    href: '/lineas'
  },
  {
    name: 'Calificaciones',
    description: 'Calificación del grupo de investigación',
    icon: StarIcon,
    href: '/calificaciones'
  },
  {
    name: 'Miembros',
    description: 'Administración de miembros del grupo',
    icon: UserGroupIcon,
    href: '/miembros'
  },
  {
    name: 'Convenios',
    description: 'Gestión de convenios y alianzas',
    icon: BuildingLibraryIcon,
    href: '/convenios'
  },

  {
    name: 'Usuarios',
    description: 'Gestión de usuarios',
    icon: BuildingLibraryIcon,
    href: '/usuarios'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate(feature.href)}
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}