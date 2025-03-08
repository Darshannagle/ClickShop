import React,{useEffect} from 'react'
import Landing from '../Landing_Page/Landing'
import ProductCarousel from '../ProductCarousel/ProductCarousel'
import MensProductCarousel from '../ProductCarousel/MensProducrCarousel'
import SaleProducts from '../SaleProducts/SaleProducts'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  // useEffect(()=>{
  //   if(!localStorage.getItem("ecommerceUser")){
  //     navigate('/login')
  //   }
  // })
  return (
    <>
          <Landing/>
          <ToastContainer/>
          <div className='container-fluid bg-dark mt-4 d-flex justify-content-center align-items-center' style={{minHeight:"10vh"}}>
            <h2 className='text-white  '>Discover More Products</h2>
          </div>
      <ProductCarousel/>
      <SaleProducts/>
      <MensProductCarousel/>
    </>
  )
}

export default Home
