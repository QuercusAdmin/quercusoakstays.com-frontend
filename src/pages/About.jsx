import IncrementTansition from '../components/IncrementTansition.jsx';
import IncrementTransitionWrapper from '../components/IncrementTransitionWrapper.jsx';
import React, { useEffect } from "react";
import Header2 from '../components/Header2.jsx';
import Footer from '../components/Footer.jsx';
import { HashLink } from "react-router-hash-link";
import { FiTarget, FiEye,FiArrowUpRight,FiHome,FiSmile,FiCompass, FiAward, FiShield, FiUsers, FiTrendingUp } from "react-icons/fi";


function About() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const stats =   {
    "performance": {
      "occupancyRate": { "value": 75, "suffix": "%", "prefix": "", "label": "Occupancy Rate Across All Properties" },
      "revenueGrowthYOY": { "value": 25, "suffix": "%", "prefix": "", "label": "Revenue Growth Year on Year Increase" },
      "noOfProperties": { "value": 9, "suffix": "+", "prefix": "", "label": "Properties All Over India" },
      "guestSatisfaction": { "value": 95, "suffix": "%", "prefix": "", "label": "Guest Satisfaction and Loyalty" }
    },
    "customerInsights": {
      "newCustomers": {
        "acquisitionRate": { "value": 15, "prefix": "", "suffix": "%" },
        "conversionRate": { "value": 68, "prefix": "", "suffix": "%" },
        "avgBookingValue": { "value": 8500, "prefix": "₹ ", "suffix": "" }
      },
      "returningCustomers": {
        "retentionRate": { "value": 82, "prefix": "", "suffix": "%" },
        "repeatBooking": { "value": 56, "prefix": "", "suffix": "%" },
        "lifetimeValue": { "value": 25000, "prefix": "₹ ", "suffix": "" }
      }
    }
  }
  

  const partners = [
    {
      "name": "Booking.com",
      "logo": "https://images.bettermystay.in/bettermystay/bookingcom.png"
    },
    {
      "name": "Airbnb",
      "logo": "https://images.bettermystay.in/bettermystay/airbnb.png"
    },
    {
      "name": "Vrbo",
      "logo": "https://images.bettermystay.in/bettermystay/vrbo.png"
    },
    {
      "name": "Expedia",
      "logo": "https://images.bettermystay.in/bettermystay/expedia.png"
    },
    {
      "name": "Agoda",
      "logo": "https://images.bettermystay.in/bettermystay/agoda.png"
    },
    {
      "name": "MakeMyTrip",
      "logo": "https://images.bettermystay.in/bettermystay/makemytrip.png"
    },
    {
      "name": "Treebo Hotels",
      "logo": "https://images.bettermystay.in/bettermystay/treebo.png"
    },
    {
      "name": "EaseMyTrip",
      "logo": "https://images.bettermystay.in/bettermystay/easemytrip.png"
    },
    {
      "name": "Oyo Hotels",
      "logo": "https://images.bettermystay.in/bettermystay/oyo.png"
    },
    {
      "name": "Goibibo",
      "logo": "https://images.bettermystay.in/bettermystay/goibibo.png"
    },
    {
      "name": "Fab Hotels",
      "logo": "https://images.bettermystay.in/bettermystay/fabhotels.png"
    },
    {
      "name": "Stay Vista / Vista Rooms",
      "logo": "https://images.bettermystay.in/bettermystay/stayvista.png"
    },
    {
      "name": "Ixigo",
      "logo": "https://images.bettermystay.in/bettermystay/ixigo.png"
    },
    {
      "name": "Google Hotels",
      "logo": "https://images.bettermystay.in/bettermystay/googlehotels.png"
    }
  ]


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
    
      <Header2 />

      <div className="container-xxl py-0  padding-top-custom" >

        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              About Us
            </h6>
          </div>
        </div>


        <div className="container-xxl py-4  justify-content-center padding-top-custom " style={zoomStyle}  id='about'> 
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

              </div>

              <div className="row g-4 wow fadeInUp "  data-wow-delay="0.3s">

                <div className="col-lg-3 col-6 text-center" key={"occupancyRate"}>
                  <IncrementTransitionWrapper >
                    <IncrementTansition n={stats?.performance?.occupancyRate?.value ?? 0} symbol1={``}  symbol2={stats?.performance?.occupancyRate?.suffix ?? ""}/>
                    </IncrementTransitionWrapper>
                  <p className="text-muted mb-0 fw-medium">{stats?.performance?.occupancyRate?.label ?? ""}</p>
                </div>

                <div className="col-lg-3 col-6 text-center" key={"revenueGrowthYOY"}>
                  <IncrementTransitionWrapper >
                    <IncrementTansition n={stats?.performance?.revenueGrowthYOY?.value ?? 0} symbol1={``}  symbol2={stats?.performance?.revenueGrowthYOY?.suffix ?? ""}/>
                    </IncrementTransitionWrapper>
                  <p className="text-muted mb-0 fw-medium">{stats?.performance?.revenueGrowthYOY?.label ?? ""}</p>
                </div>

                <div className="col-lg-3 col-6 text-center" key={"noOfProperties"}>
                  <IncrementTransitionWrapper >
                    <IncrementTansition n={stats?.performance?.noOfProperties?.value ?? 0} symbol1={``}  symbol2={stats?.performance?.noOfProperties?.suffix ?? ""}/>
                    </IncrementTransitionWrapper>
                  <p className="text-muted mb-0 fw-medium">{stats?.performance?.noOfProperties?.label ?? ""}</p>
                </div>

                <div className="col-lg-3 col-6 text-center" key={"guestSatisfaction"}>
                  <IncrementTransitionWrapper >
                    <IncrementTansition n={stats?.performance?.guestSatisfaction?.value ?? 0} symbol1={``}  symbol2={stats?.performance?.guestSatisfaction?.suffix ?? ""}/>
                    </IncrementTransitionWrapper>
                  <p className="text-muted mb-0 fw-medium">{stats?.performance?.guestSatisfaction?.label ?? ""}</p>
                </div>
              </div>
              <br />

            </div>
          </div>
        </div>

        {/* Vision and Objective*/}

        <div className="container-xxl py-5 my-5 wow fadeInUp" style={zoomStyle} data-wow-delay="0.3s">
          <div className="container">
            <div className="text-center pb-4">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Vision And Objectives
              </h6>
            </div>
            <div className="row g-5">
              <div className="col-lg-6">
                <div className="bg-white p-5 rounded-4 shadow-sm h-100 border-0">
                  <div 
                    className="btn-square bg-primary text-white rounded shadow-sm mb-4 d-flex align-items-center justify-content-center"
                    style={{ width: "70px", height: "70px" }}
                  > 
                    <FiCompass size={36} strokeWidth={2.5} />
                  </div>
                  <h2 className="mb-4" >Our Vision</h2>
                  <p className="text-muted fs-6 leading-relaxed">
                    To be India’s Most Trusted Hospitality Partner, known for seamlessly blending Local Heritage with International Service Standards, ensuring every Guest feels the "Oak" promise of Reliability.
                  </p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="bg-white p-5 rounded-4 shadow-sm h-100 border-0">
                  <div 
                    className="btn-square bg-primary text-white rounded shadow-sm mb-4 d-flex align-items-center justify-content-center"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <FiAward size={36} strokeWidth={2.5} />
                    {/* <FiTarget size={36} strokeWidth={2.5} /> */}
                  </div>
                  <h2 className="mb-4" >Our Objectives</h2>
                  <p className="text-muted fs-6 leading-relaxed">
                    Maximize ROI for Property Owners while delivering 5-star Experiences for Travelers through Dynamic Revenue Management and 100% Operational Transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Core Values*/}

        <div className="container-xxl py-5 wow fadeInUp" style={zoomStyle}data-wow-delay="0.02s">
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


        {/* Team */}

        <div className="container-xxl py-5 mt-5" style={zoomStyle}>
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h6 className="section-title bg-light text-center text-primary px-3 d-inline-block position-relative">
                  The Experts
                </h6>
                
                <h2 className="display-5 text-dark mb-4">
                  Guided by a Passion for Hospitality
                </h2>
                
                <p className="text-muted mb-5 fs-5">
                  Our Leadership Team combines decades of Experience in Luxury Hotel Management 
                  and Dynamic Revenue Growth.
                </p>

                <div className="d-flex justify-content-center">
                  <HashLink 
                    smooth 
                    to="/team" 
                    className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm d-flex align-items-center"
                  >
                    MEET OUR TEAM
                    <i className="fa fa-arrow-right ms-2" />
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/*  Partners */}

        <div className="container-xxl py-5 overflow-hidden">
          <div className="container">
            <div className="text-center mb-5">
              <h2 >Our Global Partners</h2>
            </div>

            <div className="partner-scroller">
              <div className="partner-track">

                {[...partners, ...partners].map((partner, i) => (
                  <div className="partner-card text-center px-4" key={i}>
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="img-fluid mb-2" 
                      style={{ maxHeight: "40px" }} 
                    />
                    <div className="partner-info">
                      <span className="d-block small fw-bold text-dark">{partner.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default About;