import React, { useState,useEffect,useMemo,useRef } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Marquee from '../components/Marquee.jsx';
import FAQS from '../components/FAQ.jsx';
import IncrementTansition from '../components/IncrementTansition.jsx';
import IncrementTransitionWrapper from '../components/IncrementTransitionWrapper.jsx';
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


const propertiesDummyData=[{
  "_id": "69f9e2593bfd4d8a43567205",
  "title": "Plutus Luxury Boutique Stay",
  "tag": "Popular",
  "locality": "Crown Brewery Estate, Barlow Ganj",
  "description": "Plutus Luxury Boutique Stays is a sprawling 6-bedroom mountain manor that redefines group travel in Mussoorie with its seamless blend of grandeur and intimacy. Spanning over 5,300 square feet, this recently renovated villa features elegant interiors, a majestic lobby, and floor-to-ceiling windows that flood every room with natural light and panoramic views of the Himalayan peaks. Whether you are hosting a family reunion in the private garden, enjoying a customized meal from the in-house chef, or gathering for a sunset BBQ on the terrace, the property offers an unparalleled \"home-away-from-home\" experience. With pet-friendly policies and a dedicated caretaker service, Plutus Stays provides a sophisticated sanctuary for those seeking a modern, luxury lifestyle amidst the serene beauty of Barlowganj.",
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
    "Secure Parking",
    "Balcony",
    "Laundry",
    "BBQ Area",
    "Patio"
  ],
  "badges": [
    "Luxury Collection",
    "Family Friendly",
    "Romantic Getaway",
    "Instagram Worthy",
    "Pet Friendly"
  ],
  "featured": true,
  "images": [
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/dofs7p6ywxywkirptats",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041439/property/69f9e2593bfd4d8a43567205/dofs7p6ywxywkirptats.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/mz4utrfhclw9y73dwluy",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041419/property/69f9e2593bfd4d8a43567205/mz4utrfhclw9y73dwluy.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/w9dubxuhpd9xwimxdhw8",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041420/property/69f9e2593bfd4d8a43567205/w9dubxuhpd9xwimxdhw8.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/vdlfnjgxhglanoeulj1i",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041422/property/69f9e2593bfd4d8a43567205/vdlfnjgxhglanoeulj1i.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/zao3g925naugudtjbml1",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041424/property/69f9e2593bfd4d8a43567205/zao3g925naugudtjbml1.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/z4rbn9k5ct82gfzipeu1",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041426/property/69f9e2593bfd4d8a43567205/z4rbn9k5ct82gfzipeu1.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/zxsvymh0wpw8ohmundx5",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041428/property/69f9e2593bfd4d8a43567205/zxsvymh0wpw8ohmundx5.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/n6kgghllizjxkye0sxb0",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041429/property/69f9e2593bfd4d8a43567205/n6kgghllizjxkye0sxb0.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/pwrewytuhrem7esfbemx",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041434/property/69f9e2593bfd4d8a43567205/pwrewytuhrem7esfbemx.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/i2kwmwpuhow6us5iwasp",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041437/property/69f9e2593bfd4d8a43567205/i2kwmwpuhow6us5iwasp.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/cqajpuampiixpad14vqr",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041440/property/69f9e2593bfd4d8a43567205/cqajpuampiixpad14vqr.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/knb5h4bhepo7e5nmofwk",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041442/property/69f9e2593bfd4d8a43567205/knb5h4bhepo7e5nmofwk.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/ioolgqzyqcdbbgh5naqa",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041444/property/69f9e2593bfd4d8a43567205/ioolgqzyqcdbbgh5naqa.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/zhmikuzxrf02ejyazp3o",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041445/property/69f9e2593bfd4d8a43567205/zhmikuzxrf02ejyazp3o.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/zsyjfqk9dyjzpajj62r2",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041447/property/69f9e2593bfd4d8a43567205/zsyjfqk9dyjzpajj62r2.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/r2muwpnd6xxdpqfibnvi",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041448/property/69f9e2593bfd4d8a43567205/r2muwpnd6xxdpqfibnvi.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/h2hblswbhnq1ltyddnik",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041449/property/69f9e2593bfd4d8a43567205/h2hblswbhnq1ltyddnik.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/a2hi2le3sfyqsizxt3go",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041451/property/69f9e2593bfd4d8a43567205/a2hi2le3sfyqsizxt3go.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/g1k9atztxxdo3ktuoewd",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041453/property/69f9e2593bfd4d8a43567205/g1k9atztxxdo3ktuoewd.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567205/ikgzmnxn6mesmdjlevyy",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041455/property/69f9e2593bfd4d8a43567205/ikgzmnxn6mesmdjlevyy.jpg",
      "alt": "Plutus Luxury Boutique Stay"
    }
  ],
  "specialFeatures": "",
  "mapLocation": "https://maps.app.goo.gl/4McV6GR5PLceXauV8",
  "rating": 4.9,
  "updatedAt": {
    "$date": "2026-05-06T04:24:14.814Z"
  },
  "isTaxable": true,
  "show": true
},
{
  "_id": "69f9e2593bfd4d8a43567206",
  "title": "Mackenzie Luxury Boutique Stays",
  "tag": "Top Rated",
  "locality": "Hathipaon Road, Sher Garhi",
  "description": "Mackenzie House And Cafe is a Luxury Resort in Mussoorie, Uttarakhand, India. It is a popular choice for travelers seeking a unique experience and offers a variety of room types, including those with balcony views. The hotel is known for its smooth check-in/check-out process, flexible policies, and friendly management, contributing to high customer satisfaction.",
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
  "featured": true,
  "images": [
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/w923rjy2cachr64theae",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043267/property/69f9e2593bfd4d8a43567206/w923rjy2cachr64theae.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/awynllaimfefso93sylc",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043240/property/69f9e2593bfd4d8a43567206/awynllaimfefso93sylc.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/dfwxwq6y3uqlw4mebuve",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043242/property/69f9e2593bfd4d8a43567206/dfwxwq6y3uqlw4mebuve.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/mq1gja4c0qm9y6dqau7p",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043244/property/69f9e2593bfd4d8a43567206/mq1gja4c0qm9y6dqau7p.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/pc5nx1to8unasfiji3xx",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043246/property/69f9e2593bfd4d8a43567206/pc5nx1to8unasfiji3xx.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/aoa62wwrgvbqtjnmvs8e",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043247/property/69f9e2593bfd4d8a43567206/aoa62wwrgvbqtjnmvs8e.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/q57r1rxhumlmcls7qxeo",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043249/property/69f9e2593bfd4d8a43567206/q57r1rxhumlmcls7qxeo.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/auzb1ipsnk5vp83wsj7z",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043250/property/69f9e2593bfd4d8a43567206/auzb1ipsnk5vp83wsj7z.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/ci2h4883q6qjxfflx7wq",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043252/property/69f9e2593bfd4d8a43567206/ci2h4883q6qjxfflx7wq.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/gekbfgl9nwpxtpbbzvlt",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043254/property/69f9e2593bfd4d8a43567206/gekbfgl9nwpxtpbbzvlt.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/trqcinei6j0bkkpleyk2",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043256/property/69f9e2593bfd4d8a43567206/trqcinei6j0bkkpleyk2.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/zujd2drb4zlqlqqkuvss",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043258/property/69f9e2593bfd4d8a43567206/zujd2drb4zlqlqqkuvss.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/wc0loiufdrqcd4plitcu",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043260/property/69f9e2593bfd4d8a43567206/wc0loiufdrqcd4plitcu.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/sjpyz1t0gqgak91mixla",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043261/property/69f9e2593bfd4d8a43567206/sjpyz1t0gqgak91mixla.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/gljtegri7zedyjujsc1m",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043263/property/69f9e2593bfd4d8a43567206/gljtegri7zedyjujsc1m.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/bofx8zzvnnmgttymd9ee",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043269/property/69f9e2593bfd4d8a43567206/bofx8zzvnnmgttymd9ee.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/fnkcbbxfcz74bz3m7kxu",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043270/property/69f9e2593bfd4d8a43567206/fnkcbbxfcz74bz3m7kxu.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/la0jdiokyqoewqvep9l8",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043272/property/69f9e2593bfd4d8a43567206/la0jdiokyqoewqvep9l8.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567206/xuapjykj7eqkzzniuibz",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778043274/property/69f9e2593bfd4d8a43567206/xuapjykj7eqkzzniuibz.jpg",
      "alt": "Mackenzie Luxury Boutique Stays"
    }
  ],
  "specialFeatures": "",
  "mapLocation": "https://maps.app.goo.gl/TVQG3THikmdjvxNj9",
  "rating": 4.8,
  "rooms": [
    {
      "roomType": "Premium Room with Mountain View",
      "roomPrice": "2500",
      "roomImages": [
        {
          "public_id": "room/mxsp06xlwizjrdxjk0lq",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068342/room/mxsp06xlwizjrdxjk0lq.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/iqbwqlhyt9xnhlqwpkbb",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068342/room/iqbwqlhyt9xnhlqwpkbb.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/qrn36jz9uanihr78cjk6",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068343/room/qrn36jz9uanihr78cjk6.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/ntyl5bg5sssgzuvzq7kj",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068344/room/ntyl5bg5sssgzuvzq7kj.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/tqrdumkhe51dvf909vq6",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068342/room/tqrdumkhe51dvf909vq6.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/qiusw2jqnqywgkgif48z",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068342/room/qiusw2jqnqywgkgif48z.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        }
      ],
      "roomAmenities": [
        "Mini Bar"
      ],
      "guestAllowed": 2,
      "extraBedding": true,
      "extraBeddingPrice": 1000
    },
    {
      "roomType": "Luxury Room With Balcony",
      "roomPrice": "3500",
      "roomImages": [
        {
          "public_id": "room/vix1ouz5b2utaij465la",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068343/room/vix1ouz5b2utaij465la.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/l9szcc2f9um4w9rihyh6",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068342/room/l9szcc2f9um4w9rihyh6.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/jd2bhee5wravkalmfayw",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068343/room/jd2bhee5wravkalmfayw.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/lm2joqwhfklw7xag358z",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068342/room/lm2joqwhfklw7xag358z.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/f1avf6fjds9ezlcbjsog",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068343/room/f1avf6fjds9ezlcbjsog.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/vfz0e7whre06ssbjkoit",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068342/room/vfz0e7whre06ssbjkoit.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        }
      ],
      "roomAmenities": [
        "Mini Bar"
      ],
      "guestAllowed": 3,
      "extraBedding": true,
      "extraBeddingPrice": 1000
    },
    {
      "roomType": "Executive Room With Balcony",
      "roomPrice": "4500",
      "roomImages": [
        {
          "public_id": "room/idsypaagejjwzxv8dp38",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068342/room/idsypaagejjwzxv8dp38.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/whvhcwwaxrwlyrfl55hq",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068343/room/whvhcwwaxrwlyrfl55hq.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/g2nxmfo8xjm55xuvgb0g",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068342/room/g2nxmfo8xjm55xuvgb0g.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/pkivcpelpt38i3xh6yw5",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068343/room/pkivcpelpt38i3xh6yw5.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/vjozwce8jbscuzqryyh1",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068343/room/vjozwce8jbscuzqryyh1.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        },
        {
          "public_id": "room/x3vywdwtetw8g5sqlos5",
          "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778068342/room/x3vywdwtetw8g5sqlos5.jpg",
          "alt": "Mackenzie Luxury Boutique Stays"
        }
      ],
      "roomAmenities": [],
      "guestAllowed": 2,
      "extraBedding": true,
      "extraBeddingPrice": 1000
    }
  ],
  "isTaxable": true,
  "updatedAt": {
    "$date": "2026-05-06T04:54:33.707Z"
  },
  "show": true
},
{
  "_id": "69f9e2593bfd4d8a43567207",
  "title": "Puntush Riverside Villa",
  "tag": "Nature Lover",
  "locality": "Theva Maldevta Road, Raipur",
  "description": "Tucked away in the picturesque Maldevta Valley, Puntush Riverside Villa by The StayCationer is a luxurious 6-bedroom retreat designed for grand group getaways and serene nature escapes. This expansive 3,200-square-foot villa offers a rare blend of modern sophistication and raw natural beauty, featuring a sparkling private pool, a sun-drenched rooftop terrace, and lush gardens overlooking the river. Whether you are hosting a family reunion in the spacious living areas, enjoying a sunset BBQ, or gathering around the outdoor fireplace under a starlit sky, the property provides an intimate sanctuary away from the city's hustle. With its pet-friendly policy, fully-equipped kitchen, and stunning mountain vistas, Puntush Riverside Villa stands as Dehradun's premier destination for those seeking an 'Instagram-worthy' riverside lifestyle.",
  "propertyType": "Villa",
  "location": "maldevta",
  "address": "Theva Maldevta Road, Raipur, Dehradun, Uttarakhand 248008",
  "price": 16000,
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
    "Secure Parking",
    "Laundry",
    "Garden",
    "Balcony",
    "Smart TV",
    "Gourmet Kitchen",
    "Terrace",
    "Central AC"
  ],
  "badges": [
    "Riverside Stay",
    "Pet Friendly",
    "Nature Retreat",
    "Family Getaways",
    "Weekend Getaway",
    "Luxury Villas",
    "Instagram Worthy"
  ],
  "featured": true,
  "images": [
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/stgkq36lbwlxezy1eg9y",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008688/property/69f9e2593bfd4d8a43567207/stgkq36lbwlxezy1eg9y.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/lltn4xtdefrsbupwthal",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008690/property/69f9e2593bfd4d8a43567207/lltn4xtdefrsbupwthal.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/bt1jj69vsjdngyuwesba",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008692/property/69f9e2593bfd4d8a43567207/bt1jj69vsjdngyuwesba.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/cu5qkq4vs16ty0l46wtw",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008694/property/69f9e2593bfd4d8a43567207/cu5qkq4vs16ty0l46wtw.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/qwczueuyv22ydsopttff",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008697/property/69f9e2593bfd4d8a43567207/qwczueuyv22ydsopttff.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/moaupcadubpcwjs6g6w0",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008699/property/69f9e2593bfd4d8a43567207/moaupcadubpcwjs6g6w0.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/h4u2rqnyfj7oonmmqttc",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008702/property/69f9e2593bfd4d8a43567207/h4u2rqnyfj7oonmmqttc.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/qsxq95ltby0fpnpt2pdr",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008704/property/69f9e2593bfd4d8a43567207/qsxq95ltby0fpnpt2pdr.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/hfr8dxpvf6jofeamzi4t",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008707/property/69f9e2593bfd4d8a43567207/hfr8dxpvf6jofeamzi4t.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/cgnlwo8rpxgoaq86jfvj",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008710/property/69f9e2593bfd4d8a43567207/cgnlwo8rpxgoaq86jfvj.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/vw3xmlhnnhf3edlgdkat",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008712/property/69f9e2593bfd4d8a43567207/vw3xmlhnnhf3edlgdkat.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/cva3pi9vk5ehngiraseg",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008715/property/69f9e2593bfd4d8a43567207/cva3pi9vk5ehngiraseg.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/ktlak8yrqufcfn9yvj3e",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008718/property/69f9e2593bfd4d8a43567207/ktlak8yrqufcfn9yvj3e.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/w1dt4hogh8wsau9xzyir",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008721/property/69f9e2593bfd4d8a43567207/w1dt4hogh8wsau9xzyir.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/kdglpoxgmwio1sdyzqg8",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008723/property/69f9e2593bfd4d8a43567207/kdglpoxgmwio1sdyzqg8.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/o56tdm6pvpv7dnwalk56",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008725/property/69f9e2593bfd4d8a43567207/o56tdm6pvpv7dnwalk56.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/xkgfjtn5wlandjnvuyxe",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008728/property/69f9e2593bfd4d8a43567207/xkgfjtn5wlandjnvuyxe.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/wbcs0jqdy7bjoutxt1qo",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008730/property/69f9e2593bfd4d8a43567207/wbcs0jqdy7bjoutxt1qo.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/nzid2dymdq29woc2del0",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008732/property/69f9e2593bfd4d8a43567207/nzid2dymdq29woc2del0.jpg",
      "alt": "Puntush Riverside Villa"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567207/vnwmssuqzhzob1q1rokp",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778008735/property/69f9e2593bfd4d8a43567207/vnwmssuqzhzob1q1rokp.jpg",
      "alt": "Puntush Riverside Villa"
    }
  ],
  "specialFeatures": "",
  "mapLocation": "https://maps.app.goo.gl/mQnVRAPr5S3ShZHf6",
  "rating": 4.8,
  "isTaxable": true,
  "rooms": [],
  "updatedAt": {
    "$date": "2026-05-05T19:18:55.090Z"
  },
  "show": true
},
{
  "_id": "69f9e2593bfd4d8a43567208",
  "title": "Aspen Heights Luxury Stays",
  "tag": "Forest-Luxe",
  "locality": "Crown Brewery Estate, Barloganj",
  "description": "Tucked away from the \"maddening crowds,\" Aspen Heights Luxury Stays is a sanctuary of peace nestled within a dense oak forest at the foothills of the Himalayas. Located on a tranquil road leading to Mussoorie, this homestay offers a masterclass in understated luxury, where stunning panoramas of the Dehradun valley and the rolling hills beyond greet you at every turn. Truly a \"home away from home,\" Aspen Heights is defined by its remarkable architecture, which was thoughtfully built around existing trees to preserve the lush greenery. Whether you are seeking a strategic base away from the bustle of Mussoorie or a blissful retreat immersed in plunging valleys and forest trails, this unique mountain dwelling offers an unparalleled connection to nature without compromising on modern sophistication.",
  "propertyType": "Boutique Property",
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
    "Romantic Getaway",
    "Award Winner",
    "Nature Retreat",
    "Romantic Hideaways",
    "Weekend Getaway",
    "Instagram Worthy"
  ],
  "featured": false,
  "images": [
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/qkpkvvhxl1xqylfvvfyr",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066192/property/69f9e2593bfd4d8a43567208/qkpkvvhxl1xqylfvvfyr.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/zjuh1yya3vffpkvairos",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066163/property/69f9e2593bfd4d8a43567208/zjuh1yya3vffpkvairos.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/p6sjjy8ojopoqowxj3p8",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066164/property/69f9e2593bfd4d8a43567208/p6sjjy8ojopoqowxj3p8.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/npmuyvck8q9nm8btfvmi",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066167/property/69f9e2593bfd4d8a43567208/npmuyvck8q9nm8btfvmi.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/x2sdcqvzrz9o2to2rquk",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066169/property/69f9e2593bfd4d8a43567208/x2sdcqvzrz9o2to2rquk.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/rkbz7btfo4zr4n8q1kpi",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066172/property/69f9e2593bfd4d8a43567208/rkbz7btfo4zr4n8q1kpi.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/zdrud0gcgm0nxijplqxb",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066174/property/69f9e2593bfd4d8a43567208/zdrud0gcgm0nxijplqxb.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/mz52qytx78zlm3jtt3pi",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066176/property/69f9e2593bfd4d8a43567208/mz52qytx78zlm3jtt3pi.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/gvulfwxgtg5542xppnim",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066178/property/69f9e2593bfd4d8a43567208/gvulfwxgtg5542xppnim.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/idy2rwwpvwxhlt1lgpyb",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066181/property/69f9e2593bfd4d8a43567208/idy2rwwpvwxhlt1lgpyb.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/fcpoph2pnbfz3v7nouuh",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066183/property/69f9e2593bfd4d8a43567208/fcpoph2pnbfz3v7nouuh.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/vfatd1eyz266nz947hdv",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066185/property/69f9e2593bfd4d8a43567208/vfatd1eyz266nz947hdv.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/idqsfyaurcseevqxd7g0",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066189/property/69f9e2593bfd4d8a43567208/idqsfyaurcseevqxd7g0.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/x9b5kpebngmuvzts1nub",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066194/property/69f9e2593bfd4d8a43567208/x9b5kpebngmuvzts1nub.jpg",
      "alt": "Aspen Heights Luxury Stays"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567208/uky1rhhj71xcabml62ro",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778066196/property/69f9e2593bfd4d8a43567208/uky1rhhj71xcabml62ro.jpg",
      "alt": "Aspen Heights Luxury Stays"
    }
  ],
  "specialFeatures": "",
  "mapLocation": "https://maps.app.goo.gl/gKRGuHxXhpoF1HG9A",
  "rating": 4.9,
  "isTaxable": true,
  "updatedAt": {
    "$date": "2026-05-06T11:16:36.307Z"
  },
  "show": true
},
{
  "_id": "69f9e2593bfd4d8a43567209",
  "title": "Grandeur Luxe Apartment",
  "tag": "Modern Luxe",
  "locality": "Mall Road",
  "description": "Located in the vibrant heart of Mall Road, Grandeur Luxe Apartment by Quercus Oak Stays is the pinnacle of urban mountain luxury. This expansive 8-bedroom residence spans 3,200 square feet, offering a rare combination of high-capacity living and sophisticated \"modern luxe\" design. Every room is a masterclass in contemporary comfort, featuring sleek interiors, smart technology, and private balconies that overlook the bustling charm of Mussoorie and the majestic hills beyond. Perfect for large family reunions or corporate retreats of up to 20 guests, the apartment provides seamless access to the city’s best cafes and viewpoints while maintaining an atmosphere of exclusive privacy. From the sun-soaked terrace to the centrally air-conditioned suites, Grandeur Luxe ensures an effortless and high-end stay in the 'Queen of Hill'.",
  "propertyType": "Apartment",
  "location": "mussoorie",
  "address": "Mall Road (Central Area), Mussoorie, Uttarakhand 248122",
  "price": 12000,
  "spaceDetails": {
    "bedrooms": 3,
    "bathrooms": 3,
    "guests": 10,
    "size": "2400",
    "livingArea": true,
    "diningArea": true,
    "kitchen": "self",
    "driverAccommodation": false
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
    "Luxury Collection",
    "Romantic Getaway",
    "Family Friendly",
    "Business Travel",
    "Couple Friendly"
  ],
  "featured": false,
  "images": [
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/itw0hxlquw44oetknf1h",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007510/property/69f9e2593bfd4d8a43567209/itw0hxlquw44oetknf1h.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/qslzkdrecg64zbxbmzpv",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007501/property/69f9e2593bfd4d8a43567209/qslzkdrecg64zbxbmzpv.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/yd3t88jkqyqemyggckc2",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007502/property/69f9e2593bfd4d8a43567209/yd3t88jkqyqemyggckc2.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/zzu6bcssy3b0lha1hcaw",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007504/property/69f9e2593bfd4d8a43567209/zzu6bcssy3b0lha1hcaw.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/hobhsqeoe1wl9icxmlqn",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007505/property/69f9e2593bfd4d8a43567209/hobhsqeoe1wl9icxmlqn.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/da7bzfxktp1wiso1odne",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007507/property/69f9e2593bfd4d8a43567209/da7bzfxktp1wiso1odne.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/skswsia4cpfzssa4ianu",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007508/property/69f9e2593bfd4d8a43567209/skswsia4cpfzssa4ianu.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/t819c9x2rbmsg3udglzj",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007499/property/69f9e2593bfd4d8a43567209/t819c9x2rbmsg3udglzj.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/nbiedr5ptkmq7nultexz",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007512/property/69f9e2593bfd4d8a43567209/nbiedr5ptkmq7nultexz.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/hmorckorykhu3qjyuxlj",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007513/property/69f9e2593bfd4d8a43567209/hmorckorykhu3qjyuxlj.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/hfubjctybbcvlmzp2f5g",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007514/property/69f9e2593bfd4d8a43567209/hfubjctybbcvlmzp2f5g.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/p1cyxn0vejfin21r7yns",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007516/property/69f9e2593bfd4d8a43567209/p1cyxn0vejfin21r7yns.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/sbv7vw0q96kzkbes1qr2",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007517/property/69f9e2593bfd4d8a43567209/sbv7vw0q96kzkbes1qr2.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/wi6mdlixvhuccmopf6hg",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007518/property/69f9e2593bfd4d8a43567209/wi6mdlixvhuccmopf6hg.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/eltdhg3s6enuo8unyh7p",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007520/property/69f9e2593bfd4d8a43567209/eltdhg3s6enuo8unyh7p.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/mz9lcunnzawfz6ieo3kk",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007521/property/69f9e2593bfd4d8a43567209/mz9lcunnzawfz6ieo3kk.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/av30wrsb3okr9j0ggvh2",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007523/property/69f9e2593bfd4d8a43567209/av30wrsb3okr9j0ggvh2.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/uq4l2ubmobx7soxfci49",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007524/property/69f9e2593bfd4d8a43567209/uq4l2ubmobx7soxfci49.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/h3btl5wrjz8wabc3zsiu",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007524/property/69f9e2593bfd4d8a43567209/h3btl5wrjz8wabc3zsiu.jpg",
      "alt": "Grandeur Luxe Apartment"
    },
    {
      "public_id": "property/69f9e2593bfd4d8a43567209/eimpstafw1wtflfpmfuw",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007525/property/69f9e2593bfd4d8a43567209/eimpstafw1wtflfpmfuw.jpg",
      "alt": "Grandeur Luxe Apartment"
    }
  ],
  "specialFeatures": "",
  "mapLocation": "https://maps.app.goo.gl/35zWwshCTDdV9b4g9",
  "rating": 4.5,
  "isTaxable": true,
  "updatedAt": {
    "$date": "2026-05-05T18:58:45.449Z"
  },
  "show": true
},
{
  "_id": "69fa0d8a3bfd4d8a4356720a",
  "title": "Nebulla Cottage",
  "tag": "Vantage",
  "locality": "Jharipani Road",
  "description": "Perched in the tranquil heights of Jharipani, Nebula Cottage by Quercus Oak Stays is a boutique mountain sanctuary that masterfully blends rustic charm with modern elegance. This private villa offers a soul-stirring escape where guests can wake up to panoramic vistas of the rolling Mussoorie hills and the sparkling Doon Valley from their own sun-drenched terrace. Designed for families, nature lovers, and pet owners alike, the property features a lush garden and expansive glass windows that invite the outdoors in, creating a perfect backdrop for an Instagram-worthy getaway. Whether you are whipping up a meal in the gourmet kitchen, staying connected with high-speed WiFi, or gathering around a crackling bonfire and BBQ under the stars, Nebula Cottage provides an intimate and luxurious home base for experiencing the misty magic of the Himalayas.",
  "propertyType": "Cottage",
  "location": "mussoorie",
  "address": "1, Jharipani Rd Nebula Cottage by Quercus Oak Stays, 248122 Mussoorie, India",
  "price": 19600,
  "spaceDetails": {
    "bedrooms": 8,
    "bathrooms": 8,
    "guests": 18,
    "size": "6000",
    "livingArea": true,
    "diningArea": true,
    "kitchen": "staff",
    "driverAccommodation": true
  },
  "amenities": [
    "Smart TV",
    "High-Speed WiFi",
    "Garden",
    "Balcony",
    "Secure Parking",
    "Terrace",
    "Gourmet Kitchen",
    "BBQ Area",
    "Fireplace"
  ],
  "badges": [
    "Pet Friendly",
    "Nature Retreat",
    "Family Getaways",
    "Luxury Collection",
    "Weekend Getaway",
    "Instagram Worthy"
  ],
  "featured": true,
  "images": [
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/wju8qlosalydswt44dyd",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007114/property/69fa0d8a3bfd4d8a4356720a/wju8qlosalydswt44dyd.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/iwblrzrvxdr5vs08pf4w",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007102/property/69fa0d8a3bfd4d8a4356720a/iwblrzrvxdr5vs08pf4w.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/hmzdj6z8cwbye9qsz7j9",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007106/property/69fa0d8a3bfd4d8a4356720a/hmzdj6z8cwbye9qsz7j9.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/ox0ymuehlldpcv2lx3o4",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007111/property/69fa0d8a3bfd4d8a4356720a/ox0ymuehlldpcv2lx3o4.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/w6kw9svxewjxh3fszrud",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007118/property/69fa0d8a3bfd4d8a4356720a/w6kw9svxewjxh3fszrud.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/tzohfuy60fszu8eckzwf",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007123/property/69fa0d8a3bfd4d8a4356720a/tzohfuy60fszu8eckzwf.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/slhm233vqm4swova5dbp",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007126/property/69fa0d8a3bfd4d8a4356720a/slhm233vqm4swova5dbp.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/ju0rkmkaemq9lh7cw6xh",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007129/property/69fa0d8a3bfd4d8a4356720a/ju0rkmkaemq9lh7cw6xh.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/luutaijttcumdq0olekc",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007132/property/69fa0d8a3bfd4d8a4356720a/luutaijttcumdq0olekc.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/odgp6ct2lc1lf0bgzzad",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007136/property/69fa0d8a3bfd4d8a4356720a/odgp6ct2lc1lf0bgzzad.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/dzcsq9xwd96i9np9ttkb",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007143/property/69fa0d8a3bfd4d8a4356720a/dzcsq9xwd96i9np9ttkb.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/e37mmss2gxhi5dlgigjl",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007147/property/69fa0d8a3bfd4d8a4356720a/e37mmss2gxhi5dlgigjl.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/b9y9iu9wqbvaq3ox7lkd",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007151/property/69fa0d8a3bfd4d8a4356720a/b9y9iu9wqbvaq3ox7lkd.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/n4zq1jo0ehjsmbzyzazz",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007156/property/69fa0d8a3bfd4d8a4356720a/n4zq1jo0ehjsmbzyzazz.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/fjckjflbqe9ys7tv6ckt",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007159/property/69fa0d8a3bfd4d8a4356720a/fjckjflbqe9ys7tv6ckt.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/gkpei47s3kxyzopllld6",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007163/property/69fa0d8a3bfd4d8a4356720a/gkpei47s3kxyzopllld6.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/h62ent05mo5lwsp0ymqe",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007167/property/69fa0d8a3bfd4d8a4356720a/h62ent05mo5lwsp0ymqe.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/hk5oiws02xjwahewqqf5",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007169/property/69fa0d8a3bfd4d8a4356720a/hk5oiws02xjwahewqqf5.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/ksxsjfdfwkmr8grcllp9",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007174/property/69fa0d8a3bfd4d8a4356720a/ksxsjfdfwkmr8grcllp9.jpg",
      "alt": "Nebulla Cottage"
    },
    {
      "public_id": "property/69fa0d8a3bfd4d8a4356720a/y1sgpazpkli8ka2l3yno",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778007177/property/69fa0d8a3bfd4d8a4356720a/y1sgpazpkli8ka2l3yno.jpg",
      "alt": "Nebulla Cottage"
    }
  ],
  "specialFeatures": "",
  "mapLocation": "https://maps.app.goo.gl/zT9pwqFGYrGs5Bj48",
  "rating": 4.6,
  "isTaxable": true,
  "rooms": [],
  "updatedAt": {
    "$date": "2026-05-05T18:52:56.903Z"
  },
  "show": true
},
{
  "_id": "69fabddbc05a9703f36c4d37",
  "title": "Westeria Courtyard",
  "tag": "Ethereal",
  "locality": "Company Bagh Road",
  "description": "Wisteria Courtyard by Quercus Oak Stays is an enchanting mountain sanctuary nestled within the historic Albert Estate of Mussoorie. Named after the cascading lavender blooms that drape its stone walls, this boutique escape offers a rare blend of colonial elegance and contemporary luxury curated by the Quercus Oak team. Each suite—from the expansive Crest to the sun-soaked Vantage—features floor-to-ceiling windows and private balconies that frame the majestic Garhwal Himalayas. Whether you are enjoying an al fresco breakfast on the iconic Wisteria Deck or wandering through the lush private gardens, this property provides a soulful experience defined by the signature hospitality of Quercus Oak Stays.",
  "propertyType": "Chalet",
  "location": "mussoorie",
  "address": "Wisteria Courtyard, Albert Estate, Near Company Bagh, Mussoorie, Uttarakhand 248179",
  "price": 11000,
  "spaceDetails": {
    "bedrooms": 8,
    "bathrooms": 8,
    "guests": 18,
    "size": "8998",
    "livingArea": true,
    "diningArea": true,
    "kitchen": "staff",
    "driverAccommodation": true
  },
  "amenities": [
    "Smart TV",
    "High-Speed WiFi",
    "Garden",
    "Balcony",
    "Secure Parking",
    "Terrace",
    "Gourmet Kitchen",
    "BBQ Area",
    "Fireplace"
  ],
  "badges": [
    "Luxury Collection",
    "Romantic Hideaways",
    "Nature Retreat",
    "Heritage Properties",
    "Family Getaways",
    "Instagram Worthy"
  ],
  "featured": false,
  "images": [
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/rek1wyv6gc1rgsyz9dqi",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042448/property/69fabddbc05a9703f36c4d37/rek1wyv6gc1rgsyz9dqi.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/uzjzfqdigee0ari9ysz7",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042449/property/69fabddbc05a9703f36c4d37/uzjzfqdigee0ari9ysz7.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/zsfmuk7uftofa0hmw9ns",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042450/property/69fabddbc05a9703f36c4d37/zsfmuk7uftofa0hmw9ns.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/pudlkt9zobnmlyskcdcm",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042451/property/69fabddbc05a9703f36c4d37/pudlkt9zobnmlyskcdcm.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/iqh4godl8c5u4vljcdl6",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042452/property/69fabddbc05a9703f36c4d37/iqh4godl8c5u4vljcdl6.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/lp5eywmgtykilycqpndz",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042453/property/69fabddbc05a9703f36c4d37/lp5eywmgtykilycqpndz.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/yjxsxw4narpkznqkhvad",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042453/property/69fabddbc05a9703f36c4d37/yjxsxw4narpkznqkhvad.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/bnqgzwv1gwxyoralytf9",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042454/property/69fabddbc05a9703f36c4d37/bnqgzwv1gwxyoralytf9.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/mb4r5q2tn223v46dlszc",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042455/property/69fabddbc05a9703f36c4d37/mb4r5q2tn223v46dlszc.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/uub9ipypuxgpmeadvtco",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042456/property/69fabddbc05a9703f36c4d37/uub9ipypuxgpmeadvtco.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/jp8gaulpmdvfqkpqsrep",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042457/property/69fabddbc05a9703f36c4d37/jp8gaulpmdvfqkpqsrep.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/aec6n7i323i2l4lvndcu",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042458/property/69fabddbc05a9703f36c4d37/aec6n7i323i2l4lvndcu.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/us3ysc8fm4xjdaa8cy0c",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042459/property/69fabddbc05a9703f36c4d37/us3ysc8fm4xjdaa8cy0c.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/xuqqdnpgqr9chsjru4ow",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042460/property/69fabddbc05a9703f36c4d37/xuqqdnpgqr9chsjru4ow.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/omlhlt8v4rwp6hkd1uqn",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042461/property/69fabddbc05a9703f36c4d37/omlhlt8v4rwp6hkd1uqn.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/wezecyncdbgqa5wdsl3d",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042461/property/69fabddbc05a9703f36c4d37/wezecyncdbgqa5wdsl3d.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/nqglxwzv1mx2jniif7pb",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042462/property/69fabddbc05a9703f36c4d37/nqglxwzv1mx2jniif7pb.jpg",
      "alt": "Westeria Courtyard"
    },
    {
      "public_id": "property/69fabddbc05a9703f36c4d37/igiht1uvcgwnnzowtqgn",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778042463/property/69fabddbc05a9703f36c4d37/igiht1uvcgwnnzowtqgn.jpg",
      "alt": "Westeria Courtyard"
    }
  ],
  "specialFeatures": "",
  "mapLocation": "https://maps.app.goo.gl/zT9pwqFGYrGs5Bj48",
  "rating": 4.6,
  "isTaxable": true,
  "rooms": [],
  "updatedAt": {
    "$date": "2026-05-06T04:41:03.167Z"
  },
  "show": true
},
{
  "_id": "69fabed2c05a9703f36c4d38",
  "title": "Abhyaranyan Farmstay",
  "tag": "Sanctuary",
  "locality": "Behat",
  "description": "Escape to Abhyaranyan Farmstay by Quercus Oak Stays, an expansive 8-bedroom rustic retreat nestled in the serene landscapes of Hatnikund. Spanning nearly 9,000 square feet, this unique farmstay blends heritage stone architecture with modern boutique luxury, offering a peaceful sanctuary far from the urban rush. Designed for grand family gatherings and large groups of up to 18 guests, the property features sprawling gardens, a sun-drenched terrace, and panoramic views of the surrounding countryside. Whether you are enjoying a traditional farm-to-table meal from the staff-managed kitchen, gathering around a crackling bonfire, or exploring the lush greenery, Abhyaranyan provides an authentic and 'Instagram-worthy' rural escape with the signature comfort of Quercus Oak Stays.",
  "propertyType": "Farmstay",
  "location": "hatnikund",
  "address": "Village- Madhti-Ahatmal, PO- Raipur, Behat, Uttar Pradesh 247121",
  "price": 19600,
  "spaceDetails": {
    "bedrooms": 8,
    "bathrooms": 8,
    "guests": 18,
    "size": "8998",
    "livingArea": true,
    "diningArea": true,
    "kitchen": "staff",
    "driverAccommodation": true
  },
  "amenities": [
    "Smart TV",
    "High-Speed WiFi",
    "Garden",
    "Balcony",
    "Secure Parking",
    "Terrace",
    "Gourmet Kitchen",
    "BBQ Area",
    "Fireplace"
  ],
  "badges": [
    "Heritage Properties",
    "Nature Retreat",
    "Family Getaways",
    "Luxury Collection",
    "Weekend Getaway",
    "Pet Friendly"
  ],
  "featured": true,
  "images": [
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/cznl0lfed4y9gtzpyl5x",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041258/property/69fabed2c05a9703f36c4d38/cznl0lfed4y9gtzpyl5x.jpg",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/jt18zwcspvl5ujyre8bw",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041260/property/69fabed2c05a9703f36c4d38/jt18zwcspvl5ujyre8bw.webp",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/ac9fmclg4k5cvpjbdflq",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041263/property/69fabed2c05a9703f36c4d38/ac9fmclg4k5cvpjbdflq.webp",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/pvdfsrslpngn0gzh4ope",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041265/property/69fabed2c05a9703f36c4d38/pvdfsrslpngn0gzh4ope.webp",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/vlz8srckqatipomvojnd",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041266/property/69fabed2c05a9703f36c4d38/vlz8srckqatipomvojnd.webp",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/ysvlaqfk2k0miaqckwmf",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041268/property/69fabed2c05a9703f36c4d38/ysvlaqfk2k0miaqckwmf.webp",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/xmragvnuppinceuku52m",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041269/property/69fabed2c05a9703f36c4d38/xmragvnuppinceuku52m.webp",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/ydyefpyndspgnfczkxdk",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041270/property/69fabed2c05a9703f36c4d38/ydyefpyndspgnfczkxdk.avif",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/gnmmrqn2qeuh4hi8fmb9",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041271/property/69fabed2c05a9703f36c4d38/gnmmrqn2qeuh4hi8fmb9.jpg",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/hn0b3rdhb8bj42vwnahf",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041272/property/69fabed2c05a9703f36c4d38/hn0b3rdhb8bj42vwnahf.webp",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/gspvjbjfgyqbpymwujci",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041273/property/69fabed2c05a9703f36c4d38/gspvjbjfgyqbpymwujci.webp",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/yw80mxkmmdnf3fudwsus",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041274/property/69fabed2c05a9703f36c4d38/yw80mxkmmdnf3fudwsus.avif",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/n1zhvj0rjikvlthjuexw",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041275/property/69fabed2c05a9703f36c4d38/n1zhvj0rjikvlthjuexw.jpg",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/qhkusdwhqe2ogznbpmbu",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041276/property/69fabed2c05a9703f36c4d38/qhkusdwhqe2ogznbpmbu.webp",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/lupvgaafrmc0vnk0ia6h",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041277/property/69fabed2c05a9703f36c4d38/lupvgaafrmc0vnk0ia6h.webp",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/tnsu48jltlh4bnrbjiad",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041278/property/69fabed2c05a9703f36c4d38/tnsu48jltlh4bnrbjiad.webp",
      "alt": "Abhyaranyan Farmstay"
    },
    {
      "public_id": "property/69fabed2c05a9703f36c4d38/zghtnmqpsfeez3v0bhrw",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778041279/property/69fabed2c05a9703f36c4d38/zghtnmqpsfeez3v0bhrw.webp",
      "alt": "Abhyaranyan Farmstay"
    }
  ],
  "specialFeatures": "A massive 8,998 sq. ft. estate near Hathnikund Barrage; features a dedicated meditation room, jungle safaris, and cow hugging eco-therapy experiences.",
  "mapLocation": "https://maps.app.goo.gl/Hiiyw5TDnKYnbLFH8",
  "rating": 4.6,
  "isTaxable": true,
  "rooms": [],
  "updatedAt": {
    "$date": "2026-05-06T04:21:18.759Z"
  },
  "show": true
},
{
  "_id": "69fb1e6ac05a9703f36c4d3d",
  "title": "Oliva",
  "tag": "Vantage",
  "locality": "Jharipani",
  "description": "Perched in the tranquil heights of Jharipani, Oliva by Quercus Oak Stays is a boutique mountain sanctuary that masterfully blends rustic charm with modern elegance. This private villa offers a soul-stirring escape where guests can wake up to panoramic vistas of the rolling Mussoorie hills and the sparkling Doon Valley from their own sun-drenched terrace. Designed for large families and luxury seekers, the property features a lush garden and expansive glass windows that invite the misty magic of the Himalayas inside. Whether you are gathering around a crackling bonfire, enjoying a BBQ under the stars, or relaxing in the spacious living areas, Oliva provides an intimate and luxurious home base for experiencing the best of Mussoorie.",
  "propertyType": "Boutique Villa",
  "location": "mussoorie",
  "address": "Jharipani, Mussoorie, Uttarakhand 248179",
  "price": 19600,
  "spaceDetails": {
    "bedrooms": 6,
    "bathrooms": 6,
    "guests": 18,
    "size": 3200,
    "livingArea": false,
    "diningArea": true,
    "kitchen": "staff",
    "driverAccommodation": true
  },
  "amenities": [
    "Smart TV",
    "High-Speed WiFi",
    "Garden",
    "Balcony",
    "Secure Parking",
    "Terrace",
    "Gourmet Kitchen",
    "BBQ Area",
    "Fireplace",
    "Central AC/Heating"
  ],
  "badges": [
    "Pet Friendly",
    "Nature Retreat",
    "Family Getaways",
    "Luxury Collection",
    "Weekend Getaway",
    "Budget Friendly"
  ],
  "featured": true,
  "images": [
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/dgp4awjtqb96lfhr0ipx",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065081/property/69fb1e6ac05a9703f36c4d3d/dgp4awjtqb96lfhr0ipx.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/mfvhwcrs4gntdvy3hw5h",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065083/property/69fb1e6ac05a9703f36c4d3d/mfvhwcrs4gntdvy3hw5h.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/h3vmeiwlh7oszqzpi3sb",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065084/property/69fb1e6ac05a9703f36c4d3d/h3vmeiwlh7oszqzpi3sb.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/juxemqsf07jdsnu2fpbk",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065085/property/69fb1e6ac05a9703f36c4d3d/juxemqsf07jdsnu2fpbk.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/rtfqm3ecskywnkkh661k",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065086/property/69fb1e6ac05a9703f36c4d3d/rtfqm3ecskywnkkh661k.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/t7qnffmmr1aa4v8pnmag",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065088/property/69fb1e6ac05a9703f36c4d3d/t7qnffmmr1aa4v8pnmag.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/ti6xhpaucblukfqh7j2x",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065089/property/69fb1e6ac05a9703f36c4d3d/ti6xhpaucblukfqh7j2x.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/mscbtvcm1lqjss8tvzmx",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065090/property/69fb1e6ac05a9703f36c4d3d/mscbtvcm1lqjss8tvzmx.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/hmdeaa5qddcuglg3zakz",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065091/property/69fb1e6ac05a9703f36c4d3d/hmdeaa5qddcuglg3zakz.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/y6k9l9ikk7o44jw2kgij",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065092/property/69fb1e6ac05a9703f36c4d3d/y6k9l9ikk7o44jw2kgij.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/isokdzsdg0czmgql4red",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065093/property/69fb1e6ac05a9703f36c4d3d/isokdzsdg0czmgql4red.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/ojwkbz2aumfodb6glb1n",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065094/property/69fb1e6ac05a9703f36c4d3d/ojwkbz2aumfodb6glb1n.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/fobxqig7cp6vuuwlxbmu",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065095/property/69fb1e6ac05a9703f36c4d3d/fobxqig7cp6vuuwlxbmu.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/cmrojhkngezrhniqx7xp",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065096/property/69fb1e6ac05a9703f36c4d3d/cmrojhkngezrhniqx7xp.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/ljhzyutkiunwce7thhkv",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065097/property/69fb1e6ac05a9703f36c4d3d/ljhzyutkiunwce7thhkv.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/jb98ksj5xmkbbrkpy3kc",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065098/property/69fb1e6ac05a9703f36c4d3d/jb98ksj5xmkbbrkpy3kc.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/hpwtkasxzozuoogqnvep",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065099/property/69fb1e6ac05a9703f36c4d3d/hpwtkasxzozuoogqnvep.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/c4uztfe9kk09uw5znmtq",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065100/property/69fb1e6ac05a9703f36c4d3d/c4uztfe9kk09uw5znmtq.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/et4t9lgtdqb0wlp5zscz",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065101/property/69fb1e6ac05a9703f36c4d3d/et4t9lgtdqb0wlp5zscz.webp",
      "alt": "Oliva"
    },
    {
      "public_id": "property/69fb1e6ac05a9703f36c4d3d/a3xprumkzw8pm3a75y0n",
      "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778065102/property/69fb1e6ac05a9703f36c4d3d/a3xprumkzw8pm3a75y0n.webp",
      "alt": "Oliva"
    }
  ],
  "specialFeatures": "Commanding views of the Doon Valley lights at night; close proximity to Jharipani Falls.",
  "mapLocation": "https://maps.app.goo.gl/ZbNsGBoT7FeA8Fxs5",
  "rating": 4.8,
  "isTaxable": true,
  "show": true
}]

const locationsDummyData = [{
  "label": "Hatnikund",
  "value": "hatnikund",
  "image": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778074610/location/kxqewysdu2xf0lz0uxcr.jpg"
},
{
  "label": "Dehradun",
  "value": "dehradun",
  "image": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778074654/location/awnww6ckwa5adngpqmdn.jpg"
},
{
  "label": "Maldevta",
  "value": "maldevta",
  "image": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778074675/location/bxzfo4g9lmq465l106mx.avif"
},
{
  "label": "Mussoorie",
  "value": "mussoorie",
  "image": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778074712/location/peuy3ryimhajrxjflqqz.avif"
}]

const propertyImagesDummyData = [{
  "_id": "69fb353faf82980cdbdb79ce",
  "public_id": "gallery/nltkrmfzlsljsg8eezbo",
  "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778070847/gallery/nltkrmfzlsljsg8eezbo.png",
  "alt": "",
  "imageType": "gallery",
  "createdAt": {
    "$date": "2026-05-06T12:34:07.321Z"
  },
  "updatedAt": {
    "$date": "2026-05-06T12:34:07.321Z"
  },
  "__v": 0
},
{
  "_id": "69fb3541af82980cdbdb79d0",
  "public_id": "gallery/ljylcmjrdzzq4a79ufkc",
  "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778070850/gallery/ljylcmjrdzzq4a79ufkc.png",
  "alt": "",
  "imageType": "gallery",
  "createdAt": {
    "$date": "2026-05-06T12:34:10.000Z"
  },
  "updatedAt": {
    "$date": "2026-05-06T12:34:10.000Z"
  },
  "__v": 0
},
{
  "_id": "69fb3544af82980cdbdb79d2",
  "public_id": "gallery/rxekog4k9bqccyad6irp",
  "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778070853/gallery/rxekog4k9bqccyad6irp.png",
  "alt": "",
  "imageType": "gallery",
  "createdAt": {
    "$date": "2026-05-06T12:34:12.829Z"
  },
  "updatedAt": {
    "$date": "2026-05-06T12:34:12.829Z"
  },
  "__v": 0
},
{
  "_id": "69fb354faf82980cdbdb79d4",
  "public_id": "gallery/urmyp4hnopl9r8tuf1uq",
  "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778070863/gallery/urmyp4hnopl9r8tuf1uq.png",
  "alt": "",
  "imageType": "gallery",
  "createdAt": {
    "$date": "2026-05-06T12:34:23.305Z"
  },
  "updatedAt": {
    "$date": "2026-05-06T12:34:23.305Z"
  },
  "__v": 0
},
{
  "_id": "69fb355aaf82980cdbdb79d6",
  "public_id": "gallery/a44vyvfmxgok4bc5lmjn",
  "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778070874/gallery/a44vyvfmxgok4bc5lmjn.png",
  "alt": "",
  "imageType": "gallery",
  "createdAt": {
    "$date": "2026-05-06T12:34:34.539Z"
  },
  "updatedAt": {
    "$date": "2026-05-06T12:34:34.539Z"
  },
  "__v": 0
},
{
  "_id": "69fb355eaf82980cdbdb79d8",
  "public_id": "gallery/fn5rfylrrw4kxtwddy9g",
  "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778070878/gallery/fn5rfylrrw4kxtwddy9g.png",
  "alt": "",
  "imageType": "gallery",
  "createdAt": {
    "$date": "2026-05-06T12:34:38.364Z"
  },
  "updatedAt": {
    "$date": "2026-05-06T12:34:38.364Z"
  },
  "__v": 0
},
{
  "_id": "69fb3561af82980cdbdb79da",
  "public_id": "gallery/gqmkhbz0egmoweykflsw",
  "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778070881/gallery/gqmkhbz0egmoweykflsw.png",
  "alt": "",
  "imageType": "gallery",
  "createdAt": {
    "$date": "2026-05-06T12:34:41.221Z"
  },
  "updatedAt": {
    "$date": "2026-05-06T12:34:41.221Z"
  },
  "__v": 0
},
{
  "_id": "69fb3564af82980cdbdb79dc",
  "public_id": "gallery/onm6melucjq3hiirb8vf",
  "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778070885/gallery/onm6melucjq3hiirb8vf.png",
  "alt": "",
  "imageType": "gallery",
  "createdAt": {
    "$date": "2026-05-06T12:34:44.752Z"
  },
  "updatedAt": {
    "$date": "2026-05-06T12:34:44.752Z"
  },
  "__v": 0
},
{
  "_id": "69fb3567af82980cdbdb79de",
  "public_id": "gallery/is8i7hoapa8wrny3ygav",
  "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778070887/gallery/is8i7hoapa8wrny3ygav.png",
  "alt": "",
  "imageType": "gallery",
  "createdAt": {
    "$date": "2026-05-06T12:34:47.166Z"
  },
  "updatedAt": {
    "$date": "2026-05-06T12:34:47.166Z"
  },
  "__v": 0
},
{
  "_id": "69fb356aaf82980cdbdb79e0",
  "public_id": "gallery/dlgjyogv4m068j6icv9j",
  "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778070890/gallery/dlgjyogv4m068j6icv9j.png",
  "alt": "",
  "imageType": "gallery",
  "createdAt": {
    "$date": "2026-05-06T12:34:50.052Z"
  },
  "updatedAt": {
    "$date": "2026-05-06T12:34:50.052Z"
  },
  "__v": 0
},
{
  "_id": "69fb3605af82980cdbdb79e2",
  "public_id": "gallery/uh83fzttolbnkmebr6jg",
  "url": "https://res.cloudinary.com/dp3w8apmx/image/upload/v1778071046/gallery/uh83fzttolbnkmebr6jg.jpg",
  "alt": "",
  "imageType": "gallery",
  "createdAt": {
    "$date": "2026-05-06T12:37:25.949Z"
  },
  "updatedAt": {
    "$date": "2026-05-06T12:37:25.949Z"
  },
  "__v": 0
}]

const amenitiesDummyData = [
  { name: "High-Speed WiFi", limited: false },
  { name: "Smart TV", limited: false },
  { name: "Gourmet Kitchen",  limited: false },
  { name: "Garden",  limited: false },
  { name: "Terrace",  limited: false },
  { name: "Patio",  limited: true },
  { name: "Balcony",  limited: false },
  { name: "Laundry", limited: false },
  { name: "Private Pool",  limited: true },
  { name: "Secure Parking", limited: false },
  { name: "Fireplace",  limited: true },
  { name: "BBQ Area", limited: true },
  { name: "Central AC",  limited: true },
  { name: "Gym",  limited: true },
  { name: "Cafe",  limited: false }

];
    


export default function Home() {

  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [name,setName]=useState("");
  const [orgName,setOrgName]=useState("");
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
    setProperties(propertiesDummyData)
    setLocations(locationsDummyData)
    setAmenities(amenitiesDummyData)
    setPropertyImages(propertyImagesDummyData)
  }, []);

  
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

  const navigate = useNavigate();


    const [activeImage, setActiveImage] = useState(0)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    useEffect(() => {

    const propertyInterval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % propertyImages.length)
    }, 5000)

    return () => {
      clearInterval(propertyInterval)
    }
  }, [propertyImages.length])
  
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
            {amenities.map((item, index) => (
                <div 
                  className="col-lg-3 col-sm-6" 
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


    {/* Number and Statistics Start*/}

      {/* <div className="container-xxl py-5" id='numbers'>
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.02s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              The Number's Speak
            </h6>
            <h1 className="mb-5">Transform Your Hotel's Performance</h1>
          </div>
          <div className="row g-4">
            <div className=" col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.02s" >
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

            <div className="col-lg-3 col-sm-6 wow fadeInUp " data-wow-delay="0.02s">
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
