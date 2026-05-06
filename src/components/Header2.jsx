import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { HashLink } from "react-router-hash-link";
import {COMPANY_FACEBOOK_HANDLE_URL,BOOK_DEMO_URL, WHATSAPP_LIST_MESSAGE,WHATSAPP_CHAT_NUMBER ,COMPANY_LINKEDIN_HANDLE_URL, COMPANY_INSTAGRAM_HANDLE_URL, COMPANY_YOUTUBE_HANDLE_URL, COMPANY_X_HANDLE_URL, COMPANY_DISCORD_HANDLE_URL, COMPANY_NAME, COMPANY_PHONE, COMPANY_EMAIL} from '../config/configuration.js'
import { useNavigate } from 'react-router-dom';

function  Header2() {

  const navigate = useNavigate();

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = 630; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  const handleListProperty = (e) => {
    e.preventDefault();
    
    const url = `https://wa.me/${WHATSAPP_CHAT_NUMBER}?text=${encodeURIComponent(WHATSAPP_LIST_MESSAGE)}`;
    
    window.open(url, "_blank", "noreferrer");
  };

  const scrollDuration = 800;
  return (
    <div>


      

    {/* Topbar Start */}
    <div className="container-fluid bg-dark px-5 d-none d-lg-block">
      <div className="row gx-0">
        <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
          <div
            className="d-inline-flex align-items-center"
            style={{ height: 35 }}
          >
            <div className="me-3 text-light" style={{ fontSize: '12px' }}>
            <i className="fa fa-map-pin me-2" style={{ fontSize: '11px' }}/>

              {COMPANY_NAME}
            </div>
            <div className="me-2 text-light" style={{ fontSize: '12px' }}>
              <i className="fa fa-phone me-2" style={{ fontSize: '11px' }}/>
                <a 
                  href={`tel:+${COMPANY_PHONE}`} 
                  className="text-white text-decoration-none"
                >
                  +{COMPANY_PHONE?.substring(0,2)} {COMPANY_PHONE?.substring(2)}
                </a>            </div>
            <div className="text-light" style={{ fontSize: '12px' }}>
              <i className="fa fa-envelope-open me-2" style={{ fontSize: '11px' }}/>
              <a className="text-white" style={{ fontSize: '11px' }} href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>

            </div>
          </div>
        </div>
        <div className="col-lg-4 text-center text-lg-end">
          <div
            className="d-inline-flex align-items-center"
            style={{ height: 35 }}
          >
            <a
              className="btn btn-sm text-light border-0 btn-sm-square rounded-circle me-2"
              to={`${COMPANY_X_HANDLE_URL}`}
            >
              <i className="fa-brands fa-x-twitter fw-normal" />
            </a>
            <a
              className="btn btn-sm text-light border-0 btn-sm-square rounded-circle me-2"
              to={`${COMPANY_FACEBOOK_HANDLE_URL}`}
            >
              <i className="fab fa-facebook-f fw-normal" />
            </a>
            <a
              className="btn btn-sm text-light border-0 btn-sm-square rounded-circle me-2"
              to={`${COMPANY_LINKEDIN_HANDLE_URL}`}
            >
              <i className="fab fa-linkedin-in fw-normal" />
            </a>
            <a
              className="btn btn-sm text-light border-0 btn-sm-square rounded-circle me-2"
              to={`${COMPANY_INSTAGRAM_HANDLE_URL}`}
            >
              <i className="fab fa-instagram fw-normal" />
            </a> 
            <a
              className="btn btn-sm text-light border-0 btn-sm-square rounded-circle me-2"
              to={`${COMPANY_YOUTUBE_HANDLE_URL}`}
            >
              <i className="fab fa-youtube fw-normal" />
            </a>
            
          </div>
        </div>
      </div>
    </div>
    {/* Topbar End */}
    {/* Navbar & Hero Start */}
    <div className="container-fluid position-relative p-0">
      {/* <nav className="navbar navbar-expand-lg navbar-light  px-4 px-lg-5 py-3 py-lg-0"> */}
      <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm px-4 px-lg-5 py-3 py-lg-0">
        <div  className="logo-banner-container">

    <Link to={'/'}  style={{ userSelect: "none", textDecoration: "none" }}>
      <img src={require('../assets/img/logolight135x255.png')} alt="Logo" className="logo-banner-image" />
    </Link>

    <Link to={'/'}  style={{ userSelect: "none", textDecoration: "none" }}>
    <p className="logo-banner-text">
      <span className="bettermy-text1">Quercus Oak Stays</span> 
    </p>

  </Link>
        </div>

        <button
          className="navbar-toggler custom-ham"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
          <HashLink
          to={'/'}
          spy="true"
          smooth="true"
          offset={-110}
          duration={scrollDuration}
          className="nav-item nav-link1 nav-customn"
        >
          Home
        </HashLink>

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
          className="nav-item nav-link1 nav-customn"
        >
          About
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
          className="nav-item nav-link1 nav-customn"
        >
          Properties
        </HashLink>

         {/* <HashLink
          smooth
          to={'/#gallery'}
          scroll={(el) =>
            el.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            })
          }
          className="nav-item nav-link1 nav-customn"
        >
          Gallery
        </HashLink> */}
        <HashLink
          smooth
          to="/#gallery"
          scroll={scrollWithOffset} 
          className="nav-item nav-link1 nav-customn"
        >
          Gallery
        </HashLink>
        <HashLink
            smooth
            to={{
              pathname: '/contact-us',
              state: { flow: "header", selectedPlan: null },
            }}
            scroll={(el) =>
              el.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              })
            }
            className="nav-item nav-link1 nav-customn"
          >
            Contact Us
          </HashLink> 
          </div>
          {/* <Link to="/list-property" className="btn btn-primary rounded-pill py-2 px-3 list-property">
            List Your Property
          </Link> */}

          <button onClick={(e)=>{handleListProperty(e)}} className="btn btn-primary rounded-pill py-2 px-3 list-property">
            List Your Property
          </button>

        </div>
      </nav>
    </div>
    {/* Navbar & Hero End */}
    <br />
    <br />
    <br />
    <br />
 <br />
    </div>
  )
}

export default Header2