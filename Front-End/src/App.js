import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashborad from "./components/Dashborad";
import UpdateUser from "./components/UpdateUser";
import Creatusser from "./components/CreatUser";
import AuthRequird from "./components/AuthRequird";
import Container from "react-bootstrap/Container";
import PersistLogin from "./components/PersistLogin";
import Products from "./components/Dash_Borad/Products/Products";
import CreatProduct from "./components/Dash_Borad/Products/CreatProduct";
import UpdateProduct from "./components/Dash_Borad/Products/UpdateProduct";
import ProductBuy from "./components/Dash_Borad/Products/ProductBuy";
import MyList from "./components/Dash_Borad/Products/MyList";
export function App() {
  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AuthRequird />}>
            <Route element={<PersistLogin />}>
              <Route path="/dashborad" element={<Dashborad />}>
                <Route path="user" element={<Users />} />
                <Route path="user/:id" element={<UpdateUser />} />
                <Route path="user/create" element={<Creatusser />} />
                <Route path="product" element={<Products />} />
                <Route path="product/create" element={<CreatProduct />} />
                <Route path="product/:id" element={<UpdateProduct />} />
              </Route>
              <Route path="product/buy/:id" element={<ProductBuy />} />
              <Route path="product/mylist" element={<MyList />} />
            </Route>
          </Route>
        </Routes>
      </Container>
    </div>
  );
}
