import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Orders = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("ecommerceUser")) {
      navigate('/login');
    }
  }, []);

  const localData = parseInt(localStorage.getItem('user_id'));
  const userData = JSON.parse(localData);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/Order/${userData}`);
      if (response.status === 200) {
        const responseJson = await response.json();
        setFetchedData(responseJson);
        calculateTotal(responseJson);
      } else {
        console.log("Error fetching orders. Status: ", response.status);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userData.fname]);

  const calculateTotal = (data) => {
    let totalPrice = 0;
    data.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });
    setTotalAmount(totalPrice);
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/Order/delete:${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          fetchOrders();
          console.log("Order deleted");
          toast.success("Order deleted");
        } else {
          console.log(`Error deleting order. Status: ${response.status}`);
          toast.error(`Error deleting order. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("Error deleting order");
      }
    }
  };

  return (
    <div className="bg-light container mt-5 pb-5 rounded-4">
      <div className="row">
        <p className="fs-4 m-3 text-success">Your Orders:</p>
                <p className="fs-4 m-3 text-success"> total : <span className="fw-semibold " style={{fontFamily: ""}} >${totalAmount}</span> </p>
        {fetchedData.map((item, index) => (
          <div className="col-md-6" key={index}>
            <div className="row m-1 d-flex justify-content-center align-items-center p-1" style={{ border: "1px solid black", borderRadius: "10px", height: "240px" }}>
              <div className="col-3">
                <img className="img-fluid mx-auto my-auto d-flex" style={{ width: "100%", height: "45%" }} alt="" src={item.product.image} />
              </div>
              <div className="col-9">
                <table style={{ backgroundColor: "transparent", padding: "1vh" }} className="  ">
                  <tbody>
                    <tr><td className="fw-semibold">Name:</td><td>{item.product.title}</td></tr>
                    <tr><td className="fw-semibold">Rate:</td><td>{item.product.rate}</td></tr>
                    <tr><td className="fw-semibold">Price:</td><td>${item.product.price}</td></tr>
                    {/* <tr><td className="fw-semibold">Status:</td><td><span className="text-white rounded-1 p-1 bg-primary">{item.status}</span></td></tr> */}
                   
                    <tr><td className="fw-semibold">Quantity:</td><td><span >{item.quantity}</span></td></tr>
                                    <tr><td className="fw-semibold">Total:</td><td><span >${item.total}</span></td></tr>
                                    <tr><td colSpan={2}><span >{item.datetime}</span></td></tr>
                
                  </tbody>
                </table>
                <div className="d-flex flex-row justify-content-evenly">
                  <p className="text-success m-1 card btn  " >{item.status}</p>
                  <button className="text btn btn-danger" onClick={() => deleteOrder(item.order_id)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
