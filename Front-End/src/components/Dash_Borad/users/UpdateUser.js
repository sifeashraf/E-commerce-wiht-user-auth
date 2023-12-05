import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Form from "../../Re-usable_components/Form";
export default function UpdateUser() {
  let [userdata, setUserData] = useState({
    name: "",
    email: "",
  });
  let { id } = useParams();
  useEffect(() => {
    let request = async () => {
      try {
        let respone = await axios.get(`http://127.0.0.1:8000/api/user/showbyid/${id}`);
        setUserData({
          name: respone.data[0].name,
          email: respone.data[0].email,
        });
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }, []);

  return (
    <Form
      operations="Update"
      email={userdata.email}
      name={userdata.name}
      endpoint={`user/update/${id}`}
      naviGate={"/dashborad/user"}
      hasLocalStorge={false}
    />
  );
}
