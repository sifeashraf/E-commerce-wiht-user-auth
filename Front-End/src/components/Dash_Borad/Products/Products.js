import axios from "axios";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { LuPenSquare } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { userdatacontext } from "../../context";
import Cookies from "universal-cookie";
export default function Products() {
  let [products, seProducts] = useState([]);
  let usernow = useContext(userdatacontext);
  let token = usernow.auth.token;
  let [updated, setUpdated] = useState(false);
  let cookie = new Cookies();
  let gettoken = cookie.get("Bearer");
  let navgiate = useNavigate();
  const deletproduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      setUpdated(!updated);
    } catch (error) {
      console.log(error);
      navgiate("/");
    }
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        let request = await axios.get("http://127.0.0.1:8000/api/product/show", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        // console.log(request.data);
        seProducts(request.data);
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
            <th>title</th>
            <th>description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>
                  <AiFillDelete
                    color="#74afb9"
                    cursor={"pointer"}
                    onClick={() => deletproduct(product.id)}
                  />
                  <Link to={`${product.id}`}>
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
