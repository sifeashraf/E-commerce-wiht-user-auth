import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../globalstate/Authslice";

export default function PersistLogin() {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const cookie = new Cookies();
  const gettoken = cookie.get("Bearer");
  let navgiate = useNavigate();
  let { token } = useSelector((data) => data.Authslice);

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
            cookie.set("Bearer", res.data.token);
            dispatch(login({ user: res.data.user, token: res.data.token }));
          });
      } catch (error) {
        if (error.response.status === 401) {
          dispatch(logout());
          navgiate("/");
        }
      }
    };
    !token ? refreshtoken() : setLoading(false);
  }, [token]);

  return loading ? <Loading /> : <Outlet />;
}
