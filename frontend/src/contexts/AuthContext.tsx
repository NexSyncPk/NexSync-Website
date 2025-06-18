import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import Cookies from "js-cookie";
import { getToken } from "@/components/utils/helpers";
import { loginUser } from "@/api/services";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // useEffect(() => {
  //   // Check if user is logged in on app start
  //   const token = getToken();
  //   const userData = Cookies.get("admin_user");

  //   if (token && userData) {
  //     try {
  //       setUser(JSON.parse(userData));
  //     } catch (error) {
  //       console.error("Error parsing user data:", error);
  //       Cookies.remove("admin_token");
  //       Cookies.remove("admin_user");
  //     }
  //   }
  //   setIsLoading(false);
  // }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Replace with your actual API endpoint
      const response = await loginUser({ email, password });
      console.log("Login response:", response);
      if (response && response.status) {
        const data = response.data;
        setUser(data.user);
        navigate("/admin/dashboard", { replace: true });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("admin_token");
    Cookies.remove("admin_user");
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
