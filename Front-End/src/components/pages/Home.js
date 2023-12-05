//import hook
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//import component
import Header from "../Re-usable_components/Header";
import { Row, Col } from "react-bootstrap";
import { logout } from "../globalstate/Authslice";

//import libraries
import axios from "axios";
import Cookies from "universal-cookie";

//import css
import "./website.css";
import "bootstrap/dist/css/bootstrap.min.css";

let diractionvar = "vertical";

export default function Home() {
  let [products, seProducts] = useState([]);
  let [updated, setUpdated] = useState(false);
  let [direction, setDirection] = useState("vertical");
  let cookie = new Cookies();
  let gettoken = cookie.get("Bearer");
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        let request = await axios.get("http://127.0.0.1:8000/api/product/show", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + gettoken,
          },
        });
        seProducts(request.data);
      } catch (error) {
        if (error.response.status === 401) {
          cookie.remove("Bearer");
          dispatch(logout());
          navigate("/login");
        }
      }
    };
    fetchdata();
  }, [updated]);

  let productdirection = (e) => {
    diractionvar = `${e.target.id}`;
    setDirection(e.target.value);
  };
  return (
    <>
      <Header />
      <div className="direction-container shadow ">
        <div className="direction-box">
          <label htmlFor="vertical">vertical</label>
          <input
            checked={diractionvar === "vertical"}
            type="radio"
            id="vertical"
            name="group-1"
            onClick={(e) => productdirection(e)}
            value="vertical"
          />
        </div>
        <div className="direction-box">
          <label htmlFor="horizontal">horizontal</label>
          <input
            checked={diractionvar === "horizontal"}
            type="radio"
            id="horizontal"
            name="group-1"
            onClick={(e) => productdirection(e)}
            value="horizontal"
          />
        </div>
      </div>
      <h1>welcome to our store,Our Product... </h1>
      <Row className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <Col
              md={2}
              lg={3}
              className={`product-box ${direction}`}
              onClick={() => navigate(`/product/buy/${product.id}`)}>
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${product.image})`,
                }}
              />
              <div className="card-body">
                <h3>{product.title}</h3>
                <div className="card-text">{product.description}</div>
              </div>
            </Col>
          ))
        ) : (
          <div>{products ? "please wait one more second" : "please add more items"}</div>
        )}
      </Row>
    </>
  );
}
