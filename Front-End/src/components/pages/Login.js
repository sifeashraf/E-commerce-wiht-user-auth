import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Re-usable_components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../globalstate/Authslice";
export default function Login() {
  let [userdata, setUserData] = useState({
    email: "",
    password: "",
  });
  let [errormasge, seterrormasge] = useState([]);
  let [emailError, setEmailError] = useState("");
  let dispatch = useDispatch();

  let navigation = useNavigate();
  const dataHandler = (e) => {
    let value = e.target.value;
    let name = e.target.id;
    setUserData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  async function Submit(e) {
    e.preventDefault();
    let errorarray = [];
    if (userdata) {
      //usless if just to hide them all
      const regExpEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      // const regExppassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const regExppassword = /.*/;
      if (!regExpEmail.test(userdata.email)) {
        errorarray.push("please enter a valid email address");
        e.preventDefault();
      }
      if (!regExppassword.test(userdata.password)) {
        errorarray.push("please enter a valid password");
        e.preventDefault();
      }
    }
    let errorloop = errorarray.map((error, index) => {
      return <p key={index}> {error}</p>;
    });
    seterrormasge(errorloop);
    if (!errorloop.length) {
      try {
        let res = await axios.post("http://127.0.0.1:8000/api/login", {
          email: userdata.email,
          password: userdata.password,
        });
        if (res.status >= 200 && res.status < 300) {
          let token = res.data.data.token;
          let user = userdata.email;
          dispatch(login({ token, user }));
          navigation("/");
        }
      } catch (error) {
        if (error.response.status === 401) {
          setEmailError("wrong Pasword or Email");
        }
        console.log(error);
      }
    }
  }
  return (
    <>
      {" "}
      <Header />
      <div className="Main-form shadow">
        <div className={`popup-error ${errormasge.length && "show"}`}>
          {errormasge}
          <span className={errormasge.length && "show"}></span>
        </div>
        <form onSubmit={Submit}>
          <div className="input-box">
            <label htmlFor="email">Enter Email:</label>
            <input
              type="email"
              placeholder="Enter Email..."
              id="email"
              value={userdata.email}
              onChange={dataHandler}
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">Enter Password:</label>
            <input
              type="password"
              placeholder="Enter Password..."
              id="password"
              value={userdata.password}
              onChange={dataHandler}
            />
            {userdata.password.length < 8 && userdata.password.length > 0 && (
              <p>password must have 8 number and at least 1 char</p>
            )}
          </div>

          <Button variant="primary" type="submit">
            Log in
          </Button>
          {emailError && <div className="">{emailError}</div>}
        </form>
      </div>
    </>
  );
}
