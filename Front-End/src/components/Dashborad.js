import React from "react";
import TopBar from "./Top-Bar";
import SideBar from "./Side-Bar";
import "./DashBorad.css";
// import "./Signup.css";
import { Outlet, Route, Routes } from "react-router-dom";
export default function Dashborad() {
  return (
    <>
      <TopBar />
      <div className="content-flex ">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}
