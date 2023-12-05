//import hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import Components
import Header from "../../Re-usable_components/Header";
import { Col, Row } from "react-bootstrap";

//import libaries
import axios from "axios";
import Cookies from "universal-cookie";

export default function MyList() {
  let [product, setProduct] = useState([]);
  let cookie = new Cookies();
  let getproudct = cookie.get("bought-product");
  let [direction, setDirection] = useState("vertical");

  let { token } = useSelector((data) => data.Authslice);

  let myproduct = [];

  useEffect(() => {
    let getdata = async () => {
      if (getproudct) {
        for (let i = 0; i < getproudct.length; i++) {
          try {
            let res = await axios.get(
              `http://127.0.0.1:8000/api/product/showbyid/${getproudct[i]}`,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer " + token,
                },
              }
            );
            myproduct.push({
              id: res.data[0].id,
              title: res.data[0].title,
              description: res.data[0].description,
              image: res.data[0].image,
            });
          } catch (error) {
            console.log(error);
          }
        }
      }

      setProduct(myproduct);
    };
    getdata();
  }, []);
  let productdirection = (e) => {
    setDirection(e.target.value);
  };
  return (
    <>
      <Header />
      <Row className="products">
        <div className="direction-container shadow ">
          <div className="direction-box">
            <label id="vertical">vertical</label>
            <input
              type="radio"
              id="vertical"
              name="group-1"
              onClick={(e) => productdirection(e)}
              value="vertical"
            />
          </div>{" "}
          <div className="direction-box">
            <label id="vertical">horizontal</label>
            <input
              type="radio"
              id="horizontal"
              name="group-1"
              onClick={(e) => productdirection(e)}
              value="horizontal"
            />
          </div>
        </div>
        {product.length > 0 ? (
          product.map((product) => (
            <Col md={2} lg={3} className={`product-box ${direction}`}>
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
          <div>you havent add any item yet</div>
        )}
      </Row>
    </>
  );
}
