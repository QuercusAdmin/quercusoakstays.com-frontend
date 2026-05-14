import React, { useState,useEffect } from "react";
import Header2 from '../components/Header2.jsx'
import Footer from '../components/Footer.jsx'
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance.js"
import { useNavigate, useLocation } from 'react-router-dom';
import { baseUrl, frontendURL} from '../config/configuration.js'
import Logo from '../assets/img/logolight135x255.png'
import axios from "axios";


function ChangePassword() {

  const location = useLocation();
  const navigate = useNavigate();

  const [newPassword,setNewPassword]=useState("");
  const [passwordShown,setPasswordShown]=useState(false);
  const [confirmPassword,setConfirmPassword]=useState("");
  const [passwordShown2,setPasswordShown2]=useState(false);
  const [token,setToken]=useState(null);
  const [id,setId]=useState(null);
  const [loader,setLoader]=useState(null);

  
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

    checkExpiryLink(tokenData);
    
  }, [location]);


  const checkExpiryLink=async(tokenData)=>{
    
      try {
        let data = { 
          token  : tokenData
        }
        const response = await axios.post(`${baseUrl}admin/checkExpiry/forgetPassword`,data,{
            headers: {"Content-Type":"application/json" }})

        if (response.status === 200) {

          if(response?.data?.data?.tokenExpire){

            toast.error("Password Reset Link Expired !!");
            navigate('/login')

          }
        }
      
     
      } catch (err) {

       console.log("errr link expiry get",err)
 
      }

    
  }


  useEffect(() => {
    const element = document.documentElement;
    element.style.scrollBehavior = 'smooth';
    element.scrollTo(0, 0);
  }, []);

  const handleValidate = () => {
    let formIsValid = true;
  
    if (!newPassword) {
      formIsValid = false;
      toast.error("Please Enter New Password !!");
      return false;
    }
  
    if (!confirmPassword) {
      formIsValid = false;
      toast.error("Please Confirm New Password !!");
      return false;
    }
  
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!passwordRegex.test(newPassword)) {
      formIsValid = false;
  
      toast.error("Password must contain 8 characters, uppercase, lowercase, number and special character !!");
  
      return false;
    }
  
    if (confirmPassword !== newPassword) {
      formIsValid = false;
      toast.error("Passwords Do Not Match !!");
      return false;
    }
  
    return formIsValid;
  };

  const handleSubmit=async(e)=>{
     e.preventDefault();

    let formValid=handleValidate();

    if(formValid){

      let data={  
        id : id,
        newPassword:newPassword,
      }

      try {
        const response = await axiosInstance.post(`${baseUrl}admin/update/forgetPassword`, data,{
            headers: {"Content-Type":"application/json"}})

        if (response.status === 200) {

          toast.success("Password Updated Successfully !!");

          // navigate('/login')

        }
      
     
      } catch (err) {


        toast.error("Unable to Update Password at Current Moment. Please Try Again Later !!");
            
          
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
                    <label className="custom-label">New Password</label>
                    <input
                      type={passwordShown ? 'text' : 'password'}
                      className="custom-input"
                      value={newPassword}
                      onChange={(e)=>setNewPassword(e.target.value)}
                      placeholder="Enter your New Password"
                    />
                    <span
                      onClick={togglePasswordVisiblity}
                      className={passwordShown ? 'Icon2 cross' : 'Icon2'}>
                      {passwordShown ? (
                        <i className="fa fa-eye"></i>
                      ) : (
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      )}
                    </span>
                  </div>

                  <div className="mb-3">
                    <label className="custom-label">Confirm New Password</label>
                    <input
                      type={passwordShown2 ? 'text' : 'password'}
                      className="custom-input"
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                      placeholder="Enter your Confirm Password"
                    />
                    <span
                      onClick={togglePasswordVisiblity2}
                      className={passwordShown2 ? 'Icon2 cross' : 'Icon2'}>
                      {passwordShown2 ? (
                        <i className="fa fa-eye"></i>
                      ) : (
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      )}
                    </span>
                  </div>

                  <br/>

                  <button onClick={(e)=>{handleSubmit(e)}} className="custom-btn">
                    Update Password
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

export default ChangePassword
