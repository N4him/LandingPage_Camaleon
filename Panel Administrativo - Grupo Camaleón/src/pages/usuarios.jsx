import { useState, useEffect } from 'react';
import { PlusCircleIcon, TrashIcon, PencilIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { getAllUsers, createUser, updateUser, deleteUser } from '../api/apis';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    uid: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState(''); // Estado para el error de email

  // Cargar la lista de usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener los usuarios usando la API
  async function fetchUsers() {
    try {
      const response = await getAllUsers(); // Usamos la función getAllUsers
      setUsers(response.data.users); // Asumimos que la respuesta contiene una lista de usuarios
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Validación de la contraseña
  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Validación del correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expresión regular para validar un correo
    if (!emailRegex.test(email)) {
      setEmailError('Por favor, ingresa un correo electrónico válido');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Enviar el formulario para crear o actualizar un usuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar email y contraseña antes de proceder
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = formData.password ? validatePassword(formData.password) : true; // Solo validamos la contraseña si está presente

    if (!isEmailValid || !isPasswordValid) {
      return; // No proceder si alguna validación falla
    }

    const dataToSubmit = { ...formData };

    // Si la contraseña está vacía, no la enviamos (solo la editamos si tiene algún valor)
    if (!formData.password) {
      delete dataToSubmit.password;
    }

    try {
      if (formData.uid) {
        // Si hay un uid, significa que estamos actualizando un usuario
        await updateUser(formData.uid, dataToSubmit); // Usamos updateUser
      } else {
        // Crear un nuevo usuario
        await createUser(dataToSubmit); // Usamos createUser
      }
      setIsFormVisible(false);
      setFormData({ email: '', password: '', displayName: '', uid: null });
      await fetchUsers();
    } catch (err) {
      setError('Error al guardar el usuario');
      console.error(err);
    }
  };

  // Editar usuario
  const handleEdit = (user) => {
    setFormData({
      email: user.email,
      password: '', // Se puede pre-llenar o mantener vacío
      displayName: user.displayName || '',  // Cargamos displayName
      uid: user.uid,
    });
    setIsFormVisible(true);
  };

  // Eliminar usuario
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId); // Usamos deleteUser
      setUsers(users.filter((user) => user.uid !== userId));
    } catch (err) {
      setError('Error al eliminar el usuario');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setFormData({ email: '', password: '', displayName: '', uid: null });
  };

  if (loading) return <div className="text-center mt-8">Cargando...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Formulario de creación o edición */}
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
            {emailError && <p className="text-red-600 text-xs mt-2">{emailError}</p>} {/* Mensaje de error */}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"} // Cambiar el tipo de campo según el estado
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-2 block w-full rounded-lg border-2 border-gray-300 focus:border-indigo-500 pr-10" // Ajustamos el padding derecho
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Alternar visibilidad
              className="absolute top-1/2 right-3 transform -translate-y-1/2" // Ajuste de la posición para centrar el ícono verticalmente y alinearlo a la derecha
            >
              {showPassword ? (
                <EyeSlashIcon className="w-6 h-6 text-gray-500" />
              ) : (
                <EyeIcon className="w-6 h-6 text-gray-500" />
              )}
            </button>
            {passwordError && <p className="text-red-600 text-xs mt-2">{passwordError}</p>} {/* Mensaje de error */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre(s) y Apellido(s)</label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="mt-2 block w-full rounded-lg border-2 border-gray-300 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700"
          >
            {formData.uid ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
        </form>
      )}

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="px-6 py-4 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Nombre(s) y Apellido(s)</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((user) => (
              <tr key={user.uid} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.displayName}</td>
                <td className="px-6 py-4 space-x-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <PencilIcon className="w-5 h-5 inline" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.uid)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => setIsFormVisible(true)}
        className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 flex items-center"
      >
        <PlusCircleIcon className="w-6 h-6 mr-2" />
        Crear Usuario
      </button>
    </div>
  );
}












