import { useContext, createContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, role: string, userId: number) => void;
  logout: () => void;
  role: string | null;
  token: string | null;
  idEstudiante: number | null; //
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  role: null,
  token: null,
  idEstudiante: null, 
  
});


interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(() => localStorage.getItem("role"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem("token"));
  const [idEstudiante, setidEstudiante] = useState<number | null>(() => {
    const storedId = localStorage.getItem("idEstudiante");
    return storedId ? Number(storedId) : null;
  }); 

  const login = (token: string, role: string, idEstudiante: number) => {
    setToken(token);
    setRole(role);
    setidEstudiante(idEstudiante); // Guardar el ID del usuario
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("idEstudiante", String(idEstudiante));
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("idEstudiante");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role, token, idEstudiante}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
