import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import { MdCurrencyRupee } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import Logo from "../Assets/e-commerce-logo-with-pointer-and-shopping-bag-free-vector-removebg-preview (1).png";
import Profile from "../SignUp/Pofile/Profile";
const Header = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-dark"
        style={{ height: "4rem" }}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center my-auto ms-3">
            <p></p>
            <select
              className="bg-dark text-white"
              style={{ border: "none", width: "7rem" }}
            >
              <option value="INDIA">
                <MdCurrencyRupee
                  style={{ color: "white", backgroundColor: "white" }}
                />{" "}
                INDIA
              </option>
              <option value="USA">USA</option>
              <option value="CANADA">CANADA</option>
            </select>
            <p className="text-white my-auto ms-3"> +777 2345 7886 </p>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-none d-lg-flex justify-content-center"
            id="navbarNav"
          >
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />

              <button className="btn border-0" type="submit">
                <FaSearch style={{ color: "white" }} />
              </button>
            </form>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="/features">
                  Wish List
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/pricing">
                  Shopping
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link  text-white" href="/">
                  Checkout
                </a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/login">
                  {/* Login */}
                  {localStorage.getItem("ecommerceUser") != null
                    ? "Welcome," +
                      localStorage
                        .getItem("ecommerceUser")
                        .substring(
                          1,
                          localStorage.getItem("ecommerceUser").indexOf("@")
                        )
                    : "Login"}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav
        className="navbar shadow  sticky-top navbar-expand-lg "
        style={{
          backgroundColor: "white",
          paddingBottom: "0px",
          paddingTop: "0px",
        }}
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={Logo} alt="logo" width="100px" height="80px" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" style={{ color: "#333" }}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/categories"
                  style={{ color: "#333" }}
                >
                  Categories
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/" style={{ color: "#333" }}>
                  Contact
                </NavLink>
              </li>
            </ul>

            <div className="ms-auto">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item ms-1">
                  <NavLink
                    className="nav-link"
                    to="/order"
                    style={{ color: "#333" }}
                  >
                    Your Orders
                  </NavLink>
                </li>
                <li className="nav-item ms-2">
                  <NavLink
                    className="nav-link"
                    to="/Cart"
                    style={{ color: "#333" }}
                  >
                    <IoCartOutline
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </NavLink>
                </li>
                <li className="nav-item ms-2">
                  <button className="btn" onClick={toggleProfileModal}>
                    <MdAccountCircle
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </button>
                </li>
              </ul>
            </div>
            {showProfileModal && <Profile />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
