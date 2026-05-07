import React, { useState,useEffect,useMemo,useRef } from "react";
import IncrementTansition2 from '../components/IncrementTansition2.jsx';
import IncrementTransitionWrapper from '../components/IncrementTransitionWrapper.jsx';
import Header2 from '../components/Header2.jsx'
import Footer from '../components/Footer.jsx'
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance.js"
import axios from "axios";
import { baseUrl  } from "../config/configuration.js";
import { motion, } from "framer-motion"
import { useNavigate, } from 'react-router-dom';
import moment from 'moment'
import { useLocation } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";
import {  FiHome, FiMapPin, FiMap, FiCompass, FiEye, FiGrid, FiTarget,FiArrowUpRight, FiPlus, FiTrash2, FiCheckCircle, FiUploadCloud, FiHelpCircle, FiRefreshCw, FiDollarSign, FiTrendingUp, FiActivity, FiSettings, FiTool,FiUsers, FiUserCheck, FiSmile, FiStar, FiAward, FiShield, FiSpeaker, FiMonitor, FiGift} from "react-icons/fi";

  const coreValues = [
    { 
      title: "Integrity", 
      desc: "Transparency in every Transaction and Operation with our Property Partners.",
      icon: <FiShield className="text-white" strokeWidth={3} size={40} /> 
    },
    { 
      title: "Excellence", 
      desc: "Setting the Gold Standard in Guest Experience and property maintenance.",
      icon: <FiAward className="text-white" strokeWidth={3} size={40}  /> 
    },
    { 
      title: "Guest-Centric", 
      desc: "Every Decision We make starts with the Guest's Comfort and Experience.",
      icon: <FiUsers className="text-white" strokeWidth={3} size={40} /> 
    },
    { 
      title: "Innovation", 
      desc: "Using Modern Tech to optimize Revenue and Streamline Hotel Operations.",
      icon: <FiTrendingUp className="text-white" strokeWidth={3} size={40} /> 
    }
  ];

  const benefits = [
    {
      title: "Effortless Maintenance",
      subtitle: "Handled by our Expert Team",
      desc: "Complete Property Upkeep and Professional Cleaning so your asset remains in Pristine Condition year-round.",
      icon: <FiTool size={36} strokeWidth={2} />
    },
    {
      title: "4x Regular Revenue",
      subtitle: "No Cost, Maximum Returns",
      desc: "Our Dynamic Pricing Strategy ensures your Property Generates up to 4 times the Standard Rental Income.",
      icon: <FiTrendingUp size={36} strokeWidth={2} />
    },
    {
      title: "Hassle-Free Hosting",
      subtitle: "Full Property and Customer Management",
      desc: "From Guest screening to Check Outs, we manage every interaction so you can sit back and relax.",
      icon: <FiUserCheck size={36} strokeWidth={2} />
    },
    {
      title: "Exclusive Access",
      subtitle: "Special Owner Discounts and Perks",
      desc: "Enjoy Discounted Stays at other Quercus Oak Stays properties and Premium Perks as part of our Owner Network.",
      icon: <FiGift size={36} strokeWidth={2} />
    },
    {
      title: "Professional Marketing",
      subtitle: "We promote across Platforms",
      desc: "High-end Photography and Listing Placement on Major booking channels to ensure Maximum Visibility.",
      icon: <FiMonitor size={36} strokeWidth={2} />
    },
    {
      title: "High Revenue",
      subtitle: "Low-Maintenance Luxury",
      desc: "Premium returns with Zero Operational Stress. We turn your Property into a High-YSield Asset.",
      icon: <FiDollarSign size={36} strokeWidth={2} />
    }
  ];

  const propositions = [
    { 
      icon: <FiSettings size={24} strokeWidth={2.5} />, 
      title: "Maintain It", 
      desc: "We Ensure your Property's Maintenance and Vendor Management are executed with clockwork precision—zero hassle for you." 
    },
    { 
      icon: <FiShield size={24} strokeWidth={2.5} />, 
      title: "Protect It", 
      desc: "Your Asset is our Piority. We implement strict guardrails to protect your property against any Guest-Related Damages." 
    },
    { 
      icon: <FiActivity size={24} strokeWidth={2.5} />, 
      title: "Monitor It", 
      desc: "Real-time Oversight of Guest Experiences, Staff Performance, and On-ground Coordination for Seamless Operations." 
    },
    { 
      icon: <FiSpeaker size={24} strokeWidth={2.5} />, 
      title: "Market It", 
      desc: "Strategic placement across Premium Platforms ensures your property becomes a High-demand Destination, not just a Listing." 
    },
    { 
      icon: <FiTrendingUp size={24} strokeWidth={2.5} />, 
      title: "Monetise It", 
      desc: "From Aesthetic Upgrades to Optimization, We Maximize your Passive Income and long-term Asset Value." 
    },
  ];

  const faqs = [
    {
      q: "Concerned about your Property remaining Idle?",
      a: "Our dynamic Marketing and Distribution network ensures Consistent Occupancy, keeping your Property Active and Income-Generating year-round."
    },
    {
      q: "Tired of unpredictable maintenance expenses?",
      a: "Quercus Oak streamlines all operational costs and handles logistics, shielding you from the stress of day-to-day property troubleshooting."
    },
    {
      q: "Who exactly is staying in your property?",
      a: "We implement a rigorous vetting process. Every Guest is a verified patron of luxury living, ensuring your property is treated with the utmost respect."
    },
    {
      q: "Ready to scale your Property’s Revenue?",
      a: "Join our exclusive circle of our Property Owners who have transitioned from Standard Rentals to High-Yield, Premium Hospitality Destinations."
    }
  ];

  const stats = {
    performance :  [
      { value: 75, suffix: "%", label: "Occupancy Rate Across All Properties", icon: <FiHome className="text-primary" /> },
      { value: 25, suffix: "%", label: "Revenue Growth Year on Year Increase",  icon: <FiTrendingUp className="text-success" /> },
      { value: 9, suffix: "+", label: "Properties all Over India",  icon: <FiArrowUpRight className="text-info" /> },
      { value: 95, suffix: "%", label: "Guest Satisfaction and Loyalty",  icon: <FiSmile className="text-warning" /> }
    ],
    customerInsights : {
      newCustomers: {
          acquisitionRate : {  value: 15, prefix : "", suffix: "%" },
          conversionRate : {  value: 68,  prefix : "", suffix: "%" },
          avgBookingValue : {  value: 8500, prefix : "₹ ", suffix: "" },
      },
      returningCustomers: {
          retentionRate : {  value: 82, prefix : "", suffix: "%" },
          repeatBooking : {  value: 56,  prefix : "", suffix: "%" },
          lifetimeValue : {  value: 25000, prefix : "₹ ", suffix: "" },
      }
    }
  };

export default function PropertyList() {

  const [propertyData, setPropertyData] = useState({
    title: "",
    tag: "",
    locality: "",
    description: "",
    propertyType: "Villa",
    location: "",
    mapLocation: "",
    address: "",
    price: 0,
    spaceDetails: {
      bedrooms: 0,
      bathrooms: 0,
      guests: 0,
      size: "",
      livingArea: false,
      diningArea: false,
      kitchen: 'staff',
      driverAccommodation: false
    },
    amenities: [],
    badges: [],
    featured: false,
    images: [],
    specialFeatures: "",
    rating: 4.5,
    isTaxable: true,
    show: true,
  });

  const [uploading, setUploading] = useState(false);
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [name,setName]=useState("");
  const navigate = useNavigate();

  const handleNestedChange = (parent, field, value) => {
    setPropertyData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const uploadToCloudinary = async (files) => {
    setUploading(true);
    const uploadedUrls = [];

    for (let file of files) {
      try {
        const base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

        const payload = {
          image: base64Image,
          flow: 'guests' 
        };

        const res = await axiosInstance.post(`${baseUrl}image/add`, payload);
        if (res?.data && res?.data?.data) {
          uploadedUrls.push(res.data.data);
        }
      } catch (err) {
        toast.error("Unable to Upload Image Image !!");
        return;
        // console.error("Upload Error for file:", file.name, err);
      }
    }


    setPropertyData(prev => ({ 
      ...prev, 
      images: [...prev.images, ...uploadedUrls] 
    }));
    
    setUploading(false);

    toast.success("Image Uploaded Successfully!!");

  };

  const handleDeleteImage = async (imgObj, index) => {
    try {

      const res = await axiosInstance.post(`${baseUrl}image/delete`, {
        public_id: imgObj.public_id, 
        id: imgObj._id,             
        flow: 'guests',          
        propertyId: ""
      });

      if (res.data.success) {

        setPropertyData(prev => ({
          ...prev,
          images: prev.images.filter(img => img.public_id !== imgObj.public_id)
        }));
        toast.success("Image Deleted Successfully!!");
      }
    } catch (err) {
      console.error("Error during image deletion process:", err);
      toast.error("Unable to Delete Image !!");
    }
  };

  useEffect(() => {
    const element = document.documentElement;
    element.style.scrollBehavior = 'smooth';
    element.scrollTo(0, 0);

  }, []);

  const handleValidate = () => {
    let formIsValid = true;

    if (!propertyData.title) {
      formIsValid = false;
      toast.error("Please Enter Property Name !!");
      return;
    }
    
    if (!propertyData?.spaceDetails?.bedrooms) {
      formIsValid = false;
      toast.error("Please Enter No Of Bedrooms !!");
      return;
    }

    if (!propertyData?.spaceDetails?.bathrooms) {
      formIsValid = false;
      toast.error("Please Enter No Of Bathrooms !!");
      return;
    }

    if (!propertyData?.spaceDetails?.guests) {
      formIsValid = false;
      toast.error("Please Enter Guest Capacity !!");
      return;
    }

    if (!propertyData?.locality) {
      formIsValid = false;
      toast.error("Please Enter Property Locality !!");
      return;
    }

    if (!propertyData?.mapLocation) {
      formIsValid = false;
      toast.error("Please Enter Property Google Maps Link !!");
      return;
    }

    if (!propertyData?.address) {
      formIsValid = false;
      toast.error("Please Enter Property Address !!");
      return;
    }

    if (!name) {
      formIsValid = false;
      toast.error("Please Enter Your Name !!");
      return;
    }


    if (!email && !phone) {
      formIsValid = false;
      toast.error("Please Enter Either Your Email or Phone Number !!");
      return;
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      toast.error("Please Enter a Valid Email Address !!");
      return;
    }

    if (phone) {
      const digitsOnly = phone.replace(/\D/g, "");
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        formIsValid = false;
        toast.error("Please Enter a Valid Phone Number !!");
      return;
      }
    }

    if (propertyData?.images?.length === 0 || propertyData?.images?.length < 4) {
      formIsValid = false;
      toast.error("Please Upload minimum 4 Property Images !!");
      return;
    }


  
    return formIsValid;
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    let formValid=handleValidate();

    if(formValid){

      // let data={  
      //   'email': email,
      //   'phone': phone,
      //   'name': name,
      //   'orgName': orgName,
      //   'plan': "",
      //   'message': query,
      // }

      try {
        // const response = await axiosInstance.post(`${baseUrl}/contactus`, data,{
        //     headers: {"Content-Type":"application/json"}})
        // if (response.status ===  SUCCESS) {
          setEmail("");
          setPhone("");
          setName("");
          setPropertyData({
            title: "",
            tag: "",
            locality: "",
            description: "",
            propertyType: "Villa",
            location: "",
            mapLocation: "",
            address: "",
            price: 0,
            spaceDetails: {
              bedrooms: 0,
              bathrooms: 0,
              guests: 0,
              size: "",
              livingArea: false,
              diningArea: false,
              kitchen: 'staff',
              driverAccommodation: false
            },
            amenities: [],
            badges: [],
            featured: false,
            images: [],
            specialFeatures: "",
            rating: 4.5,
            isTaxable: true,
            show: true,
          })
          toast.success("Thanks for reaching out us. Our Team will connect back to you shortly !!");
          navigate("/")
        // } 
      } catch (err) {
        // console.log("Error",err)
        toast.error("Something went wrong !!");
      }
  
    } 
  }


  const zoomStyle = {
      transform: 'scale(0.9)',
      transformOrigin: 'top left', 
      width: '111.11%',
      display: 'block',
      top: 0,
      left: 0,
  };

  const zoomStyle2 = {
      transform: 'scale(0.9)',
      transformOrigin: 'top center', 
      width: '111.11%',
      display: 'block',
      top: 0,
      left: 0,
  };


  const handleRedirection = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const element = document.getElementById('host');
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      
      const offsetPosition = elementPosition - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      }
    }, 100); 
  };

  return (
    <>
      <Header2/>

      <div className="container-fluid py-5 mb-5 hero-header2" id='home' style={zoomStyle}>
        <div className="container py-5">
          <div className="row justify-content-start py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-start introstart">
              <h2 className="fs-3 text-white mb-3 fw-normal animated slideInDown">
                Partner With QUERCUS OAK STAYS
              </h2>
              <h1 className="display-4 text-white mb-4 fw-bold text-uppercase tracking-wide animated slideInDown">
                Turn Your Visionary Property Into A Global Destination
              </h1>
              <h2 className="fs-5 text-white mb-5 fw-normal animated slideInDown" style={{ maxWidth: '800px', opacity: 0.9, lineHeight: '1.7' }}>
                We Invite Property Owners to join our Exclusive Collection of Boutique Stays. 
                By Hosting with Quercus Oak, you Leverage our Absolute Brecision in Management 
                to Unlock Effortless Revenue and World-Class Hospitality for your Property.
              </h2>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="d-inline-block"
                onClick={(e)=>{handleRedirection(e)}}
              >
                <p
                  className="btn btn-lg text-white px-5 py-3 rounded-pill fw-bold shadow-lg"
                  style={{ 
                    backgroundColor: "#756534", 
                    border: 'none', 
                    textDecoration: 'none' 
                  }}
                >
                  Start Hosting Today
                </p>
              </motion.div>

            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 5 }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1.2 
          }}
          onClick={(e)=>{handleRedirection(e)}}
          className="position-absolute start-50 translate-middle-x"
          style={{ 
            bottom: '100px',
            zIndex: 10 
          }}
        >
          <FaChevronDown className="text-white fs-3" />
        </motion.div>
      </div>

      
      {/* Core Values*/}

      <div className="container-xxl py-5 wow fadeInUp" style={zoomStyle2} data-wow-delay="0.02s">
          <div className="container">
            <div className="text-center pb-4">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Our Core Values
              </h6>
              <h1 className="mb-5">Why Choose Quercus Oak Stay</h1>
            </div>

            <div className="row gy-5 gx-4 justify-content-center">


              {coreValues.map((value, i) => (

                <div className="col-lg-3 col-sm-6 text-center pt-4">
                  <div className="position-relative border border-primary pt-5 pb-4 px-4" style={{ height: '270px' }}>
                    <div
                      className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                      style={{ width: 100, height: 100 }}
                    >
                     {value.icon}
                    </div>
                    <h5 className="mt-4">{value.title}</h5>
                    <hr className="w-25 mx-auto bg-primary mb-1" />
                    <hr className="w-50 mx-auto bg-primary mt-0" />
                    <p className="mb-0">
                      {value.desc}
                    </p>
                  </div>
                </div>

              ))}

            </div>
          </div>
      </div>


      {/* Owners Benifits */}


      <div className="container-xxl py-5 wow fadeInUp" style={zoomStyle2} data-wow-delay="0.02s">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
            <h6 className="section-title bg-light text-center text-primary px-3 d-inline-block">
              Owner Benefits
            </h6>
            <h1 className="mb-4">Choosing Quercus Oak Stay</h1>
            <p className="text-muted">Maximize your property's potential with India's most trusted management partner.</p>
          </div>

          <div className="row g-4">
            {benefits.map((item, index) => (
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${index * 0.1}s`} key={index}>
                <div className="bg-white p-4 h-100 rounded-4 shadow-sm border-0 position-relative">
                  {/* Icon Wrapper */}
                  <div 
                    className="btn-square bg-primary text-white rounded shadow-sm mb-4" 
                    style={{ width: "65px", height: "65px" }}
                  >
                    {item.icon}
                  </div>
                  
                  <h5 className="fw-bold mb-1">{item.title}</h5>
                  <small className="text-primary fw-bold text-uppercase d-block mb-3" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                    {item.subtitle}
                  </small>
                  
                  <p className="text-muted small mb-0 lh-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Number and Statistics */}

      <div className="container-xxl py-5" style={zoomStyle2} id='numbers'>
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.02s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              The Number's Speak
            </h6>
            <h1 className="mb-5">Transform Your Hotel's Performance</h1>
          </div>
          <div className="row g-4 wow fadeInUp" data-wow-delay="0.02s" >

             {stats.performance.map((stat, i) => (
                  <div className="col-lg-3 col-6 text-center mb-5" key={i}>

                    <IncrementTransitionWrapper >
                      <IncrementTansition2 className={"display-5 fw-bold text-primary mb-0"} n={stat.value} symbol1={``}  symbol2={stat.suffix}/>
                      </IncrementTransitionWrapper>
                    <p className="text-muted mb-0 fw-medium">{stat.label}</p>
                  </div>
              ))}

              <div className="col-lg-6 wow fadeInLeft mt-5" data-wow-delay="0.3s">
                <div className="bg-white p-5 rounded-4 shadow-sm border-0 h-100 border-top border-primary border-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="btn-square bg-primary-light text-primary rounded-circle me-3">
                      <FiUsers size={24} />
                    </div>
                    <h3 className="mb-0" >New Customers</h3>
                  </div>
                  
                  <div className="mb-4 bg-light p-4 rounded-3">
                    <small className="text-uppercase fw-bold text-muted d-block mb-1">Acquisition Rate</small>
                    <div className="display-5 fw-bold text-primary">
                      <IncrementTransitionWrapper >
                        <IncrementTansition2 className={"display-6 fw-bold text-primary"} n={stats?.customerInsights?.newCustomers?.acquisitionRate?.value ?? 0} symbol1={stats?.customerInsights?.newCustomers?.acquisitionRate?.prefix ?? ""} symbol2={stats?.customerInsights?.newCustomers?.acquisitionRate?.suffix ?? "" } />
                      </IncrementTransitionWrapper>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-6">
                      <p className="text-muted small mb-1">Conversion Rate</p>
                        <IncrementTransitionWrapper >
                          <IncrementTansition2 className={"h4 fw-bold text-dark"} n={stats?.customerInsights?.newCustomers?.conversionRate?.value ?? 0} symbol1={stats?.customerInsights?.conversionRate?.lifetimeValue?.prefix ?? ""} symbol2={stats?.customerInsights?.newCustomers?.conversionRate?.suffix ?? "" } />
                        </IncrementTransitionWrapper>
                    </div>
                    <div className="col-6">
                      <p className="text-muted small mb-1">Avg Booking Value</p>
                        <IncrementTransitionWrapper >
                          <IncrementTansition2 className={"h4 fw-bold text-dark"} n={stats?.customerInsights?.newCustomers?.avgBookingValue?.value ?? 0} symbol1={stats?.customerInsights?.newCustomers?.avgBookingValue?.prefix ?? ""} symbol2={stats?.customerInsights?.newCustomers?.avgBookingValue?.suffix ?? "" } />
                        </IncrementTransitionWrapper>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="col-lg-6 wow fadeInRight mt-5" data-wow-delay="0.3s">
                <div className="bg-white p-5 rounded-4 shadow-sm border-0 h-100 border-top border-primary border-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="btn-square bg-primary-light text-primary rounded-circle me-3">
                      <FiRefreshCw size={24} />
                    </div>
                    <h3 className="mb-0" >Returning Customers</h3>
                  </div>
                  
                  <div className="mb-4 bg-light p-4 rounded-3">
                    <small className="text-uppercase fw-bold text-muted d-block mb-1">Retention Rate</small>
                      <IncrementTransitionWrapper >
                        <IncrementTansition2 className={"display-6 fw-bold text-primary"} n={stats?.customerInsights?.returningCustomers?.retentionRate?.value ?? 0} symbol1={stats?.customerInsights?.returningCustomers?.retentionRate?.prefix ?? ""} symbol2={stats?.customerInsights?.returningCustomers?.retentionRate?.suffix ?? "" } />
                      </IncrementTransitionWrapper>
                  </div>

                  <div className="row g-3">
                    <div className="col-6">
                      <p className="text-muted small mb-1">Repeat Booking</p>
                        <IncrementTransitionWrapper >
                          <IncrementTansition2 className={"h4 fw-bold text-dark"} n={stats?.customerInsights?.returningCustomers?.repeatBooking?.value ?? 0} symbol1={stats?.customerInsights?.returningCustomers?.repeatBooking?.prefix ?? ""} symbol2={stats?.customerInsights?.returningCustomers?.repeatBooking?.suffix ?? "" } />
                        </IncrementTransitionWrapper>
                    </div>
                    <div className="col-6">
                      <p className="text-muted small mb-1">Customer Lifetime Value</p>
                        <IncrementTransitionWrapper >
                          <IncrementTansition2 className={"h4 fw-bold text-dark"} n={stats?.customerInsights?.returningCustomers?.lifetimeValue?.value ?? 0} symbol1={stats?.customerInsights?.returningCustomers?.lifetimeValue?.prefix ?? ""} symbol2={stats?.customerInsights?.returningCustomers?.lifetimeValue?.suffix ?? "" } />
                        </IncrementTransitionWrapper>
                    </div>
                  </div>
                </div>
              </div>


              <h1 className="mb-5" style={{textAlign:'center'}}>

                <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                  <h2>Trusted By Many Property Owners all over India !</h2>

                </div>
              
              
              </h1>
          </div>
        </div>
      </div>  

      <div className="container-xxl py-5" style={zoomStyle2} id='numbers'>
        <div className="container">

          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '800px' }}>
            <h6 className="section-title bg-light text-center text-primary px-3 d-inline-block">The "Oak" Promise</h6>
            <h1 className="mb-4">Core Proposition For Property Owners</h1>
          </div>

          <div className="row g-5">

            <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.2s">
              <div className="bg-white p-5 rounded-4 shadow-sm h-100">
                <h3 className="mb-5 border-bottom pb-3" >
                  Comprehensive Management
                </h3>
                
                <div className="space-y-4">
                  {propositions.map((item, index) => (
                    <div key={index} className="d-flex align-items-start mb-4">
                      <div className="btn-square bg-primary text-white rounded-circle flex-shrink-0 me-3" style={{ width: '45px', height: '45px' }}>
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">{item.title}</h5>
                        <p className="text-muted small mb-0">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.2s">
              <div className="bg-white p-5 rounded-4 shadow-sm h-100">
                <div className="accordion-custom">
                  {faqs.map((faq, index) => (
                    <div key={index} className="mb-4 p-4 rounded-3 border-start border-primary border-4 bg-light">
                      <h6 className="fw-bold text-dark mb-2">
                        <i className="fa fa-question-circle text-primary me-2"></i>
                        {faq.q}
                      </h6>
                      <p className="text-muted small mb-0">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}

      <div className="container-xxl py-5 wow fadeInUp" style={zoomStyle2}  data-wow-delay="0.02s" >
        <div className="container">
          <div className="demo p-5">
            <div className="row g-5 align-items-center text-center">

              <div className="col-lg-3 col-md-6 col-sm-6 col-6 position-relative mx-auto">
                <img
                  className="img-fluid custom-Genie"
                  src={require('../assets/img/logolight135x255.png')}
                  alt="Quercus Oak Stay"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="col-lg-9 col-md-6 text-white">

                <div>
                  <span className="btn btn-sm px-3 border-end custom-demoButton">
                    List Your Property Today
                  </span>
                </div>

                <br />

                <h1 className="custom-text mb-4">
                  Turn Your Property Into A High-Earning Stay
                </h1>

                <p className="custom-text mb-4 custom-text-bold">
                  Join Quercus Oak Stay And Showcase Your Villas, Hotels, Apartments, Or Unique Properties To A Growing Network Of Travelers Across Premium Destinations.
                </p>

                <p className="custom-text mb-4 custom-text-bold">
                  We Help You Maximize Bookings, Manage Guests Seamlessly, And Deliver Exceptional Stay Experiences With Our Dedicated Support.
                </p>

                <div>
                  <button
                    onClick={(e)=>{handleRedirection(e)}}
                    className="btn btn-sm px-3 border-end custom-demoButton mb-2"
                  >
                    List Your Property
                  </button>
                 
                 
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Query */}


      <div className="container-xxl py-5 wow fadeInUp"  style={zoomStyle2}  data-wow-delay="0.02s" id='host'>
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.02s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Onboard With Us
            </h6>
            <h1 className="mb-5">List Your Property with Quercus Oak Stays</h1>
          </div>
          <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
            <h4 className="mb-4 text-primary" >Primary Information</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="small fw-bold">Name *</label>
                <input type="text" className="form-control bg-light border-0 p-3" placeholder="Property Name" onChange={e => setPropertyData({...propertyData, title: e.target.value})} />
              </div>
              <div className="col-md-3">
                <label className="small fw-bold">Property Type *</label>
                <select className="form-select bg-light border-0 p-3" onChange={e => setPropertyData({...propertyData, propertyType: e.target.value})}>
                  {[ "Villa", "Apartment", "Cottage", "Homestay", "Resort", "Hotel", "Boutique Property", "Guest House", "Farmhouse", "Bungalow", "Studio", "Hostel", "Chalet"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              {/* <div className="col-12">
                <label className="small fw-bold">Description</label>
                <textarea className="form-control bg-light border-0 p-3" rows="3" onChange={e => setPropertyData({...propertyData, description: e.target.value})}></textarea>
              </div> */}
            </div>
          </div>

          <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
            <h4 className="mb-4 text-primary" >Space & Capacity</h4>
            <div className="row g-3">
              <div className="col-md-2 col-6">
                <label className="small fw-bold">No Of Bedrooms *</label>
                <input type="number" className="form-control bg-light border-0 p-3" onChange={e => handleNestedChange('spaceDetails', 'bedrooms', e.target.value)} />
              </div>
              <div className="col-md-2 col-6">
                <label className="small fw-bold">No Of Bathrooms *</label>
                <input type="number" className="form-control bg-light border-0 p-3" onChange={e => handleNestedChange('spaceDetails', 'bathrooms', e.target.value)} />
              </div>
              <div className="col-md-2 col-6">
                <label className="small fw-bold">No Of Guests *</label>
                <input type="number" className="form-control bg-light border-0 p-3" onChange={e => handleNestedChange('spaceDetails', 'guests', e.target.value)} />
              </div>
              <div className="col-md-3 col-6">
                <label className="small fw-bold">Kitchen *</label>
                <select className="form-select bg-light border-0 p-3" onChange={e => handleNestedChange('spaceDetails', 'kitchen', e.target.value)}>
                  <option value="staff">Staff Managed</option>
                  <option value="self">Self Service</option>
                </select>
              </div>
              <div className="col-md-3 d-flex align-items-center">
                <div className="form-check form-switch mt-4">
                  <input className="form-check-input" type="checkbox" onChange={e => handleNestedChange('spaceDetails', 'driverAccommodation', e.target.checked)} />
                  <label className="form-check-label small fw-bold">Driver Stay Available *</label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
            <h4 className="mb-4 text-primary">Location Details</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="small fw-bold">Locality *</label>
                <input type="text" className="form-control bg-light border-0 p-3" placeholder="e.g. Jharipani, Mussorie" onChange={e => setPropertyData({...propertyData, locality: e.target.value})} />
              </div>
              <div className="col-md-6">
                <label className="small fw-bold">Google Maps Link *</label>
                <input type="text" className="form-control bg-light border-0 p-3" placeholder="URL" onChange={e => setPropertyData({...propertyData, mapLocation: e.target.value})} />
              </div>
              <div className="col-12">
                <label className="small fw-bold">Full Address *</label>
                <textarea className="form-control bg-light border-0 p-3" rows="3" onChange={e => setPropertyData({...propertyData, address: e.target.value})}></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
            <h4 className="mb-4 text-primary">Contact Details</h4>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="small fw-bold">Your Name *</label>
                <input type="text" className="form-control bg-light border-0 p-3"  onChange={e => setName(e.target.value)} />
              </div>
              <div className="col-md-4">
                <label className="small fw-bold">Your Contact Number *</label>
                <input type="number" className="form-control bg-light border-0 p-3"  onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="col-md-4">
                <label className="small fw-bold">Your Email Id *</label>
                <input type="email" className="form-control bg-light border-0 p-3" onChange={e => setEmail(e.target.value)} />
              </div>

            </div>
          </div>

          <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
            <h4 className="mb-4 text-primary" >Gallery *</h4>
            <div className="row g-3">
              {propertyData.images.map((img, i) => (
                <div className="col-md-2 col-4 position-relative" key={img.public_id || i}>
                  <img src={img.url} className="rounded-3 w-100 object-fit-cover" style={{ height: '150px' }} />
                  <button 
                    onClick={() => handleDeleteImage(img, i)} 
                    className="btn btn-danger btn-sm position-absolute shadow-sm"
                    style={{ 
                      top: '5px',    
                      right: '14px',   
                      zIndex: 10       
                    }}                    
                    title="Delete Image"
                  >
                    <FiTrash2 size={14}/>
                  </button>                
                </div>
              ))}
              {
                propertyData.images.length < 10 &&

                <div className="col-md-2 col-4">
                  <label style={{ height: '150px' }} className="w-100 rounded-3 border-2 border-dashed d-flex align-items-center justify-content-center text-primary bg-light" style={{ height: '100px', cursor: 'pointer', borderStyle: 'dashed' }}>
                    <FiUploadCloud size={24} />
                    <input style={{ height: '150px' }} type="file" multiple className="d-none" onChange={e => uploadToCloudinary(e.target.files)} />
                  </label>
                </div>

              }
            </div>
          </div>

          <div className="text-center mt-5">
            <button 
              onClick={(e)=>{handleSubmit(e)}}
              className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold shadow"
              disabled={uploading}
            >
              Submit Your Request
            </button>
          </div>

        </div>
      </div>
    

      <Footer />
    </>
        

  )
}
