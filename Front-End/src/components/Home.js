import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "./website.css";
import { userdatacontext } from "./context";
import Cookies from "universal-cookie";
import Header from "./Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let [products, seProducts] = useState([]);
  let usernow = useContext(userdatacontext);
  let token = usernow.auth.token;
  let [updated, setUpdated] = useState(false);
  let [direction, setDirection] = useState("vertical");
  let cookie = new Cookies();
  let gettoken = cookie.get("Bearer");

  let navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      // console.log(token);
      try {
        let request = await axios.get("http://127.0.0.1:8000/api/product/show", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + gettoken,
          },
        });
        seProducts(request.data);
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          cookie.remove("Bearer");
          usernow.setAuth({});
          navigate("/login");
        }
      }
    };
    fetchdata();
  }, [updated]);

  let productdirection = (e) => {
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
            id="vertical"
            name="group-1"
            onClick={(e) => productdirection(e)}
            value="vertical"
          />
        </div>{" "}
        <div className="direction-box">
          <label htmlFor="horizontal">horizontal</label>
          <input
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
              onClick={() => navigate(`product/buy/${product.id}`)}
            >
              <div
                className="product-box-image"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <div className="text">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-text">{product.description}</p>
              </div>
            </Col>
          ))
        ) : (
          <div>please go to dashborad and enter a product</div>
        )}
      </Row>
    </>
  );
}
