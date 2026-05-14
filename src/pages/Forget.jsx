import React, { useState,useEffect } from "react";
import Header2 from '../components/Header2.jsx'
import Footer from '../components/Footer.jsx'
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance.js"
import { useNavigate, useLocation } from 'react-router-dom';
import { baseUrl, frontendURL} from '../config/configuration.js'
import Logo from '../assets/img/logolight135x255.png'


function ForgetPassword() {

  const location = useLocation();
  const navigate = useNavigate();

  const [email,setEmail]=useState("");

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

    return formIsValid;
  };



  const handleSubmit=async(e)=>{
     e.preventDefault();

    let formValid=handleValidate();

    if(formValid){

      let data={  
        email: email.toLowerCase().trim(),
        link : `${frontendURL}change-password`
      }

      try {
        const response = await axiosInstance.post(`${baseUrl}admin/forgetPassword`, data,{
            headers: {"Content-Type":"application/json"}})

        if (response.status === 200) {

          toast.success("Password Reset Link Sent on your Registered Email Id !!");

          navigate('/login')

        }
      
     
      } catch (err) {

        
          if(err?.response?.data?.message === "Account Suspended") {

            toast.error( err?.response?.data?.message === "Account Suspended" ? "Your Account is Suspeneded. Please Contact Support." :`${err?.response?.data?.message} !!`);

          }

          else{

            toast.error("Unable to sent Password Reset Link at Current Moment. Please Try Again Later !!");
            
          }
      }
  
    }


    
  }

  return (
    <>
      <Header2/>
        {/* Forget Password Start */}
        <div className="container-xxl py-5  padding-top-custom">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Forget Password
              </h6>
              <h1 className="mb-5"></h1>
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

                  <br/>

                  <button onClick={(e)=>{handleSubmit(e)}} className="custom-btn">
                    Send Password Reset Link
                  </button> 
                  
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Forget Password End */}
  <Footer />
    </>


  )
}

export default ForgetPassword
