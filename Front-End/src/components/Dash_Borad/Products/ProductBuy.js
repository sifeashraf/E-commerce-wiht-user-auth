import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userdatacontext } from "../../context";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import MyList from "./MyList";
export default function ProductBuy() {
  let [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    id: 0,
  });
  let navgiate = useNavigate();
  let usernow = useContext(userdatacontext);
  let token = usernow.auth.token;
  let cookie = new Cookies();
  let pruches = [];
  let id = window.location.pathname.slice("-1")[0];

  const dataHandler = (e) => {
    let value = e.target.value;
    let name = e.target.id;
    setProduct((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  useEffect(() => {
    let getdata = async () => {
      try {
        let res = await axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setProduct({
          title: res.data[0].title,
          description: res.data[0].description,
          image: res.data[0].image,
          id: res.data[0].id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);

  async function Submit(e) {
    e.preventDefault();

    if (!cookie.get("bought-product")) {
      let currentitem = [id];

      cookie.set("bought-product", JSON.stringify(currentitem));
    } else {
      let myList = cookie.get("bought-product");

      myList.push(id);
      cookie.set("bought-product", JSON.stringify(myList));
      navgiate("/");
    }
  }
  return (
    <>
      <div className="show-product">
        <div
          className="product-image-Preview"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
        <div className="product-info">
          <h2>{product.title}</h2>
          <p> {product.description}</p>
          <Button variant="outline-primary" type="submit" onClick={Submit} className="buy-btn">
            Buy Product
          </Button>
        </div>
      </div>
    </>
  );
}
