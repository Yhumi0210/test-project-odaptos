import { useState, ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';

// Types
interface UserType {
  id: string;
  name: string;
  email: string;
}
// ReactNode signifie que le composant peut contenir tous les types d'éléments React div, p, etc
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Fonction de connexion (Mock, pas de backend pour l’instant)
  const login = (userData: UserType) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
