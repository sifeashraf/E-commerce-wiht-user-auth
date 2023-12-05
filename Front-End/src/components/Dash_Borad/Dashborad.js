import React from "react";
import TopBar from "../Re-usable_components/Top-Bar";
import SideBar from "../Re-usable_components/Side-Bar";
import "./DashBorad.css";
import { Outlet } from "react-router-dom";
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
