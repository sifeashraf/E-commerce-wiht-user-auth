//import hooks
import { useState } from "react";
import { useSelector } from "react-redux";

// import Components
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

//import libaries
import axios from "axios";

export default function CreatProduct() {
  let [product, SetProduct] = useState({
    title: "",
    description: "",
  });
  let [image, setImage] = useState("");
  let navgiate = useNavigate();
  let { token } = useSelector((data) => data.Authslice);

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
      //dont navigate the user cause if he want to add more than one product
    } catch (error) {
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
