import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../useAuth/useAuth";

const RequiredAuth = ({ allowedRoles }) => {
  const { auth } = UseAuth();
  const location = useLocation();
  //console.log(allowedRoles)
  //console.log(auth?.roles)
  //console.log(location)
  console.log(auth?.roles);
  //console.log(auth?.roles);

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? ( //if role matched show outlet
    //else go to unauth page not allowed
    <Outlet />
  ) : auth?.roles ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
export default RequiredAuth;
