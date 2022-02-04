import React, { useEffect } from "react";
import "./header.css";
import login from "./Assets/login.png";
import signup from "./Assets/signup.png";

export default function Header() {


  function activateLink(e) {
    const slider = document.querySelector(".slider");
    const targetClassList = e.target.classList;
    const allLinks = document.querySelectorAll(".navlinks");

    allLinks.forEach((link) => {
      link.classList.remove("navlink-active");
    });
    targetClassList.add("navlink-active");

    const activeAnch = {
      width: e.target.getBoundingClientRect().width,
      left: e.target.getBoundingClientRect().left,
      right: e.target.getBoundingClientRect().right
    };

    slider.setAttribute("style", `left : ${activeAnch.left-30}px;width : ${activeAnch.width/2}px;transform : translateX(50%)`);
  }

  useEffect(() => {
    const firstLink = document.querySelector(".navlinks");
    const slider = document.querySelector(".slider");
    slider.setAttribute("style", `left : ${firstLink.getBoundingClientRect().left-30}px;width : ${firstLink.getBoundingClientRect().width/2}px;transform : translateX(50%)`);
  }, []);
  

  return (
    <div className="header">
      <div className="slider"></div>
      <div className="navbar">
        <div className="navbar-left">
          <h3 className="logo">Online Class Helper</h3>
        </div>

        <div className="navbar-right">
          <ul className="navlist">
            <li
              className="navlinks navlink-active"
              onClick={(e) => activateLink(e)}
            >
              Next Class
            </li>
            <li className="navlinks" onClick={(e) => activateLink(e)}>
              Time-Table
            </li>
            <li className="navlinks" onClick={(e) => activateLink(e)}>
              Attendance
            </li>
            <li className="navlinks" onClick={(e) => activateLink(e)}>
              Login
            </li>
            <li className="navlinks" onClick={(e) => activateLink(e)}>
              Signup
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
