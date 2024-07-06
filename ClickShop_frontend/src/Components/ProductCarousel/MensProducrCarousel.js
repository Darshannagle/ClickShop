import React from "react";
import bgimg from "./Assets/menscarousel.jpg";
import { NavLink } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import img from "../Assets/carouselIphone2.jpg";
import img1 from "../Assets/carouselrealme2.jpg";

const items = [
  // images.map((itm)=>{
  // return(

  <div className="card m-2">
  <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" className="card-img-top" alt="Fissure in Sandstone"/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#!" className="btn btn-primary" data-mdb-ripple-init>Button</a>
  </div>
</div>,
  <div className="card m-2">
  <img src={img} className="card-img-top" alt="Fissure in Sandstone"/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#!" className="btn btn-primary" data-mdb-ripple-init>Button</a>
  </div>
</div>,
 <div className="card m-2">
 <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" className="card-img-top" alt="Fissure in Sandstone"/>
 <div className="card-body">
   <h5 className="card-title">Card title</h5>
   <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
   <a href="#!" className="btn btn-primary" data-mdb-ripple-init>Button</a>
 </div>
</div>,
 <div className="card m-2">
 <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" className="card-img-top" alt="Fissure in Sandstone"/>
 <div className="card-body">
   <h5 className="card-title">Card title</h5>
   <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
   <a href="#!" className="btn btn-primary" data-mdb-ripple-init>Button</a>
 </div>
</div>,
  <div className="card m-2">
  <img src={img} className="card-img-top" alt="Fissure in Sandstone"/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#!" className="btn btn-primary" data-mdb-ripple-init>Button</a>
  </div>
</div>,
 <div className="card m-2">
 <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" className="card-img-top" alt="Fissure in Sandstone"/>
 <div className="card-body">
   <h5 className="card-title">Card title</h5>
   <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
   <a href="#!" className="btn btn-primary" data-mdb-ripple-init>Button</a>
 </div>
</div>,
  <div className="card m-2">
  <img src={img1} className="card-img-top" alt="Fissure in Sandstone"/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#!" className="btn btn-primary" data-mdb-ripple-init>Button</a>
  </div>
</div>

  //  )
  //  })
  //  <img style={{width:"80%",height:"20%"}} className="img-fluid" src={} onDragStart={handleDragStart} role="presentation" />,
  //  <img style={{width:"80%",height:"20%"}} className="img-fluid" src={} onDragStart={handleDragStart} role="presentation" />,
];

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const MensProductCarousel = () => {
 
  return (
    <>
      <div
        className="container-fluid d-none d-lg-flex d-xxl-none justify-content-center  mt-4 float-end"
        style={{ width: "20vw", height: "10vh", backgroundColor: "skyblue" }}
      >
        <h3 className="text-white  my-auto">Mens Wear</h3>
      </div>
      <br />
      <br />

      <div className="container-fluid mt-5 ">
        <div className="row">
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
          <div className="col-lg-4 col-12">
            <div className="p-3">
              <div
                className="img-fluid img-fluid d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundImage: `url(${bgimg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "75vh",
                }}
              >
                <h2 className="text-white">Men's</h2>
                <p style={{ fontSize: "large" }}>
                  <NavLink className="text-white text-decoration-none border-bottom">
                    Discover More
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MensProductCarousel;
