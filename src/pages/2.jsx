import React, { useState,useEffect } from "react";
import Header2 from '../components/Header2.jsx'
import Footer from '../components/Footer.jsx'
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance.js"
import { useNavigate, useLocation } from 'react-router-dom';
import { baseUrl,COMPANY_EMAIL,COMPANY_PHONE,  SUCCESS, COMPANY_ADDRESS} from '../config/configuration.js'
import Logo from '../assets/img/logolight135x255.png'


function ForgetPassword() {

  const location = useLocation();
  const navigate = useNavigate();

  const [password,setPassword]=useState("");
  const [passwordShown,setPasswordShown]=useState(false);
  const [newPassword,setNewPassword]=useState("");
  const [passwordShown2,setPasswordShown2]=useState(false);
  const [token,setToken]=useState(null);
  const [id,setId]=useState(null);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const togglePasswordVisiblity2 = () => {
    setPasswordShown2(passwordShown2 ? false : true);
  };


  useEffect(() => {

    const urlDate = location?.search;
    const urlParams = new URLSearchParams(urlDate);
    const idData = urlParams.get('id');
    const tokenData = urlParams.get('token');

    console.log(idData,tokenData)
    setId(idData)
    setToken(tokenData)
    
  }, [location]);

  useEffect(() => {
    const element = document.documentElement;
    element.style.scrollBehavior = 'smooth';
    element.scrollTo(0, 0);
  }, []);

  const handleValidate = () => {
    let formIsValid = true;


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
        email: "",
        password:password.trim(),
      }

      try {
        const response = await axiosInstance.post(`${baseUrl}admin/Forget Password`, data,{
            headers: {"Content-Type":"application/json"}})

        if (response.status === 200) {

          if(response?.data?.data) {

            if(response?.data?.data?.ForgetPassword){

              if(response?.data?.data?.otpSent){

                toast.success("Please Verify yourself with OTP sent to your Registered Email Id to Continue !!");
                

                const element = document.getElementById('otp');
                if (element) {
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - 200;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }


              }
              else{
                 toast.error("Unable to send OTP to your Registered Email Id at Current Moment. Please Try Again Later !!");

              }


            }
            else{
                 toast.error("Unable to Forget Password at Current Moment. Please Try Again Later !!");
            }


          }
          else{

            toast.error("Unable to Forget Password at Current Moment. Please Try Again Later !!");



          }

        }
      
     
      } catch (err) {

        
          if(err?.response?.data?.message === "Invalid Credentails" || err?.response?.data?.message === "Account Suspended") {

            toast.error( err?.response?.data?.message === "Account Suspended" ? "Your Account is Suspeneded. Please Contact Support." :`${err?.response?.data?.message} !!`);

          }

          else{

            toast.error("Something Went Wrong. Please Try Again Later !!");
            
          }
      }
  
    }


    
  }


  return (
    <>
      <Header2/>
        {/* Forget Password Start */}
        <div className="container-xxl py-5  padding-top-custom" >
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Admin Forget Password
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



               

           
                  <br/>

                  <button onClick={(e)=>{handleSubmit(e)}} className="custom-btn">
                    Forget Password
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
