import React, { useEffect, useState } from "react";
import "./Cart.module.css";
import "react-toastify/ReactToastify.css";
import { BsFillForwardFill } from "react-icons/bs";
import { SiPhonepe } from "react-icons/si";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { FaHandHoldingUsd } from "react-icons/fa";
import { LiaCcVisa } from "react-icons/lia";
import { SiPaytm } from "react-icons/si";
import { TfiWallet } from "react-icons/tfi";
import { FaAmazonPay } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartisEmpty from "../Assets/Cart-empty.gif";
import { toast, ToastContainer } from "react-toastify";
const Cart = () => {
  const [fetchedData, setFetcedData] = useState([]);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("ecommerceUser")) {
      // navigate("/login");
      toast.info("Please Login !");
    }
  });
  const localData = localStorage.getItem("user_id");
  const userData = JSON.parse(localData);
  const handleCouponCode = () => {
    setShowCouponInput(!showCouponInput);
  };
  const FetchedDataApi = async () => {
    const response = await fetch(
      // `http://localhost:5000/api/Cart/${userData.fname}/${userData._id}`
      `http://localhost:5000/api/Cart/${parseInt(userData)}`
    );
    console.log(userData);
    if (response.status == 200) {
      const responseJson = await response.json();
      console.log("success 200 cart");
      setFetcedData(responseJson);
      console.log(responseJson);
      calculateTotal(responseJson);
    } else if (response.status == 400) {
      console.log("400");
    } else if (response.status == 500) {
      console.log("500");
    }
  };
  useEffect(() => {
    FetchedDataApi();
  }, [userData]);
  const calculateTotal = (data) => {
    var totalPrice = 0;
    data.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    setTotalAmount(totalPrice);
  };
  const handleCheckout = async (e) => {
    e.preventDefault();
    // profileOrders();

    const reqbody =
      fetchedData.length !== 0 &&
      fetchedData.map((item) => ({
        // title: item.title,
        // rate: item.rate,
        // price: item.price,
        // image: item.image,
        // userId: userData._id,
        // user: userData.fname,
        product_id: item.product.product_id,
        user_id: parseInt(localStorage.getItem("user_id")),
        quantity: item.quantity,
        total: parseInt(item.product.price * item.quantity),
      }));
    console.log(reqbody, "reqbody");
    const response = await fetch("http://localhost:5000/api/Order", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqbody),
    });

    if (response.status == 200) {
      handleCartItemDelete();
      FetchedDataApi();
      console.log("success cart post orders 200");
      toast.success("Order Placed Successfully");
    } else if (response.status == 201) {
      handleCartItemDelete();
      FetchedDataApi();
      console.log("success 201 orders");
      console.log(await response.json());
    } else if (response.status == 400) {
      console.log("error 400 orders");
    } else if (response.status == 500) {
      console.log("error 500 orders");
    }
  };

  const profileOrders = async () => {
    const reqBody = {
      // userId: userData?._id,
      // user: userData?.fname,
      // itemName: fetchedData.map((item) => item.title),
      // price: fetchedData.map((item) => item.price),
      // total: totalAmount,
      // address: userData.address,
    };
    // "http://localhost:5000/api/finalorders"
    const response = await fetch("http://localhost:5000/api/Order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    if (response.status == 200) {
      console.log("success 200 profile order");
    } else if (response.status == 400) {
      console.log("error 400 profile order");
    } else if (response.status == 500) {
      console.log("error 500 profile order");
    }
  };

  const handleCartItemDelete = async () => {
    const ids = fetchedData.map((item) => {
      return item._id;
    });
    const response = await fetch(`http://localhost:5000/api/Cart/${ids}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 200) {
      console.log("all items deleted and oredrs");
    } else if (response.status == 400) {
      console.log("error 400 all items deleted and oredrs");
    } else if (response.status == 500) {
      console.log("error 500 all items deleted and oredrs");
    }
  };
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/Cart/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status == 200) {
      console.log("item deleted");
      FetchedDataApi();
      toast.error("item removed");
      // window.location.reload();
      navigate("/Cart");
    } else if (response.status == 400) {
      console.log("error 400 delete item cart");
    } else if (response.status == 500) {
      console.log("error 500 delete id cart");
    }
  };
  const deleteAll = async () => {
    const response = await fetch("http://localhost:5000/api/Cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status == 200) {
      FetchedDataApi();

      console.log("All item deleted");
      toast.error("All item removed");

      // window.location.reload();
      setTimeout(() => {
        // toast.success("All Items are Removed")
        navigate("/Cart");
      }, 2000);
    } else if (response.status == 400) {
      console.log("error 400 delete item cart");
    } else if (response.status == 500) {
      console.log("error 500 delete id cart");
    }
  };

  return (
    <>
      <div className="container-fluid mt-5 mb-5">
        <ToastContainer />
        <div className="row">
          <div className="col-lg-8">
            <section
              className="card shadow"
              style={{ backgroundColor: "white", borderRadius: "1vh" }}
            >
              <h3
                className="text-left m-1 p-2"
                style={{ fontFamily: "Roboto" }}
              >
                Cart Items:
              </h3>
              {fetchedData.length !== 0 ? (
                <>
                  <div className="d-flex justify-content-end mt-3 ">
                    <button
                      className="me-5 p-1  btn d-flex  shadow"
                      onClick={() => {
                        deleteAll();
                      }}
                      style={{
                        width: "7%",
                        border: "2px solid darkred",
                        backgroundColor: "red",
                        color: "white",
                        height: "60px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MdRemoveShoppingCart className="me-2 mb-1 " size={20} />
                      {/* <span className="fs-5">Remove All</span> */}
                    </button>
                  </div>{" "}
                  <div className="container py-3">
                    {fetchedData.map((data, index) => (
                      <div
                        key={index}
                        className="row justify-content-center mb-3"
                      >
                        <div className="col-md-12 col-xl-10">
                          <div className="card shadow-0 border rounded-3">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                  <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                    <img
                                      src={data.product.image}
                                      className="img-fluid "
                                    />
                                    <a href="#!">
                                      <div className="hover-overlay">
                                        <div
                                          className="mask"
                                          style={{
                                            backgroundColor:
                                              "rgba(253, 253, 253, 0.15)",
                                          }}
                                        ></div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-6 col-xl-6">
                                  <h6>{data.product.title}</h6>
                                  <div className="d-flex flex-row">
                                    <div className="text-danger mb-1 me-2">
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                    </div>
                                  </div>

                                  <p
                                    style={{ fontSize: "0.8rem" }}
                                    className=" mb-4 mb-md-0"
                                  >
                                    {data.product.description}
                                  </p>
                                </div>
                                <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                  <div className="d-flex flex-row align-items-center mb-1">
                                    <h4 className="mb-1 me-1">
                                      {/* $ */}$ {data.product.price}
                                    </h4>
                                    <span className="text-danger">
                                      {/* <s>$20.99</s> */}
                                    </span>
                                  </div>
                                  <h6 className="text-success">
                                    Free shipping
                                  </h6>
                                  <div className="mb-3 d-flex flexDreciotn-row">
                                    <label
                                      for="exampleFormControlInput1"
                                      className="form-label me-3"
                                    >
                                      Count:
                                    </label>
                                    <input
                                      type="number"
                                      min={0}
                                      max={5}
                                      value={data.quantity}
                                      className="form-control w-50"
                                      id="exampleFormControlInput1"
                                    />
                                  </div>
                                  <div className="d-flex justify-content-end">
                                    <button
                                      className="btn btn-outline-danger"
                                      color="red"
                                      onClick={() => handleDelete(data.item_id)}
                                    >
                                      Remove Item
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={CartisEmpty}
                    className="img-fluid d-flex mx-auto my-auto"
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                  <p className="text-center text-danger fs-4 fw-bold">
                    Cart Is Empty!!!
                  </p>
                </>
              )}
            </section>
          </div>
          <div className="col-lg-4">
            <div
              className="bg-primary p-3 text-white w-100 rounded-3 h-100 mt-1"
              style={{ maxHeight: "100vh", width: "80%" }}
            >
              <h3 className="text-center mt-3">Checkout Here</h3>

              <h4>Total Items:</h4>
              <div
                className="mb-4"
                style={{ overflowY: "auto", height: "20vh" }}
              >
                <ul className="list-unstyled ms-2 p-1 fs-5" data-spy="scroll">
                  {fetchedData.length !== 0 ? (
                    fetchedData.map((item, index) => (
                      <p
                        className=" fs-6 card pt-3 d-flex flex-row bg-primary row"
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          borderColor: "white",
                        }}
                        key={index}
                      >
                        {/* <span className="fw-bold fs-5 "></span>{" "} */}
                        <p className="col-8"> {item.product.title} </p>{" "}
                        <p className="col-1">:</p>
                        <p className="col-3"> ${item.product.price}</p>
                      </p>
                    ))
                  ) : (
                    <p>Cart is Empty</p>
                  )}
                </ul>
              </div>
              <p className="fs-7   mb-3" style={{ fontFamily: "monospace" }}>
                Total Ammount: <FaRupeeSign color="white" />
                <span className="text" style={{ fontFamily: "monospace" }}>
                  {totalAmount == NaN ? 0 : totalAmount}
                </span>
              </p>
              <div className="form-check mb-3">
                <input
                  className="form-check-input "
                  type="checkbox"
                  value=""
                  id="couponbox"
                  onClick={handleCouponCode}
                />
                <label className="form-check-label" htmlFor="couponbox">
                  Apply Coupon
                </label>
                <div
                  className={`mb-3 mt-2 w-75 ${
                    showCouponInput ? "" : "d-none"
                  }`}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="couponInput"
                    placeholder="Coupon code"
                  />
                </div>
              </div>
              <h4>Payment Options:</h4>
              <form>
                <div class="form-check m-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    <SiPhonepe /> UPI
                  </label>
                </div>
                <div class="form-check m-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                  />
                  <label class="form-check-label" for="exampleRadios2">
                    <FaHandHoldingUsd /> Pay on Delivery
                  </label>
                </div>
                <div class="form-check m-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios3"
                    value="option3"
                  />
                  <label class="form-check-label" for="exampleRadios3">
                    <BsFillCreditCard2FrontFill /> Debit Card
                  </label>
                </div>
              </form>

              <button
                onClick={handleCheckout}
                className="btn d-flex mx-auto btn-outline-dark mt-4 w-75 rounded-0"
                disabled={fetchedData.length == 0 ? true : false}
              >
                <span
                  className="text-center"
                  style={{
                    fontWeight: "bold",
                    padding: "5px",
                    fontSize: "1.3rem",
                    textAlign: "center",
                    marginLeft: "1rem",
                  }}
                >
                  Checkout{"  "}
                  <BsFillForwardFill size={26} />
                </span>
              </button>
              <div className="d-flex flexDirection-column  justify-content-between ms-5 me-5 mt-4">
                <SiPaytm size={24} />
                <LiaCcVisa size={24} />
                <TfiWallet size={24} />
                <FaAmazonPay size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
