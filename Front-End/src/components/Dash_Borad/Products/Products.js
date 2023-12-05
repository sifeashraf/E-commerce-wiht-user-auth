//import hooks
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import Components
import { AiFillDelete } from "react-icons/ai";
import { LuPenSquare } from "react-icons/lu";

//import libaries
import axios from "axios";

export default function Products() {
  let [products, seProducts] = useState([]);
  let { token } = useSelector((data) => data.Authslice);
  let [updated, setUpdated] = useState(false);

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
        seProducts(request.data);
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
