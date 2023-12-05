//import component
import TopBar from "../Re-usable_components/Top-Bar";
import SideBar from "../Re-usable_components/Side-Bar";
import { Outlet } from "react-router-dom";

//import css
import "./DashBorad.css";

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
