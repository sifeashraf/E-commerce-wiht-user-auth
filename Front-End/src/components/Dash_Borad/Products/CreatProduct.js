import React, { useState, useContext } from "react";
import axios from "axios";
import { userdatacontext } from "../../context";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CreatProduct() {
  let [product, SetProduct] = useState({
    title: "",
    description: "",
  });
  let [image, setImage] = useState("");
  let navgiate = useNavigate();
  let usernow = useContext(userdatacontext);
  let token = usernow.auth.token;
  const dataHandler = (e) => {
    let value = e.target.value;
    let name = e.target.id;
    SetProduct((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  async function Submit(e) {
    e.preventDefault();
    let formdata = new FormData();

    try {
      formdata.append("title", product.title);
      formdata.append("description", product.description);
      formdata.append("image", image);
      let res = await axios.post(`http://127.0.0.1:8000/api/product/create`, formdata, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(res);
    } catch (error) {
      // setErrorFromBackend(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <>
      <div className="Main-form">
        <h1>Creat Product</h1>
        <form onSubmit={Submit}>
          <div className="input-box">
            <label htmlFor="title">Enter title:</label>
            <input
              type="text"
              placeholder="Enter title..."
              id="title"
              value={product.title}
              onChange={dataHandler}
            />
          </div>
          <div className="input-box">
            <label htmlFor="description">Enter description:</label>
            <input
              type="text"
              placeholder="Enter descript..."
              id="description"
              value={product.description}
              onChange={dataHandler}
            />
          </div>
          <div className="input-box">
            <label htmlFor="description">Enter image</label>
            <input
              type="file"
              placeholder="Enter descript..."
              id="description"
              onChange={(e) => setImage(e.target.files.item(0))}
            />
          </div>
          <Button variant="outline-primary" type="submit">
            Creat
          </Button>
        </form>
      </div>
    </>
  );
}
