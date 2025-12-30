import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Appbar from "./Components/Appbar";
import Login from "./Routes/Login/Login";
import Register from "./Routes/Register";
import { Toaster } from "react-hot-toast";
import NotFound from "./Routes/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./Routes/Dashboard";
import Home from "./Routes/Home";
import ForgotPassword from "./Routes/Login/ForgotPassword";
import Profile from "./Routes/Profile";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="875846851705-58p1br0lbq3j3ppc0jkua7sveeveo8km.apps.googleusercontent.com">
        <Appbar />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<ForgotPassword />} />
          <Route path="/contactus" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
