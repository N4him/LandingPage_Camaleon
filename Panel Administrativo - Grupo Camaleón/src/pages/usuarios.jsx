import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const usersApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/users`
    : "http://localhost:3000/users",
  withCredentials: true,
});

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Cargar la lista de usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await usersApi.get('/getUsers');
      setUsers(response.data.users); // Asumimos que la respuesta contiene una lista de usuarios
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Enviar el formulario para crear un usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await usersApi.post('/createUser', {
        email: formData.email,
        password: formData.password,
      });
      setIsFormVisible(false);
      setFormData({ email: '', password: '' });
      await fetchUsers();
    } catch (err) {
      setError('Error al guardar el usuario');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setFormData({ email: '', password: '' });
  };

  const handleDelete = async (userId) => {
    try {
      await usersApi.delete(`/deleteUser/${userId}`);
      setUsers(users.filter((user) => user.uid !== userId));
    } catch (err) {
      setError('Error al eliminar el usuario');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-8">Cargando...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl mb-8 space-y-6 relative">
          <button
            type="button"
            onClick={handleCancel}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700"
          >
            Cancelar
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2 block w-full rounded-lg border-2 border-gray-300 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-2 block w-full rounded-lg border-2 border-gray-300 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700"
          >
            Crear Usuario
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        <div
          onClick={() => {
            setIsFormVisible(true);
            setFormData({ email: '', password: '' });
          }}
          className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 cursor-pointer min-h-[250px] transition hover:shadow-xl order-last"
        >
          <PlusCircleIcon className="w-12 h-12 text-indigo-600 mb-4" />
          <p className="text-lg font-semibold text-indigo-600">Nuevo Usuario</p>
        </div>

        {users.map((user) => (
          <div
            key={user.uid}
            className="relative bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800">Email: {user.email}</h3>
            <div className="absolute bottom-4 right-4 flex space-x-4">
              <button
                onClick={() => handleDelete(user.uid)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


