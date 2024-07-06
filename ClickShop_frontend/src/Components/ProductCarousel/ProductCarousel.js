import React, { useState, useEffect } from "react";
import bgimg from "./Assets/womenscarousel.jpg";
import { NavLink } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { toast, ToastContainer } from "react-toastify";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const ProductCarousel = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const localData = localStorage.getItem('ecommerceUser');
  const userData = JSON.parse(localData)
  // useEffect(() => {
  //   const fectheddata = async () => {
  //     const response = await fetch("http://localhost:5000/api/womensCar");

  //     if (response.status === 200) {
  //       console.log("success 200 womens car");
  //       const responsejson = await response.json();
  //       setFetchedData(responsejson);
  //       console.log(responsejson);
  //     } else if (response.status === 400) {
  //       console.log("400 womens car");
  //     } else if (response.status === 500) {
  //       console.log("500 womens car");
  //     }
  //   };
  //   fectheddata();
  // }, []);

  const items = fetchedData.map((data) => (
    <div className="card m-2">
      <img
        src="https://preview.colorlib.com/theme/fashi/img/products/women-2.jpg.webp"
        className="card-img-top w-75 h-75 d-flex mx-auto my-auto"
        alt="Fissure in Sandstone"
      />
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{data.title}</h5>
          <p>
            <i className="bi bi-star-fill text-warning"></i> {data.rate}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p>{data.category}</p>
        </div>
        <div className="d-flex justify-content-end">
          <p className="text-danger">Left: {data.count}</p>
        </div>
        {/* <div style={{ height: "30%", width:"80%", overflowY: "scroll" }}>
  {data.description}
</div> */}
        <div className="d-flex justify-content-between align-items-center">
          <p>${data.price}</p>
          <button
            onClick={async (event) => {
              event.preventDefault();
              const requestData = {
                _id: data._id,
                title: data.title,
                price: data.price,
                description: data.description,
                category: data.category,
                image: data.image,
                rate: data.rate,
                count: data.count,
                userId:userData._id,
                user: userData.fname
              };
              try {
                const response = await fetch("http://localhost:5000/api/Cart", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(requestData),
                });
                if (response.status == 201) {
                  console.log("201 created cart");
                  toast.success("item added to cart")
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
              }
            }}
            className="btn btn-dark rounded-0"
          >
            <span className="text-warning"> Add To Cart</span>
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div
        className="container-fluid d-none d-xxl-none d-lg-flex justify-content-center  mt-4 float-start"
        style={{ width: "20vw", height: "10vh", backgroundColor: "skyblue" }}
      >
        <ToastContainer />
        <h3 className="text-white  my-auto">Womens Wear</h3>
      </div>
      <br />
      <br />

      <div className="container-fluid mt-5 pt-1">
        <div className="row">
          <div className="col-lg-4 col-12">
            <div className="p-3">
              <div
                className="img-fluid img-fluid d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundImage: `url(${bgimg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "85vh",
                }}
              >
                <h2 className="text-white">Women's</h2>
                <p>
                  <NavLink
                    to={"/categories/Womens"}
                    className="text-white text-decoration-none border-bottom"
                  >
                    Discover More
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-12 d-flex align-items-center">
            <AliceCarousel
              style={{ height: "50vh" }}
              responsive={responsive}
              controlsStrategy="responsive"
              autoPlay={true}
              autoPlayInterval={3000}
              infinite={true}
              disableDotsControls
              animationType="fadeout"
              mouseTracking
              items={items}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCarousel;
