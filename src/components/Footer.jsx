import React, { useState,useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance.js"
import { baseUrl,COMPANY_EMAIL,COMPANY_PHONE, EMAIL_REGEX, NEWS_LETTER, SUCCESS,  COMPANY_FACEBOOK_HANDLE_URL, COMPANY_LINKEDIN_HANDLE_URL, COMPANY_INSTAGRAM_HANDLE_URL, COMPANY_YOUTUBE_HANDLE_URL, COMPANY_X_HANDLE_URL, COMPANY_DISCORD_HANDLE_URL, COMPANY_ADDRESS, COMPANY_INFO} from '../config/config.js'

import { useNavigate } from 'react-router-dom';

export default function Footer() {

  const navigate = useNavigate();

  
  const handleContact=async(e)=>{
    e.preventDefault();
      navigate('/contact-us', { state: {flow:"footer", selectedPlan : null}  });
  }

  const [email,setEmail]=useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(email !== ""){

      const emailRegex = EMAIL_REGEX;
      const isValid=emailRegex.test(email);
      if(isValid){

        let data={
          email:email,
          type:NEWS_LETTER
        }

        // try {
        //   const response = await axiosInstance.post(`${baseUrl}/notify/newsletter`, data,{
        //       headers: {"Content-Type":"application/json"}})
        //   if (response.status === SUCCESS) {
            toast.success("Thanks for showing Interest. You have successfully Subscribed to our Newsletter !!");
            navigate("/")
        //   } 
        // } catch (err) {
        //   console.log("Error",err)
        //   toast.error("Something went wrong !!");
        // }
  
      }
      else{
        toast.error("Email is Invalid !!");
      }
    }
    else{
      toast.error(" Please Enter Email !!");
    }


    
  }
  return (
    <div>
           {/* Footer Start */}
    <div
      className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
      data-wow-delay="0.1s"
    >
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-3">Company</h4>
            <HashLink
              smooth
              to={'/#about'}
              scroll={(el) =>
                el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                })
              }
              className="btn btn-link" >
                About Us
            </HashLink>
{/* 
            <HashLink
              smooth
              to={'/privacy-policy'}
              scroll={(el) =>
                el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                })
              }
              className="btn btn-link" >
                Privacy Policy
            </HashLink>

            <HashLink
              smooth
              to={'/terms-and-conditions'}
              scroll={(el) =>
                el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                })
              }
              className="btn btn-link" >
                Terms & Conditions
            </HashLink>

            <HashLink
              smooth
              to={'/refund-policy'}
              scroll={(el) =>
                el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                })
              }
              className="btn btn-link" >
                Refund & Cancellation Policy
            </HashLink> */}

            <a
              onClick={(e)=>handleContact(e)}
              className="btn btn-link"
            >
              Contact Us
            </a>


            <HashLink
              smooth
              to={'/#faq'}
              scroll={(el) =>
                el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                })
              }
              className="btn btn-link" >
                FAQ's
            </HashLink>
            
            <HashLink
              smooth
              to={'/#gallery'}
              scroll={(el) =>
                el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                })
              }
              className="btn btn-link" >
               Gallery
            </HashLink>

            <HashLink
              smooth
              to={'/properties'}
              scroll={(el) =>
                el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                })
              }
              className="btn btn-link" >
               Properties
            </HashLink>

             <HashLink
              smooth
              to={'/team'}
              scroll={(el) =>
                el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                })
              }
              className="btn btn-link" >
               Meet Our Team
            </HashLink> 
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-3">Contact</h4>
            <p className="mb-2 text-white ">
              <i className="fa fa-map-marker-alt me-3" />
              {COMPANY_ADDRESS}
            </p>
            <p className="mb-2 text-white ">
              <i className="fa fa-phone me-3" />
              {COMPANY_PHONE}
            </p>
            <p className="mb-2 text-white ">
              <i className="fa fa-envelope me-3" />
              <a className="text-white" href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
            </p>
            <div className="d-flex pt-2">
        
              {/* <a
              className="btn btn-outline-light btn-social"
              to={`${COMPANY_X_HANDLE_URL}`}
            >
              <i className="fa-brands fa-x-twitter fw-normal" />
            </a>
            <a
              className="btn btn-outline-light btn-social"
              to={`${COMPANY_FACEBOOK_HANDLE_URL}`}
            >
              <i className="fab fa-facebook-f fw-normal" />
            </a>
            <a
              className="btn btn-outline-light btn-social"
              to={`${COMPANY_LINKEDIN_HANDLE_URL}`}
            >
              <i className="fab fa-linkedin-in fw-normal" />
            </a>
            <a
             className="btn btn-outline-light btn-social" 
              to={`${COMPANY_INSTAGRAM_HANDLE_URL}`}
            >
              <i className="fab fa-instagram fw-normal" />
            </a> */}
            {/* <a
              className="btn btn-outline-light btn-social"
              to={`${COMPANY_YOUTUBE_HANDLE_URL}`}
            >
              <i className="fab fa-youtube fw-normal" />
            </a> */}
            {/* <a
              className="btn btn-outline-light btn-social"
              to={`${COMPANY_DISCORD_HANDLE_URL}`}
            >
              <i className="fa-brands fa-discord fw-normal" />
            </a> */}
            </div> 
          </div>
          {/* <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-3">Gallery</h4>
            <div className="row g-2 pt-2">
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={require('../assets/img/package-1.jpg')}
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={require('../assets/img/package-2.jpg')}
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={require('../assets/img/package-3.jpg')}
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={require('../assets/img/package-2.jpg')}
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={require('../assets/img/package-3.jpg')}
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={require('../assets/img/package-1.jpg')}
                  alt=""
                />
              </div>
            </div>
          </div> */}
          <div className="col-lg-5 col-md-8 ">
            <h4 className="text-white mb-3">Newsletter</h4>
            <p>Stay Updated: Exciting News and Insights Delivered Straight to Your Inbox!</p>
            <div
              className="position-relative mx-auto"
              // style={{ width: 600 }}
            >
              <input 
                type="text" 
                id ="email"
                className="form-control border-primary w-100 py-2 ps-4 pe-5 custom-input custom-width customRound"
                value={email} 
                placeholder="Enter your Email"
                required 
                onChange={(e)=>setEmail(e.target.value)}
              /> 
              <button
                type="button"
                className="btn custom-button-subscribe button-subscribe py-0 position-absolute top-0 end-0 mt-1 me-2"
                onClick={(e)=>handleSubmit(e)}
              >
                <span className='btn-text'>Subscribe</span>
              </button>
            </div>
          </div>
    
          {/* <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top customBacktoTopButton"><i className="bi bi-arrow-up"></i></a> */}

        </div>
      </div>
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              
              <a className="border-bottom" href="#">
              {COMPANY_INFO}
              </a>
              
              
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <a className="custom-link" href={'/'}>Home&nbsp;</a>  
                <a>{ `   |   `}&nbsp;</a>  
                <a className="custom-link" href={'/#about'}>About Us&nbsp;</a>
                {/* <a className="custom-link" href={'/cookies'}>Cookies&nbsp;</a> */}
                <a>{ `   |   `}&nbsp;</a>  
                <a onClick={(e)=>handleContact(e)} className="custom-link"> Contact Us&nbsp; </a>
                <a>{ `   |   `}&nbsp;</a>  
                <a href={'/#faq'} className="custom-link" > FAQ's&nbsp;</a>


                 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Footer End */}
    </div>
  )
}
