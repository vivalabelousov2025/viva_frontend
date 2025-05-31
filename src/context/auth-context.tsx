import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/auth";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookies";
import type { ILoginRequest, IUser } from "@/types";
import { getMe } from "@/api/user";

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (data: ILoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = getCookie("access_token");
      if (accessToken) {
        const response = await getMe(accessToken);
        setUser(response.data);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (data: ILoginRequest) => {
    try {
      const response = await login(data);
      const { access_token, refresh_token } = response.data;

      // Сохраняем токены в куки
      setCookie("access_token", access_token, 1);
      setCookie("refresh_token", refresh_token, 7);

      setUser(user);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    setUser(null);
    navigate("/sign-in");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
