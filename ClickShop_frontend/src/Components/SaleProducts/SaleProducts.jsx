import React, { useEffect, useState } from "react";
import saleimg from "./Assets/saleproduct-removebg-preview.png";
import { FaRupeeSign } from "react-icons/fa";
const SaleProducts = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds < 60 ? prevSeconds + 1 : 0));
    }, 3000);

    return () => clearInterval(intervalId);
  });
  return (
    <>
      <div
        className="container mt-4"
        style={{
          backgroundColor: "rgba(244, 244, 171, 0.18)",
          minHeight: "80vh",
        }}
      >
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-around align-items-center">
            <div className="text-center ">
              <h2 className="mb-2">
                Deal{" "}
                <span style={{ borderBottom: "2px solid orange" }}>of the</span>{" "}
                Day
              </h2>
              <p className="m-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries
              </p>
              <h4 className="text-warning m-1">
                <FaRupeeSign />
                29,999{" "}
              </h4>
              <div className="row m-3">
                <h4 className="text-center">
                  {" "}
                  30 Hours : 11 Minutes : {seconds} Seconds
                </h4>
              </div>
              <button className="btn btn-warning w-25 rounded-0 m-2">
                Shop Now
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <img src={saleimg} className="img-fluid" alt="saleimg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleProducts;
