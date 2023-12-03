import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import Cookies from "universal-cookie";
import { userdatacontext } from "./context";
import axios from "axios";

export default function Header() {
  let navgiate = useNavigate();
  let cookie = new Cookies();
  let gettoken = cookie.get("Bearer");
  let usernow = useContext(userdatacontext);
  let handleLogOut = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: "Bearer " + gettoken,
        },
      });
      cookie.remove("Bearer");
      usernow.setAuth({});
      navgiate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="main-nav shadow">
      <div className="main-text">
        {/* Link is waht send the path when you click to the route in the App component*/}
        <Link to="/">Home</Link>
        <Link to="/product/mylist">MyList</Link>
      </div>

      <div className="flex">
        {gettoken && (
          <>
            <Button>
              <Link to="/dashborad" style={{ color: "white" }} className="registernav">
                Dashborad
              </Link>
            </Button>
            <Button>
              <Link onClick={handleLogOut} style={{ color: "white" }} className="registernav">
                Log out
              </Link>
            </Button>
          </>
        )}
        {!gettoken && (
          <>
            <Button>
              <Link to="/register" style={{ color: "white" }} className="registernav">
                Register
              </Link>
            </Button>
            <Button>
              <Link to="/login" style={{ color: "white" }} className="registernav">
                Login
              </Link>
            </Button>
          </>
        )}
      </div>
      {/* <Button className="registernav" style={{ color: "white" }} >
          Log out
        </Button> */}
    </nav>
  );
}
