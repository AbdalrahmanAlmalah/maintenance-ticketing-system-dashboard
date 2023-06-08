import { useContext } from "react";
import AuthContext, { AuthProvider } from "../context/AuthProvider";

const UseAuth = () => {
  return useContext(AuthContext);
};
export default UseAuth;
