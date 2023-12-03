import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Form";
export default function SignUp() {
  return (
    <>
      <Header />
      <Form
        operations={"Register"}
        endpoint={"register"}
        email={""}
        name={""}
        hasLocalStorge={true}
        styleRegister={true}
      />
    </>
  );
}
