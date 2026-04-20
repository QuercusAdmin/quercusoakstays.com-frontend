import React, { useState, useEffect, useMemo,useRef } from "react";
import Header2 from "../components/Header2.jsx";
import Footer from "../components/Footer.jsx";
import moment from "moment";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  FaMapMarkerAlt,
  FaShare,
  FaChair,
  FaCouch,
  FaCar,
  FaCheck,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { BsHouseDoor,BsAwardFill,BsCheckCircleFill,BsStarFill, BsDiamond } from "react-icons/bs"
import { useLocation } from "react-router-dom";
import { WHATSAPP_CHAT_NUMBER } from '../config/configuration.js'

function PropertyView() {

  const location = useLocation();
  const intervalRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [properties, setProperties] = useState(location?.state?.property);
  const [otherAmenties, setOtherAmenties] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [firstName, setFirstName]= useState("");
  const [lastName, setLastName]= useState("");
  const [phone, setPhone]= useState("");
  const [email, setEmail]= useState("");
  const [bookingStep,setBookingStep]= useState(1)
  const [specialRequest,setSpecialRequest]= useState("")
  const [code,setCode]= useState("")

  const locations = [
    { label: "Dehradun", value: "dehradun", image: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?w=800&auto=format&fit=crop" },
    { label: "Mussoorie", value: "mussoorie", image: "https://images.unsplash.com/photo-1655916187603-0f7010146b79?w=800&auto=format&fit=crop" },
    { label: "Maldevta", value: "maldevta", image: "https://images.jdmagicbox.com/v2/comp/dehradun/b5/9999px135.x135.220315223349.l1b5/catalogue/waterfall-maldevta-dehradun-tourist-attraction-cZvFosnckf.jpg" }
  ];



  const amenityIconMap = {
    "High-Speed WiFi": <FaWifi />,
    "Smart TV": <FaTv />,
    "Gourmet Kitchen": <FaUtensils />,
    "Garden": <FaTree />,
    "Terrace": <FaUmbrellaBeach />,
    "Balcony": <FaBuilding />,
    "Laundry": <FaTshirt />,
    "Private Pool": <FaSwimmingPool />,
    "Secure Parking": <FaParking />,
    "Fireplace": <FaFire />,
    "Central AC": <FaSnowflake />,
    "Gym": <FaDumbbell />,
    "Driver": <FaCar />, 
    "Kitchen":<FaUtensils />, 
    "Dining Area": <FaChair />,
    "Living Area": <FaCouch />
  };



    const handlePhoneChange = (value, data) => {
    setCode(data.dialCode)
    setPhone(value);
    
  };

    useEffect(() => {
      const element = document.documentElement;
      element.style.scrollBehavior = 'smooth';
      element.scrollTo(0, 0);
  
  
      let temp = moment.utc().add(5,"hours").add(30,'minutes').format("YYYY-MM-DD")
      let temp1 = moment.utc().add(2,"days").add(5,"hours").add(30,'minutes').format("YYYY-MM-DD")
      setCheckInDate(temp)
      setCheckOutDate(temp1)
  
      const saved = JSON.parse(localStorage.getItem("filters"));
  
      if (saved) {
  
        setCheckInDate(saved.checkInDate ?? temp);
        setCheckOutDate(saved.checkOutDate ?? temp1);
        setAdults(saved.adults ?? 2);
        setChildren(saved.children ?? 0);
      }
  
    }, []);

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = moment.utc(checkInDate);
      const checkOut = moment.utc(checkOutDate);

      const diffDays = checkOut.diff(checkIn, "days");

      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

    const calculateTotal = () => {
    if (properties) {
      const nights = calculateNights()
      const baseAmount = properties.price * nights
      const tax = baseAmount * 0.18
      return {
        baseAmount,
        tax,
        total: baseAmount + tax,
      }
    }
    return { baseAmount: 0, tax: 0, total: 0 }
  }


  const handleBookNow = async () => {

    try {
      const { baseAmount, tax, total } = calculateTotal()

      const bookingData = {
        propertyId: properties.id,
        propertyName: properties.title,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: (Number(adults) + Number(children)),
        contactNumber: phone,
        email: email,
        firstName: firstName,
        lastName: lastName,
        specialRequests: specialRequest,
        baseAmount,
        tax,
        totalAmount: total,
        nights: calculateNights(),
        bookingDate: new Date().toISOString(),
      }

      const generatedBookingId = `QOS-EN-${moment.utc().add(5,'hours').add(30,'minutes')?.format("DD-MM-YYYY")}`


      setTimeout(() => {
        autoOpenWhatsApp(bookingData)
      }, 1500)
   

    } catch (error) {
      console.error("Booking error:", error)
      toast.error("Unable to Enquire about the Availibility. Please contact on ${}")
    } finally {
    }
  }

  const openWhatsApp = (message) => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_CHAT_NUMBER}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  // Auto-open WhatsApp after booking
  const autoOpenWhatsApp = (bookingData) => {
    const message = generateWhatsAppMessage(bookingData)
    openWhatsApp(message)
  }

    const generateWhatsAppMessage = (bookingData) => {
    const nights = calculateNights()
    const { total, baseAmount, tax } = calculateTotal()

    const message = `Hello! I would like to book the following Property:

    🏠 *Property Booking Request*
    ━━━━━━━━━━━━━━━━━━━━

    📋 *PROPERTY DETAILS*
    • Property: ${bookingData.propertyName}
    • Check-in: ${new Date(bookingData.checkIn).toLocaleDateString('en-IN')}
    • Check-out: ${new Date(bookingData.checkOut).toLocaleDateString('en-IN')}
    • Nights: ${nights}
    • Guests: ${bookingData.guests}

    👤 *GUEST INFORMATION*
    • Name: ${bookingData.firstName} ${bookingData.lastName}
    • Email: ${bookingData.email}
    • Phone: ${bookingData.contactNumber}

    💰 *PRICE DETAILS*
    • Base Amount: ₹${baseAmount?.toLocaleString('en-IN')}
    • Taxes (18%): ₹${tax?.toLocaleString('en-IN')}
    • *Total Amount: ₹${total?.toLocaleString('en-IN')}*

    ${bookingData.specialRequests ? `📝 *Special Requests:* ${bookingData.specialRequests}` : ''}

    ━━━━━━━━━━━━━━━━━━━━
    Please confirm availability and provide next steps for booking confirmation.

    Thank you!`;

    return message;


    
  //  return `Hello! I would like to book the following Property:

  //     🏠 *Property Booking Request*
  //     ━━━━━━━━━━━━━━━━━━━━

  //     📋 *PROPERTY DETAILS*
  //     • Property: ${bookingData.propertyName}
  //     • Check-in: ${new Date(bookingData.checkIn).toLocaleDateString('en-IN')}
  //     • Check-out: ${new Date(bookingData.checkOut).toLocaleDateString('en-IN')}
  //     • Nights: ${nights}
  //     • Guests: ${bookingData.guests}

  //     👤 *GUEST INFORMATION*
  //     • Name: ${bookingData.firstName} ${bookingData.lastName}
  //     • Email: ${bookingData.email}
  //     • Phone: ${bookingData.contactNumber}

  //     💰 *PRICE DETAILS*
  //     • Base Amount: ₹${baseAmount?.toLocaleString('en-IN')}
  //     • Taxes (18%): ₹${tax?.toLocaleString('en-IN')}
  //     • *Total Amount: ₹${total?.toLocaleString('en-IN')}*

  //     ${bookingData.specialRequests ? `📝 *Special Requests:* ${bookingData.specialRequests}` : ''}

  //     ━━━━━━━━━━━━━━━━━━━━
  //     Please confirm availability and provide next steps for booking confirmation.

  //     Thank you!`
  }

  const nextStep = () => {
    if(bookingStep ===3){

        handleBookNow();

    }
    else if (validateStep(bookingStep)) {
      setBookingStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const validateStep = (step) => {

    if (step === 1) {
      if (!checkInDate) {
        toast.error("Please Enter Check In Date.")
        return;
      }

      if (!checkOutDate) {
        toast.error("Please Enter Check Out Date.")
        return;
      } 
    }

    if (step === 2) {
      if (!firstName.trim()) {
         toast.error("Please Enter First Name.")
        return;
      }

      if (!lastName.trim()) {
         toast.error("Please Enter Last Name.")
        return;
      }

      if (!email.trim()) {
         toast.error("Please Enter Email Address.")
        return;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
         toast.error("Please Enter a Valid Email Address.")
        return;
      }

      if (!phone) {
        toast.error("Please Enter Contact Number.")
        return;
      } 

      console.log(phone)

      if(code==="91") {

        if (!/^\d{12}$/.test(phone.replace(/\D/g, ""))) {
  
         toast.error("Please Enter a Valid 10 Digit Contact Number.")
         return;
       }
      }
      
      
    }

    return true
  }

  const prevStep = () => {
    setBookingStep((prev) => Math.max(prev - 1, 1))
  }

  useEffect(() => {

    if(properties){

      let temp = properties.spaceDetails
      let amenities = [];

      if (temp.driverAccommodation) {
        amenities.push("Driver");
      }

      if (temp.diningArea) {
        amenities.push("Dining Area");
      }

      if (temp.livingArea) {
        amenities.push("Living Area");
      }

      if (temp.kitchen) {
        amenities.push("Kitchen");
      }

      setOtherAmenties(amenities);

    }
  }, []);
  


  useEffect(() => {
    if (properties && properties.images && properties.images.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % properties.images.length)
      }, 4000)
      return () => clearInterval(intervalRef.current)
    }
  }, [properties?.images?.length])

  const handleShare = async (property) => {
    
    const shareData = {
      title: property.title,
      text: `Check Out this Property: ${property.title}`,
      url: `${window.location.origin}/property/${property._id}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
     
    }
  };


  // return (
  //   <>
  //     <Header2/>
  //       <div className="container-xxl py-5 padding-top-custom" >
  //         <div className="container">
  //           <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
  //             <h6 className="section-title bg-white text-center text-primary px-3">
  //               Property
  //             </h6>
  //             <h1 className="mb-5"></h1>
     

  //             <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 16px" }} className="wow fadeInUp">
  
  //               <div
  //                 style={{
  //                   display: "grid",
  //                   gridTemplateColumns: isMobile ? "1fr" : "70% 25%",
  //                   gap: "24px",
  //                   alignItems: "start"
  //                 }}
  //               >

  //                 <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}  className="wow fadeInUp">
  //                   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">

  //                     <div className="text-center">

                    
  //                       <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
  //                         {properties?.title}
  //                       </h1>

  //                       <div className="flex flex-wrap justify-center items-center gap-5 mb-6">
  //                         <div   
  //                           style={{
  //                             display: "flex",
  //                             flexDirection: "row",
  //                             alignItems: "center",
  //                             justifyContent: "center",
  //                             gap: "12px",
  //                             flexWrap: "wrap"
  //                           }}>

  //                             <div className="flex items-center gap-2">
  //                               <FaMapMarkerAlt className="text-lg" style={{ color: "#b0926a" }} />
  //                               <span className="text-base font-medium">
  //                                 {" "} {properties?.locality},{" "} {locations.find((loc) => loc.value === properties?.location)?.label}
  //                               </span>
  //                             </div>

                              
  //                             <div className="text-lg font-semibold flex items-center gap-1">
  //                               ⭐ {properties?.rating}
  //                             </div>

  //                         </div>
  //                         <div className="flex flex-wrap justify-center items-center gap-4 mt-3">


  //                           <button
  //                             className="
  //                               flex items-center gap-2
  //                               px-4 py-2
  //                               rounded-pill
  //                               fw-semibold
  //                               border-0
  //                             "
  //                             onClick={() => handleShare(properties)}
  //                             style={{
  //                               background: "linear-gradient(135deg, #756534, #9a8750)",
  //                               color: "#fff",
  //                               boxShadow: "0 4px 14px rgba(117, 101, 52, 0.25)",
  //                               transition: "all 0.25s ease"
  //                             }}
  //                             onMouseEnter={(e) => {
  //                               e.currentTarget.style.transform = "translateY(-2px)";
  //                               e.currentTarget.style.boxShadow =
  //                                 "0 8px 20px rgba(117, 101, 52, 0.35)";
  //                             }}
  //                             onMouseLeave={(e) => {
  //                               e.currentTarget.style.transform = "translateY(0)";
  //                               e.currentTarget.style.boxShadow =
  //                                 "0 4px 14px rgba(117, 101, 52, 0.25)";
  //                             }}
  //                           >
  //                             <FaShare style={{ fontSize: "14px" }} /> &nbsp;
  //                             <span>Share</span>
  //                           </button>

  //                         </div>
  //                       </div>
  //                     </div>



  //                     {properties?.badges?.length > 0 && (
  //                       <div
  //                         className="mt-4"
  //                         style={{
  //                           display: "grid",
  //                           gridTemplateColumns: "repeat(4, max-content)", 
  //                           justifyContent: "center",
  //                           gap: "12px",
  //                         }}
  //                       >
  //                         {properties.badges.map((badge, index) => (
  //                           <div
  //                             key={index}
  //                             className="
  //                               flex items-center gap-2
  //                               px-4 py-2
  //                               rounded-pill
  //                               text-sm fw-semibold
  //                               transition-all
  //                             "
  //                             style={{
  //                               background: "#f6f3ee",
  //                               color: "#b0926a",
  //                               border: "2px solid rgba(176, 146, 106, 0.25)",
  //                               boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  //                               cursor: "default",
  //                             }}
  //                             onMouseEnter={(e) => {
  //                               e.currentTarget.style.background = "#b0926a";
  //                               e.currentTarget.style.color = "#fff";
  //                               e.currentTarget.style.transform = "translateY(-2px)";
  //                               e.currentTarget.style.boxShadow =
  //                                 "0 6px 16px rgba(176, 146, 106, 0.25)";
  //                             }}
  //                             onMouseLeave={(e) => {
  //                               e.currentTarget.style.background = "#f6f3ee";
  //                               e.currentTarget.style.color = "#b0926a";
  //                               e.currentTarget.style.transform = "translateY(0)";
  //                               e.currentTarget.style.boxShadow =
  //                                 "0 2px 8px rgba(0,0,0,0.05)";
  //                             }}
  //                           >
  //                             <BsCheckCircleFill style={{ fontSize: "12px" }} />&nbsp;&nbsp;
  //                             <span>{badge}</span>
  //                           </div>
  //                         ))}
  //                       </div>
  //                     )}
  //                   </div>
                  
  //                   <div className="gallery-container">
  //                     <div className="gallery-wrapper">

  //                       <div className="gallery-main">

  //                         <img
  //                           src={properties.images[currentImageIndex]?.url}
  //                           alt=""
  //                         />

  //                         <div className="gallery-overlay" />

  //                         <div className="gallery-counter">
  //                           {currentImageIndex + 1} / {properties.images.length}
  //                         </div>
  //                         {
  //                           properties?.tag &&

  //                             <div className="gallery-tag"> {properties.tag}</div>


  //                         }

  //                         {properties?.images?.length > 1 && (
  //                           <>
  //                             <button
  //                               className="gallery-arrow left"
  //                               onClick={() =>
  //                                 setCurrentImageIndex(
  //                                   (prev) =>
  //                                     (prev - 1 + properties.images.length) %
  //                                     properties.images.length
  //                                 )
  //                               }
  //                             >
  //                               <FaChevronLeft />
  //                             </button>

  //                             <button
  //                               className="gallery-arrow right"
  //                               onClick={() =>
  //                                 setCurrentImageIndex(
  //                                   (prev) =>
  //                                     (prev + 1) % properties.images.length
  //                                 )
  //                               }
  //                             >
  //                               <FaChevronRight />
  //                             </button>
  //                           </>
  //                         )}
  //                       </div>

  //                       {properties?.images?.length > 1 && (
  //                         <div className="gallery-thumbs-container">
  //                           <div className="gallery-thumbnails">
  //                             {properties.images.map((img, index) => (
  //                               <div
  //                                 key={index}
  //                                 className={`gallery-thumb ${
  //                                   currentImageIndex === index ? "active" : ""
  //                                 }`}
  //                                 onClick={() => setCurrentImageIndex(index)}
  //                               >
  //                                 <img src={img.url} alt="" />
  //                               </div>
  //                             ))}
  //                           </div>
  //                         </div>
  //                       )}

  //                     </div>
  //                   </div>
                  
      
  //                   <div>
  //                     <h2 style={{ margin: 0 }}>{properties?.title}</h2>
  //                     <p style={{ color: "#756534", margin :0 }}>{properties?.locality}</p>
  //                   </div>

  //                     <div className="gallery-type"> {properties.propertyType}</div>

  //                   <div
  //                     style={{
  //                       display: "grid",
  //                       gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
  //                       gap: "16px"
  //                     }}
  //                   >
  //                     {[
  //                       { icon: <i className="fa fa-bed"></i>, label: "Bedrooms", value: properties?.spaceDetails?.bedrooms },
  //                       { icon: <i className="fa fa-bath"></i>, label: "Bathrooms", value: properties?.spaceDetails?.bathrooms },
  //                       { icon: <i className="fa fa-ruler-combined"></i>, label: "Sq Ft Size", value: properties?.spaceDetails?.size},
  //                       { icon: <i className="fa fa-users"></i>, label: "Guests", value: properties?.spaceDetails?.guests }
  //                     ].map((item, i) => (
  //                       <div
  //                         key={i}
  //                         style={{
  //                           background: "#fff",
  //                           padding: "16px",
  //                           borderRadius: "10px",
  //                           textAlign: "center",
  //                           boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  //                         }}
  //                       >
  //                         <div style={{ fontSize: "20px", fontWeight: "600" }}>
  //                           {item.icon}&nbsp;&nbsp;&nbsp;{item.value}
  //                         </div>
  //                         <div style={{ fontSize: "12px", color: "#777" }}>
  //                           {item.label}
  //                         </div>
  //                       </div>
  //                     ))}
  //                   </div>

  //                   <div style={{ background: "#fff", padding: "20px", borderRadius: "12px" }}>
  //                     <h4>About this Property</h4>
  //                     <p style={{ color: "#555", lineHeight: "1.6" }}>
  //                       {properties?.description}
  //                     </p>
  //                   </div>

  //                   <div style={{ background: "#fff", padding: "20px", borderRadius: "12px" }}>
  //                     <h4>Premium Amenities</h4>

  //                     <div
  //                       style={{
  //                         display: "grid",
  //                         gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)",
  //                         gap: "12px",
  //                         marginTop: "10px"
  //                       }}
  //                     >
  //                       {properties?.amenities?.map((a, i) => (
  //                         <div
  //                           key={i}
  //                           style={{
  //                             padding: "10px",
  //                             background: "#f6f3ee",
  //                             borderRadius: "8px",
  //                             display: "flex",
  //                             alignItems: "center",
  //                             gap: "8px",
  //                             fontSize: "13px"
  //                           }}
  //                         >
  //                           {amenityIconMap[a]}
  //                           {a}
  //                         </div>
  //                       ))}    
  //                     </div>
  //                   </div>

                    
  //                   <div style={{ background: "#fff", padding: "20px", borderRadius: "12px" }}>
  //                     <h4>Other Amenities</h4>

  //                     <div
  //                       style={{
  //                         display: "grid",
  //                         gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)",
  //                         gap: "12px",
  //                         marginTop: "10px"
  //                       }}
  //                     >
  //                       {otherAmenties?.map((a, i) => (
  //                         <div
  //                           key={i}
  //                           style={{
  //                             padding: "10px",
  //                             background: "#f6f3ee",
  //                             borderRadius: "8px",
  //                             display: "flex",
  //                             alignItems: "center",
  //                             gap: "8px",
  //                             fontSize: "13px"
  //                           }}
  //                         >
  //                           {amenityIconMap[a]}
  //                           {a ==="Driver" ? "Driver Accommodation" : a === "Kitchen" ? properties.spaceDetails.kitchen === "staff" ? "Kitchen Operated By Staff" : "Self Kitchen" : a === "Living Area" ? "Living Area" : a === "Dining Area" && "Dining Area" }
  //                         </div>
  //                       ))}
                        

  //                     </div>
  //                   </div>


  //                 </div>

  //                 <div
  //                   style={{
  //                     position: isMobile ? "static" : "sticky",
  //                     top: "100px"
  //                   }}
  //                   className="wow fadeInUp"
  //                 >
  //                   <div
  //                     style={{
  //                       background: "#fff",
  //                       padding: "20px",
  //                       borderRadius: "12px",
  //                       boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
  //                     }}
  //                   >
  //                     <h4>
  //                       ₹{properties?.price?.toLocaleString()}
  //                       <span style={{ fontSize: "14px" }}> / Night</span>
  //                     </h4>

  //                     <div
  //                       style={{
  //                         display: "flex",
  //                         alignItems: "center",
  //                         justifyContent: "space-between",
  //                         marginBottom: "16px"
  //                       }}
  //                     >
  //                       {[1, 2, 3].map((step) => (
  //                         <div key={step} style={{ display: "flex", alignItems: "center", flex: 1 }} onClick={prevStep}>

  //                           <div
  //                             style={{
  //                               width: "40px",
  //                               height: "40px",
  //                               borderRadius: "50%",
  //                               display: "flex",
  //                               alignItems: "center",
  //                               justifyContent: "center",
  //                               color: "#fff",
  //                               fontWeight: "600",
  //                               background:
  //                                 bookingStep >= step
  //                                   ? "linear-gradient(135deg, #b0926a, #9a7d52)"
  //                                   : "#ccc",
  //                               boxShadow:
  //                                 bookingStep >= step
  //                                   ? "0 4px 12px rgba(176,146,106,0.3)"
  //                                   : "none",
  //                               transition: "all 0.3s ease"
  //                             }}
  //                           >
  //                             {bookingStep > step ? <FaCheck /> : step}
  //                           </div>

  //                           {step < 3 && (
  //                             <div
  //                               style={{
  //                                 flex: 1,
  //                                 height: "2px",
  //                                 margin: "0 10px",
  //                                 borderRadius: "999px",
  //                                 background:
  //                                   bookingStep > step
  //                                     ? "linear-gradient(135deg, #b0926a, #9a7d52)"
  //                                     : "#ddd",
  //                                 transition: "all 0.3s ease"
  //                               }}
  //                             />
  //                           )}
  //                         </div>
  //                       ))}
  //                     </div>

  //                     <div className="uni-label2 text-center" >
  //                       {bookingStep === 1 && "Select Your Dates"}
  //                       {bookingStep === 2 && "Enter Your Details"}
  //                       {bookingStep === 3 && "Confirm Your Booking"}
  //                     </div>


  //                     {bookingStep === 1 && (
  //                       <div>

  //                         <div  style={{ marginTop: "16px" }}>
  //                           <label className="uni-label">Check In</label>
  //                           <input
  //                             className="uni-input"
  //                             type="date"
  //                             value={checkInDate}
  //                             onChange={(e) => setCheckInDate(e.target.value)}
  //                             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
  //                           />
  //                         </div>

  //                         <div style={{ marginTop: "12px" }}>
  //                           <label className="uni-label">Check Out</label>
  //                           <input
  //                             className="uni-input"
  //                             type="date"
  //                             value={checkOutDate}
  //                             onChange={(e) => setCheckOutDate(e.target.value)}
  //                             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
  //                           />
  //                         </div>

  //                         <div style={{ marginTop: "12px" }}>
  //                           <label className="uni-label">Guests</label>
  //                         </div>
                          
  //                         <div style={{ marginTop: "5px" }}>
  //                           <div className="uni-guest-row">
  //                             <div>
  //                               <div className="uni-guest-title">Adults</div>
  //                               <small className="uni-guest-subtitle">12+</small>
  //                             </div>
  //                             <div className="uni-counter">
  //                               <button onClick={() => adults > 1 && setAdults(adults - 1)}>-</button>
  //                               <span>{adults}</span>
  //                               <button onClick={() => setAdults(adults + 1)}>+</button>
  //                             </div>
  //                           </div>
        
  //                           <div className="uni-guest-row">
  //                             <div>
  //                               <div className="uni-guest-title">Children</div>
  //                               <small className="uni-guest-subtitle">6-11</small>
  //                             </div>
  //                             <div className="uni-counter">
  //                               <button onClick={() => children > 0 && setChildren(children - 1)}>-</button>
  //                               <span>{children}</span>
  //                               <button onClick={() => setChildren(children + 1)}>+</button>
  //                             </div>
  //                           </div>
  //                         </div>

  //                       </div>
  //                     )}

  //                     {bookingStep === 2 && (
  //                       <div>

  //                         <div  style={{ marginTop: "16px" }}>
  //                           <label className="uni-label">First Name</label>
  //                           <input
  //                             className="uni-input"
  //                             type="text"
  //                             placeholder="Enter Your First Name"
  //                             value={firstName}
  //                             onChange={(e) => setFirstName(e.target.value)}
  //                             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
  //                           />
  //                         </div>

  //                         <div  style={{ marginTop: "16px" }}>
  //                           <label className="uni-label">Last Name</label>
  //                           <input
  //                             className="uni-input"
  //                             type="text"
  //                             placeholder="Enter Your Last Name"
  //                             value={lastName}
  //                             onChange={(e) => setLastName(e.target.value)}
  //                             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
  //                           />
  //                         </div>


  //                         <div style={{ marginTop: "12px" }}>
  //                           <label className="uni-label">Email</label>
  //                           <input
  //                             className="uni-input"
  //                             type="email"
  //                             placeholder="Enter Your Email Address"
  //                             value={email}
  //                             onChange={(e) => setEmail(e.target.value)}
  //                             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
  //                           />
  //                         </div>


  //                         <div style={{ marginTop: "12px" }}>
  //                           <label className="uni-label">Phone</label>                   
  //                           <PhoneInput
  //                             country={"in"}
  //                             value={phone}
  //                             onChange={handlePhoneChange}
  //                             enableSearch={true} 
  //                             countryCodeEditable={true}
  //                             disableCountryCode={false} 
  //                             inputStyle={{
  //                               width: "100%",
  //                               height: "40px",
  //                               borderRadius: "8px",
  //                               border: "1px solid #ddd",
  //                               paddingLeft: "48px"
  //                             }}
  //                             containerStyle={{ width: "100%" }}
  //                           />
  //                         </div>


  //                         <div style={{ marginTop: "12px" }}>
  //                           <label className="uni-label">Special Requests</label>
  //                         <textarea
  //                             className="uni-input"
  //                             placeholder="Any Special Requests"
  //                             value={specialRequest}
  //                             onChange={(e) => setSpecialRequest(e.target.value)}
  //                             style={{
  //                               width: "100%",
  //                               padding: "8px",
  //                               marginTop: "5px",
  //                               minHeight: "100px",
  //                               resize: "vertical"
  //                             }}
  //                           />
  //                         </div>

                        

  //                       </div>
  //                     )}

                      
  //                     {bookingStep === 3 && (
  //                       <div>

  //                         <div  style={{ marginTop: "16px" }}>
  //                           <h3 className="uni-label3"><i className="fa fa-users"></i>&nbsp;&nbsp; Property : <span className="uni-label4">{properties?.title}</span></h3>
  //                           <h3 className="uni-label3"><i className="fa fa-users"></i>&nbsp;&nbsp; Check In Date : <span className="uni-label4">{moment(checkInDate,"YYYY-MM-DD").format('ll')}</span></h3>
  //                           <h3 className="uni-label3"><i className="fa fa-users"></i>&nbsp;&nbsp; Check Out Date : <span className="uni-label4">{moment(checkOutDate,"YYYY-MM-DD").format('ll')}</span></h3>
  //                           <h3 className="uni-label3"><i className="fa fa-users"></i>&nbsp;&nbsp; Guests : <span className="uni-label4">{adults} Adults {children > 0 && `${children} Children`}</span></h3>

  //                           <h3 className="uni-label2">Guests Contact Details</h3>
  //                           <h3 className="uni-label3">Name : <span className="uni-label4">{firstName} {lastName}</span></h3>
  //                           <h3 className="uni-label3">Phone : <span className="uni-label4">{phone}</span></h3>
  //                           <h3 className="uni-label3">Email : <span className="uni-label4">{email}</span></h3>
  //                           {
  //                             specialRequest!==""  &&

  //                               <h3 className="uni-label3">Special Requests : <span className="uni-label4">{specialRequest}</span></h3>
  //                           }

  //                           <h3 className="uni-label2">Pricing Details</h3>
  //                           <h3 className="uni-label3">Pricing / Night : <span className="uni-label4">{properties.price}</span></h3>
  //                           <h3 className="uni-label3">Stay Duration : <span className="uni-label4">{calculateNights()}</span></h3>
  //                           <h3 className="uni-label3">Total : <span className="uni-label4">₹ {calculateTotal().baseAmount} + Taxes</span></h3>

  //                         </div>

  //                       </div>
  //                     )}

  //                     <button
  //                       onClick={nextStep}
  //                       style={{
  //                         marginTop: "20px",
  //                         width: "100%",
  //                         padding: "12px",
  //                         background: "#756534",
  //                         color: "#fff",
  //                         border: "none",
  //                         borderRadius: "6px",
  //                         fontWeight: "600",
  //                         cursor: "pointer"
  //                       }}
  //                     >
  //                     {
  //                       (bookingStep === 1 || bookingStep === 2 ) ? "Continue" : "Confirm Booking via WhatsApp"
  //                     }
  //                     </button>
  //                   </div>
  //                 </div>

  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div> 
  //       <Footer />
  //   </>


  // )
return (
  <>
    <Header2/>
    <div className="container-xxl py-5 padding-top-custom">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Property
          </h6>
          <h1 className="mb-5"></h1>

          <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 16px" }} className="wow fadeInUp">

            <div className="row g-4 align-items-start">

              {/* LEFT COLUMN */}
              <div className="col-12 col-lg-8 d-flex flex-column gap-4 wow fadeInUp">

                <div className="mx-auto px-2 px-sm-3 mb-4 w-100">
                  <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                      {properties?.title}
                    </h1>

                    <div className="flex flex-wrap justify-center items-center gap-5 mb-6">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "12px",
                          flexWrap: "wrap"
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-lg" style={{ color: "#b0926a" }} />
                          <span className="text-base font-medium">
                            {" "}{properties?.locality},{" "}
                            {locations.find((loc) => loc.value === properties?.location)?.label}
                          </span>
                        </div>

                        <div className="text-lg font-semibold flex items-center gap-1">
                          ⭐ {properties?.rating}
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center items-center gap-4 mt-3">
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-pill fw-semibold border-0"
                          onClick={() => handleShare(properties)}
                          style={{
                            background: "linear-gradient(135deg, #756534, #9a8750)",
                            color: "#fff",
                            boxShadow: "0 4px 14px rgba(117, 101, 52, 0.25)",
                            transition: "all 0.25s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 8px 20px rgba(117, 101, 52, 0.35)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 14px rgba(117, 101, 52, 0.25)";
                          }}
                        >
                          <FaShare style={{ fontSize: "14px" }} />&nbsp;
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>


                  {properties?.badges?.length > 0 && (
                    <div className="mt-4 badge-container">
                      {properties.badges.map((badge, index) => (
                        <div
                          key={index}
                          className="badge-item d-flex align-items-center gap-2 rounded-pill fw-semibold"
                          style={{
                            background: "#f6f3ee",
                            color: "#b0926a",
                            border: "2px solid rgba(176, 146, 106, 0.25)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            cursor: "default",
                            padding: "8px 16px",
                            fontSize: "13px",
                            transition: "all 0.25s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#b0926a";
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 6px 16px rgba(176, 146, 106, 0.25)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#f6f3ee";
                            e.currentTarget.style.color = "#b0926a";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                          }}
                        >
                          <BsCheckCircleFill style={{ fontSize: "12px", flexShrink: 0 }} />
                          <span>{badge}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* IMAGE GALLERY */}
                <div className="gallery-container">
                  <div className="gallery-wrapper">
                    <div className="gallery-main">
                      <img src={properties.images[currentImageIndex]?.url} alt="" />
                      <div className="gallery-overlay" />
                      <div className="gallery-counter">
                        {currentImageIndex + 1} / {properties.images.length}
                      </div>
                      {properties?.tag && (
                        <div className="gallery-tag">{properties.tag}</div>
                      )}
                      {properties?.images?.length > 1 && (
                        <>
                          <button
                            className="gallery-arrow left"
                            onClick={() =>
                              setCurrentImageIndex(
                                (prev) => (prev - 1 + properties.images.length) % properties.images.length
                              )
                            }
                          >
                            <FaChevronLeft />
                          </button>
                          <button
                            className="gallery-arrow right"
                            onClick={() =>
                              setCurrentImageIndex(
                                (prev) => (prev + 1) % properties.images.length
                              )
                            }
                          >
                            <FaChevronRight />
                          </button>
                        </>
                      )}
                    </div>

                    {properties?.images?.length > 1 && (
                      <div className="gallery-thumbs-container">
                        <div className="gallery-thumbnails">
                          {properties.images.map((img, index) => (
                            <div
                              key={index}
                              className={`gallery-thumb ${currentImageIndex === index ? "active" : ""}`}
                              onClick={() => setCurrentImageIndex(index)}
                            >
                              <img src={img.url} alt="" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* TITLE + LOCALITY */}
                <div>
                  <h2 style={{ margin: 0 }}>{properties?.title}</h2>
                  <p style={{ color: "#756534", margin: 0 }}>{properties?.locality}</p>
                </div>

                <div className="gallery-type">{properties.propertyType}</div>

                {/* SPACE DETAILS */}
                <div className="row g-3">
                  {[
                    { icon: <i className="fa fa-bed"></i>, label: "Bedrooms", value: properties?.spaceDetails?.bedrooms },
                    { icon: <i className="fa fa-bath"></i>, label: "Bathrooms", value: properties?.spaceDetails?.bathrooms },
                    { icon: <i className="fa fa-ruler-combined"></i>, label: "Sq Ft Size", value: properties?.spaceDetails?.size },
                    { icon: <i className="fa fa-users"></i>, label: "Guests", value: properties?.spaceDetails?.guests }
                  ].map((item, i) => (
                    <div key={i} className="col-6 col-md-3">
                      <div
                        style={{
                          background: "#fff",
                          padding: "16px",
                          borderRadius: "10px",
                          textAlign: "center",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                        }}
                      >
                        <div style={{ fontSize: "20px", fontWeight: "600" }}>
                          {item.icon}&nbsp;&nbsp;&nbsp;{item.value}
                        </div>
                        <div style={{ fontSize: "12px", color: "#777" }}>
                          {item.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ABOUT */}
                <div style={{ background: "#fff", padding: "20px", borderRadius: "12px" }}>
                  <h4>About this Property</h4>
                  <p style={{ color: "#555", lineHeight: "1.6" }}>
                    {properties?.description}
                  </p>
                </div>

                {/* PREMIUM AMENITIES */}
                <div style={{ background: "#fff", padding: "20px", borderRadius: "12px" }}>
                  <h4>Premium Amenities</h4>
                  <div className="row g-2 mt-1">
                    {properties?.amenities?.map((a, i) => (
                      <div key={i} className="col-6 col-md-4">
                        <div
                          style={{
                            padding: "10px",
                            background: "#f6f3ee",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "13px"
                          }}
                        >
                          {amenityIconMap[a]}
                          {a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* OTHER AMENITIES */}
                <div style={{ background: "#fff", padding: "20px", borderRadius: "12px" }}>
                  <h4>Other Amenities</h4>
                  <div className="row g-2 mt-1">
                    {otherAmenties?.map((a, i) => (
                      <div key={i} className="col-6 col-md-4">
                        <div
                          style={{
                            padding: "10px",
                            background: "#f6f3ee",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "13px"
                          }}
                        >
                          {amenityIconMap[a]}
                          {a === "Driver"
                            ? "Driver Accommodation"
                            : a === "Kitchen"
                            ? properties.spaceDetails.kitchen === "staff"
                              ? "Kitchen Operated By Staff"
                              : "Self Kitchen"
                            : a === "Living Area"
                            ? "Living Area"
                            : a === "Dining Area" && "Dining Area"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              {/* END LEFT COLUMN */}

              {/* RIGHT COLUMN - BOOKING */}
              <div className="col-12 col-lg-4 wow fadeInUp">
                <div style={{ position: "sticky", top: "100px" }}>
                  <div
                    style={{
                      background: "#fff",
                      padding: "20px",
                      borderRadius: "12px",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
                    }}
                  >
                    <h4>
                      ₹{properties?.price?.toLocaleString()}
                      <span style={{ fontSize: "14px" }}> / Night</span>
                    </h4>

                    {/* STEP INDICATOR */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "16px"
                      }}
                    >
                      {[1, 2, 3].map((step) => (
                        <div key={step} style={{ display: "flex", alignItems: "center", flex: 1 }} onClick={prevStep}>
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontWeight: "600",
                              background: bookingStep >= step
                                ? "linear-gradient(135deg, #b0926a, #9a7d52)"
                                : "#ccc",
                              boxShadow: bookingStep >= step
                                ? "0 4px 12px rgba(176,146,106,0.3)"
                                : "none",
                              transition: "all 0.3s ease"
                            }}
                          >
                            {bookingStep > step ? <FaCheck /> : step}
                          </div>
                          {step < 3 && (
                            <div
                              style={{
                                flex: 1,
                                height: "2px",
                                margin: "0 10px",
                                borderRadius: "999px",
                                background: bookingStep > step
                                  ? "linear-gradient(135deg, #b0926a, #9a7d52)"
                                  : "#ddd",
                                transition: "all 0.3s ease"
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="uni-label2 text-center">
                      {bookingStep === 1 && "Select Your Dates"}
                      {bookingStep === 2 && "Enter Your Details"}
                      {bookingStep === 3 && "Confirm Your Booking"}
                    </div>

                    {/* STEP 1 */}
                    {bookingStep === 1 && (
                      <div>
                        <div style={{ marginTop: "16px" }}>
                          <label className="uni-label">Check In</label>
                          <input
                            className="uni-input"
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                          />
                        </div>

                        <div style={{ marginTop: "12px" }}>
                          <label className="uni-label">Check Out</label>
                          <input
                            className="uni-input"
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                          />
                        </div>

                        <div style={{ marginTop: "12px" }}>
                          <label className="uni-label">Guests</label>
                        </div>

                        <div style={{ marginTop: "5px" }}>
                          <div className="uni-guest-row">
                            <div>
                              <div className="uni-guest-title">Adults</div>
                              <small className="uni-guest-subtitle">12+</small>
                            </div>
                            <div className="uni-counter">
                              <button onClick={() => adults > 1 && setAdults(adults - 1)}>-</button>
                              <span>{adults}</span>
                              <button onClick={() => setAdults(adults + 1)}>+</button>
                            </div>
                          </div>

                          <div className="uni-guest-row">
                            <div>
                              <div className="uni-guest-title">Children</div>
                              <small className="uni-guest-subtitle">6-11</small>
                            </div>
                            <div className="uni-counter">
                              <button onClick={() => children > 0 && setChildren(children - 1)}>-</button>
                              <span>{children}</span>
                              <button onClick={() => setChildren(children + 1)}>+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {bookingStep === 2 && (
                      <div>
                        <div style={{ marginTop: "16px" }}>
                          <label className="uni-label">First Name</label>
                          <input
                            className="uni-input"
                            type="text"
                            placeholder="Enter Your First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                          />
                        </div>

                        <div style={{ marginTop: "16px" }}>
                          <label className="uni-label">Last Name</label>
                          <input
                            className="uni-input"
                            type="text"
                            placeholder="Enter Your Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                          />
                        </div>

                        <div style={{ marginTop: "12px" }}>
                          <label className="uni-label">Email</label>
                          <input
                            className="uni-input"
                            type="email"
                            placeholder="Enter Your Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                          />
                        </div>

                        <div style={{ marginTop: "12px" }}>
                          <label className="uni-label">Phone</label>
                          <PhoneInput
                            country={"in"}
                            value={phone}
                            onChange={handlePhoneChange}
                            enableSearch={true}
                            countryCodeEditable={true}
                            disableCountryCode={false}
                            inputStyle={{
                              width: "100%",
                              height: "40px",
                              borderRadius: "8px",
                              border: "1px solid #ddd",
                              paddingLeft: "48px"
                            }}
                            containerStyle={{ width: "100%" }}
                          />
                        </div>

                        <div style={{ marginTop: "12px" }}>
                          <label className="uni-label">Special Requests</label>
                          <textarea
                            className="uni-input"
                            placeholder="Any Special Requests"
                            value={specialRequest}
                            onChange={(e) => setSpecialRequest(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "8px",
                              marginTop: "5px",
                              minHeight: "100px",
                              resize: "vertical"
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {bookingStep === 3 && (
                      <div style={{ marginTop: "16px" }}>
                        <h3 className="uni-label3"><i className="fa fa-users"></i>&nbsp;&nbsp; Property : <span className="uni-label4">{properties?.title}</span></h3>
                        <h3 className="uni-label3"><i className="fa fa-calendar"></i>&nbsp;&nbsp; Check In : <span className="uni-label4">{moment(checkInDate, "YYYY-MM-DD").format('ll')}</span></h3>
                        <h3 className="uni-label3"><i className="fa fa-calendar"></i>&nbsp;&nbsp; Check Out : <span className="uni-label4">{moment(checkOutDate, "YYYY-MM-DD").format('ll')}</span></h3>
                        <h3 className="uni-label3"><i className="fa fa-users"></i>&nbsp;&nbsp; Guests : <span className="uni-label4">{adults} Adults {children > 0 && `${children} Children`}</span></h3>

                        <h3 className="uni-label2">Guests Contact Details</h3>
                        <h3 className="uni-label3">Name : <span className="uni-label4">{firstName} {lastName}</span></h3>
                        <h3 className="uni-label3">Phone : <span className="uni-label4">{phone}</span></h3>
                        <h3 className="uni-label3">Email : <span className="uni-label4">{email}</span></h3>
                        {specialRequest !== "" && (
                          <h3 className="uni-label3">Special Requests : <span className="uni-label4">{specialRequest}</span></h3>
                        )}

                        <h3 className="uni-label2">Pricing Details</h3>
                        <h3 className="uni-label3">Pricing / Night : <span className="uni-label4">₹{properties.price}</span></h3>
                        <h3 className="uni-label3">Stay Duration : <span className="uni-label4">{calculateNights()} Nights</span></h3>
                        <h3 className="uni-label3">Total : <span className="uni-label4">₹{calculateTotal().baseAmount?.toLocaleString('en-IN')} + Taxes</span></h3>
                      </div>
                    )}

                    <button
                      onClick={nextStep}
                      style={{
                        marginTop: "20px",
                        width: "100%",
                        padding: "12px",
                        background: "#756534",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      {(bookingStep === 1 || bookingStep === 2) ? "Continue" : "Confirm Booking via WhatsApp"}
                    </button>

                  </div>
                </div>
              </div>
              {/* END RIGHT COLUMN */}

            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
);



}

export default PropertyView;