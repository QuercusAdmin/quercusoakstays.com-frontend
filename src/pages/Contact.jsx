import React, { useState,useEffect } from "react";
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance"
import { useNavigate, useLocation } from 'react-router-dom';
import { baseUrl,COMPANY_EMAIL,COMPANY_PHONE,  SUCCESS, COMPANY_ADDRESS} from '../config/config'


function Contact() {

  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.state)
  // const { selectedPlan } = location.state || "";
  // const { flow } = location.state || "";
  // console.log(flow,selectedPlan)

    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [name,setName]=useState("");
    const [orgName,setOrgName]=useState("");
    const [query,setQuery]=useState("");
    const [queryType,setQueryType]=useState("");
    // useState(flow!==null ? ( flow==='pricing' || flow === 'demo' ) ? flow : "": "");
    // const [plan,setPlan]=useState(selectedPlan!==null ? selectedPlan?.planType : "");


  
  useEffect(() => {
    const element = document.documentElement;
    element.style.scrollBehavior = 'smooth';
    element.scrollTo(0, 0);
  }, []);

  const handleValidate = () => {
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      toast.error("Please Enter Your Name!!");
      return;
    }
    if (!email) {
      formIsValid = false;
      toast.error("Please Enter Your Email !!");
      return;
    }

    // if (flow !== 'demo' && !query) {
    //   formIsValid = false;
    //   toast.error("Please Enter Your Query !!");
    //   return;
    // }

    if (!query) {
      formIsValid = false;
      toast.error("Please Enter Your Query !!");
      return;
    }
  
    return formIsValid;
  };


  const handleSubmit=async(e)=>{
    e.preventDefault();

    let formValid=handleValidate();

    if(formValid){

      let data={  
        'email': email,
        'phone': phone,
        'name': name,
        'orgName': orgName,
        'plan': "",
        'message': `${queryType} ${query}`,
      }

      try {
        // const response = await axiosInstance.post(`${baseUrl}/contactus`, data,{
        //     headers: {"Content-Type":"application/json"}})
        // if (response.status ===  SUCCESS) {
          setEmail("");
          setPhone("");
          setName("");
          setOrgName("");
          setQuery("");
          setQueryType("");
          // setPlan("");
          toast.success("Thanks for reaching out us. Our Team will connect back to you shortly !!");
          navigate("/")
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
        {/* Contact Start */}
        <div className="container-xxl py-5  padding-top-custom">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Contact Us
              </h6>
              <h1 className="mb-5">Contact For Any Query</h1>
            </div>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <h5>Get In Touch</h5>
                <br/>
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                    style={{ width: 50, height: 50 }}
                  >
                    <i className="fa fa-map-marker-alt text-white" />
                  </div>
                  <div className="ms-3">
                    <h5 className="text-primary">Office</h5>
                    <p className="mb-0 text-dark">{COMPANY_ADDRESS}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                    style={{ width: 50, height: 50 }}
                  >
                    <i className="fa fa-phone text-white" />
                  </div>
                  <div className="ms-3">
                    <h5 className="text-primary">Mobile</h5>
                    <p className="mb-0 text-dark">{COMPANY_PHONE}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                    style={{ width: 50, height: 50 }}
                  >
                    <i className="fa fa-envelope-open text-white" />
                  </div>
                  <div className="ms-3">
                    <h5 className="text-primary">Email</h5>
                    <p className="mb-0 text-dark"><a className="text-dark" href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a></p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              
              </div>
              <div
                className="col-lg-5 col-md-12 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          id="name"
                          className="form-control"
                          value={name} 
                          placeholder="Your Good Name"
                          required 
                          onChange={(e)=>setName(e.target.value)}
                        />
                        <label htmlFor="name">Your Good Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          id ="Phone"
                          className="form-control" 
                          value={phone} 
                          placeholder="Where can we Contact you?" 
                          required 
                          onChange={(e)=>setPhone(e.target.value)}
                        /> 
                        <label htmlFor="email"> Your Contact Number</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                      <input 
                          type="text" 
                          id ="email"
                          className="form-control" 
                          value={email} 
                          placeholder="Where can we Contact you?" 
                          required 
                          onChange={(e)=>setEmail(e.target.value)}
                        /> 
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          className="form-control" 
                          id ="orgName" 
                          value={orgName} 
                          placeholder="Your Organization Name" 
                          onChange={(e)=>setOrgName(e.target.value)}
                        />
                        <label htmlFor="subject">Your Hotel / Resort Name</label>
                      </div>
                    </div>


                    {/* { selectedPlan !== null && flow === "pricing" &&(

                      <div className="col-12">
                        <div className="form-floating">
                          <select
                            value={plan}
                            className="form-control custom-bg" 
                            required 
                            onChange={(e) => setPlan(e.target.value)}
                            >
                              <option value="">Select a Plan</option>
                              <option value="custom">Custom Subscription</option>
                              <option value="3 Months">Quaterly Subscription</option>
                              <option value="6 Months">Semi Annually Subscription</option>
                              <option value="Yearly">Annually Subscription</option>
                          </select>          
                          <label htmlFor="subject">Selected Subscription Type</label>
                        </div>
                      </div>

                    )} */}

                   

                      <div className="col-12">
                        <div className="form-floating">
                          <select
                            value={queryType}
                            className="form-control custom-bg" 
                            required 
                            onChange={(e) => setQueryType(e.target.value)}
                            >
                              <option value="">Select Query Type</option>
                              <option value="Booking">Booking</option>
                              <option value="List Property">Listing Property</option>
                              <option value="Feedback">Feedback</option>
                              <option value="Others">Others</option>

                          </select>          
                          <label htmlFor="subject">Selected Query Type</label>
                        </div>
                      </div>

                    


                    {/* { flow !== 'demo'  && ( */}

                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="We would love to hear and answer all your Questions"
                          id="message"
                          required
                          style={{ height: 100 }}
                          value={query} 
                          onChange={(e)=>setQuery(e.target.value)}
                        />
                        <label htmlFor="message">We would love to hear all your Questions</label>
                      </div>
                    </div>
                    {/* )} */}
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit" onClick={(e)=>handleSubmit(e)}>
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Contact End */}
  <Footer />
    </>


  )
}

export default Contact
