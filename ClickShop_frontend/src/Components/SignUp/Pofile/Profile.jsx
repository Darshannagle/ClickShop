import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [show, setShow] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  // const localData = localStorage.getItem("ecommerceUser");
  const localData = localStorage.getItem("user_id");

  const userData = JSON.parse(localData);
  const logout = () => {
    localStorage.clear("ecommerceUser");
    window.location.reload();
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  // window.addEventListener("load",()=>{getUser()});
  // useEffect(

  const getUser = async () => {
    if (localStorage.getItem("user_id")) {
      const response = await fetch(
        `http://localhost:5000/api/user/${parseInt(
          localStorage.getItem("user_id")
        )}`
      );
      console.log(response);
      if (response.status == 200) {
        console.log("success 200 all user orders");
        const responseJson = await response.json();
        console.log(responseJson);
        setUser(responseJson);
        console.log(user);
      } else if (response.status == 400) {
        console.log("error 400 get all user orders");
      } else if (response.status == 500) {
        console.log("error 500 get all user orders");
      }
    }
  };
  // ,[user]);
  useEffect(() => {
    getUser();
  }, [userData]);

  // if (show) {
  //   getUser();
  // }
  // );
  // console.log(userOrders);
  // useEffect(() => {
  //   getUser();
  // },[user]);

  // const getOrdersApi = async () => {
  //   const response = await fetch(
  //     `http://localhost:5000/api/finalorders/${userData.fname}/${userData._id}`
  //   );
  //   console.log(response)
  //   if (response.status == 200) {
  //     console.log("success 200 all user orders");
  //     const responseJson = await response.json();
  //     console.log(responseJson);
  //     setUserOrders(responseJson);
  //   } else if (response.status == 400) {
  //     console.log("error 400 get all user orders");
  //   } else if (response.status == 500) {
  //     console.log("error 500 get all user orders");
  //   }
  // };
  // console.log(userOrders);
  // useEffect(() => {
  //   getOrdersApi();
  // }, [userData.fname]);
  return (
    <>
      <div className={styles["modal-right"]}>
        <Modal
          dialogClassName="modal-dialog"
          centered={false}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {userData ? (
              <>
                <p>
                  Name: {user.fname} {user.lname}
                </p>
                <p>Phone No. : {user.number}</p>
                <p>
                  Address: {user.address},{user.pincode},{user.location}
                </p>
                <div className="row justify-content-center">
                  {/* <p className="fw-bold">Previous Orders:</p> */}
                  {userOrders.map((order, index) => (
                    <div key={index} className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Order {index + 1}</h5>
                      </div>
                      <div className="modal-body">
                        {order.itemName.map((itemName, i) => (
                          <div
                            key={i}
                            className="d-flex justify-content-between"
                          >
                            <p>{itemName}</p>
                            <p>{order.price[i]}</p>
                          </div>
                        ))}
                      </div>
                      <div className="modal-footer">
                        <p>Total: {order.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-outline-danger" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <center>Please Register or Login</center>
              </>
            )}{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
