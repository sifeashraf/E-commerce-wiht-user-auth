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

import { createBrowserRouter } from "react-router-dom";

export let router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  {
    element: <AuthRequird />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            path: "/dashborad",
            element: <Dashborad />,
            children: [
              { path: "user", element: <Users /> },
              { path: "user/:id", element: <UpdateUser /> },
              { path: "user/create", element: <Creatusser /> },
              { path: "product", element: <Products /> },
              { path: "product/create", element: <CreatProduct /> },
              { path: "product/:id", element: <UpdateProduct /> },
            ],
          },
        ],
      },
    ],
  },
]);
export function App() {
  return (
    <div className="App">
      {/* <Container>
        <Routes>
          <Route path="/" element={} />
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
      </Container> */}
    </div>
  );
}
