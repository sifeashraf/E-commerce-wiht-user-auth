//import hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// import Components
import Button from "react-bootstrap/Button";

//import libaries
import axios from "axios";
import Cookies from "universal-cookie";

//import css
import "../DashBoard.css";
export default function ProductBuy() {
  let [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
  });
  let navgiate = useNavigate();
  let { token } = useSelector((data) => data.Authslice);
  let cookie = new Cookies();
  let { id } = useParams();
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
        console.log(res.data[0].image);
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
          style={{ backgroundImage: `url(${product.image})` }}></div>
        <div className="product-info">
          <h2>{product.title}</h2>
          <p> {product.description}</p>
          <Button
            style={{ display: "block", margin: "auto" }}
            variant="outline-primary"
            type="submit"
            onClick={Submit}
            className="buy-btn">
            Buy Product
          </Button>
        </div>
      </div>
    </>
  );
}
