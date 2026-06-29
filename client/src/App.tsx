import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Appbar from "./Components/Appbar";
import Login from "./Routes/Login/Login";
import Register from "./Routes/Register";
import { Toaster } from "react-hot-toast";
import NotFound from "./Routes/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./Routes/Home";
import Profile from "./Routes/Profile";
import ProductDetails from "./Routes/ProductDetails";
import Cart from "./Routes/Cart";
import Order from "./Routes/Order";
import Payment from "./Routes/Payment";
import ProductsRoute from "./Routes/ProductsRoute";
import PaymentSuccess from "./Routes/PaymentSuccess";
import PaymentCancel from "./Routes/PaymentCancel";
import SeedingPage from "./Routes/SeedingPage";
// import Todos from "./Components/todo/todos";
import { Box } from "@mui/material";

function App() {
  return (
    <Box>
      <GoogleOAuthProvider clientId="875846851705-58p1br0lbq3j3ppc0jkua7sveeveo8km.apps.googleusercontent.com">
        <Appbar />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/products" element={<ProductsRoute />}></Route>

          {/* <Route path="/about" element={<ForgotPassword />} /> */}
          {/* <Route path="/contactus" element={<ForgotPassword />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/:orderId" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="=/product-list" element={<ProductsRoute />} />
          <Route
            path={`/${import.meta.env.VITE_STRIPE_SUCCESS_URL}/:sessionId`}
            element={<PaymentSuccess />}
          />
          <Route
            path={`/${import.meta.env.VITE_STRIPE_CANCEL_URL}/:sessionId`}
            element={<PaymentCancel />}
          />
          <Route path="/seed" element={<SeedingPage />} />
          {/* <Route path="/todos" element={<Todos />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GoogleOAuthProvider>
    </Box>
  );
}

export default App;
