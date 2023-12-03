import axios from "axios";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { LuPenSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { userdatacontext } from "./context";
import Cookies from "universal-cookie";
export default function Users() {
  let [users, setusers] = useState([]);
  let usernow = useContext(userdatacontext);
  let token = usernow.auth.token;
  let [updated, setUpdated] = useState(false);
  let cookie = new Cookies();
  let gettoken = cookie.get("Bearer");
  const deletuser = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/delete/${userId}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      setUpdated(!updated);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchdata = async () => {
      // console.log(token);
      try {
        let request = await axios.get("http://127.0.0.1:8000/api/user/show", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        // console.log(request.data);
        setusers(request.data);
        // console.log(usernow.auth.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [updated]);

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>
                <AiFillDelete
                  color="#74afb9"
                  cursor={"pointer"}
                  onClick={() => deletuser(user.id)}
                />
                <Link to={`${user.id}`}>
                  <LuPenSquare color="#74afb9" cursor={"pointer"} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
