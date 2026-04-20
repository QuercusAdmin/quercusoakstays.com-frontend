import React, { useState,useEffect } from "react";
import Header2 from '../components/Header2'
import Footer from '../components/Footer'

function Cookies() {

    useEffect(() => {
      const element = document.documentElement;
      element.style.scrollBehavior = 'smooth';
      element.scrollTo(0, 0);
    }, []);

  return (
    <>
      <Header2/>
      
  <Footer />
    </>
  )
}

export default Cookies;;
