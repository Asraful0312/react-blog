import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  console.log(auth.currentUser);
  return !auth.currentUser ? <>{children}</> : <Navigate to="/" />;
};

export default PublicRoute;
