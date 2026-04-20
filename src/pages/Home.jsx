import React, { useState,useEffect,useMemo,useRef } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Marquee from '../components/Marquee';
import FAQS from '../components/FAQ.jsx';
import IncrementTansition from '../components/IncrementTansition.jsx';
import IncrementTransitionWrapper from '../components/IncrementTransitionWrapper.jsx';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance"
import { baseUrl, SUCCESS, MARQUEE_COUNT, WHATSAPP_LIST_MESSAGE,WHATSAPP_CHAT_NUMBER ,TIME_SAVING_COUNT, REVENUE_GROWTH_COUNT, STAFF_EFFICIENCY_COUNT, GUEST_SATISFACTION_COUNT, OPERATION_VISIBILITY_COUNT, GUEST_FEEDBACK_COUNT, TRUSTEDBY_COUNT } from "../config/config";
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

export default function Home() {

  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [name,setName]=useState("");
  const [orgName,setOrgName]=useState("");
  const [query,setQuery]=useState("");
  const [checkInDate,setCheckInDate]=useState(null);
  const [checkOutDate,setCheckOutDate]=useState(null);
  const [propertyLocation,setPropertyLocation]=useState("");
  const [guest,setGuest]=useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const intervalRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [properties ,setProperties]=useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);




    let dummyData= [
      {
        "_id":  "68bdb4d9265239b5893ca614",
        "title": "Plutus Luxury Boutique Stay",
        "tag": "Popular",
        "locality": "Crown Brewery Estate, Barlow Ganj",
        "description": "Plutus Luxury Boutique Stays in Mussoorie, Uttarakhand, India. Far from the\r\nmaddening crowds, our Villa is nestled in the dense oak forest at the foothills of\r\nHimalayas on a quiet road to Mussoorie.\r\nUnderstated luxury and the hills beyond greet you as you walk down the stairs to our\r\nguest area - now your home away from home.\r\nIt is a popular choice for travelers seeking a unique experience and offers a variety\r\nof room and common spaces, including those with looks for private space. The Villa\r\nis known for its smooth check-in/check-out process, flexible policies, and friendly\r\nmanagement, contributing to high customer satisfaction.",
        "propertyType": "Villa",
        "location": "mussoorie",
        "address": "Crown Brewery Estate, Barlow Ganj, Mussoorie, Uttarakhand 248122",
        "price": 22000,
        "spaceDetails": {
          "bedrooms": 6,
          "bathrooms": 6,
          "guests": 14,
          "size": "2800",
          "livingArea": true,
          "diningArea": true,
          "kitchen": "staff",
          "driverAccommodation": true
        },
        "amenities": [
          "High-Speed WiFi",
          "Smart TV",
          "Gourmet Kitchen",
          "Garden",
          "Terrace",
          "Balcony",
          "Laundry",
          "Private Pool"
        ],
        "badges": [
          "Luxury Collection",
          "Family Friendly",
          "Romantic Getaway",
          "Pet Friendly"
        ],
        "featured":true,
        "images": [
          {
            "id": "properties/lurbgesrkvrtapitfkdo",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757263065/properties/lurbgesrkvrtapitfkdo.jpg",
            "alt": "Plutus Luxury Boutique Stays",
            "_id":  "68bdb4d9265239b5893ca615" 
          },
          {
            "id": "properties/ddiuwnv7mg5uanlh2pjd",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757263065/properties/ddiuwnv7mg5uanlh2pjd.jpg",
            "alt": "Plutus Luxury Boutique Stays",
            "_id":  "68bdb4d9265239b5893ca616" 
          },
          {
            "id": "properties/k9pj0fd63et06jlhhtd4",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757263064/properties/k9pj0fd63et06jlhhtd4.jpg",
            "alt": "Plutus Luxury Boutique Stays",
            "_id":  "68bdb4d9265239b5893ca617" 
          },
          {
            "id": "properties/b2jkvkf6qtt10mbbdzhb",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757263065/properties/b2jkvkf6qtt10mbbdzhb.jpg",
            "alt": "Plutus Luxury Boutique Stays",
            "_id":  "68bdb4d9265239b5893ca618" 
          },
          {
            "id": "properties/cxfhkns3wfuu7fvppwa8",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757263065/properties/cxfhkns3wfuu7fvppwa8.jpg",
            "alt": "Plutus Luxury Boutique Stays",
            "_id":  "68bdb4d9265239b5893ca619" 
          },
          {
            "id": "properties/qkyyypfmbcxxcjqwfzag",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757263065/properties/qkyyypfmbcxxcjqwfzag.jpg",
            "alt": "Plutus Luxury Boutique Stays",
            "_id":  "68bdb4d9265239b5893ca61a" 
          },
          {
            "id": "properties/ywimqpcpus0xvbstguti",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757263065/properties/ywimqpcpus0xvbstguti.jpg",
            "alt": "Plutus Luxury Boutique Stays",
            "_id":  "68bdb4d9265239b5893ca61b" 
          },
          {
            "id": "properties/oxbrvnmvuxjn4m0if4cy",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757263065/properties/oxbrvnmvuxjn4m0if4cy.jpg",
            "alt": "Plutus Luxury Boutique Stays",
            "_id":  "68bdb4d9265239b5893ca61c" 
          },
          {
            "id": "properties/j8idfop3xpnh42l4wvnm",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757263065/properties/j8idfop3xpnh42l4wvnm.jpg",
            "alt": "Plutus Luxury Boutique Stays",
            "_id":  "68bdb4d9265239b5893ca61d" 
          }
        ],
        "specialFeatures": "",
        "rating": 4.5,
        "createdAt": { "$date": "2025-09-07T16:37:45.914Z" },
        "updatedAt": { "$date": "2025-09-07T16:37:45.914Z" },
        "__v": 0
      },
      {
        "_id":  "68bdba03265239b5893ca6c6",
        "title": "Mackenzie Luxury Boutique Stays",
        "tag": "Top Rated",
        "locality": "Hathipaon Road, Sher Garhi",
        "description": "Mackenzie House And Cafe is a Luxury Resort in Mussoorie, Uttarakhand, India. It is a popular choice for\r\n travelers seeking a unique experience and offers a variety of room types, including those with balcony\r\n views. The hotel is known for its smooth check-in/check-out process, flexible policies, and friendly\r\n management, contributing to high customer satisfaction.",
        "propertyType": "Villa",
        "location": "mussoorie",
        "address": "Hathipaon Road, near Nag Mandir, Sher Garhi, Mussoorie, Kyar Kuli Bhatta, Uttarakhand 248179",
        "price": 4500,
        "spaceDetails": {
          "bedrooms": 9,
          "bathrooms": 9,
          "guests": 18,
          "size": "2800",
          "livingArea": true,
          "diningArea": true,
          "kitchen": "staff",
          "driverAccommodation": true
        },
        "amenities": [
          "Secure Parking",
          "Laundry",
          "Balcony",
          "Fireplace",
          "BBQ Area",
          "Garden",
          "High-Speed WiFi",
          "Smart TV",
          "Gourmet Kitchen",
          "Terrace"
        ],
        "badges": [
          "Pet Friendly",
          "Family Friendly",
          "Luxury Collection",
          "Romantic Getaway",
          "Business Travel",
          "Award Winner"
        ],
        "featured":true,
        "images": [
          {
            "id": "properties/q5wksxlxlipod3qki6hx",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757264386/properties/q5wksxlxlipod3qki6hx.jpg",
            "alt": "Mackenzie Luxury Boutique Stays",
            "_id":  "68bdba03265239b5893ca6c7" 
          },
          {
            "id": "properties/fldd1b41gjnoxiemzpr5",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757264386/properties/fldd1b41gjnoxiemzpr5.jpg",
            "alt": "Mackenzie Luxury Boutique Stays",
            "_id":  "68bdba03265239b5893ca6c8" 
          },
          {
            "id": "properties/ks6k9ddefjpntrqzlbyx",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757264386/properties/ks6k9ddefjpntrqzlbyx.jpg",
            "alt": "Mackenzie Luxury Boutique Stays",
            "_id":  "68bdba03265239b5893ca6c9" 
          },
          {
            "id": "properties/xomubyejdahwezkog3qe",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757264386/properties/xomubyejdahwezkog3qe.jpg",
            "alt": "Mackenzie Luxury Boutique Stays",
            "_id":  "68bdba03265239b5893ca6ca" 
          },
          {
            "id": "properties/mbkj091kczgvsbm4kocl",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757264386/properties/mbkj091kczgvsbm4kocl.jpg",
            "alt": "Mackenzie Luxury Boutique Stays",
            "_id":  "68bdba03265239b5893ca6cb" 
          },
          {
            "id": "properties/nmtw2asr4i2qzzzyemcp",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757264386/properties/nmtw2asr4i2qzzzyemcp.jpg",
            "alt": "Mackenzie Luxury Boutique Stays",
            "_id":  "68bdba03265239b5893ca6cc" 
          },
          {
            "id": "properties/yqugxh6ddk2gbh7yi8jj",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757264386/properties/yqugxh6ddk2gbh7yi8jj.jpg",
            "alt": "Mackenzie Luxury Boutique Stays",
            "_id":  "68bdba03265239b5893ca6cd" 
          },
          {
            "id": "properties/xbl89wu68n39fi2rj3qt",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757264386/properties/xbl89wu68n39fi2rj3qt.jpg",
            "alt": "Mackenzie Luxury Boutique Stays",
            "_id":  "68bdba03265239b5893ca6ce" 
          },
          {
            "id": "properties/bjgzzrrota1njr33mrnm",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757264386/properties/bjgzzrrota1njr33mrnm.jpg",
            "alt": "Mackenzie Luxury Boutique Stays",
            "_id":  "68bdba03265239b5893ca6cf" 
          },
          {
            "id": "properties/wudsrrcufmkfkcvy5d69",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757264386/properties/wudsrrcufmkfkcvy5d69.jpg",
            "alt": "Mackenzie Luxury Boutique Stays",
            "_id":  "68bdba03265239b5893ca6d0" 
          },
          {
            "id": "properties/vucgeqp3k8iglq7hjggg",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1757264386/properties/vucgeqp3k8iglq7hjggg.jpg",
            "alt": "Mackenzie Luxury Boutique Stays",
            "_id":  "68bdba03265239b5893ca6d1" 
          }
        ],
        "specialFeatures": "",
        "rating": 4.5,
        "createdAt": { "$date": "2025-09-07T16:59:47.198Z" },
        "updatedAt": { "$date": "2025-10-21T08:14:15.826Z" },
        "__v": 0
      },
      {
        "_id":  "68f2a19b9085d1590104a85b",
        "title": "Puntush Riverside Villa",
        "tag": "Nature Lover",
        "locality": "Theva Maldevta Road, Raipur",
        "description": "About this villa",
        "propertyType": "Villa",
        "location": "maldevta",
        "address": "Theva Maldevta Road, Raipur, Dehradun, Uttarakhand 248008",
        "price": 15000,
        "spaceDetails": {
          "bedrooms": 6,
          "bathrooms": 5,
          "guests": 18,
          "size": "2800",
          "livingArea": true,
          "diningArea": true,
          "kitchen": "staff",
          "driverAccommodation": true
        },
        "amenities": [
          "BBQ Area",
          "Fireplace",
          "High-Speed WiFi",
          "Private Pool",
          "Secure Parking",
          "Central AC",
          "Laundry",
          "Garden",
          "Balcony",
          "Smart TV",
          "Gourmet Kitchen",
          "Terrace",
          "Gym"
        ],
        "badges": [
          "Business Travel",
          "Romantic Getaway",
          "Family Friendly",
          "Luxury Collection",
          "Award Winner",
          "Pet Friendly"
        ],
        "featured":true,
        "images": [
          {
            "id": "properties/odqfrql4uyxe38zvu514",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760731546/properties/odqfrql4uyxe38zvu514.jpg",
            "alt": "Puntush Riverside Villa",
            "_id":  "68f2a19b9085d1590104a85c" 
          },
          {
            "id": "properties/ter5h2o7l1xlcn5owguo",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760731546/properties/ter5h2o7l1xlcn5owguo.jpg",
            "alt": "Puntush Riverside Villa",
            "_id":  "68f2a19b9085d1590104a85d" 
          },
          {
            "id": "properties/fvz8pdzstvcpkpkv5b0m",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760731546/properties/fvz8pdzstvcpkpkv5b0m.jpg",
            "alt": "Puntush Riverside Villa",
            "_id":  "68f2a19b9085d1590104a85e" 
          },
          {
            "id": "properties/j2czsvskgxfcbk2eoutu",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760731546/properties/j2czsvskgxfcbk2eoutu.jpg",
            "alt": "Puntush Riverside Villa",
            "_id":  "68f2a19b9085d1590104a85f" 
          },
          {
            "id": "properties/go73dhitor9otaif3isg",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760731546/properties/go73dhitor9otaif3isg.jpg",
            "alt": "Puntush Riverside Villa",
            "_id":  "68f2a19b9085d1590104a860" 
          },
          {
            "id": "properties/c4cvfglnnx1pokzdkbks",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760731546/properties/c4cvfglnnx1pokzdkbks.jpg",
            "alt": "Puntush Riverside Villa",
            "_id":  "68f2a19b9085d1590104a861" 
          }
        ],
        "specialFeatures": "",
        "rating": 4.5,
        "createdAt": { "$date": "2025-10-17T20:05:47.590Z" },
        "updatedAt": { "$date": "2025-11-12T13:03:03.084Z" },
        "__v": 0
      },
      {
        "_id":  "68f2a7029432fe4c72519b72",
        "title": "Aspen Heights Luxury Stays",
        "tag": "Trending",
        "locality": "Crown Brewery Estate, Mussoorie",
        "description": "ASPEN HEIGHTS\r\n LUXURY STAYS\r\nFar from the maddening crowds,\r\n Our homestay is nestled in the dense\r\n oak forest at the foothills of\r\n himalayas on a quiet road to\r\n mussoorie.\r\n understated luxury, stunning views\r\n of the Dehradun valley and the hills\r\n beyond greet you as you walk down\r\n the stairs to our guest area - now\r\n your home away from home. Aspen Heights is special because of its: - One of a kind structure, that is built around the trees and greenery -Blissful location amidst dense forests and lush greenery - Gorgeous panoramas noramas of Dehradun and plunging valleys - Strategic location, away from the buzzing Mussoorie.",
        "propertyType": "Villa",
        "location": "mussoorie",
        "address": "Crown Brewery Estate Nala Pani, Barlow Ganj Rd, Barlow Ganj, Mussoorie, Uttarakhand 248179",
        "price": 35000,
        "spaceDetails": {
          "bedrooms": 6,
          "bathrooms": 6,
          "guests": 12,
          "size": "3200",
          "livingArea": true,
          "diningArea": true,
          "kitchen": "staff",
          "driverAccommodation": true
        },
        "amenities": [
          "High-Speed WiFi",
          "Gourmet Kitchen",
          "Secure Parking",
          "Fireplace",
          "Garden",
          "Terrace",
          "BBQ Area",
          "Balcony",
          "Laundry"
        ],
        "badges": [
          "Luxury Collection",
          "Business Travel",
          "Romantic Getaway",
          "Family Friendly",
          "Award Winner"
        ],
        "featured":false,
        "images": [
          {
            "id": "properties/yo6xg148osbeadrki1ud",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732929/properties/yo6xg148osbeadrki1ud.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b73" 
          },
          {
            "id": "properties/tr0rfc7q2osxpmmgqwqp",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732930/properties/tr0rfc7q2osxpmmgqwqp.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b74" 
          },
          {
            "id": "properties/z3miyiv6wtmzf43ttx7b",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732929/properties/z3miyiv6wtmzf43ttx7b.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b75" 
          },
          {
            "id": "properties/d9b764anbxkwr7vdxeiw",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732930/properties/d9b764anbxkwr7vdxeiw.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b76" 
          },
          {
            "id": "properties/osuvornscoi9jptspso6",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732929/properties/osuvornscoi9jptspso6.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b77" 
          },
          {
            "id": "properties/gv1xgho2evts2f1ilxc8",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732929/properties/gv1xgho2evts2f1ilxc8.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b78" 
          },
          {
            "id": "properties/kjxusew7ll5b9wea9nx2",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732929/properties/kjxusew7ll5b9wea9nx2.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b79" 
          },
          {
            "id": "properties/ibpapqovck28nuaoov8i",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732929/properties/ibpapqovck28nuaoov8i.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b7a" 
          },
          {
            "id": "properties/tcvn4c305drj1nrclr4j",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732930/properties/tcvn4c305drj1nrclr4j.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b7b" 
          },
          {
            "id": "properties/o1fdooed0rgkzfsq57bi",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732929/properties/o1fdooed0rgkzfsq57bi.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b7c" 
          },
          {
            "id": "properties/ikvatjtverm8taob91j5",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732930/properties/ikvatjtverm8taob91j5.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b7d" 
          },
          {
            "id": "properties/nv9ibhau9oteeo8wszdz",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732929/properties/nv9ibhau9oteeo8wszdz.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b7e" 
          },
          {
            "id": "properties/tdv2ef1kp3cnrxap1ohf",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732929/properties/tdv2ef1kp3cnrxap1ohf.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b7f" 
          },
          {
            "id": "properties/mylz1mf0hai0cjwfhj0x",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732929/properties/mylz1mf0hai0cjwfhj0x.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b80" 
          },
          {
            "id": "properties/zu42ekfqf687uy88xv3j",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760732929/properties/zu42ekfqf687uy88xv3j.jpg",
            "alt": "Aspen Heights Luxury Stays",
            "_id":  "68f2a7029432fe4c72519b81" 
          }
        ],
        "specialFeatures": "",
        "rating": 4.5,
        "createdAt": { "$date": "2025-10-17T20:28:50.967Z" },
        "updatedAt": { "$date": "2025-10-21T08:11:40.772Z" },
        "__v": 0
      },
      {
        "_id":  "68f2a9c59432fe4c72519c1a",
        "title": "Grandeur Luxe Apartment",
        "tag": "Modern Luxe",
        "locality": "Mall Road, Mussoorie",
        "description": "About",
        "propertyType": "Apartment",
        "location": "mussoorie",
        "address": "Mussoorie",
        "price": 45000,
        "spaceDetails": {
          "bedrooms": 8,
          "bathrooms": 8,
          "guests": 20,
          "size": "3200",
          "livingArea": true,
          "diningArea": true,
          "kitchen": "self",
          "driverAccommodation": true
        },
        "amenities": [
          "Smart TV",
          "High-Speed WiFi",
          "Garden",
          "Balcony",
          "Secure Parking",
          "Terrace",
          "Central AC"
        ],
        "badges": [
          "Business Travel",
          "Romantic Getaway",
          "Family Friendly"
        ],
        "featured":false,
        "images": [
          {
            "id": "properties/swxkow2fibkjg9egu3ox",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760733635/properties/swxkow2fibkjg9egu3ox.jpg",
            "alt": "Grandeur Luxe Apartment",
            "_id":  "68f2a9c59432fe4c72519c1b" 
          },
          {
            "id": "properties/eorz85iz9jje8wlforkc",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760733636/properties/eorz85iz9jje8wlforkc.jpg",
            "alt": "Grandeur Luxe Apartment",
            "_id":  "68f2a9c59432fe4c72519c1c" 
          },
          {
            "id": "properties/hfomsc0c11krybwoadya",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760733635/properties/hfomsc0c11krybwoadya.jpg",
            "alt": "Grandeur Luxe Apartment",
            "_id":  "68f2a9c59432fe4c72519c1d" 
          },
          {
            "id": "properties/daxq7g7flynm8ydtje5g",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760733635/properties/daxq7g7flynm8ydtje5g.jpg",
            "alt": "Grandeur Luxe Apartment",
            "_id":  "68f2a9c59432fe4c72519c1e" 
          },
          {
            "id": "properties/gidaoniyogntozoxbp32",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760733635/properties/gidaoniyogntozoxbp32.jpg",
            "alt": "Grandeur Luxe Apartment",
            "_id":  "68f2a9c59432fe4c72519c1f" 
          },
          {
            "id": "properties/yh4q9pgvwvwvyk2oilpd",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760733635/properties/yh4q9pgvwvwvyk2oilpd.jpg",
            "alt": "Grandeur Luxe Apartment",
            "_id":  "68f2a9c59432fe4c72519c20" 
          },
          {
            "id": "properties/adtputqkldu3lvmvgdp8",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760733636/properties/adtputqkldu3lvmvgdp8.jpg",
            "alt": "Grandeur Luxe Apartment",
            "_id":  "68f2a9c59432fe4c72519c21" 
          },
          {
            "id": "properties/fgfhdl8pzx0tbebez09p",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760733636/properties/fgfhdl8pzx0tbebez09p.jpg",
            "alt": "Grandeur Luxe Apartment",
            "_id":  "68f2a9c59432fe4c72519c22" 
          },
          {
            "id": "properties/bamcu1lee0rcyy7pdvyz",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760733636/properties/bamcu1lee0rcyy7pdvyz.jpg",
            "alt": "Grandeur Luxe Apartment",
            "_id":  "68f2a9c59432fe4c72519c23" 
          },
          {
            "id": "properties/ivduuyzsaezgbykqlvgd",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760733635/properties/ivduuyzsaezgbykqlvgd.jpg",
            "alt": "Grandeur Luxe Apartment",
            "_id":  "68f2a9c59432fe4c72519c24" 
          },
          {
            "id": "properties/zjddgvvl1hkldx6ixapn",
            "url": "https://res.cloudinary.com/dwpkcq6gu/image/upload/v1760733635/properties/zjddgvvl1hkldx6ixapn.jpg",
            "alt": "Grandeur Luxe Apartment",
            "_id":  "68f2a9c59432fe4c72519c25" 
          }
        ],
        "specialFeatures": "",
        "rating": 4.5,
        "createdAt": { "$date": "2025-10-17T20:40:37.578Z" },
        "updatedAt": { "$date": "2025-10-21T08:10:47.763Z" },
        "__v": 0
      },
  
    ];
    const locations = [
      { label: "Dehradun", value: "dehradun", image: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?w=800&auto=format&fit=crop" },
      { label: "Mussoorie", value: "mussoorie", image: "https://images.unsplash.com/photo-1655916187603-0f7010146b79?w=800&auto=format&fit=crop" },
      { label: "Maldevta", value: "maldevta", image: "https://images.jdmagicbox.com/v2/comp/dehradun/b5/9999px135.x135.220315223349.l1b5/catalogue/waterfall-maldevta-dehradun-tourist-attraction-cZvFosnckf.jpg" }
    ];


  
    const collections  = [
  
      "Luxury Collection",
      "Pet Friendly",
      "Business Travel",
      "Senior Citizen Friendly",
      "Family Getaways",
      "Romantic Hideaways",
      "Couple Friendly",
      "Heritage Properties",
      "Nature Retreat",
      "Riverside Stay",
      "Weekend Getaway",
      "Luxury Villas",
      "Instagram Worthy"
    ];
  
    const propertyTypes = [
  
      "Villa",
      "Apartment",
      "Cottage",
      "Homestay",
      "Resort",
      "Hotel",
      "Boutique Property",
      "Guest House",
      "Farmhouse",
      "Bungalow",
      "Studio",
      "Hostel",
      "Chalet",
    ];
  

    const amenities = [
      { name: "High-Speed WiFi", icon: <FaWifi />, limited: false },
      { name: "Smart TV", icon: <FaTv />, limited: false },
      { name: "Gourmet Kitchen", icon: <FaUtensils />, limited: false },
      { name: "Garden", icon: <FaTree />, limited: false },
      { name: "Terrace", icon: <FaUmbrellaBeach />, limited: false },
      { name: "Balcony", icon: <FaBuilding />, limited: false },
      { name: "Laundry", icon: <FaTshirt />, limited: false },
      { name: "Private Pool", icon: <FaSwimmingPool />, limited: true },
      { name: "Secure Parking", icon: <FaParking />, limited: false },
      { name: "Fireplace", icon: <FaFire />, limited: true },
      { name: "BBQ Area", icon: <FaFire />, limited: true },
      { name: "Central AC", icon: <FaSnowflake />, limited: true },
      { name: "Gym", icon: <FaDumbbell />, limited: true }
    ];
    

const location = useLocation();

useEffect(() => {
  window.scrollTo(0, 0);
  setProperties(dummyData)
}, [location]);


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

        {property.tag && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "#756534",
              color: "white",
              padding: "4px 10px",
              borderRadius: "3px",
              fontSize: "11px",
              fontWeight: "700"
            }}
          >
            {property.tag}
          </div>
        )}
        {property.propertyType && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "85px",
              background: "#756534",
              color: "white",
              padding: "4px 10px",
              borderRadius: "3px",
              fontSize: "11px",
              fontWeight: "700"
            }}
          >
            {property.propertyType}
          </div>
        )}

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
            padding: "20px 10px 10px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap"
          }}
        >
          {[
            {
              icon: <i className="fa fa-bed"></i>,
              label: `${property.spaceDetails.bedrooms} Bedrooms`
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
                gap: "4px",
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
            fontSize: "17px",
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
            fontSize: "13px",
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
            {property.amenities?.slice(0, 8).map((amenity, i) => {
              const icon = amenities?.filter(ele=>ele.name ===amenity)?.[0]?.icon;
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
            <span style={{ fontSize: "12px" }}>/Night</span>

            <div style={{ fontSize: "10px", color: "#aaa" }}>
              (Excl. Taxes & Charges)
            </div>
          </div>

          <button
            style={{
              padding: "9px 18px",
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

const heroImages = [
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1760641674/h3_h2kh78.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1760641673/h5_xf8jt4.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1760641672/h2_cr4fxh.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1760641672/h1_pmbmk5.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1760641672/h4_ws4rfo.jpg"
  ]



  const propertyImages = [
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1759522308/12_mh4z5q.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1759522308/11_zrwllk.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1759522307/13_a0irxa.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1759522307/7_r3r8cg.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1759522307/5_mxggit.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1759522307/9_vbktls.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1759522306/2_ei2rod.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1759522306/6_ko4qhx.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1759522306/4_uvoinb.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1759522306/8_obemb6.jpg",
    "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1759522306/1_hd1fvy.jpg"
  ]

  const navigate = useNavigate();

  const locationsData = useMemo(() => locations, []);

    const [activeImage, setActiveImage] = useState(0)
    const [activeHeroImage, setActiveHeroImage] = useState(0)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    useEffect(() => {
    const heroInterval = setInterval(() => {
      setActiveHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 4000)

    const propertyInterval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % propertyImages.length)
    }, 5000)

    return () => {
      clearInterval(heroInterval)
      clearInterval(propertyInterval)
    }
  }, [heroImages.length, propertyImages.length])
  
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

  const handleListProperty = (e) => {
    e.preventDefault();
    
    const url = `https://wa.me/${WHATSAPP_CHAT_NUMBER}?text=${encodeURIComponent(WHATSAPP_LIST_MESSAGE)}`;
    
    window.open(url, "_blank", "noreferrer");
  };

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

   // Touch Handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
   
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) {
      setActiveImage((prev) => (prev + 1) % propertyImages.length)
    } else if (distance < -50) {
      setActiveImage((prev) => (prev - 1 + propertyImages.length) % propertyImages.length)
    }
    setTouchStart(null)
    setTouchEnd(null)
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
        'orgName': orgName,
        'plan': "",
        'message': query,
      }

      try {
        // const response = await axiosInstance.post(`${baseUrl}/contactus`, data,{
        //     headers: {"Content-Type":"application/json"}})
        // if (response.status ===  SUCCESS) {
          setEmail("");
          setPhone("");
          setName("");
          setOrgName("");
          setQuery("");
          toast.success("Thanks for reaching out us. Our Team will connect back to you shortly !!");
          navigate("/")
        // } 
      } catch (err) {
        // console.log("Error",err)
        // toast.error("Something went wrong !!");
      }
  
    } 
  }
  
  const zoomStyle = {
      transform: 'scale(0.9)',
      transformOrigin: 'top left',
      width: '111.11%', 
      height: '100%', 
      top: 0,
      left: 0,
    };
  return (
    <>
    <Header/>
     <div style={zoomStyle}>
      <div className="container-fluid  py-5 mb-5 hero-header" id='home'>
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
            <div className="col-lg-6 col-md-6 wow fadeInUp custom-ginie-div" data-wow-delay="0.065s">
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
          <div className="text-center wow fadeInUp" data-wow-delay="0.065s">
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
                <div className="bg-white text-center border p-4 m-2" style={{ borderRadius: 25 }}>
                  <div style={{ borderRadius: 25, overflow: 'hidden',paddingBottom :15 }}>
                    <img
                      src={loc.image}
                      alt={loc.label}
                      style={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <h5 className="mb-2">{loc.label}</h5>
                  <p className="text-primary mb-2">Premium Destination</p>
                  <p className="mb-0 small text-muted">
                    Experience the best of {loc.label} with Quercus Oak Stay's Premium properties.
                  </p>
                  
                </div>
                <div style={{paddingBottom :40}}></div>
              </SwiperSlide>
              ))}
            </Swiper>

        </div>
      </div>


      {/* Locations End */}

      {/* Properties Start */}
      
      <div className="container-xxl py-5 padding-top-custom padding-bottom-custom" id="properties">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.065s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Properties
            </h6>
            <h1 className="mb-5">Our Featured Properties</h1>
          </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile
                        ? "1fr"
                        : "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "20px",
                    }}
                     className="wow fadeInUp" data-wow-delay="0.065s">
                  
                    {properties?.length ? (
                      properties.map((p) => (
                        <PropertyCard key={p.id} property={p} />
                      ))
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
      </div>


      {/* Properties End */}

      {/* Gallery Start */}
      
      <div className="container-xxl py-5 destination padding-top-custom " id='gallery'>
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.065s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Gallery
            </h6>
          </div>


          <div className="gallery-container2">
            <div className="gallery-wrapper">

              {/* MAIN IMAGE */}
              <div className="gallery-main">

                <img
                  src={propertyImages[currentImageIndex]}
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
                        <img src={img} alt="" />
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
          <div className="text-center wow fadeInUp" data-wow-delay="0.065s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Amenities
            </h6>
            <h1 className="mb-5">Our Premium Amenties</h1>
          </div>

          <div className="row g-4">
            {amenities.map((item, index) => (
                <div 
                  className="col-lg-3 col-sm-6 wow fadeInUp" 
                  data-wow-delay={`${index * 0.1}s`} 
                  key={index}
                >
                  <div className="service-item rounded pt-3 h-100">
                    <div className="p-4 text-center">
                      {/* Icon Rendering */}
                      <div className="text-primary mb-4" style={{ fontSize: '3rem' }}>
                        {item.icon}
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
      
      <div className="container-xxl py-5 padding-top-custom padding-bottom-custom wow fadeInUp" data-wow-delay="0.065s" id="services">
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
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.065s">
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


    {/* Number and Statistics Start*/}

      {/* <div className="container-xxl py-5" id='numbers'>
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.065s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              The Number's Speak
            </h6>
            <h1 className="mb-5">Transform Your Hotel's Performance</h1>
          </div>
          <div className="row g-4">
            <div className=" col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.065s" >
              <div className="service-item1 rounded pt-3" >
                <div className="p-4">
                <i className="fa fa-3x fa-hourglass-half  fa-3x text-primary mb-4" />
                <IncrementTransitionWrapper >
                  <IncrementTansition n={TIME_SAVING_COUNT} symbol1={`~`}  symbol2={`%`}/>
                  </IncrementTransitionWrapper>
                  <h5>Time Savings</h5> 
                  <p>
                  Faster Check-In's, Checkout's and Operational Processes
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s" >
              <div className="service-item1 rounded pt-3">
                <div className="p-4">
                <i className="fa-solid fa-chart-simple  fa-3x text-primary mb-4" />
                <IncrementTransitionWrapper>
                  <IncrementTansition n={REVENUE_GROWTH_COUNT} symbol1={`~`}  symbol2={`%`}/>
                  </IncrementTransitionWrapper>
                  <h5>RevPAR Lift </h5>
                  <p>
                  Maximize RevPAR with AI-driven upselling and Personalized Guest Offers.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item1 rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-check-circle text-primary mb-4" />
                  <IncrementTransitionWrapper>
                  <IncrementTansition n={STAFF_EFFICIENCY_COUNT} symbol1={`~`}  symbol2={`%`}/>
                  </IncrementTransitionWrapper>
                  <h5>Enhancing Staff Efficiency</h5>
                  <p>
                    Minimizing Administrative Burden. Enhanced Staff Oversight
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item1 rounded pt-3">
                <div className="p-4">
                  <i className="fa-regular fa-face-smile fa-3x text-primary mb-4" />
                  <IncrementTransitionWrapper>
                  <IncrementTansition n={GUEST_SATISFACTION_COUNT} symbol1={`~`}  symbol2={`%`}/>
                  </IncrementTransitionWrapper>
                  <h5>Loyalty Growth</h5>
                  <p>
                  Elevating Guest Satisfaction. Delivering  Exceptional Experiences
                  </p>
                </div>
              </div>
            </div>
        
            <div style={{display:'flex',alignItems:'center',justifyContent:'center', flexWrap:"wrap"}}>

            <div className="col-lg-3 col-sm-6 wow fadeInUp " data-wow-delay="0.065s">
              <div className="service-item1 rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-link text-primary mb-4" />
                  <IncrementTransitionWrapper>
                  <IncrementTansition n={OPERATION_VISIBILITY_COUNT} symbol1={`~`}  symbol2={`%`}/>
                  </IncrementTransitionWrapper>
                  <h5>NPS Score Boost</h5>
                  <p>
                  Boost guest loyalty and satisfaction with seamless digital touchpoints and instant feedback loops.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s" >
              <div className="service-item1 rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-solid fa-comments text-primary mb-4" />
                  <IncrementTransitionWrapper>
                  <IncrementTansition n={GUEST_FEEDBACK_COUNT} symbol1={`~`}  symbol2={`%`}/>
                  </IncrementTransitionWrapper>
                  <h5>Enhanced Guest Feedbacks</h5>
                  <p>
                  Unlocking Customer Feedbacks & Insights for Better Growth 
                  </p>
                </div>
              </div>
            </div>
            
            </div>
            
            <h1 className="mb-5" style={{textAlign:'center'}}>

            <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <IncrementTransitionWrapper>
                  <IncrementTansition n={TRUSTEDBY_COUNT} symbol1={`Trusted By  `} symbol2={` + Hotels all over India !`} large={true}/>
              </IncrementTransitionWrapper> 
            </div>
              
              
              </h1>
          </div>
        </div>
      </div>  */}

    { /* Number and Statistics End*/}
    
    {/* Testimonial Starts */}

      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.065s">
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

      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.065s" id="demo">
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
                    onClick={(e) => handleListProperty(e)}
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

      <div className="container-xxl py-5 wow fadeInUp" id="faq" data-wow-delay="0.065s" >
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

      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.065s" id='contactus'>
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
                            className="form-control bg-transparent" 
                            value={email} 
                            placeholder="Where can we Contact you?" 
                            required 
                            onChange={(e)=>setEmail(e.target.value)}
                          />
                          <label className="text-white"  htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                        <input 
                            type="text" 
                            className="form-control bg-transparent" 
                            id ="phone" 
                            value={phone} 
                            placeholder="Your Contact Number" 
                            onChange={(e)=>setPhone(e.target.value)}
                          />
                          <label className="text-white" htmlFor="email">Your Phone Number</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                        <input 
                            type="text" 
                            className="form-control bg-transparent" 
                            id ="orgName" 
                            value={orgName} 
                            placeholder="Your Property Nme" 
                            onChange={(e)=>setOrgName(e.target.value)}
                          />
                          <label className="text-white" htmlFor="email">Your Property Name</label>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control bg-transparent"
                            placeholder="We would love to hear and answer all your Questions"
                            id="message"
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
