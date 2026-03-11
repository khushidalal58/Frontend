import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = true; // backend later

  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
