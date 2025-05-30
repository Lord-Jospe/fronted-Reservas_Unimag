import { useContext, createContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => string | null;
  logout: () => void;
  role: string | null; // <--- NUEVO
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => "",
  logout: () => {},
  role: "",
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });

  const [role, setRole] = useState<string | null>(() => {
    return localStorage.getItem("userRole");
  });


  const login = (username: string, password: string): string | null => {
    if (username === "admin@unimagdalena.edu.co" && password === "1234") {
      setIsAuthenticated(true);
      setRole("ADMINISTRADOR");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "ADMINISTRADOR");
      return "ADMINISTRADOR";
    } else if (
      username === "estudiante@unimagdalena.edu.co" &&
      password === "1234"
    ) {
      setIsAuthenticated(true);
      setRole("ESTUDIANTE");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "ESTUDIANTE");
      return "ESTUDIANTE";
    }
    return null;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    setRole(null);
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
