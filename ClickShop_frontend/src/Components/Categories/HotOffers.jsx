import React, { useState, useRef, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { IoArrowBack } from "react-icons/io5";
import { IoArrowForwardOutline } from "react-icons/io5";
import { toast } from "react-toastify";
// import { FaCartArrowDown } from "react-icons/fa";

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
};

const HotOffers = () => {
  const [fetchData, setFetchedData] = useState([]);
  const localData = localStorage.getItem('ecommerceUser');
  const userData = JSON.parse(localData)
  // useEffect(() => {
  //   const FetchedData = async () => {
  //     const response = await fetch("http://localhost:5000/api/offer");

  //     const responsejson = await response.json();
  //     if (response.status === 200) {
  //       console.log("success 200");
  //       setFetchedData(responsejson,"hot offers");
  //       console.log(responsejson);
  //     } else if (response.status == 400) {
  //       console.log("400");
  //     } else if (response.status == 500) {
  //       console.log("500");
  //     }
  //   };
  //   FetchedData();
  // }, []);

  const carousel = useRef(null);

  const items = fetchData.map((data) => (
    <div
      key={data.id}
      className="card mx-auto my-auto mt-3 mb-1"
      style={{ width: "90%", height: "90%", border: 0, maxHeight: "90%" }}
    >
      <div
        className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
        data-mdb-ripple-color="light"
      >
        <img
          src={data.thumbnail}
          className="w-100 d-flex mx-auto my-auto img-fluid rounded-2"
          style={{ maxWidth: "90%", maxHeight: "90%", objectFit: "contain" }}
          alt={data.title}
        />
        <a href="#!">
          <div className="hover-overlay">
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </div>
        </a>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h6 className="card-title mb-3">{data.title}</h6>
          <p>
            {" "}
            <i className="bi bi-star-fill text-warning"></i> {data.rating}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p>{data.brand}</p>
          <p>{data.category}</p>
        </div>
        <p style={{ fontSize: "0.9rem" }}>{data.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-3">${data.price}</h6>
          <div className="col-8 d-flex justify-content-center align-items-center">
            <button className="btn btn-dark rounded-0 text-warning" onClick={async (event) => {
    event.preventDefault();
    const requestData = {
      _id: data._id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.thumbnail,
      rate: data.rate,
      count: data.count,
      userId:userData._id,
      user:userData.fname,
    }
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
      if(response.status == 201){
        console.log("201 created cart")
        
      }else if(response.status == 200){
        
        toast.success("successfully added")
      }
      else if(response.status == 500){
        console.log("500")
        toast("error added")
      }else if(response.status == 400){
        console.log('400')
        toast("error added")
      }
        
      const responseData = await response.json();
      console.log("cart created:", responseData);
    } catch (error) {
      console.error("Error creating cart:", error.message);
    }
  }}>ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  ));

  return [
    <div
      className="container mb-5 rounded-3"
      style={{ border: "1px solid black" }}
    >
      <div className="row">
        <div
          className="col-lg-12 d-flex justify-content-between align-items-center"
          style={{ borderBottom: "1px solid grey" }}
        >
          <h4 className="text-danger m-1 mb-2">Hot Offer's</h4>
          <div key="btns" className="b-refs-buttons m-1 mb-2">
            <button
              style={{ border: 0, backgroundColor: "white" }}
              onClick={(e) => carousel?.current?.slidePrev(e)}
            >
              <IoArrowBack size={23} />
            </button>
            <button
              style={{ border: 0, backgroundColor: "white" }}
              onClick={(e) => carousel?.current?.slideNext(e)}
            >
              <IoArrowForwardOutline size={23} />
            </button>
          </div>
        </div>

        <div className="col-lg-12">
          <AliceCarousel
            key="carousel"
            mouseTracking
            infinite={true}
            autoPlay={true}
            autoPlayInterval={3000}
            disableDotsControls
            disableButtonsControls
            items={items}
            responsive={responsive}
            ref={carousel}
          />
          <nav key="nav" className="b-refs-navs">
            {items.map((item, i) => {
              return (
                <span key={i} onClick={() => carousel?.current?.slideTo(i)} />
              );
            })}
          </nav>
        </div>
      </div>
    </div>,
  ];
};

export default HotOffers;
