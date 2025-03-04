import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    console.log("Attempting login with:", email, password); // Debugging

    if (email === "test@example.com" && password === "password123") {
      console.log("Login successful!"); // Debugging
      setIsAuthenticated(true);
      return true;
    }

    console.log("Login failed: Invalid credentials"); // Debugging
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
