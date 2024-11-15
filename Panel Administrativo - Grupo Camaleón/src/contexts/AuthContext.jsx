import { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para hacer login usando el backend
  async function login(email, password) {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Importante para enviar cookies de sesión
      });

      const data = await response.json();
      if (response.ok) {
        setCurrentUser(data.user); // Guardar el usuario en el estado
        return data; // Retorna la respuesta si es exitosa
      } else {
        throw new Error(data.message || 'Error en el login');
      }
    } catch (error) {
      console.error('Error de login:', error);
      throw error;
    }
  }

  // Función para hacer logout usando el backend
  async function logout() {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include', // Importante para enviar cookies de sesión
      });

      const data = await response.json();
      if (response.ok) {
        setCurrentUser(null); // Limpiar el usuario del estado
        return data;
      } else {
        throw new Error(data.message || 'Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error de logout:', error);
      throw error;
    }
  }

  // Comprobar el estado de la autenticación al cargar la página
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/check', {
          method: 'GET',
          credentials: 'include', // Importante para enviar cookies de sesión
        });

        const data = await response.json();
        if (response.ok) {
          setCurrentUser(data.user); // Si la sesión está activa, guardar el usuario
        } else {
          setCurrentUser(null); // Si no, limpiar el estado
        }
      } catch (error) {
        setCurrentUser(null); // En caso de error, limpiar el estado
        console.error('Error al verificar la sesión:', error);
      }
      setLoading(false); // Ya terminamos de verificar
    };

    checkSession();
  }, []);

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
