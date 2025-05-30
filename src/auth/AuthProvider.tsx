import { useContext, createContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<string | null>; // <- aquí estaba el problema
  logout: () => void;
  role: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => "",
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


const login = async (username: string, password: string): Promise<string | null> => {
  return new Promise((resolve) => {
    if (username === "admin@unimagdalena.edu.co" && password === "1234") {
      setIsAuthenticated(true);
      setRole("ADMINISTRADOR");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "ADMINISTRADOR");
      resolve("ADMINISTRADOR");
    } else if (
      username === "estudiante@unimagdalena.edu.co" &&
      password === "1234"
    ) {
      setIsAuthenticated(true);
      setRole("ESTUDIANTE");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "ESTUDIANTE");
      resolve("ESTUDIANTE");
    } else {
      resolve(null);
    }
  });
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
