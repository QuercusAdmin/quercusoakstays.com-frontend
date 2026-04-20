import React, { useState,useEffect,useMemo } from "react";
import Header2 from '../components/Header2.jsx'
import Footer from '../components/Footer.jsx'
import moment from 'moment'
import { toast } from "react-toastify";
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
  FaDumbbell
} from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import PriceRangeSlider from "../components/PriceRangeSlider.jsx";


function Properties() {



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
    "BBQ Area": <FaFire />,
    "Central AC": <FaSnowflake />,
    "Gym": <FaDumbbell />
  };

  const [filters, setFilters] = useState({ locations: [], collections: [], types: [] });

  const [priceRange, setPriceRange] = useState([1000, 65000]);
  const [sortBy, setSortBy] = useState("Relevant");
  const [drawerOpen, setDrawerOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [properties ,setProperties]=useState([])
  const [checkInDate,setCheckInDate]=useState(null);
  const [checkOutDate,setCheckOutDate]=useState(null);
  const [propertyLocation,setPropertyLocation]=useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const location = useLocation();

  const navigate = useNavigate();


  const locationsData = useMemo(() => locations, []);

  const resetFilters = () => {
    setFilters({
      locations: [], 
      collections: [], 
      types: []
    });
  };

  const locationString = useMemo(() => {

    if (!filters?.locations?.length) return "";

    return filters.locations
      .map(value => {
        const match = locationsData.find(loc => loc.value === value);
        return match?.label;
      })
      .filter(Boolean)
      .join(", ");
  }, [filters?.locations]);



  useEffect(() => {
    const element = document.documentElement;
    element.style.scrollBehavior = 'smooth';
    element.scrollTo(0, 0);


    let temp = moment.utc().add(5,"hours").add(30,'minutes').format("YYYY-MM-DD")
    let temp1 = moment.utc().add(2,"days").add(5,"hours").add(30,'minutes').format("YYYY-MM-DD")
    setCheckInDate(temp)
    setCheckOutDate(temp1)
    setProperties(dummyData)

    const saved = JSON.parse(localStorage.getItem("filters"));

    if (saved) {

      let temp2 = saved?.propertyLocation && saved.propertyLocation !== "all" ? saved.propertyLocation : "";

      if (temp2) {
        setFilters({
          locations: [temp2],
          collections: [],
          types: []
        });
      }

      setCheckInDate(saved.checkInDate ?? temp);
      setCheckOutDate(saved.checkOutDate ?? temp1);
      setPropertyLocation(saved.propertyLocation ?? "all");
      setAdults(saved.adults ?? 2);
      setChildren(saved.children ?? 0);
    }

  }, []);




  const handleSearch=async(e)=>{
    e.preventDefault();
  
  }

  const handlePropertyBook =async(e,property)=>{
    e.preventDefault();
   navigate(`/property/view/${property?._id}`, { state: {flow : "book",property : property}  });
  
  }

  const handlePropertyClick =async(e,property)=>{
    e.preventDefault();
     navigate(`/property/view/${property?._id}`, { state: {flow : "view",property : property}  });

    
  }


  useState(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });

  const filtered = properties.filter(p => {
    if (filters.locations.length && !filters.locations.includes(p.location)) return false;
    if (filters.collections.length && !p.badges.some(badge => filters.collections.includes(badge))) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  const overlayStyle = {
    position: "fixed", inset: 0, background: "rgba(44,37,23,0.4)",
    zIndex: 40, opacity: drawerOpen ? 1 : 0,
    pointerEvents: drawerOpen ? "auto" : "none",
    transition: "opacity 0.3s ease",
  };

  const drawerStyle = {
    position: "fixed", top: 0, right: 0, bottom: 0, width: "min(340px, 90vw)",
    background: "#faf8f4", zIndex: 50, padding: "28px 24px",
    overflowY: "auto",
    transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
    boxShadow: "-8px 0 40px rgba(44,37,23,0.12)",
  };

 


function FilterPanel({ filters, setFilters, priceRange, setPriceRange, onClose, isMobile }) {
  const toggleLocation = (loc) => {
    setFilters(f => ({
      ...f,
      locations: f.locations.includes(loc)
        ? f.locations.filter(l => l !== loc)
        : [...f.locations, loc]
    }));
  };
  const toggleCollection = (col) => {
    setFilters(f => ({
      ...f,
      collections: f.collections.includes(col)
        ? f.collections.filter(c => c !== col)
        : [...f.collections, col]
    }));
  };
  const toggleType = (type) => {
    setFilters(f => ({
      ...f,
      types: f.types.includes(type)
        ? f.types.filter(t => t !== type)
        : [...f.types, type]
    }));
  };

  return (
    <div style={{
      width: "100%",
    }}>
      {isMobile && (
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: "24px", paddingBottom: "16px",
          borderBottom: "1px solid #e8e0d4"
        }}>
          <span style={{ fontSize: "20px", fontWeight: "600", color: "#2c2517", letterSpacing: "0.04em" }}>Filters</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b5c3e", padding: "4px" }}>
            <i className="fa fa-times"></i>
          </button>
        </div>
      )}

      {!isMobile && (
        <div style={{ marginBottom: "24px" }}>
          <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em", color: "#756534", textTransform: "uppercase" }}>Filters</span>
        </div>
      )}

      {/* Price  */}

      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.12em", color: "#2c2517", textTransform: "uppercase", marginBottom: "14px" }}>
          Price
        </div>
  
        <PriceRangeSlider
          min={1000}
          max={100000}
          step={5000}
          range={priceRange}
          setRange={setPriceRange}
        />
      </div>

      {/* Location */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.12em", color: "#2c2517", textTransform: "uppercase", marginBottom: "14px" }}>Location</div>
        {locationsData.map(loc => (
          <label key={loc?.value} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", cursor: "pointer", fontSize: "14px", color: "#4a3d28" }}>
            <div onClick={() => toggleLocation(loc?.value)} style={{
              width: "16px", height: "16px", border: `2px solid ${filters.locations.includes(loc?.value) ? "#756534" : "#c4b89a"}`,
              borderRadius: "3px", background: filters.locations.includes(loc?.value) ? "#756534" : "white",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer"
            }}>
              {filters.locations.includes(loc?.value) && <span style={{ color: "white", fontSize: "10px", fontWeight: "bold" }}>✓</span>}
            </div>
            {loc?.label}
          </label>
        ))}
      </div>

      {/* Collection */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.12em", color: "#2c2517", textTransform: "uppercase", marginBottom: "14px" }}>Collection</div>
        {collections.map(col => (
          <label key={col} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", cursor: "pointer", fontSize: "14px", color: "#4a3d28" }}>
            <div onClick={() => toggleCollection(col)} style={{
              width: "16px", height: "16px", border: `2px solid ${filters.collections.includes(col) ? "#756534" : "#c4b89a"}`,
              borderRadius: "3px", background: filters.collections.includes(col) ? "#756534" : "white",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer"
            }}>
              {filters.collections.includes(col) && <span style={{ color: "white", fontSize: "10px", fontWeight: "bold" }}>✓</span>}
            </div>
            {col}
          </label>
        ))}
      </div>

      {/* Property Type */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.12em", color: "#2c2517", textTransform: "uppercase", marginBottom: "14px" }}>Property Type</div>
        {propertyTypes.map(type => (
          <label key={type} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", cursor: "pointer", fontSize: "14px", color: "#4a3d28" }}>
            <div onClick={() => toggleType(type)} style={{
              width: "16px", height: "16px", border: `2px solid ${filters.types.includes(type) ? "#756534" : "#c4b89a"}`,
              borderRadius: "3px", background: filters.types.includes(type) ? "#756534" : "white",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer"
            }}>
              {filters.types.includes(type) && <span style={{ color: "white", fontSize: "10px", fontWeight: "bold" }}>✓</span>}
            </div>
            {type}
          </label>
        ))}
      </div>

      {isMobile && (
        <button onClick={onClose} style={{
          width: "100%", padding: "14px", background: "#756534", color: "white",
          border: "none", borderRadius: "4px", fontSize: "14px", fontWeight: "600",
          letterSpacing: "0.08em", cursor: "pointer", textTransform: "uppercase", marginTop: "8px"
        }}>
          Apply Filters
        </button>
      )}
    </div>
  );
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
              const icon = amenityIconMap[amenity];
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

  return (
    <>
      <Header2/>
        <div className="container-xxl py-5 padding-top-custom" >
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Properties
              </h6>
              <h1 className="mb-5">Our Featured Properties</h1>
            </div>

            <div className="uni-search-wrapper  wow fadeInUp" data-wow-delay="0.1s">
              <div className="uni-search-container">
                <div className="uni-search-flex-bar">
                  
                  <div className="uni-search-block">
                    <label className="uni-label"><i className="bi bi-search uni-search"></i>{"  "}Location</label>
                      {/* <input type="text" className="uni-input" placeholder="All" value={propertyLocation} onChange={(e)=>{setPropertyLocation(e.target.value)}} /> */}
                    <select 
                      className="uni-input" 
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
    
                  <div className="uni-divider"></div>
    
                  <div className="uni-search-block">
                    <label className="uni-label">Check In</label>
                    <input type="date" className="uni-input" value={checkInDate} onChange={(e)=>{setCheckInDate(e.target.value)}} />
                  </div>
    
                  <div className="uni-divider"></div>
    
                  <div className="uni-search-block">
                    <label className="uni-label">Check Out</label>
                    <input type="date" className="uni-input" value={checkOutDate} onChange={(e)=>{
    
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
    
                  <div className="uni-divider"></div>
    
                  {/* <div className="uni-search-block">
                    <label className="uni-label">No Of Guests</label>
                      <input type="number" className="uni-input" placeholder="1" value={adults} onChange={(e)=>{
                        const value = parseInt(e.target.value);
                        setAdults(value < 1 || isNaN(value) ? 1 : value);
                        
                        }} />
                  </div> */}
                  <div className="uni-search-block" style={{ position: 'relative' }}>
                    <label className="uni-label">Guests</label>
              
                    <div 
                      className="uni-input guest-input-display" 
                      onClick={() => setShowPicker(!showPicker)}
                    >
                      {`Adult ${adults} and Child ${children}`}
                    </div>
    
                    {showPicker && (
                      <div className="uni-guest-picker shadow">
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
    
                        <button className="uni-done-btn" onClick={() => setShowPicker(false)}>
                          Done
                        </button>
                      </div>
                    )}
                  </div>
    
                  <button type="button" className="uni-search-btn" onClick={(e)=>{handleSearch(e)}}>
                    Search
                  </button>
                  
                </div>
              </div>
                </div>


              <div style={{  margin: "0 auto", padding: "32px 20px", display: "flex", gap: "32px" }}  className="wow fadeInUp" data-wow-delay="0.1s">

                {!isMobile && (
                  <aside style={{
                    width: "220px", flexShrink: 0, background: "#faf8f4",
                    borderRadius: "8px", padding: "24px 20px", alignSelf: "flex-start",
                    position: "sticky", top: "20px", boxShadow: "0 2px 16px rgba(44,37,23,0.07)"
                  }}>
                    <FilterPanel filters={filters} setFilters={setFilters} priceRange={priceRange} setPriceRange={setPriceRange} isMobile={false} />
                  </aside>
                )}

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <h1 style={{ fontSize: "28px", fontWeight: "400", color: "#2c2517", margin: 0, letterSpacing: "0.02em" }}>
                        Best Properties in <span style={{ color: "#756534", }}>India</span>
                          {/* {filters?.locations?.length > 0  ? locationString : "India"} */}
                      </h1>
                      <div style={{ fontSize: "13px", color: "#8a7a62", marginTop: "4px" }}>
                        Home / <span style={{ color: "#756534" }}>Best Properties in India</span>
                      </div>
                    </div>
                    {!isMobile && (
                      <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                        padding: "10px 14px", border: "1px solid #e0d8ca", borderRadius: "4px",
                        background: "white", fontSize: "13px", color: "#4a3d28", cursor: "pointer",
                      }}>
                        <option>Relevant</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                      </select>
                    )}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile
                        ? "1fr"
                        : "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "20px",
                    }}
                     className="wow fadeInUp" data-wow-delay="0.1s">
                  
                    {filtered?.length ? (
                      filtered.map((p) => (
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
                          Try Changing your Filters
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
                          Reset Filters
                        </button>
                      </div>
                    )}
                  </div>

                  {/* <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "40px", alignItems: "center" }}>
                    {["‹", "1", "2", "›"].map((p, i) => (
                      <button key={i} style={{
                        width: "38px", height: "38px", borderRadius: "50%",
                        border: p === "1" ? "none" : "1.5px solid #c4b89a",
                        background: p === "1" ? "#756534" : "white",
                        color: p === "1" ? "white" : "#6b5c3e",
                        fontSize: p === "‹" || p === "›" ? "18px" : "14px",
                        cursor: "pointer", 
                      }}>{p}</button>
                    ))}
                  </div> */}
                </div>
              </div>

              {isMobile && (
                <div style={{
                  position: "fixed", bottom: 0, left: 0, right: 0,
                  background: "white", display: "flex", borderTop: "1px solid #e0d8ca",
                  zIndex: 30, boxShadow: "0 -4px 20px rgba(44,37,23,0.1)"
                }}>
                  <button onClick={() => setDrawerOpen("sort")} style={{
                    flex: 1, padding: "16px", background: "none", border: "none",
                    borderRight: "1px solid #e0d8ca", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: "8px", cursor: "pointer",
                    fontSize: "14px", fontWeight: "600", color: "#4a3d28", 
                    letterSpacing: "0.04em",
                  }}>
                    <i className="fa fa-sort-amount-down"></i> Sort By
                  </button>
                  <button onClick={() => setDrawerOpen("filter")} style={{
                    flex: 1, padding: "16px", background: "none", border: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600",
                    color: "#4a3d28", 
                    letterSpacing: "0.04em"
                  }}>
                    <i className="fa fa-filter"></i> Filters
                  </button>
                </div>
              )}

              {isMobile && (
                <>
                  <div style={overlayStyle} onClick={() => setDrawerOpen(null)} />
                  <div style={drawerStyle}>
                    {drawerOpen === "filter" && (
                      <FilterPanel filters={filters} setFilters={setFilters} priceRange={priceRange} setPriceRange={setPriceRange} isMobile={true} onClose={() => setDrawerOpen(null)} />
                    )}
                    {drawerOpen === "sort" && (
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "140px", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #e8e0d4" }}>
                          <span style={{ fontSize: "20px", fontWeight: "600", color: "#2c2517", letterSpacing: "0.04em" }}>Sort By</span>
                          <button onClick={() => setDrawerOpen(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b5c3e" }}>
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                        {["Relevant", "Price: Low to High", "Price: High to Low"].map(opt => (
                          <div key={opt} onClick={() => { setSortBy(opt); setDrawerOpen(null); }} style={{
                            padding: "16px 12px", borderBottom: "1px solid #f0ece4", cursor: "pointer",
                            fontSize: "15px", color: sortBy === opt ? "#756534" : "#4a3d28",
                            fontWeight: sortBy === opt ? "600" : "400",
                            display: "flex", alignItems: "center", justifyContent: "space-between"
                          }}>
                            {opt}
                            {sortBy === opt && <span style={{ color: "#756534", fontSize: "16px" }}>✓</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Bottom padding for mobile bar */}
              {isMobile && <div style={{ height: "70px" }} />}
            </div>
          </div>
 
        {/* Contact End */}
  <Footer />
    </>


  )


}

export default Properties;
