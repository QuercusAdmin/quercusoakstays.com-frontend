import React,{useEffect,useState} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home.jsx'
import "./App.css";
import Team from './pages/Team.jsx'
import Error from './pages/Error.jsx'
import Contact from './pages/Contact.jsx'
import RefundPolicy from './pages/RefundPolicy.jsx'
import Cookies from './pages/Cookies.jsx'
import Properties from './pages/Properties.jsx';
import TermsAndCondition from './pages/TermsAndCondition.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import {WHATSAPP_CHAT_NUMBER,WHATSAPP_CHAT_MESSAGE} from './config/config.js'
import { ToastContainer, toast, Slide } from "react-toastify";
import PropertyView from './pages/PropertyView.jsx';

export default function App() {
  const [ShowTopBtn, setShowTopBtn] = useState(false);


useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);





  return (
    <div >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ marginTop: "2rem" }}
        />



          <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/team' element={<Team/>}/>
          <Route path='/404' element={<Error/>}/>
          <Route path='/error' element={<Error/>}/>
          <Route path='/contact-us' element={<Contact/>}/>
          <Route path='/properties' element={<Properties/>}/>
          <Route path='/property/view/:id' element={<PropertyView/>}/>
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path='/terms-and-conditions' element={<TermsAndCondition/>}/>
          <Route path='/refund-policy' element={<RefundPolicy/>}/>
          <Route path='/cookies' element={<Cookies/>}/>
          <Route path='/team' element={<Team/>}/>
          {/* <Route path="*" element={<Navigate to="/" />} /> */}


          </Routes>



        
          <div className="action-buttons-container">
            <a 
              href={`https://wa.me/${WHATSAPP_CHAT_NUMBER}?text=${encodeURIComponent(WHATSAPP_CHAT_MESSAGE)}`} 
              className="whatsapp-button" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <i className="bi bi-whatsapp"></i>
            </a>

            { ShowTopBtn &&
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault();
                 
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  //  window.location.reload()
                 }}
                className={`btn btn-lg btn-primary back-to-top-button fs-6`}
              >
                <i className="bi bi-chevron-up me-2"></i> 
                <span className="button-text">Back to Top</span>
              </a>
        
            }

          </div>
      </div>
  )
}
