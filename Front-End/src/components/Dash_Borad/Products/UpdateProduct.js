//import hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//import libraries
import axios from "axios";

export default function UpdateProduct() {
  let [product, setProduct] = useState({
    title: "",
    description: "",
  });
  let navgiate = useNavigate();
  let { token } = useSelector((data) => data.Authslice);

  const dataHandler = (e) => {
    let value = e.target.value;
    let name = e.target.id;
    setProduct((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  let { id } = useParams();

  useEffect(() => {
    let getdata = async () => {
      try {
        let res = await axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setProduct({ title: res.data[0].title, description: res.data[0].description });
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);

  async function Submit(e) {
    e.preventDefault();

    let id = window.location.pathname.slice("-1")[0];
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,
        {
          title: product.title,
          description: product.description,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      navgiate("/dashborad/product");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="Main-form">
        <h1>{"UpdateProduct"}</h1>
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
              placeholder="Enter description..."
              id="description"
              value={product.description}
              onChange={dataHandler}
            />
          </div>
          <div className="input-box">
            <label htmlFor="image">Enter description:</label>
            <input type="file" placeholder="Enter Email..." id="image" onChange={dataHandler} />
          </div>
          <Button variant="outline-primary" type="submit">
            {"Upadte Product"}
          </Button>
        </form>
      </div>
    </>
  );
}
