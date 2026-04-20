import React, { useState,useEffect } from "react";
import Header2 from '../components/Header2.jsx'
import Footer from '../components/Footer.jsx'

function Error() {

  useEffect(() => {
    const element = document.documentElement;
    element.style.scrollBehavior = 'smooth';
    element.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header2/>
      <div>
          {/* 404 Start */}
          <div className="container-xxl py-5 wow fadeInUp padding-top-custom" data-wow-delay="0.1s">
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <i className="bi bi-exclamation-triangle display-1 text-primary" />
                <h1 className="display-1">404</h1>
                <h1 className="mb-4">Page Not Found</h1>
                <p className="mb-4">
                  We’re sorry, the page you have looked for does not exist in our
                  Website! Maybe go to our Home page!
                </p>
                <a className="btn btn-primary rounded-pill py-3 px-5" href="/">
                  Go Back To Home
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* 404 End */} 
        </div>
  <Footer />
    </>

  )
}

export default Error
