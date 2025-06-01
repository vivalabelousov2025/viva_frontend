import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.user_id) {
      navigate("/manager");
    }
    if (requireAdmin && user?.is_admin) {
      navigate("/manager");
    }
  }, [user]);

  return <>{children}</>;
};
