import React,{useEffect} from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import img from "../Assets/carouselrealme2.jpg";
import img1 from "../Assets/carouselIphone2.jpg";
import HotOffers from "./HotOffers";
import "./Categories.module.css";

const handleDragStart = (e) => e.preventDefault();

const Categories = () => {
  const navigate = useNavigate()
  // useEffect(()=>{
  //   if(!localStorage.getItem("ecommerceUser")){
  //     navigate('/login')
  //   }
  // })
  const location = useLocation();
  const items = [
    <img
      style={{ width: "80%", maxHeight: "50vh" }}
      className="img-fluid mx-auto d-flex"
      src={img}
      onDragStart={handleDragStart}
      role="presentation"
      alt="/"
    />,
    <img
      style={{ width: "80%", maxHeight: "50vh" }}
      className="img-fluid mx-auto mx-auto d-flex"
      src={img1}
      onDragStart={handleDragStart}
      role="presentation"
      alt=""
    />,
    <img
      style={{ width: "80%", maxHeight: "50vh" }}
      className="img-fluid mx-auto mx-auto d-flex"
      src={img}
      onDragStart={handleDragStart}
      role="presentation"
      alt=""
    />,
  ];

  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };

  const itemsImages = [
    <img
      className="img-fluid w-75 h-75 mx-auto my-auto d-flex"
      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
      alt=""
    />,
    <img
      className="img-fluid w-75 h-75 mx-auto my-auto d-flex"
      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/3.webp"
      alt=""
    />,
    <img
      className="img-fluid w-75 h-75 mx-auto my-auto d-flex"
      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp"
      alt=""
    />,
  ];
  return (
    <>
      <div
        className="modal fade mt-5"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered  modal-xl h-75 "
          style={{
            minWidth: "75%",
            minHeight: "80vh",
            maxHeight: "80vh",
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6">
                  {
                    <AliceCarousel
                      disableButtonsControls={true}
                      responsive={responsive}
                      controlsStrategy="responsive"
                      autoPlay={true}
                      autoPlayInterval={2000}
                      infinite={true}
                      animationType="fadeout"
                      mouseTracking
                      items={itemsImages}
                    />
                  }
                </div>
                <div className="col-lg-6">
                  <p className="m-1 me-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-lg-3 bg-light  border-1 ">
            <HotOffers />

            <h4
              className="bg-primary text-white text-center mx-auto my-auto"
              style={{ width: "15rem", height: "2.5rem",padding:"1vh" , borderRadius:"1vh" }}
            >
              ALL CATEGORIES
            </h4>

            <div
              className="accordion mt-5"
              id="accordionExample"
              style={{ width: "100%" }}
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Clothes
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body  ">
                    <NavLink
                      className="text-decoration-none fs-5 text-warning linkH fw-semibold"
                      to="/categories/Mens"
                    >
                      {" "}
                      Mens's
                    </NavLink>
                  </div>
                  <div className="accordion-body">
                    <NavLink
                      className="text-decoration-none fs-5 text-warning linkH fw-semibold"
                      to="/categories/Womens"
                    >
                      Women's
                    </NavLink>
                  </div>
                  {/* <div className="accordion-body">
                    <NavLink
                      className="text-decoration-none fs-5 text-warning fw-semibold"
                      to="/categories/Shirts"
                    >
                      Kid's
                    </NavLink>
                  </div> */}
                 
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Mobile
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <NavLink
                      className="text-decoration-none fs-5 text-warning fw-semibold"
                      to="/categories/Mobiles"
                    >
                      Mobiles
                    </NavLink>
                  </div>
 
                </div>
              </div>
              <div className="accordion-item">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Jewellery
                  </button>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <NavLink
                      className="text-decoration-none fs-5 text-warning fw-semibold"
                      to="/categories/Jewellery"
                    >
                      Jewellery
                    </NavLink>
                  </div>
 
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Mobile Accessaries
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <NavLink
                      className="text-decoration-none fs-5 text-warning fw-semibold"
                      to="/categories/Covers"
                    >
                      Mobile Covers
                    </NavLink>{" "}
                  </div>
                  <div className="accordion-body">
                    <NavLink
                      className="text-decoration-none fs-5 text-warning fw-semibold"
                      to="/categories/Pbank"
                    >
                      Power Bank
                    </NavLink>{" "}
                  </div>
                  <div className="accordion-body">
                    <NavLink
                      className="text-decoration-none fs-5 text-warning fw-semibold"
                      to="/categories/Chargers"
                    >
                      Chargers
                    </NavLink>{" "}
                  </div>
                  <div className="accordion-body">
                    <NavLink
                      className="text-decoration-none fs-5 text-warning fw-semibold"
                      to="/categories/Glass"
                    >
                      Glasses
                    </NavLink>{" "}
                  </div>
                </div>
              </div>
              </div>
          </div>

          <div className="col-lg-9 border-1 p-0">
            <div className="w-100 mx-auto mb-5 my-auto mt-5 p-0">
              <AliceCarousel
                disableButtonsControls={true}
                responsive={responsive}
                controlsStrategy="responsive"
                autoPlay={true}
                autoPlayInterval={2000}
                infinite={true}
                animationType="fadeout"
                mouseTracking
                items={items}
              />
            </div>

            <d  iv className="col-12 bg-light">
              {location.pathname !== "/categories/" &&
                !location.pathname.startsWith("/categories/") && (
                  <section style={{ backgroundColor: "#eee" }}>
                    <div className="container py-5">
                      <div className="row">
                        <div className="col-md-12 col-lg-4 mb-4 mb-lg-0">
                          <div className="card">
                            <div className="d-flex justify-content-between p-3">
                              <p className="lead mb-0">Today's Combo Offer</p>
                              <div
                                className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                style={{ width: "35px", height: "35px" }}
                              >
                                <p className="text-white mb-0 small">x4</p>
                              </div>
                            </div>
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
                              className="card-img-top"
                              alt="Laptop"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            />
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <p className="small">
                                  <a href="#!" className="text-muted">
                                    Laptops
                                  </a>
                                </p>
                                <p className="small text-danger">
                                  <s>$1099</s>
                                </p>
                              </div>

                              <div className="d-flex justify-content-between mb-3">
                                <h5 className="mb-0">HP Notebook</h5>
                                <h5 className="text-dark mb-0">$999</h5>
                              </div>

                              <div className="d-flex justify-content-between mb-2">
                                <p className="text-muted mb-0">
                                  Available: <span className="fw-semibold">6</span>
                                </p>
                                <div className="ms-auto text-warning">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4 mb-md-0">
                          <div className="card">
                            <div className="d-flex justify-content-between p-3">
                              <p className="lead mb-0">Today's Combo Offer</p>
                              <div
                                className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                style={{ width: "35px", height: "35px" }}
                              >
                                <p className="text-white mb-0 small">x2</p>
                              </div>
                            </div>
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/7.webp"
                              className="card-img-top"
                              alt="Laptop"
                            />
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <p className="small">
                                  <a href="#!" className="text-muted">
                                    Laptops
                                  </a>
                                </p>
                                <p className="small text-danger">
                                  <s>$1199</s>
                                </p>
                              </div>

                              <div className="d-flex justify-content-between mb-3">
                                <h5 className="mb-0">HP Envy</h5>
                                <h5 className="text-dark mb-0">$1099</h5>
                              </div>

                              <div className="d-flex justify-content-between mb-2">
                                <p className="text-muted mb-0">
                                  Available: <span className="fw-semibold">7</span>
                                </p>
                                <div className="ms-auto text-warning">
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="far fa-star"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4 mb-md-0">
                          <div className="card">
                            <div className="d-flex justify-content-between p-3">
                              <p className="lead mb-0">Today's Combo Offer</p>
                              <div
                                className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                style={{ width: "35px", height: "35px" }}
                              >
                                <p className="text-white mb-0 small">x3</p>
                              </div>
                            </div>
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp"
                              className="card-img-top"
                              alt="Gaming Laptop"
                            />
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <p className="small">
                                  <a href="#!" className="text-muted">
                                    Laptops
                                  </a>
                                </p>
                                <p className="small text-danger">
                                  <s>$1399</s>
                                </p>
                              </div>

                              <div className="d-flex justify-content-between mb-3">
                                <h5 className="mb-0">Toshiba B77</h5>
                                <h5 className="text-dark mb-0">$1299</h5>
                              </div>

                              <div className="d-flex justify-content-between mb-2">
                                <p className="text-muted mb-0">
                                  Available: <span className="fw-semibold">5</span>
                                </p>
                                <div className="ms-auto text-warning">
                                  <i className="fa fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star-half-alt"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              <Outlet />
            </d>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
