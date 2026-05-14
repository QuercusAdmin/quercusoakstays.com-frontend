import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate,useLocation, Link } from 'react-router-dom';
import { 
  FiHome, FiPlus, FiList, FiUser, FiMenu, FiX, 
  FiMap, FiChevronRight, FiBell, FiLogOut,
  FiSettings
} from 'react-icons/fi';
import { FaPhone, FaGift, FaNewspaper, FaCross, FaQuestion } from 'react-icons/fa';

import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance.js"
import { baseUrl,COMPANY_EMAIL,COMPANY_PHONE,  SUCCESS, COMPANY_ADDRESS} from '../config/configuration.js'

const DashboardAdminPanel = () => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [properties, setProperties] = useState(false);
  const [newPropertyData, setNewPropertyData] = useState({
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
    rooms: [],
    specialFeatures: "",
    rating: 4.5,
    isTaxable: true,
    show: true,
  });
  const [newPropertyAddModalOpen, setNewPropertyAddModal] = useState(false);

  let adminData= JSON.parse(localStorage.getItem('admin'));

  const handleLogout=async(e)=>{
     e.preventDefault();

      let data={  
        _id: adminData?._id,
      }

      try {
        const response = await axiosInstance.post(`${baseUrl}admin/logout`, data,{
            headers: {"Content-Type":"application/json", 'Authorization' : adminData?.jwtToken }})

        if (response.status === 200) {

            window.localStorage.clear();
            toast.success("Logout Successfull !!");
            navigate('/login')
        }
      
     
      } catch (err) {

        toast.error("Unable to Logout at the Current Moment. Please Try Again Later !!");
 
      }


    
  }


  const handleAddLocation=async(e)=>{
     e.preventDefault();

      let data={  
        _id: adminData?._id,
      }

      try {
        const response = await axiosInstance.post(`${baseUrl}admin/logout`, data,{
            headers: {"Content-Type":"application/json", 'Authorization' : adminData?.jwtToken }})

        if (response.status === 200) {

            window.localStorage.clear();
            toast.success("Logout Successfull !!");
            navigate('/login')
        }
      
     
      } catch (err) {

        toast.error("Unable to Logout at the Current Moment. Please Try Again Later !!");
 
      }


    
  }

  const handleAddProperty=async(e)=>{
     e.preventDefault();

      let data={  
        _id: adminData?._id,
      }

      try {
        const response = await axiosInstance.post(`${baseUrl}admin/logout`, data,{
            headers: {"Content-Type":"application/json", 'Authorization' : adminData?.jwtToken }})

        if (response.status === 200) {

            window.localStorage.clear();
            toast.success("Logout Successfull !!");
            navigate('/login')
        }
      
     
      } catch (err) {

        toast.error("Unable to Logout at the Current Moment. Please Try Again Later !!");
 
      }


    
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const NavItem = ({ id, icon, label }) => {
    const isActive = activeMenuItem === id;
    return (
      <button
        onClick={() => {
          setActiveMenuItem(id);
          setIsMobileMenuOpen(false); 
        }}
        className={`btn w-100 d-flex align-items-center border-0 px-4 py-3 mb-2 rounded-3 transition-all ${
          isActive ? 'shadow text-white' : 'text-muted hover-bg-light'
        }`}
        style={{ 
          backgroundColor: isActive ? 'var(--primary)' : 'transparent',
          fontWeight: isActive ? '600' : '400',
          letterSpacing: '0.5px'
        }}
      >
        <span className="me-3 fs-5">{icon}</span>
        <span className="flex-grow-1 text-start">{label}</span>
        {isActive && <FiChevronRight className="opacity-75" />}
      </button>
    );
  };


  return (
    <div >
      <div className="d-flex vh-100 overflow-hidden" style={{ backgroundColor: '#F9F8F6'  }}>
        
        <aside 
          className="d-none d-lg-flex flex-column bg-white border-end shadow-sm" 
          style={{ width: '300px', zIndex: 1020, transform: 'scale(0.9)' , height: '111.11%', transformOrigin: 'top left'}}
        >
          <div className="p-4 border-bottom text-center">

            <img 
                src={require('../assets/img/logolight135x255.png')}
                alt="Quercus Oak Logo" 
                className="img-fluid d-block mx-auto mb-3" 
                style={{ maxHeight: '65px', width: 'auto' }} 
            />
            <h4 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>
              Quercus Oak Hospitaity Private Limited
            </h4>
            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '9px', letterSpacing: '2px' }}>
              Administrator Panel
            </small>
          </div>

          <div className="flex-grow-1 px-3 py-4">
            <NavItem id="dashboard" icon={<FiHome />} label="Overview" />
            <NavItem id="properties" icon={<FiList />} label="Properties" />
            <NavItem id="configuration" icon={<FiSettings/>} label="Property Settings" />
            <NavItem id="locations" icon={<FiMap />} label="Destinations" />
            <NavItem id="enquiries" icon={<FaPhone />} label="Guest Enquiries" />
            <NavItem id="queries" icon={<FaQuestion />} label="Guest Queries" />
            <NavItem id="newsletter" icon={<FaNewspaper />} label="Newsletter" />
            { adminData?.userType ==='developer' && <NavItem id="error" icon={<FaCross />} label="Error" /> }
          </div>

          <div className="p-4 border-top">
            <button onClick={(e)=>{handleLogout(e)} } className="btn btn-outline-primary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 logout-btn">
              <FiLogOut /> Logout
            </button>
          </div>
        </aside>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
                className="position-fixed vh-100 vw-100 shadow-lg d-lg-none"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040, top: 0, left: 0 }}
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="position-fixed vh-100 bg-white shadow-lg d-lg-none"
                style={{ width: '280px', zIndex: 1050, top: 0, left: 0 }}
              >
                <div className="p-4 d-flex justify-content-between align-items-center border-bottom">
                  <span className="fw-bold" style={{ color: 'var(--primary)'}}>MENU</span>
                  <button className="btn p-0 border-0" onClick={toggleMenu}><FiX size={24} /></button>
                </div>

                <div style={{transform: 'scale(0.9)' , height: '111.11%', transformOrigin: 'top left'}}>

                  <div className="p-4 border-bottom text-center">
                    <img 
                        src={require('../assets/img/logolight135x255.png')}
                        alt="Quercus Oak Logo" 
                        className="img-fluid d-block mx-auto mb-3" 
                        style={{ maxHeight: '60px', width: 'auto' }} 
                    />
                    <h4 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>
                      Quercus Oak Hospitaity Private Limited
                    </h4>
                    <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                      Administrator Panel
                    </small>
                  </div>
                  <div className="p-3">
                    <NavItem id="dashboard" icon={<FiHome />} label="Overview" />
                    <NavItem id="properties" icon={<FiList />} label="Properties" />
                    <NavItem id="configuration" icon={<FiSettings/>} label="Property Settings" />
                    <NavItem id="locations" icon={<FiMap />} label="Destinations" />
                    <NavItem id="enquiries" icon={<FaPhone />} label="Guest Enquiries" />
                    <NavItem id="queries" icon={<FaQuestion />} label="Guest Queries" />
                    <NavItem id="newsletter" icon={<FaNewspaper />} label="Newsletter" />
                    { adminData?.userType ==='developer' && <NavItem id="error" icon={<FaCross />} label="Error" /> }
                  </div>


                </div>
              </motion.aside>
            </div>
          )}
        </AnimatePresence>

        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          <header 
            className="navbar bg-white border-bottom px-4 py-2 shadow-sm fixed-top mt-0 w-100" 
            style={{ zIndex: 100, height: '90px'}}
          >
            <div className="container-fluid p-0 d-flex align-items-center">
              <button className="btn d-lg-none border-0 p-0 me-3" onClick={toggleMenu} style={{ color: 'var(--primary)' }}>
                <FiMenu size={28} />
              </button>

              <div className="ms-auto d-flex align-items-center gap-3">
                <div className="text-end d-none d-sm-block me-2 border-end pe-3 border-secondary-subtle">
                  <p className="mb-0 fw-bold small text-dark lh-1"style={{ fontSize: '20px' }}>Super Admin</p>
                  <p className="mb-0 text-muted small mt-1" style={{ fontSize: '15px' }}>{adminData.email}</p>
                </div>
                
                <div className="d-flex align-items-center gap-2">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm gap-5"
                    style={{ width: '50px', height: '50px', backgroundColor: 'var(--primary)' }}
                  >
                    <FiUser size={22} />
                  </div>

                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm ml-2"
                    style={{ width: '50px', height: '50px', borderColor: 'var(--primary)', borderWidth:'2px' }}
                  >
                    <FiBell color={'var(--primary)'} size={22} />
                  </div>
                </div>
              </div>
            </div>
          </header>
          

          <main className="flex-grow-1 overflow-auto p-3 p-md-4 p-lg-5"  style={{marginTop: '5rem'}}>
            <div className="container-fluid p-0">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">


                <div className="d-flex flex-wrap justify-content-between align-items-center w-100 mb-4 border-bottom pb-4 mt-2">

                  <div className="flex-grow-1">
                    <h2 className="h3 fw-bold mb-0 text-uppercase" style={{ letterSpacing: '1px',fontSize: "20px" }}>
                      {activeMenuItem !== 'dashboard' ? activeMenuItem : "Overview"}
                    </h2>
                    <p className="text-muted small mb-0 d-none d-md-block">
                    {  activeMenuItem === "dashboard" ?
                          ""
                          : activeMenuItem === "properties" ?
                            "Manage Property Details"
                          : activeMenuItem === "configuration" ?
                            "Manage Portfolio Settings"
                          : activeMenuItem === "locations" ?
                            "Manage Portfolio Locations"
                          : activeMenuItem === "enquiries" ?
                            "Manage Guest Enquires"
                          : activeMenuItem === "newsletter" ?
                            "Manage NewsLetter Subscriptions"
                          : activeMenuItem === "error" ?
                            "Manage Issues"
                          : activeMenuItem === "queries" ?
                            "Manage Queries" 
                          :
                            "Manage Portfolio Details"
                      
                    }</p>
                  </div>

          
                  {activeMenuItem === "properties" && (

                    <div className="ms-auto pt-2 pt-md-0">
                      <button 
                        onClick={(e) => {handleAddProperty(e)}}
                        className="btn btn-warning px-4 py-2 rounded-pill shadow-sm fw-bold d-flex align-items-center gap-2 border-0"
                        style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
                      >
                        <FiPlus size={20} /> 
                        <span className="d-none d-sm-inline">ADD PROPERTY</span>
                        <span className="d-inline d-sm-none">ADD</span>
                      </button>
                    </div>

                  )}

                  {activeMenuItem === "locations" && (

                    <div className="ms-auto pt-2 pt-md-0">
                      <button 
                        onClick={(e) => {handleAddLocation(e)}}
                        className="btn btn-warning px-4 py-2 rounded-pill shadow-sm fw-bold d-flex align-items-center gap-2 border-0"
                        style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
                      >
                        <FiPlus size={20} /> 
                        <span className="d-none d-sm-inline">ADD LOCATION</span>
                        <span className="d-inline d-sm-none">ADD</span>
                      </button>
                    </div>

                  )}

                </div>

              </div>

              <div className="row g-4">
                <div className="col-12">
                  <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
                    <h5 className="text-muted">Content for {activeMenuItem} will appear here</h5>
                  </div>
                </div>
              </div>

              {
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(item=>{
                  return(
              <div className="row g-4">
                <div className="col-12">
                  <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
                    <h5 className="text-muted">Content for {activeMenuItem} will appear here</h5>
                  </div>
                </div>
              </div>
                    

                  )
                })
              }
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminPanel;