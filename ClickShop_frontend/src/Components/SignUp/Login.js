import React, { useState } from "react";
import img from "./Assets/loginpage.jpg";
import { NavLink } from "react-router-dom";
import img1 from "./Assets/login.jpg.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useNavigate} from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate()
  const backgroundStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "35vh",
  };

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: credentials.email,
      password: credentials.password,
    };

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const jsonResponse =await response.json();

      console.log(jsonResponse.user,"------------------------------------------")
      localStorage.setItem('ecommerceUser',JSON.stringify(jsonResponse.email))
      // localStorage.setItem('ecommerceUser',jsonResponse.email)

      // 
      localStorage.setItem('user_id',JSON.stringify(jsonResponse.user_id))
      // localStorage.setItem('user_id',jsonResponse.user_id)
      console.log("success 200 login");
      console.log(jsonResponse);
      toast.success('Successfully login');
    setTimeout(() => {
      navigate('/')
      
    }, 2000);
    
    } else if (response.status == 201) {
      console.log("success 201");
      console.log(await response.json(),"------------------------------------------")
      // navigate('/');
    } else if (response.status == 400) {
      console.log("400 login");
    } else if (response.status == 500) {
      console.log("500 login");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div
        style={backgroundStyle}
        className="container-fluid mt-5 pt-5 img-fluid"
      >
        <p className="text-center">
          <span className="text-" style={{ fontSize: "3rem" }}>
            Login To Service
          </span>
        </p>
        <p className="text-center ">
          <NavLink to="/" className="text-decoration-none text-black ">
            Home ----
          </NavLink>{" "}
          Login
        </p>
      </div>

      <section className="p-3 p-md-4 mt-5 mb-5 p-xl-5">
        <div className="container">
          <div className="card border-light-subtle shadow-sm">
            <div className="row g-0">
              <div
                style={{ backgroundImage: `url(${img1})` }}
                className="col-12 img-fluid justify-content-center align-content-center d-flex col-md-6"
              >
                <div className="my-auto mx-auto text-center">
                  <h3 className="text-white mt-4">New to our website?</h3>
                  <p className="text-white">
                    There are advances being made in science and technology
                    every day, and a good example of this is the...
                  </p>
                  <button
                    className="btn btn-primary mb-4"
                    style={{ borderRadius: "0", width: "60%" }}
                  >
                    <NavLink
                      to="/signup"
                      className="text-white text-decoration-none"
                    >
                      CREATE AN ACCOUNT
                    </NavLink>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h3 className="text-center">LOG IN TO ENTER</h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-3 gy-md-4 overflow-hidden">
                      <div className="col-12 form-floating">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={credentials.email}
                          onChange={handleChange}
                          id="email"
                          placeholder="name@example.com"
                          required
                        />
                        <label htmlFor="email" className="form-label ms-2">
                          Email <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-12 form-floating">
                        <input
                          type="password"
                          minLength={9} 
                          value={credentials.password}
                          onChange={handleChange}
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder=""
                          required
                        />
                        <label htmlFor="Password" className="form-label ms-2">
                          Password <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn bsb-btn-xl btn-primary"
                            type="submit"
                          >
                            Log in now
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
                        <p className="text-center mt-2">
                          <a
                            href="#!"
                            class="link-secondary text-decoration-none text-center"
                          >
                            If you don't remember password?{" "}
                            <NavLink>Forgot password</NavLink>
                          </a>
                        </p>
                      </div>
                      <hr class="mt-3 mb-2 border-secondary-subtle" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="mt-3 mb-3">Or sign in with</p>
                      <div className="d-flex gap-3 ">
                        <p>
                          <a
                            href="#!"
                            className="btn bsb-btn-xl btn-outline-primary"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-google"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                            </svg>
                            <span className="ms-2 fs-6">Google</span>
                          </a>
                        </p>
                        <p>
                          <a
                            href="#!"
                            className="btn bsb-btn-xl btn-outline-primary"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-facebook"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg>
                            <span className="ms-2 fs-6">Facebook</span>
                          </a>
                        </p>
                        <p>
                          <a
                            href="#!"
                            className="btn bsb-btn-xl btn-outline-primary"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-twitter"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                            </svg>
                            <span className="ms-2 fs-6">Twitter</span>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer />
      <div
        className="container-fluid bg-light mt-5"
        style={{ minHeight: "30vh" }}
      >
        <div className="mt-3">
          <p className="text-center mt-5 ">
            <span style={{ fontWeight: "bold", fontSize: "2rem" }}>
              Subscribe for Our Newsletter
            </span>
          </p>
          <div className="row mt-3 justify-content-center">
            <div className="col-lg-6">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  style={{ width: "100%", borderRadius: "8rem" }}
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email Address</label>
              </div>
            </div>
            <div className="col-lg-2">
              <button
                type="submit"
                className="btn btn-primary my-auto mt-2"
                style={{ width: "100%", borderRadius: "5rem" }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
