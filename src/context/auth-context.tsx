import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "@/lib/cookies";
import type { IUser } from "@/types";
import { getMe } from "@/api/user";

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  setUser: (user: IUser | null) => void;
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

  const handleLogout = () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    setUser(null);
    navigate("/sign-in");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    setUser,
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
