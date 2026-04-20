import React, { useState,useEffect } from "react";
import Header2 from '../components/Header2.jsx'
import Footer from '../components/Footer.jsx'
import DOMPurify from 'dompurify';
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance.js"
import { baseUrl, SUCCESS } from "../config/configuration.js";

function TermsAndCondition() {

    const [data, setData] = useState("");
    const [temp, setTemp] = useState("");

    useEffect(() => {
      const element = document.documentElement;
      element.style.scrollBehavior = 'smooth';
      element.scrollTo(0, 0);
    }, []);

    useEffect(() => {
      handleFetchData();
    }, []);

    const handleFetchData=async()=>{
  
        try {
          const response = await axiosInstance.post(`${baseUrl}/website/getTermsAndCond`,{
              headers: {"Content-Type":"application/json"}})
          if (response.status === SUCCESS) {
           
            // console.log("Response from server:", response.data.data);
            setData(response.data.data.data)
            setTemp(DOMPurify.sanitize(response.data.data.data))
          } 
        } catch (err) {
          toast.error("Something went wrong !!");
        }
    
      }

  return (
    <>
      <Header2/>
      <div className="bg-container">
        <div className="bg-image">
          <div className="bg-text">
            <div className="text-center">
              <h1 className="title">Terms of Use BetterMyStay</h1>
            </div>
            <div className="wrapper">
              <div dangerouslySetInnerHTML={{ __html: temp }} />
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
  <Footer />
    </>
  )
}




export default TermsAndCondition;

