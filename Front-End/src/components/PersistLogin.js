import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userdatacontext } from "./context";
import Loading from "./Loading";
import Cookies from "universal-cookie";
export default function PersistLogin() {
  const [loading, setLoading] = useState(true);
  let usernow = useContext(userdatacontext);
  let token = usernow.auth.token;
  const cookie = new Cookies();
  const gettoken = cookie.get("Bearer");
  let navgiate = useNavigate();

  useEffect(() => {
    let refreshtoken = async () => {
      try {
        await axios
          .post("http://127.0.0.1:8000/api/refresh", null, {
            headers: {
              Authorization: "Bearer " + gettoken,
            },
          })
          .then((res) => {
            cookie.remove("Bearer");
            cookie.remove("Bearer");
            cookie.set("Bearer", res.data.token);
            usernow.setAuth(() => {
              return { user: res.data.user, token: res.data.token };
            });
          });
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 401) {
          cookie.remove("Bearer");
          usernow.setAuth({});
          navgiate("/");
        }
      }
    };
    !token ? refreshtoken() : setLoading(false);
  }, [token]);

  return loading ? <Loading /> : <Outlet />;
}
