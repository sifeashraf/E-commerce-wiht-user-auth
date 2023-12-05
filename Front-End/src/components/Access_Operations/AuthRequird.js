// import Components
import { Navigate, Outlet } from "react-router-dom";

//import libaries
import Cookies from "universal-cookie";

export default function AuthRequird() {
  let cookie = new Cookies();
  let gettoken = cookie.get("Bearer");
  return gettoken ? <Outlet /> : <Navigate to="/Login" />;
}
