import React, { useState, useEffect } from "react";
import "./Mens.module.css";
import { Modal } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import Rating from "../../../Rating";
import { toast, ToastContainer } from 'react-toastify'
const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
};

const Womens = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewItem, setReviewItem] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [isReview, setIsReview] = useState(false);

  const [quantity, setQuantity] = useState(1);


  // const localData = localStorage.getItem('ecommerceUser');
  const localData = localStorage.getItem('user_id');
  // console.log("localData " + localData);
  const userData = JSON.parse(localData);
  // console.log("userData " +userData);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products/women's clothing");
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status === 200) {
        console.log("success 200 mensClothes");
        setFetchedData(responseJson);
        // calculateTotal(responseJson);
      } else if (response.status === 400) {
        console.log("400");
      } else if (response.status === 500) {
        console.log("500");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    
    fetchData();
  }, []);


  const handleCardClick = (index) => {
    setSelectedItem(fetchedData[index]);
    console.log("selected item :"
    );
    console.table(selectedItem)

    setIsModalOpen(true);
  };

  const Openreview = (index) => {
    setIsReview(true);
    setReviewItem(fetchedData[index]);
    console.log("review item :" + fetchedData[index].product_id);
    fetchReviews(fetchedData[index].product_id);
    console.log("review : " + fetchedData[index]);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchData();
    setQuantity(1);
  };
  const CloseReview = () => {
    setIsReview(false);
    fetchData();

    // setQuantity(1);
  };

  const fetchReviews = async (product_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/Review/${product_id} `);
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status === 200) {
        console.log("success 200 mensClothes");
        setReviews(responseJson);
      } else if (response.status === 400) {
        console.log("400");
      } else if (response.status === 500) {
        console.log("500");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };





  return (
    <>
      <div className="container-fluid">
        <ToastContainer />
        <div className="row">
          {fetchedData.map((item, index) => (
            <div
              key={item.id}
              className="col-lg-4 col-md-3  col-sm-12 col-xl-4 col-xxl-3 d-flex justify-content-start"
              style={{ height: "68vh" }}
            >
              <div
                className="card  mt-2 border-0 rounded-0 shadow"
                style={{ width: "18rem" }}
              >
                <img
                  src={item.image}
                  className="card-img-top rounded-2 mx-auto "
                  style={{ width: "65%", height: "40%" }}
                  alt="..."
                />
                <div
                  className="card-body m-0"
                  style={{ marginBottom: "-1rem" }}
                >
                  <h6 className="card-title">{item.title}</h6>

                  <div className="d-flex flex-row justify-content-around  m-0  p-0" style={{ fontSize: "0.7rem", width: "60%" }}>
                    <p>{item.rate}</p>
                    <Rating rate={item.rate} /> ( {item.rate_count} )
                  </div>
                  <div className="d-flex flexDirection-row justify-content-between">
                    {/* <p>{item.brand}</p> */}
                    <p style={{ fontSize: "0.8rem", margin: "0vh" }}>{item.category}</p>
                    <button className="btn m-0 p-1 btn-warning " onClick={() => { Openreview(index) }} style={{ fontSize: "11px" }}>Review</button>

                  </div>
                  <div style={{
                    height: "10vh", overflowY: "scroll", fontSize: "10px"
                  }}>
                    <p>{item.description}</p>
                  </div>
                </div>
                <div className="row align-items-center text-center g-0  mb-0">
                  <div className="col-4">
                    <h6>${item.price}</h6>
                    <p
                      className="text-danger text-center me-1"
                      style={{
                        fontSize: "2vh",
                        // marginBottom: 0,
                        fontWeight: "semibold",
                      }}
                    >
                      Left: {item.stock}
                    </p>
                  </div>
                  <div className="col-8  ">
                    <button
            disabled={ item.stock <= 0 ? true : false}

                      onClick={() => handleCardClick(index)}
                      className="btn btn-dark w-80 mb-2  p-2  rounded-2 text-warning"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal show={isModalOpen} size="xl" onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem ? selectedItem.title : ""}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "65vh" }}>
            <div className="row">
              {selectedItem && (
                <>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <img src={selectedItem.image} style={{ height: "60%", width: "60%" }} className="img-fluid d-flex mx-auto my-auto"></img>

                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="me-5">
                      <p>{selectedItem.title}</p>

                      <div className="d-flex justify-content-between">
                        <p>{selectedItem.category}</p>

                        <p>{selectedItem.rate}</p>
                      </div>
                      <p>{selectedItem.description}</p>
                      <p className="text-danger d-flex align-items-end">
                        Items Left {selectedItem.count}
                      </p>
                      <p className="fs-5 fw-bold">${selectedItem.price}</p>

                      <div className="container-fluid m-0 p-0"> Quantity :
                        <input type="number" style={{ textAlign: "center" }} value={quantity} id="quan" onChange={() => { setQuantity(document.getElementById("quan").value) }} /></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              style={{ width: "12rem"  }}
              onClick={async (event) => {

                event.preventDefault();
                if ((selectedItem.stock<=0) ||(selectedItem.stock-quantity)<0) {
                  toast.error("inefficient stock !! we will notify you when available!")
                  return;
                }
                const requestData = {
                  product_id: selectedItem.product_id,
                  quantity: quantity,
                  user_id: parseInt(localData)
                };
                console.table(requestData);
                try {
                  const response = await fetch(
                    "http://localhost:5000/api/Cart",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(requestData),
                    }
                  );
                  if (response.status == 201) {
                    console.log("201 created cart");
                    toast.success("item added to cart")
                    setIsModalOpen(false)
    fetchData();

                  } else if (response.status == 200) {
                    toast.success("successfully added");
                  } else if (response.status == 500) {
                    console.log("500");
                    toast("error added");
                  } else if (response.status == 400) {
                    console.log("400");
                    toast("error added");
                  }

                  const responseData = await response.json();
                  console.log("cart created:", responseData);
                } catch (error) {
                  console.error("Error creating cart:", error.message);
                  toast.error("error")
                }
              }}
              className="btn btn-dark rounded-0"
                  >
              <span className="text-warning" >Add to Cart</span>
            </button>
          </Modal.Footer>
        </Modal>

        {/* ========================Review================================  */}
        <Modal show={isReview} size="xl" onHide={CloseReview} style={{ fontSize: "1.3vw" }}>
          <Modal.Header closeButton>
            <Modal.Title>{reviewItem ? reviewItem.title : ""}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "75vh", padding: "2px" }}>
          <div className="col m-1"  >

          <div className="" style={{ overflowY: "scroll" ,height:"50vh", maxHeight:"50vh", flex:1}} > 
          {
                  reviews.map((review, index) => (

                    <div className="col d-flex flex-column"
                    // style={{ overflow:"scroll" }}
                    >
                      <div
                        // style={{ height: "60%" ,overflowY:"scroll"}}
                      >
                        {/* , border: "4px solid blue" */}
                        <div key={review.reivew_id} style={{ justifyContent: "start" }} className="card shadow rounded-2 m-1 h-10 w-80  p-0 d-flex flex-column  " >
                          <div className="d-flex flex-row justify-content-between align-items-start mb-0  "><p className="mt-2 ms-3">{review.username}</p> <p className="card p-1 mt-2 me-2 d-flex flex-row justify-content-around" > rate :   {review.rate} :  <Rating rate={review.rate} /></p> </div>
                          <div className="card p-2 mt-0 m-2  " ><p>{review.comment}</p></div>
                        </div>
                        {/* <hr></hr>  */}

                      </div>


                    </div>
                  ))
                }
          </div>
          <div>
          <hr style={{
                color: "black", border: "1px solid black"}} />
                
                <div style={{ justifyContent: "start", height:"20vh"  }} className="card shadow rounded-2 m-2 mb-0  w-80 h-6 p-0 d-flex flex-column  " >
                <div className="d-flex flex-row justify-content-between align-items-start mb-0  "><p className="mt-2 ms-3">{localStorage.getItem("ecommerceUser")}</p>
                 {/* <p className="card p-1 mt-2 me-2 d-flex flex-row justify-content-around" > rate :    :  </p> */}
                 <select  id="rate"  className="dropdown mt-2 me-3  text-center" style={{width:"5vh", height:"3vh", fontSize:"12px"
                 }}
                //  value={rating} onChange={handleRatingChange}
                 >
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
          <option value="4"> 4 </option>
          <option value="5"> 5 </option>
        </select>
                  </div>
                <div className="card  mt-0 m-1"  >
                  <textarea rows={3}  id="comment" className="  p-1"         placeholder="Enter your comment here"
></textarea>
                </div>
              </div>
            
                
                
                </div>

          </div>
          
          </Modal.Body>
          <Modal.Footer>
            <button
              style={{ width: "12rem" }}
              onClick={async (event) => {
                event.preventDefault();

                const requestData = {
                  product_id: reviewItem.product_id,
                  comment:document.getElementById("comment").value,
                  rate :document.getElementById("rate").value,
                  username:localStorage.getItem("ecommerceUser")

                };
                console.table(requestData);
                try {
                  const response = await fetch(
                    "http://localhost:5000/api/Review",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(requestData),
                    }
                  );
                  if (response.status == 201) {
                    console.log("201 created cart");
                    toast.success("reivew added ")
                    setTimeout(() => {
window.location.reload();
                    }, 2000);
                    // setIsModalOpen(false)

                  } else if (response.status == 200) {
                    toast.success("review added successfully");
                    CloseReview();
                  } else if (response.status == 500) {
                    console.log("500");
                    toast("error added");
                  } else if (response.status == 400) {
                    console.log("400");
                    toast("error added");
                  }

                  const responseData = await response.json();
                  console.log("cart created:", responseData);
                } catch (error) {
                  console.error("Error creating cart:", error.message);
                  toast.error("error")
                }
              }}
              className="btn btn-dark rounded-1"
            >
              <span className="text-warning">Submit</span>
            </button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  );
};

export default Womens;
