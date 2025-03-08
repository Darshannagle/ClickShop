import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";




const YourOrders = () => {
  
  const [fetchedData, setFetchedData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate()
useEffect(()=>{
  if(!localStorage.getItem("ecommerceUser")){
    navigate('/login')
  }
})
// const localData = localStorage.getItem('ecommerceUser');
const localData =parseInt( localStorage.getItem('user_id'));

const userData = JSON.parse(localData)

const fetchOrders = async () => {
  try {
    // `http://localhost:5000/api/order/${userData.fname}/${userData._id}`
    const response = await fetch(`http://localhost:5000/api/Order/${userData}`);
    if (response.status === 200) {
      console.log("success 200 orders");
      const responseJson = await response.json();
      console.log(responseJson);

      setFetchedData(responseJson);
      calculateTotal(responseJson)
    } else if (response.status === 400) {
      console.log("error 400 order");
    } else if (response.status === 500) {
      console.log("error 500 orders");
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};
  useEffect(() => {
    
    fetchOrders();
  }, [userData.fname]);

  const calculateTotal = (fetchedData) => {
    var totalPrice = 0;
    fetchedData.forEach(item => {
        totalPrice+=item.product.price*item.quantity;
       });

  console.log(fetchedData, "fetched data");

const deleteOrder = async (id)=>{
  if (window.confirm("really want to delete order ?")) {
    
  
  const response = await fetch(`http://localhost:5000/api/Order/delete:${id}`,{
    method: "DELETE",
    headers:{
      "Content-Type": "application/json",
    },
  });

  if (response.status == 200) {
    fetchOrders();

    console.log(" Order deleted  ");

    toast(" Order deleted ");




  } else if (response.status == 400) {
    console.log("error 400  ");
    toast.error("400:error  whie deleting Order");

  } else if (response.status == 500) {
    console.log("error 500 all items deleted and oredrs");
    toast.error("500: error  whie deleting Order");

  }
}

  
};



  return (
    <>
      <div className="bg-light container mt-5 pb-5 rounded-4">
        <div className="row">
            <p className="fs-4 m-3 text-success">Your Order:</p>
            <p className="fs-4 m-3 text-success ">${totalAmount}</p>
            
          {fetchedData.map((item, index) => (
            
            <div className="col-md-6" key={index}>
              <div
                className="row m-1 d-flex justify-content-center align-items-center p-1"
                style={{
                    border: "1px solid black",
                    borderRadius: "10px",
                    height: "240px",
                }}
              >

                <div className="col-3">
                  <img
                    className="img-fluid mx-auto my-auto d-flex"
                    style={{ width: "100%", height: "45%" }}
                    alt=""
                    src={item.product.image}
                  />
                </div>
                <div className="col-9">
                  <table style={{backgroundColor:"transparent", padding:"1vh"}} className=" table ">
                    {/* <tbody> */}
                    <tr style={{padding:"50px"}} ><td className="fw-semibold">Name:</td><td>  {item.product.title}</td></tr>
                    <tr><td  className="fw-semibold">Rate :</td><td>{item.product.rate}</td></tr>
                    <tr><td  className="fw-semibold">Price:</td><td>$ {item.product.price}</td></tr>
                    <tr><td  className="fw-semibold">Status:</td><td ><span className="text-white rounded-1  p-1    bg-primary"> {item.status}</span></td></tr>
                    <tr><td  className="fw-semibold">Total:</td><td ><span className="text-white rounded-1  p-1    bg-primary"> {item.total}</span></td></tr>
                 
                    {/* <tr><td></td><td></td></tr> */}
                    {/* </tbody> */}
                 
                  </table>

                  <p>
                  
                  </p>
                  <p>  </p>
                  <p>
                     
                  </p>
                  <div className="d-flex flex-row justify-content-start">
                  {/* <p className="text-success">Order Placed!!!!</p> */}
                   {/* <p className="text-white rounded-1 ms-2 ps-1 pe-1 pt-0.5 pb-0.7  bg-primary ">{item.status}</p> */}
                   <p  className="text-end">{item.datetime}</p> 
                   <br/>

                </div>
                <button className="text btn btn-danger" onClick={()=>{ deleteOrder(item.order_id)}} >Cancel</button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
};

export default YourOrders;
