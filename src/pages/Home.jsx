import React, { useState,useEffect,useMemo,useRef } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Marquee from '../components/Marquee.jsx';
import FAQS from '../components/FAQ.jsx';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance.js"
import { baseUrl, SUCCESS, MARQUEE_COUNT, WHATSAPP_LIST_MESSAGE,WHATSAPP_CHAT_NUMBER ,TIME_SAVING_COUNT, REVENUE_GROWTH_COUNT, STAFF_EFFICIENCY_COUNT, GUEST_SATISFACTION_COUNT, OPERATION_VISIBILITY_COUNT, GUEST_FEEDBACK_COUNT, TRUSTEDBY_COUNT } from "../config/configuration.js";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"
import moment from 'moment'
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { useLocation } from 'react-router-dom';

import {
  FaWifi,
  FaTv,
  FaUtensils,
  FaTree,
  FaUmbrellaBeach,
  FaBuilding,
  FaTshirt,
  FaSwimmingPool,
  FaParking,
  FaFire,
  FaSnowflake,
  FaDumbbell,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

import { MdDeck } from "react-icons/md";
import axios from "axios";


export default function Home() {

  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [name,setName]=useState("");
  // const [orgName,setOrgName]=useState("");
  const [query,setQuery]=useState("");
  const [checkInDate,setCheckInDate]=useState(null);
  const [checkOutDate,setCheckOutDate]=useState(null);
  const [propertyLocation,setPropertyLocation]=useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const intervalRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [properties ,setProperties]=useState([])
  const [locations ,setLocations]=useState([])
  const [amenities ,setAmenities]=useState([])
  const [propertyImages ,setPropertyImages]=useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navigate = useNavigate();

  const amenityIconMap = {
      "High-Speed WiFi": <FaWifi />,
      "Smart TV": <FaTv />,
      "Gourmet Kitchen": <FaUtensils />,
      "Garden": <FaTree />,
      "Patio": <MdDeck />,
      "Terrace": <FaUmbrellaBeach />,
      "Balcony": <FaBuilding />,
      "Laundry": <FaTshirt />,
      "Private Pool": <FaSwimmingPool />,
      "Secure Parking": <FaParking />,
      "Fireplace": <FaFire />,
      "BBQ Area": <FaFire />,
      "Central AC": <FaSnowflake />,
      "Gym": <FaDumbbell />,
      "Cafe"  : <FaUtensils />
  };
    
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    getPropertiesDataCall();
    getLocationDataCall();
    getConfigutionSettingsCall();
    getGalleryImagesCall();
  }, []);


  const getPropertiesDataCall=async()=>{
    
      try {
        const response = await axios.get(`${baseUrl}property/all`,{
            headers: {"Content-Type":"application/json" }})

        if (response.status === 200) {

          let result = response?.data?.data?.filter((item)=>(item?.show && !item?.delete))

          setProperties(result)


        }
      
     
      } catch (err) {

       console.log("errr properrty get",err)
 
      }

    
  }

  const getLocationDataCall=async()=>{
    
      try {
        const response = await axios.get(`${baseUrl}location/get`,{
            headers: {"Content-Type":"application/json" }})

        if (response.status === 200) {

          let result = response?.data?.data?.filter((item)=>(item?.show))
          setLocations(result)

        }
      
     
      } catch (err) {

       console.log("errr properrty get",err)
 
      }

    
  }

  const getConfigutionSettingsCall=async()=>{
    
      try {
        const response = await axios.get(`${baseUrl}configuration/get`,{
            headers: {"Content-Type":"application/json" }})

        if (response.status === 200) {

          let result = response?.data?.data?.[0]?.amenities
          setAmenities(result)

        }
      
     
      } catch (err) {

       console.log("errr properrty get",err)
 
      }

    
  }

  const getGalleryImagesCall=async()=>{
    
      try {

        const response = await axios.get(`${baseUrl}image/all?type=gallery`,{
            headers: {"Content-Type":"application/json" }})

        if (response.status === 200) {

          let result = response?.data?.data?.filter((item)=>(item?.show))
          setPropertyImages(result)

        }
      
     
      } catch (err) {

       console.log("errr properrty get",err)
 
      }

    
  }

  const locationsData = useMemo(() => {
    return locations;
  }, [locations]);


  const handlePropertyBook =async(e,property)=>{
    e.preventDefault();
    navigate(`/property/view/${property?._id}`, { state: {flow : "book",property : property}  });
    
  }

  const handlePropertyClick =async(e,property)=>{
    e.preventDefault();
    navigate(`/property/view/${property?._id}`, { state: {flow : "view",property : property}  });

      
  }

  function PropertyCard({ property }) {
    const [hovered, setHovered] = useState(false);

    return (
      <div
        onClick={(e)=>{handlePropertyClick(e,property)}}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...zoomStyle2,
          background: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: hovered
            ? "0 12px 40px rgba(44,37,23,0.15)"
            : "0 2px 16px rgba(44,37,23,0.07)",
          transition: "0.3s",
          transform: hovered ? "translateY(-4px)" : "none",
          height: "520px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            position: "relative",
            paddingTop: "65%",
            overflow: "hidden"
          }}
        >
          <img
            src={property.images?.[0]?.url}
            alt={property.title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "0.5s"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              display: "flex",    
              flexDirection: "row",  
              gap: "5px",            
              zIndex: 10,            
              width: "max-content"   
            }}
          >
            {property.tag && (
              <div
                style={{
                  background: "#756534",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "3px",
                  fontSize: "11px",
                  fontWeight: "700",
                  whiteSpace: "nowrap" 
                }}
              >
                {property.tag}
              </div>
            )}

            {property.propertyType && (
              <div
                style={{
                  background: "#756534",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "3px",
                  fontSize: "11px",
                  fontWeight: "700",
                  whiteSpace: "nowrap"
                }}
              >
                {property.propertyType}
              </div>
            )}
          </div>
         
          {property.rating && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "#756534",
                color: "white",
                padding: "4px 10px",
                borderRadius: "3px",
                fontSize: "11px",
                fontWeight: "700"
              }}
            >
              <i className="fa fa-star"></i> {"\u0000"} {"\u0000"}{property.rating}
            </div>
          )}

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              padding: "10px 10px 10px",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap"
            }}
          >
            {[
              {
                icon: <i className="fa fa-bed"></i>,
                label: `${property.spaceDetails.bedrooms} Rooms`
              },
              {
                icon: <i className="fa fa-bath"></i>,
                label: `${property.spaceDetails.bathrooms} Bathrooms`
              },
              {
                icon: <i className="fa fa-users"></i>,
                label: `${property.spaceDetails.guests} Guests`
              },
              {
                icon: <i className="fa fa-ruler-combined"></i>,
                label: `${property.spaceDetails.size} Sq.Ft`
              }
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  color: "white",
                  fontSize: "10px"
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "16px"
          }}
        >
          <div
            style={{
              fontSize: "15px",
              fontWeight: "600",
              marginBottom: "4px"
            }}
          >
            {property.title}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              color: "#756534",
              marginBottom: "10px"
            }}
          >
            <i className="fa fa-map-marker-alt"></i>{" "}
            {property.locality},{" "}
            {locations.find((loc) => loc.value === property.location)?.label}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px"
              }}
            >
              {property.amenities?.slice(0, 9).map((amenity, i) => {
                const icon = amenityIconMap[amenity]
                if (!icon) return null;

                return (
                  <span
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      background: "#f6f3ee",
                      padding: "4px 8px",
                      borderRadius: "6px"
                    }}
                  >
                    {icon}
                    {amenity}
                  </span>
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "auto",
              paddingTop: "10px",
              paddingBottom: "10px"
            }}
          >
            <div>
              <span style={{ fontSize: "12px" }}>From </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#756534"
                }}
              >
                ₹{property.price.toLocaleString()}
              </span>
              <span style={{ fontSize: "12px" }}> / Night</span>

              <div style={{ fontSize: "10px", color: "#aaa" }}>
                { property?.isTaxable ? "( Excl. Taxes & Charges )" : "( Inclusive of Taxes )"}

              </div>
            </div>

            <button
              style={{
                padding: "9px 15px",
                border: "1.5px solid #756534",
                background: "transparent",
                color: "#756534",
                borderRadius: "3px",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#756534";
                e.currentTarget.style.color = "white";
              }}
              onClick={(e) => {
                e.stopPropagation(); 
                handlePropertyBook(e, property);
              }}            
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#756534";
              }}
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    );
  }


  useEffect(() => {
    const element = document.documentElement;
    element.style.scrollBehavior = 'smooth';
    element.scrollTo(0, 0);


    let temp = moment.utc().add(5,"hours").add(30,'minutes').format("YYYY-MM-DD")
    let temp1 = moment.utc().add(2,"days").add(5,"hours").add(30,'minutes').format("YYYY-MM-DD")
    setCheckInDate(temp)
    setCheckOutDate(temp1)


  }, []);

  const resetFilters = () => {
       navigate('/');
  };

  useEffect(() => {
      if (propertyImages && propertyImages.length > 0) {
        intervalRef.current = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length)
        }, 4000)
        return () => clearInterval(intervalRef.current)
      }
  }, [propertyImages.length])


  const handleSearch=async(e)=>{
    e.preventDefault();
    localStorage.setItem("filters", JSON.stringify({
      propertyLocation,
      checkInDate,
      checkOutDate,
      adults,
      children
    }));
    navigate('/properties');

  }

  const handleLocationClick=async(e,location)=>{
    e.preventDefault();
    localStorage.setItem("filters", JSON.stringify({
      propertyLocation : location.value,
      checkInDate,
      checkOutDate,
      adults,
      children
    }));
    navigate('/properties');

  }

  const handleValidate = () => {
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      toast.error("Please Enter Your Name!!");
    }

    if (!email && !phone) {
      formIsValid = false;
      toast.error("Please Enter Either Your Email or Phone Number!");
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      toast.error("Please Enter a Valid Email Address!");
    }

    if (phone) {
      const digitsOnly = phone.replace(/\D/g, "");
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        formIsValid = false;
        toast.error("Please Enter a Valid Phone Number!");
      }
    }

    if (!query) {
      formIsValid = false;
      toast.error("Please Enter Your Question !!");
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
        // 'orgName': orgName,
        'message': query,
      }

      try {
        const response = await axiosInstance.post(`${baseUrl}/query/add`, data,{
            headers: {"Content-Type":"application/json"}})
        if (response.status ===  SUCCESS) {
          setEmail("");
          setPhone("");
          setName("");
          // setOrgName("");
          setQuery("");
          toast.success("Thanks for Reaching out to Us. Our Team will Connect back to you Shortly !!");
          navigate("/")
        } 
      } catch (err) {
        console.log("Error",err)
        toast.error("Unable to Request your Query. Please Try Again Later !!");
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
      transformOrigin: 'top left', 
      width: '100%',
      display: 'block',
      top: 0,
      left: 0,
  };

  return (
    <>
    <Header/>
     <div>
      <div className="container-fluid  py-5 mb-5 hero-header" id='home' style={zoomStyle}>
        <div className="container py-5">
          <div className="row justify-content-start py-5">
          <div className="col-lg-10 pt-lg-5 mt-lg-5 text-start introstart">
            <h2 className="fs-4 text-white mb-3 fw-normal animated slideInDown">
              Rooted in Excellence, Grown for the Extraordinary.

            </h2>
            <h1 className="display-4 text-white mb-4 fw-bold text-uppercase tracking-wide animated slideInDown">
              Sophisticated boutique living, crafted with Absolute Precision.
            </h1>
            <h2 className="fs-4 text-white mb-3 fw-normal animated slideInDown">
              Experience A New Era Of Bold Hospitality where iconic style meets seamless Boutique Luxury.
            </h2>
          </div>

          
        </div>
         <div className="qs-search-wrapper">
          <div className="qs-search-container">
            <div className="qs-search-flex-bar">
              
              <div className="qs-search-block">
                <label className="qs-label"><i className="bi bi-search qs-search"></i>{"  "}Location</label>
                  {/* <input type="text" className="qs-input" placeholder="All" value={propertyLocation} onChange={(e)=>{setPropertyLocation(e.target.value)}} /> */}
                <select 
                  className="qs-input" 
                  value={propertyLocation} 
                  onChange={(e) => setPropertyLocation(e.target.value)}
                  style={{ appearance: 'none' }}
                >
                  <option key={""} value={"all"}>{"All"}</option>
                  {locationsData.map((loc, index) => (
                    <option key={index} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="qs-divider"></div>

              <div className="qs-search-block">
                <label className="qs-label">Check In</label>
                <input type="date" className="qs-input" value={checkInDate} onChange={(e)=>{setCheckInDate(e.target.value)}} />
              </div>

              <div className="qs-divider"></div>

              <div className="qs-search-block">
                <label className="qs-label">Check Out</label>
                <input type="date" className="qs-input" value={checkOutDate} onChange={(e)=>{

                  const start = moment(checkInDate).startOf('day');
                  const end = moment(e.target.value).startOf('day');

                  console.log("start",start,end,end.isSameOrBefore(start, 'day'))

                  if (end.isSameOrBefore(start, 'day')) {
                      toast.error("Please select a Check Out date that follows your arrival.");
                    setCheckOutDate(moment(checkInDate).add(1, 'days').format("YYYY-MM-DD"));
                  } else {
                    setCheckOutDate(e.target.value)
                  }
                                  
                  
                  
                  }} />
              </div>

              <div className="qs-divider"></div>

              {/* <div className="qs-search-block">
                <label className="qs-label">No Of Guests</label>
                  <input type="number" className="qs-input" placeholder="1" value={adults} onChange={(e)=>{
                    const value = parseInt(e.target.value);
                    setAdults(value < 1 || isNaN(value) ? 1 : value);
                    
                    }} />
              </div> */}
              <div className="qs-search-block" style={{ position: 'relative' }}>
                <label className="qs-label">Guests</label>
          
                <div 
                  className="qs-input guest-input-display" 
                  onClick={() => setShowPicker(!showPicker)}
                >
                  {`Adult ${adults} and Child ${children}`}
                </div>

                {showPicker && (
                  <div className="qs-guest-picker shadow">
                    <div className="qs-guest-row">
                      <div>
                        <div className="qs-guest-title">Adults</div>
                        <small className="qs-guest-subtitle">12+</small>
                      </div>
                      <div className="qs-counter">
                        <button onClick={() => adults > 1 && setAdults(adults - 1)}>-</button>
                        <span>{adults}</span>
                        <button onClick={() => setAdults(adults + 1)}>+</button>
                      </div>
                    </div>

                    <div className="qs-guest-row">
                      <div>
                        <div className="qs-guest-title">Children</div>
                        <small className="qs-guest-subtitle">6-11</small>
                      </div>
                      <div className="qs-counter">
                        <button onClick={() => children > 0 && setChildren(children - 1)}>-</button>
                        <span>{children}</span>
                        <button onClick={() => setChildren(children + 1)}>+</button>
                      </div>
                    </div>

                    <button className="qs-done-btn" onClick={() => setShowPicker(false)}>
                      Done
                    </button>
                  </div>
                )}
              </div>

              <button type="button" className="qs-search-btn" onClick={(e)=>{handleSearch(e)}}>
                Search
              </button>
              
            </div>
          </div>
        </div>


       </div>
      </div>


      {/* About Start */}

      <div className="container-xxl py-5 p-5 padding-top-custom"   id='about'> 
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 col-md-6 wow fadeInUp custom-ginie-div" data-wow-delay="0.02s">
              <div className="position-relative h-100 d-flex justify-content-center align-items-center">
                <img
                  className="img-fluid custom-genie-mobile"
                  src={require('../assets/img/7.jpg')}
                  alt="About Us"
                  style={{ 
                    objectFit: "cover", 
                    maxHeight: "400px",
                    borderRadius : 20, 
                    width: "auto"      
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6  wow fadeInUp custom-text-about" data-wow-delay="0.3s">
              <h6 className="section-title bg-white text-start text-primary pe-3">
                About Us
              </h6>
              <h1 className="mb-3">
                Welcome to <span className="text-primary">Quercus Oak Stays</span>
              </h1>
              <p className="mb-4 text-justify">
                Welcome to Quercus Oak Hospitality, where timeless elegance meets the pinnacle of Boutique Service.
                </p>
              <p className="mb-4 text-justify">
                Established in 2021, we believe that true luxury is found in the details—the strength of our heritage and the warmth of our personalized care. 
              </p>

              <p className="mb-4 text-justify">
                Our portfolio of boutique properties offers a rare, immersive experience for the discerning traveler. Leveraging a passion for architectural beauty and premium service, we are redefining what it means to stay in style. From tranquil retreats to urban sanctuaries, our commitment ensures an uncompromising standard of excellence and world-class comfort.
              </p>
              <p className="mb-4 text-justify">
              Our team is composed of industry visionaries, service artisans, and hospitality experts dedicated to crafting exceptional journeys. With a robust focus on operational precision and guest satisfaction, we are committed to elevating hotel management into an art form, giving you peace of mind and unforgettable memories.
              </p>
              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    Vision for Premier Excellence
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    Curated Boutique Experiences
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    Unwavering Management Quality
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    Established Legacy Since 2021
                  </p>
                </div>
                
              </div>
         
            </div>
            <br />

          </div>
        </div>
      </div>

      {/* About End */}

      
      {/* Locations Start */}
      
      <div className="container-xxl py-5 padding-top-custom padding-bottom-custom" id="services">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.02s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Locations
            </h6>
            <h1 className="mb-5">Our Premium Locations</h1>
          </div>

          

            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              loop={true}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={1000}
              breakpoints={{
                0: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                1000: { slidesPerView: 3 },
              }}
            >
            {locationsData.map((loc, index) => (
              <SwiperSlide key={`loc-${index}`}>
                <div 
                  style={{ borderRadius: 25, boxShadow:hoveredIndex === index ? "0 12px 40px rgba(44,37,23,0.15)" : "none", transition: "0.3s",  transform: hoveredIndex === index ? "translateY(-4px)" : "none", }}
                  className="bg-white text-center border p-4 m-2"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={(e) => handleLocationClick(e, loc)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    style={{
                      borderRadius: 25,
                      overflow: "hidden",
                      paddingBottom: 15,
                    }}
                  >
                    <img
                      src={loc.image}
                      alt={loc.label}
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <h5 className="mb-2">{loc.label}</h5>
                  <p className="text-primary mb-2">Premium Destination</p>
                  <p className="mb-0 small text-muted">
                    Experience the best of {loc.label} with Quercus Oak Stay's Premium properties.
                  </p>
                </div>

                <div style={{ paddingBottom: 40 }}></div>
              </SwiperSlide>
            ))}
            </Swiper>

        </div>
      </div>


      {/* Locations End */}

      {/* Properties Start */}
      
      <div className="container-xxl py-5 padding-top-custom padding-bottom-custom" id="properties">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.02s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Properties
            </h6>
            <h1 className="mb-5">Our Featured Properties</h1>
          </div>
          
            
              {properties?.length ? (

                <div className="text-center mt-5 wow fadeInUp" data-wow-delay="0.1s">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile
                        ? "1fr"
                        : "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "20px",
                      justifyContent: "center",
                      margin: "0 auto",
                      maxWidth: isMobile ? "100%" : "1200px",
                    }}
                    className="wow fadeInUp" data-wow-delay="0.02s"
                    >
                      {

                        properties?.filter((item)=>(item.featured)).map((p) => (
                          <PropertyCard key={p.id} property={p} />
                        ))
                      }

                  </div>
                  <div className="text-center mt-5">
                    <p className="mb-3">Explore our full collection of premium stays</p>
                    <button
                        onClick={() => {

                          localStorage.removeItem('filters')
                          navigate('/properties')

                        }} 
                        style={{
                            padding: "12px 30px",
                            borderRadius: "50px",
                            border: "2px solid #756534",
                            background: "transparent",
                            color: "#756534",
                            fontWeight: "600",
                            transition: "0.3s",
                            cursor: "pointer"
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = "#756534";
                            e.target.style.color = "#fff";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "#756534";
                        }}
                    >
                        View All Properties
                    </button>
                  </div>
                </div>

              ) : (

                <div
                      style={{
                        gridColumn: "1 / -1",
                        textAlign: "center",
                        padding: "60px 20px",
                      }}
                    >
                      <h4 style={{ marginBottom: 10 }}>No Properties Found</h4>
                      <p style={{ color: "#888" }}>
                        No Properties Found
                      </p>

                      <button
                        onClick={resetFilters}
                        style={{
                          marginTop: 15,
                          padding: "8px 16px",
                          borderRadius: 8,
                          border: "none",
                          background: "#756534",
                          color: "#fff",
                          cursor: "pointer"
                        }}
                      >
                        Refresh
                      </button>
                </div>
   
          )}
        
        </div>
      </div>


      {/* Properties End */}

      {/* Gallery Start */}
      
      <div className="container-xxl py-5 destination padding-top-custom " id='gallery'>
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.02s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Gallery
            </h6>
          </div>


          <div className="gallery-container2">
            <div className="gallery-wrapper">

              {/* MAIN IMAGE */}
              <div className="gallery-main">

                <img
                  src={propertyImages[currentImageIndex]?.url}
                  alt=""
                />

                {/* OVERLAY */}
                <div className="gallery-overlay" />

                {/* COUNTER */}
                <div className="gallery-counter">
                  {currentImageIndex + 1} / {propertyImages.length}
                </div>

                {/* ARROWS */}
                {propertyImages?.length > 1 && (
                  <>
                    <button
                      className="gallery-arrow left"
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) =>
                            (prev - 1 + propertyImages.length) %
                            propertyImages.length
                        )
                      }
                    >
                      <FaChevronLeft />
                    </button>

                    <button
                      className="gallery-arrow right"
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) =>
                            (prev + 1) % propertyImages.length
                        )
                      }
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>

              {/* THUMBNAILS */}
              {propertyImages.length > 1 && (
                <div className="gallery-thumbs-container">
                  <div className="gallery-thumbnails">
                    {propertyImages.map((img, index) => (
                      <div
                        key={index}
                        className={`gallery-thumb ${
                          currentImageIndex === index ? "active" : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img src={img?.url} alt="hello" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div> 

      {/* Gallery End */}


      {/* Amenties Start */}
      
      <div className="container-xxl py-5 padding-top-custom padding-bottom-custom" id="amenities">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.02s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Amenities
            </h6>
            <h1 className="mb-5">Our Premium Amenties</h1>
          </div>

          <div className="row g-4 wow fadeInUp" data-wow-delay="0.02s">
            {amenities?.map((item, index) => (
                <div 
                  className="col-lg-3 col-sm-6" 
                  data-wow-delay={`${index * 0.1}s`} 
                  key={index}
                >
                  <div className="service-item rounded pt-3 h-100">
                    <div className="p-4 text-center">
                      {/* Icon Rendering */}
                      <div className="text-primary mb-4" style={{ fontSize: '3rem' }}>
                         {amenityIconMap[item.name]}
                      </div>

                      <h5>{item.name}</h5>

                      {item.limited && (
                        <>
                          <span className="badge  text-dark mb-2">Available in Selected Properties Only</span>
                        
                        </>
                      ) }
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Amenties End */}

      {/* Service Start */}
      
      <div className="container-xxl py-5 padding-top-custom padding-bottom-custom wow fadeInUp" data-wow-delay="0.02s" id="services">
        <div className="container">
          <div className="text-center">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Services
            </h6>
            <h1 className="mb-5">Our Services</h1>
          </div>

          <div className="row g-4">

            <div className="col-lg-3 col-sm-6">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-home text-primary mb-4" />
                  <h5>Property Listing Platform</h5>
                  <p>
                    List Your Villas, Hotels, And Unique Stays With Ease And Reach A Wider Audience Of Verified Travelers.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-search text-primary mb-4" />
                  <h5>Curated Stay Discovery</h5>
                  <p>
                    Explore Handpicked Luxury Villas, Boutique Hotels, And Unique Properties Across Top Destinations.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-calendar-check text-primary mb-4" />
                  <h5>Seamless Booking Experience</h5>
                  <p>
                    Enjoy A Smooth And Hassle-Free Booking Process With Transparent Pricing And Instant Confirmations.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-star text-primary mb-4" />
                  <h5>Verified Quality Stays</h5>
                  <p>
                    Every Property Is Carefully Reviewed To Ensure High Standards Of Comfort, Cleanliness, And Experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-chart-line text-primary mb-4" />
                  <h5>Revenue Growth For Hosts</h5>
                  <p>
                    Maximize Your Property’s Earnings With Better Visibility, Smart Pricing, And Targeted Promotions.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-users text-primary mb-4" />
                  <h5>Guest & Host Support</h5>
                  <p>
                    Dedicated Support To Assist Both Travelers And Property Owners At Every Step Of The Journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-map-marker-alt text-primary mb-4" />
                  <h5>Multiple Destinations</h5>
                  <p>
                    Access Premium Stays Across Popular Travel Locations And Hidden Gems For Every Kind Of Traveler.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-heart text-primary mb-4" />
                  <h5>Personalized Experiences</h5>
                  <p>
                    Discover Stays And Experiences Tailored To Your Preferences — From Romantic Getaways To Family Vacations.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Service End */}



      {/* Why Us Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.02s">
        <div className="container">
          <div className="text-center pb-4">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Why Us
            </h6>
            <h1 className="mb-5">Why Choose Quercus Oak Stay</h1>
          </div>

          <div className="row gy-5 gx-4 justify-content-center">

            <div className="col-lg-4 col-sm-6 text-center pt-4">
              <div className="position-relative border border-primary pt-5 pb-4 px-4" style={{ height: '270px' }}>
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-home fa-3x text-white" />
                </div>
                <h5 className="mt-4">Curated Premium Stays</h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  Discover handpicked villas, hotels, and unique properties that meet our quality standards for comfort, design, and experience.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 text-center pt-4">
              <div className="position-relative border border-primary pt-5 pb-4 px-4" style={{ height: '270px' }}>
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-globe fa-3x text-white" />
                </div>
                <h5 className="mt-4">Wide Range Of Destinations</h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  From serene hill stations to vibrant tourist hubs, explore stays across top destinations tailored to every travel style.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 text-center pt-4">
              <div className="position-relative border border-primary pt-5 pb-4 px-4" style={{ height: '270px' }}>
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-star fa-3x text-white" />
                </div>
                <h5 className="mt-4">Trusted By Guests & Hosts</h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  Loved by travelers and trusted by property owners, we ensure reliable bookings, verified listings, and quality experiences.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Why Us End */}


    {/* Testimonial Starts */}

      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.02s">
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Testimonial
          </h6>
          <h1 className="mb-5">Our Clients Say!!!</h1>
        </div>
        <OwlCarousel
          className="owl-theme"
          loop
          margin={10}
          nav
          items={1}
          autoplay
        >

          <div className="testimonial-item bg-white text-center border p-4">
            <img
              className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
              src={require('../assets/img/testimony.jpg')}
              style={{ width: 80, height: 80 }}
            />
            <h5 className="mb-0">Shreya Desai</h5>
            <p>Traveler, Dehradun</p>
            <p className="mb-0">
              Staying with Quercus Oak Stay was an amazing experience. The villa was exactly as shown, super clean, and had breathtaking views. It truly felt like a home away from home.
            </p>
          </div>

          <div className="testimonial-item bg-white text-center border p-4">
            <img
              className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
              src={require('../assets/img/testimony1.jpg')}
              style={{ width: 80, height: 80 }}
            />
            <h5 className="mb-0">Ankita Sharma</h5>
            <p>Traveler, Rishikesh</p>
            <p className="mb-0">
              Booking was seamless and the property exceeded expectations. The staff was very responsive and helpful throughout our stay. Highly recommended for family trips!
            </p>
          </div>

          <div className="testimonial-item bg-white text-center border p-4">
            <img
              className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
              src={require('../assets/img/team-4.jpg')}
              style={{ width: 80, height: 80 }}
            />
            <h5 className="mb-0">Rahul Verma</h5>
            <p>Traveler, Delhi</p>
            <p className="mb-0">
              The location, ambiance, and comfort were top-notch. We booked a weekend getaway and it turned out to be one of our best trips. Will definitely book again!
            </p>
          </div>

          <div className="testimonial-item bg-white text-center border p-4">
            <img
              className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
              src={require('../assets/img/team-1.jpg')}
              style={{ width: 80, height: 80 }}
            />
            <h5 className="mb-0">Ram Mittal</h5>
            <p>Property Owner, Mussoorie</p>
            <p className="mb-0">
              Listing my property with Quercus Oak Stay has significantly increased my bookings. Their platform makes it easy to manage guests and maintain high occupancy.
            </p>
          </div>

          {/* Owner Feedback 2 */}
          <div className="testimonial-item bg-white text-center border p-4">
            <img
              className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
              src={require('../assets/img/team-3.jpg')}
              style={{ width: 80, height: 80 }}
            />
            <h5 className="mb-0">Ajay Kaushik</h5>
            <p>Boutique Hotel Owner, Mussoorie</p>
            <p className="mb-0">
              Quercus Oak Stay helped us reach a wider audience and improve our brand visibility. The onboarding process was smooth and the support team is excellent.
            </p>
          </div>

        </OwlCarousel>
       
         
        </div>
      </div>

    {/* Testimonial Ends */}

    {/* Banner Starts */}

      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.02s" id="demo">
        <div className="container">
          <div className="demo p-5">
            <div className="row g-5 align-items-center text-center">

              {/* Image */}
              <div className="col-lg-3 col-md-6 col-sm-6 col-6 position-relative mx-auto">
                <img
                  className="img-fluid custom-Genie"
                  src={require('../assets/img/logolight135x255.png')}
                  alt="Quercus Oak Stay"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Content */}
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
                  <a
                    href={'/list-property'}
                    className="btn btn-sm px-3 border-end custom-demoButton mb-2"
                  >
                    List Your Property
                  </a>
                 
                 
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Banner End */}

    {/* FAQ Starts */}

      <div className="container-xxl py-5 wow fadeInUp" id="faq" data-wow-delay="0.02s" >
        <div className="container">
          <div className="text-center">
            <h6 className="section-title bg-white text-center text-primary px-3">
              FAQ'S
              </h6>
              <h1 className="mb-5">Frequently Asked Questions!!!</h1>
              <div className="row g-1 align-items-center">
                <div className='col-md-12'>
                  <FAQS/>
                </div>
            
              </div>
              </div>
              </div>
      </div>

    {/* FAQ END */}

    {/* Query Start */}

      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.02s" id='contactus'>
          <div className="container">
            <div className="booking p-5">
              <div className="row g-5 align-items-center">
                <div className="col-md-6 text-white">
                  
                  <h1 className="text-white mb-4">Ask Out Your Question</h1>
                  <p className="mb-4">
                    We're here to help! Whether you have questions about our Properties, need Assistance with a Booking, or just want more information about how Quercus Oak Stays works, feel free to reach out.
                  </p>
                  <p className="mb-4">
                 Our Team is ready to provide you with all the support you need to make your Stay at Quercus Oak a truly Seamless and Memorable Experience.
                  </p>
      
                </div>
                <div className="col-md-6" >
                  <h1 className="text-white mb-4">Queries</h1>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">

                          <input 
                            type="text" 
                            id="name"
                            className="form-control text-white bg-transparent"
                            value={name} 
                            placeholder="Your Good Name"
                            required 
                            onChange={(e)=>setName(e.target.value)}
                          />
                          <label className="text-white" htmlFor="name">Your Good Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                        <input 
                            type="text" 
                            id ="email"
                            className="form-control text-white bg-transparent" 
                            value={email} 
                            placeholder="Where can we Contact you?" 
                            required 
                            onChange={(e)=>setEmail(e.target.value)}
                          />
                          <label className="text-white"  htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-floating">
                        <input 
                            type="text" 
                            className="form-control text-white bg-transparent" 
                            id ="phone" 
                            value={phone} 
                            placeholder="Your Contact Number" 
                            onChange={(e)=>setPhone(e.target.value)}
                          />
                          <label className="text-white" htmlFor="email">Your Phone Number</label>
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                        <div className="form-floating">
                        <input 
                            type="text" 
                            className="form-control text-white bg-transparent" 
                            id ="orgName" 
                            value={orgName} 
                            placeholder="Your Property Nme" 
                            onChange={(e)=>setOrgName(e.target.value)}
                          />
                          <label className="text-white" htmlFor="email">Your Property Name</label>
                        </div>
                      </div> */}
                      
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control text-white bg-transparent"
                            placeholder="We would love to hear and answer all your Questions"
                            // id="message"
                            required
                            style={{ height: 100 }}
                            value={query} 
                            onChange={(e)=>setQuery(e.target.value)}
                          />
                          <label className="text-white" htmlFor="message">We would love to hear and answer all your Questions</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-outline-light w-100 py-3"
                          type="submit"
                          onClick={(e)=>handleSubmit(e)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </div>

    {/* Query End */}
    

      </div>
      <Footer />
    </>
        

  )
}
