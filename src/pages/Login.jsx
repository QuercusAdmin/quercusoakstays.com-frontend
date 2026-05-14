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
  const [emailDisabled,setEmailDisabled]=useState(false);
  const [passwordDisabled,setPasswordDisabled]=useState(false);
  const [passwordShown,setPasswordShown]=useState(false);
  const [refId,setRefId]=useState(null);
  const [otpShown,setOtpShown]=useState(false);
  const [OTPResendTimer, setOTPTimerResend] = useState(false);
  const [otpExpiredEmail, setotpExpiredEmail] = useState(false);
  const [otpState, setOtpState] = useState({
      dig1: "",
      dig2: "",
      dig3: "",
      dig4: "",
      dig5: "",
      dig6: "",
  });

  let timer,timer1;

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const OtpTimerResend = () => {
    timer = window.setTimeout(() => {
      setOTPTimerResend(true);
    }, 1000 * 1*45);
  };


  const OtpTimerEmail = () => {
    timer = window.setTimeout(() => {
      setotpExpiredEmail(true);
    }, 1000 * 5*60);
  };


  
  const protect_email= (user_email)=> {
      var avg, splitted, part1, part2;
      splitted = user_email?.split("@");
      part1 = splitted?.[0];
      avg = part1?.length / 2;
      part1 = part1?.substring(0, (part1?.length - avg));
      part2 = splitted?.[1];
      return part1 + "XXXXX@" + part2;
  };


  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;

      if (next > -1) {

        elmnt.target.form.elements[next].focus()
      }
    }
    else {
     
        const next = elmnt.target.tabIndex;
        if (next < 6) {
          elmnt.target.form.elements[next].focus()
        }
    }

  }

  const otpHandleChange = (e) => {
    const { name, value } = e.target;
    setOtpState({
      ...otpState,
      [name]: value,
    });
  };

  useEffect(()=>{

    OtpTimerEmail();
    OtpTimerResend();

  },[])
  

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

  const handleValidateOTP = () => {
      let formIsValid = true;

      const isAnyFieldEmpty = Object.values(otpState).some(value => value.trim() === "");

      if (isAnyFieldEmpty) {
          toast.error("Please Enter the Complete 6-digit OTP !!");
          formIsValid = false;
      } 

      return formIsValid;
  };

  const handleSubmit=async(e)=>{
     e.preventDefault();

    let formValid=handleValidate();

    if(formValid){

      let data={  
        email: email.toLowerCase().trim(),
        password:password.trim(),
      }

      try {
        const response = await axiosInstance.post(`${baseUrl}admin/login`, data,{
            headers: {"Content-Type":"application/json"}})

        if (response.status === 200) {

          if(response?.data?.data) {

            if(response?.data?.data?.login){

              if(response?.data?.data?.otpSent){

                toast.success("Please Verify yourself with OTP sent to your Registered Email Id to Continue !!");
                setRefId(response.data.data.refId)
                setotpExpiredEmail(false);
                setOTPTimerResend(false);
                OtpTimerEmail();
                setOtpShown(true);
                setEmailDisabled(true)
                setPasswordDisabled(true)
                OtpTimerResend();
                setOtpState({
                  dig1: "",
                  dig2: "",
                  dig3: "",
                  dig4: "",
                  dig5: "",
                  dig6: "",
                })

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
                 toast.error("Unable to Login at Current Moment. Please Try Again Later !!");
            }


          }
          else{

            toast.error("Unable to Login at Current Moment. Please Try Again Later !!");



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

  const handleResendOtp = async (e)=>{

    e.preventDefault()


    let data={  
      email: email.toLowerCase().trim(),
      password:password.trim(),
    }

    try {
        const response = await axiosInstance.post(`${baseUrl}admin/login`, data,{
            headers: {"Content-Type":"application/json"}})

        if (response.status === 200) {
            toast.success("OTP Resent to your Registered Email Id  !!");

            setRefId(response.data.data.refId)
            setotpExpiredEmail(false);
            setOTPTimerResend(false);
            OtpTimerEmail();
            OtpTimerResend();
            setOtpState({
              dig1: "",
              dig2: "",
              dig3: "",
              dig4: "",
              dig5: "",
              dig6: "",
            })
        }

      } catch (err) {

        toast.error("Something Went Wrong. Please Try Again Later !!");
          
      }
  
    

  }

  const handleOTPSubmit=async(e)=>{
     e.preventDefault();

    let formValid=handleValidateOTP();

    if(formValid){

      let data={  
        "refId": refId,
        "otp" : otpState.dig1 + otpState.dig2 + otpState.dig3 + otpState.dig4 + otpState.dig5 + otpState.dig6,
        "email" : email
      }
// valid : true ,expired : false , invalid
      try {
        const response = await axiosInstance.post(`${baseUrl}admin/verifyOtp`, data,{
            headers: {"Content-Type":"application/json"}})

        if (response.status === 200) {

          if(response?.data?.data) {

            if(response.data.data.valid){

              // toast.success("OTP Verified Successfully"); 

              try{

                window.localStorage.clear();
  
                const adminData = response.data.data.adminData ;
  
                  if( ['admin', 'subAdmin', 'developer'].includes(adminData?.userType) ) {
                    window.localStorage.setItem('admin',JSON.stringify(adminData));
                    ;
  
                      setEmail("");
                      setPassword("");
                      setEmailDisabled(false);
                      setPasswordDisabled(false);
                      setPasswordShown(false);
                      setRefId(null);
                      setOtpShown(false);
                      setOTPTimerResend(false);
                      setotpExpiredEmail(false);
                      setOtpState({
                            dig1: "",
                            dig2: "",
                            dig3: "",
                            dig4: "",
                            dig5: "",
                            dig6: "",
                        })
                    toast.success("Login Successfull !!")
                    navigate('/admin-dashboard')
                  }

                  else{

                    toast.error("You are not Authorized to Login !!");

                    setEmail("");
                    setPassword("");
                    setEmailDisabled(false);
                    setPasswordDisabled(false);
                    setPasswordShown(false);
                    setRefId(null);
                    setOtpShown(false);
                    setOTPTimerResend(false);
                    setotpExpiredEmail(false);
                    setOtpState({
                          dig1: "",
                          dig2: "",
                          dig3: "",
                          dig4: "",
                          dig5: "",
                          dig6: "",
                      })
                }
              }

              catch(errr){
                console.log("errrrr", errr)
              }

       
            }
            else{
            
              if(response.data.data.expired) {
                toast.error("OTP Expired !!"); 
              }
              else{
                toast.error("Invalid OTP !!");
              
              }
            }

          }
          else{
            toast.error("Unable to verify OTP at Current Moment. Please Try Again Later !!");

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


  const zoomStyle = {
      transform: 'scale(0.9)',
      transformOrigin: 'top center', 
      width: '111.11%',
      display: 'block',
      top: 0,
      left: 0,
  };

  return (
    <>
      <Header2/>
        {/* Login Start */}
        <div className="container-xxl py-5 padding-top-custom">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Admin Login
              </h6>
              <h1 className="mb-5">Admin Console</h1>
            </div>
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
                      disabled={emailDisabled}
                      className="custom-input"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="Enter your Email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="custom-label">Password</label>
                    <input
                      type={passwordShown ? 'text' : 'password'}
                      className="custom-input"
                      disabled={passwordDisabled}
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="Enter your Password"
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



                  <div className="mb-2 text-end text-decoration-underline" onClick={(e)=>{navigate('/forget-password')}}>
                    <label className="custom-label4">Forget Password ? No Worries We are Here !</label>
                  </div>
             

                  <button onClick={(e)=>{handleSubmit(e)}} className="custom-btn">
                    Login
                  </button> 
                  
                  { otpShown && refId &&


                    <form className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mx-auto mt-4" style={{ maxWidth: '500px' }} id='otp'>
                        <h3 className="fw-bold text-center mb-2">Please Enter 6-digit OTP</h3>
                        <p className="text-muted text-center small mb-1">
                            Please enter 6 digit OTP Verification Code Received on your Email Address.
                        </p>
                        <p className="text-center fw-bold text-primary mb-4">{protect_email(email)}</p>

                        <div className="form-group">
                            <div className="d-flex justify-content-center gap-2 mb-4">
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <input
                                        key={num}
                                        value={otpState[`dig${num}`]}
                                        name={`dig${num}`}
                                        onChange={otpHandleChange}
                                        type="text"
                                        autoFocus={num === 1}
                                        tabIndex={num}
                                        maxLength="1"
                                        onKeyUp={e => inputfocus(e)}
                                        className="form-control form-control-lg text-center fw-bold border-2"
                                        style={{ 
                                            width: '55px', 
                                            height: '55px', 
                                            borderColor: '#e0e0e0',
                                            fontSize: '1.25rem' 
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="d-flex justify-content-end mb-4">
                                <button 
                                    type="button"
                                    disabled={!OTPResendTimer} 
                                    onClick={handleResendOtp}
                                    className="btn btn-link btn-sm text-decoration-none fw-bold text-warning"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={handleOTPSubmit} 
                            className="btn btn-warning w-100 py-3 rounded-pill fw-bold shadow-sm text-uppercase"
                            style={{ letterSpacing: '1px' }}
                        > 
                            Verify OTP
                        </button>
                      </form>
                  }

                </form>
            </div>
        </div>
      </div>

        {/* Login End */}
  <Footer />
    </>


  )
}

export default Login
