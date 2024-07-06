import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.css';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/footer";

import {Route, Routes} from 'react-router-dom'
import Home from "./Components/Home/Home";
import Signup from "./Components/SignUp/Signup";
import Login from "./Components/SignUp/Login";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Mens from "./Components/Categories/Cloths/Mens";
import Jewellery from "./Components/Categories/Jewellery/Jewellery";
import Mobiles from "./Components/Categories/Mobiles/Mobiles";
import Womens from "./Components/Categories/Cloths/Womens";
import Orders from "./Components/YourOrders/Orders";
import ReviewPage from "./Review/ReviewPage";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />}>
          <Route path="/categories/Mens" element={<Mens />} />
          <Route path="/categories/Womens" element={<Womens />} />
          <Route path="/categories/Mobiles" element={<Mobiles />} />
          <Route path="/categories/Jewellery" element={<Jewellery/>} />

        </Route><Route path="/Cart" element={<Cart />} />
        {/* <Route path="/order" element={<YourOrders/>} /> */}
        <Route path="/order" element={<Orders/>} />
        <Route path="/Review" element={<ReviewPage/>} />
        

      </Routes>
      <Footer/>
    </>
  );
}

export default App;