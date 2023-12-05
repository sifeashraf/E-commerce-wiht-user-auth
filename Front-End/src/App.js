import React from "react";
import "./App.css";
import Users from "./components/Dash_Borad/users/Users";
import SignUp from "./components/Access_Operations/SignUp";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Dashborad from "./components/Dash_Borad/Dashborad";
import UpdateUser from "./components/Dash_Borad/users/UpdateUser";
import Creatusser from "./components/Dash_Borad/users/CreatUser";
import AuthRequird from "./components/Access_Operations/AuthRequird";
import PersistLogin from "./components/Access_Operations/PersistLogin";
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
    element: <PersistLogin />,
    children: [
      {
        element: <AuthRequird />,
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
          { path: "/product/buy/:id", element: <ProductBuy /> },
          { path: "product/mylist", element: <MyList /> },
        ],
      },
    ],
  },
]);
