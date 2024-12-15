import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute = ({ isAuthenticated }: PrivateRouteProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/starting" />;
};

export default PrivateRoute;
