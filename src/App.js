import React,{useEffect,useState} from 'react'
import { Route, HashRouter,  BrowserRouter as Router, Routes ,Navigate,Outlet} from 'react-router-dom'
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
import {WHATSAPP_CHAT_NUMBER,WHATSAPP_CHAT_MESSAGE} from './config/configuration.js'
import { ToastContainer, toast, Slide } from "react-toastify";
import PropertyView from './pages/PropertyView.jsx';
import Login from './pages/Login.jsx';
// import Dashboard from './component/dashboard';
// import Forgot from './component/forget';
// import Otp from './component/otp';
// import ChangePassword from './component/change-password';
// import LoginSuccess from './component/login-success';
// import GraphicalAnalysis from './component/graphical-analysis';

import { debugLog, isLoggedIn } from './utils';

export default function App() {
  const [ShowTopBtn, setShowTopBtn] = useState(false);
  const [isOnline, setOnline] = useState(true);


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

  const updateNetworkStatus = () => {
      setOnline(navigator.onLine);
    };
  
    useEffect(() => {
      window.addEventListener("load", updateNetworkStatus);
      window.addEventListener("online", updateNetworkStatus);
      window.addEventListener("offline", updateNetworkStatus);
  
      return () => {
          window.removeEventListener("load", updateNetworkStatus);
          window.removeEventListener("online", updateNetworkStatus);
          window.removeEventListener("offline", updateNetworkStatus);
      };
    }, [isOnline]);






  const ProtectedRoute = ({
    adminType,
    role,
    redirectPath = '/',
    children,
  }) => {
    
    const hotelData = JSON.parse(localStorage.getItem("hotel"));

    
    if (!isLoggedIn(adminType)) {
      return <Navigate to={redirectPath} replace />;
    }
    else{

      let roleManager = hotelData?.role

      if(role.includes(roleManager)){
        return children ? children : <Outlet />;
      }
      else{
        return <Navigate to={`/dashboard`} replace />;
      }


    }


  
  };




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
              <Route path="*" element={<Navigate to="/" />} />
              <Route path='/login' element={<Login/>}/>
              {/* <Route  path="/dashboard" element={<ProtectedRoute adminType={'hotel'} role={['admin' , 'spa', 'security','frontdesk', 'housekeeping', 'foodandbeverage' ]}><Dashboard/> </ProtectedRoute>} /> */}
              {/* <Route path='/forget' element={<Forgot />}/> */}
              {/* <Route path='/otp' element={<Otp />}/> */}
              {/* <Route path='/change-password' element={<ChangePassword />}/> */}
              {/* <Route path='/login-success' element={<LoginSuccess />}/> */}
              {/* <Route path='/graphical-analysis' element={<ProtectedRoute adminType={'hotel'} role={['admin' , 'spa', 'security','frontdesk', 'housekeeping', 'foodandbeverage' ]}><GraphicalAnalysis/> </ProtectedRoute>}/> */}
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






