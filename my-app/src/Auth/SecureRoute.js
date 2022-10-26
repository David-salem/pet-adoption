import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { userContext } from "../Context/userContext";

export const SecureRoute = ({ children, role }) => {
  const { infoUser } = useContext(userContext);

  if (role && !infoUser.Permissions?.includes(role)) {
    return <Navigate to="/" />
  }

  return children;
}