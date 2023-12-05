//import hook
import { useEffect, useState } from "react";

//import component
import { Link } from "react-router-dom";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { MdAddShoppingCart, MdShoppingCartCheckout } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";

export default function SideBar() {
  let [linkselemnt, setLinkElemnt] = useState();
  let [sideiconele, setSideiconele] = useState();
  useEffect(() => {
    setLinkElemnt(document.querySelector(".links"));
    setSideiconele(document.querySelector(".side-icon svg"));
  }, []);
  let triggeractivebar = () => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        linkselemnt.classList.remove("active");
        linkselemnt.classList.remove("deactive");
      }
    });
    if (linkselemnt.classList.contains("active")) {
      linkselemnt.classList.remove("active");
      linkselemnt.classList.add("deactive");
      sideiconele.style.transform = "rotate(-180deg)";
    } else {
      linkselemnt.classList.remove("deactive");
      linkselemnt.classList.add("active");
      sideiconele.style.transform = "rotate(0deg)";
    }
  };
  let triggesidebarelemnt = (e) => {
    let itemlinks = document.querySelectorAll(".item-link");
    itemlinks.forEach((item) => {
      item.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  return (
    <>
      <div className="side-bar">
        <Link to={"/dashborad/user"} className="item-link" onClick={(e) => triggesidebarelemnt(e)}>
          <FaUsers className="icon" /> users
        </Link>
        <Link
          to={"/dashborad/user/create"}
          className="item-link"
          onClick={(e) => triggesidebarelemnt(e)}>
          <FaUserPlus className="icon" /> new user
        </Link>
        <Link
          to={"/dashborad/product"}
          className="item-link"
          onClick={(e) => triggesidebarelemnt(e)}>
          <MdShoppingCartCheckout className="icon" /> Products
        </Link>
        <Link
          to={"/dashborad/product/create"}
          className="item-link"
          onClick={(e) => triggesidebarelemnt(e)}>
          <MdAddShoppingCart className="icon" /> New Product
        </Link>
      </div>
      <div className="sidebar-activation">
        <div className="links">
          <Link to={"/dashborad/user"} className="item-link">
            <FaUsers className="icon" /> users
          </Link>
          <Link to={"/dashborad/user/create"} className="item-link">
            <FaUserPlus className="icon" /> new user
          </Link>
          <Link
            to={"/dashborad/product"}
            className="item-link"
            onClick={(e) => triggesidebarelemnt(e)}>
            <MdShoppingCartCheckout className="icon" /> Products
          </Link>
          <Link
            to={"/dashborad/product/create"}
            className="item-link"
            onClick={(e) => triggesidebarelemnt(e)}>
            <MdAddShoppingCart className="icon" /> New Product
          </Link>
        </div>
        <div className="side-icon " onClick={() => triggeractivebar()}>
          <AiOutlineMenu className="icon" />
        </div>
      </div>
    </>
  );
}
