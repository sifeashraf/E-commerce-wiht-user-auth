import axios from "axios";
import React, { useEffect, useState } from "react";
import "./website.css";
import Cookies from "universal-cookie";
import Header from "../Re-usable_components/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../globalstate/Authslice";
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
    document.querySelectorAll("#group-1").forEach((input) => {
      input.removeAttribute("checked");
    });
    e.target.setAttribute("checked", "");
    setDirection(e.target.value);
  };
  return (
    <>
      <Header />
      <div className="direction-container shadow ">
        <div className="direction-box">
          <label htmlFor="vertical">vertical</label>
          <input
            type="radio"
            id="group-1"
            name="group-1"
            onClick={(e) => productdirection(e)}
            value="vertical"
          />
        </div>
        <div className="direction-box">
          <label htmlFor="horizontal">horizontal</label>
          <input
            type="radio"
            id="group-1"
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
              onClick={() => navigate(`product/buy/${product.id}`)}>
              <div
                className="product-box-image"
                style={{ backgroundImage: `url(${product.image})` }}></div>
              <div className="text">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-text">{product.description}</p>
              </div>
            </Col>
          ))
        ) : (
          <div>please go to Dashboard and enter a product</div>
        )}
      </Row>
    </>
  );
}
