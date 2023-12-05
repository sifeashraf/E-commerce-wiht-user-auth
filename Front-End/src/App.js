//import hook
import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

//import component
import Home from "./components/pages/Home";
import AuthRequird from "./components/Access_Operations/AuthRequird";
import PersistLogin from "./components/Access_Operations/PersistLogin";
//import css
import "./App.css";

let Users = lazy(() => import("./components/Dash_Borad/users/Users"));
let SignUp = lazy(() => import("./components/Access_Operations/SignUp"));
let Login = lazy(() => import("./components/Access_Operations/Login"));
let DashBoard = lazy(() => import("./components/Dash_Borad/DashBoard"));
let UpdateUser = lazy(() => import("./components/Dash_Borad/users/UpdateUser"));
let CreatUser = lazy(() => import("./components/Dash_Borad/users/CreatUser"));
let Products = lazy(() => import("./components/Dash_Borad/Products/Products"));
let CreatProduct = lazy(() => import("./components/Dash_Borad/Products/CreatProduct"));
let UpdateProduct = lazy(() => import("./components/Dash_Borad/Products/UpdateProduct"));
let ProductBuy = lazy(() => import("./components/Dash_Borad/Products/ProductBuy"));
let MyList = lazy(() => import("./components/Dash_Borad/Products/MyList"));

export let router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/register",
    element: (
      <Suspense fallback={"wait please"}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={"wait please"}>
        <Login />
      </Suspense>
    ),
  },
  {
    element: <PersistLogin />,
    children: [
      {
        element: <AuthRequird />,
        children: [
          {
            path: "/dashborad",
            element: <DashBoard />,
            children: [
              {
                path: "user",
                element: (
                  <Suspense fallback={"wait please"}>
                    <Users />
                  </Suspense>
                ),
              },
              {
                path: "user/:id",
                element: (
                  <Suspense fallback={"wait please"}>
                    <UpdateUser />
                  </Suspense>
                ),
              },
              {
                path: "user/create",
                element: (
                  <Suspense fallback={"wait please"}>
                    <CreatUser />
                  </Suspense>
                ),
              },
              {
                path: "product",
                element: (
                  <Suspense fallback={"wait please"}>
                    <Products />
                  </Suspense>
                ),
              },
              {
                path: "product/create",
                element: (
                  <Suspense fallback={"wait please"}>
                    <CreatProduct />
                  </Suspense>
                ),
              },
              {
                path: "product/:id",
                element: (
                  <Suspense fallback={"wait please"}>
                    <UpdateProduct />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "/product/buy/:id",
            element: (
              <Suspense fallback={"wait please"}>
                <ProductBuy />
              </Suspense>
            ),
          },
          {
            path: "product/mylist",
            element: (
              <Suspense fallback={"wait please"}>
                <MyList />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
