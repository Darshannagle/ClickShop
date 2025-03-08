import React from "react";
import logo from "../Assets/e-commerce-logo-with-pointer-and-shopping-bag-free-vector-removebg-preview (1).png";
import { ImLocation } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
const Footer = () => {
  return (
    <>
      <div
        className="container-fluid "
        style={{ minHeight: "60vh", backgroundColor: "white" }}
      >
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center align-items-center">
            <img
              src={logo}
              className="img-fluid"
              style={{ width: "5rem", height: "5rem" }}
              alt="logo"
            />
          </div>
          <div className="col-lg-3">
            <div>
              <p>
                <span style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                  About Us
                </span>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div>
              <p>
                <span style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                  Quick Links
                </span>
              </p>
              <ul className="navbar-nav">
                <li className="nav-item">Home</li>
                <li className="nav-item ">Home</li>
                <li className="nav-item ">Home</li>
                <li className="nav-item ">Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <div>
              <p>
                <span style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                  Follow On
                </span>
              </p>
              <FaInstagram
                style={{
                  margin: "10px",
                  width: "2rem",
                  height: "2rem",
                  color: "purple",
                }}
              />
              <FaFacebook
                style={{
                  margin: "10px",
                  width: "2rem",
                  height: "2rem",
                  color: "blue",
                }}
              />
              <FaTwitter
                style={{
                  margin: "10px",
                  width: "2rem",
                  height: "2rem",
                  color: "black",
                }}
              />
              <FaLinkedinIn
                style={{
                  margin: "10px",
                  width: "2rem",
                  height: "2rem",
                  color: "blue",
                }}
              />

              <form action="#" method="post">
                <label
                  style={{
                    fontSize: "1.3rem",
                    marginTop: "1rem",
                    fontWeight: "450",
                  }}
                  htmlFor="email_subscribe"
                  className="footer-heading"
                >
                  Subscribe
                </label>
                <div className="col-sm">
                  <div className="form-group m-1">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword2"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary m-1">
                  Send
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-3">
            <div>
              <p>
                <span style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                  Contact Info
                </span>
              </p>
              <p>
                <ImLocation
                  style={{ color: "red", width: "1.2rem", height: "1.2rem" }}
                />{" "}
                203 Fake St. Mountain View, San Francisco, California, USA
              </p>
              <p>
                <FaPhone
                  style={{ color: "blue", width: "1.2rem", height: "1.2rem" }}
                />{" "}
                +777 2345 7886
              </p>
              <p>
                <IoMdMail
                  style={{ color: "yellow", width: "1.2rem", height: "1.2rem" }}
                />{" "}
                info@clickshop.com
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="d-flex align-content-center justify-content-center m-5">
            <p className="mx-auto"> Copyright ©2024 BY Darshan Nagle </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
