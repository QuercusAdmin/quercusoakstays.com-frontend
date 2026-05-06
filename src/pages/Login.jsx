import React, { useState,useEffect } from "react";
import Header2 from '../components/Header2.jsx'
import Footer from '../components/Footer.jsx'
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance.js"
import { useNavigate, useLocation } from 'react-router-dom';
import { baseUrl,COMPANY_EMAIL,COMPANY_PHONE,  SUCCESS, COMPANY_ADDRESS} from '../config/configuration.js'
import Logo from '../assets/img/logolight135x255.png'


function Login() {

  const location = useLocation();
  const navigate = useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [passwordShown,setPasswordShown]=useState(false);

  useEffect(() => {
    const element = document.documentElement;
    element.style.scrollBehavior = 'smooth';
    element.scrollTo(0, 0);
  }, []);

  const handleValidate = () => {
    let formIsValid = true;


    if (!email) {
      formIsValid = false;
      toast.error("Please Enter Your Email !!");
      return;
    }

    if (!password) {
      formIsValid = false;
      toast.error("Please Enter Your Password!!");
      return;
    }

  console.log("Form Submitted", formIsValid);
    return formIsValid;
  };


  const handleSubmit=async(e)=>{
     e.preventDefault();

    let formValid=handleValidate();

    if(formValid){

      let data={  
        'email': email,
        'password': password,
      }

      try {
        // const response = await axiosInstance.post(`${baseUrl}/Loginus`, data,{
        //     headers: {"Content-Type":"application/json"}})
        // if (response.status ===  SUCCESS) {
          setEmail("");
          setPassword("");
         
          toast.success("Thanks for Login . Our Team will connect back to you shortly !!");
          // navigate("/")
        // } 
      } catch (err) {
        // console.log("Error",err)
        // toast.error("Something went wrong !!");
      }
  
    }


    
   }

  return (
    <>
      <Header2/>
        {/* Login Start */}
        <div className="container-xxl py-5  padding-top-custom">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Admin Login
              </h6>
              <h1 className="mb-5">Admin Console</h1>
            </div>
            <div className="row g-4 justify-content-center">              
              <div
                className="col-lg-5 col-md-12 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <form >
                  
                  <div className="text-center mb-4">
                    <img src={Logo} alt="Logo" className="custom-form-logo" />
                  </div>

                  <div className="mb-3">
                    <label className="custom-label">Email Address</label>
                    <input
                      type="email"
                      className="custom-input"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="Enter your Email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="custom-label">Password</label>
                    <input
                      type="password"
                      className="custom-input"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="Enter your Password"
                    />
                  </div>
                  <br/>

                  <button onClick={(e)=>{handleSubmit(e)}} className="custom-btn">
                    Login
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Login End */}
  <Footer />
    </>


  )
}

export default Login
