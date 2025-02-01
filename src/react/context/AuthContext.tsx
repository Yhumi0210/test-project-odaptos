import { createContext } from 'react';

// Types
interface UserType {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
