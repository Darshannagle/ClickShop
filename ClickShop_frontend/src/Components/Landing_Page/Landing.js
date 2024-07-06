import React, { useState, useEffect } from 'react';
// import img1 from '../Assets/carouselimage5.jpg';
// import img2 from '../Assets/carouselimage6.jpg';
import img3 from '../Assets/carouselimalemage1.jpg';
import img4 from '../Assets/carouselIphone2.jpg';
import img5 from '../Assets/carouselrealme2.jpg';
import img6 from '../Assets/carouselimagepowerbank.jpg';

const images = [ img3, img4, img5, img6];

const Landing = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='container-fluid mt-3'>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`} >
              <img src={image} style={{ maxHeight: "90vh" }} className="d-block w-100 rounded-2" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev" onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next" onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Landing;
