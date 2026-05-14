import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";

import { 
  FiHome, FiPlus, FiList, FiUser, FiStar, FiX, 
  FiEdit, FiTrash2, FiMail, FiPhone, FiMapPin,
  FiCalendar, FiCheckCircle, FiClock, FiMap, FiUpload,
  FiUsers, FiImage, FiDollarSign, FiTag, FiPercent
} from 'react-icons/fi';
import { 
  FaHotel, FaUserAlt, FaSwimmingPool, FaWifi, FaParking, 
  FaTv, FaSnowflake, FaFire, FaBed, FaBath, FaRuler,
  FaTimes, FaCheck, FaSave, FaGift
} from 'react-icons/fa';
import { MdKitchen, MdLocalLaundryService, MdAcUnit, MdBalcony } from 'react-icons/md';
import { GiBarbecue, GiBookshelf } from 'react-icons/gi';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// API Base URLs
const API_URLS = {
  properties: 'https://quercusoakstaysserver.onrender.com/api/property',
  locations: 'https://quercusoakstaysserver.onrender.com/api/locations',
  offers: 'https://quercusoakstaysserver.onrender.com/api/offer',
  enquiries: 'https://quercusoakstaysserver.onrender.com/api/phone'
};

// Color scheme
const primaryColor = '#fc6e35';   
const secondaryColor = '#b3481e';
const accentColor = '#D4AF37';    
const lightBgColor = '#F9F5F0';   
const darkTextColor = '#2A2118';  

const DashboardAdminPanel = () => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState([]);
  const [offers, setOffers] = useState([]);
  const [interestedPersons, setInterestedPersons] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);
  
  // Modal states
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Current items
  const [currentProperty, setCurrentProperty] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);
  
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setFlag] = useState(false);

  // Authentication check
  useEffect(() => {
    const account = JSON.parse(localStorage.getItem('account'));
    if (!account || !account.password || account.password.length === 0) {
      // navigate('/');
    }
  }, [navigate]);

  // Load data from APIs
  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          loadProperties(),
          loadLocations(),
          loadOffers(),
          loadEnquiries()
        ]);
      } catch (error) {
        console.error('Failed to load data:', error);
        showNotification('Failed to load data', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    loadAllData();
  }, [flag]);

  // Load properties from API
  const loadProperties = async () => {
    try {
      const response = await axios.get(`${API_URLS.properties}/`);
      setProperties(response.data.properties || []);
    } catch (error) {
      console.error('Failed to load properties:', error);
      setProperties([]);
    }
  };

  // Load locations from API
  const loadLocations = async () => {
    try {
      const response = await axios.get(`${API_URLS.locations}/get`);
      setLocations(response.data.locations || []);
    } catch (error) {
      console.error('Failed to load locations:', error);
      setLocations([]);
    }
  };

  // Load offers from API
  const loadOffers = async () => {
    try {
      const response = await axios.get(`${API_URLS.offers}/get-all-offer`);
      setOffers(response.data.offers || []);
    } catch (error) {
      console.error('Failed to load offers:', error);
      setOffers([]);
    }
  };

  // Load enquiries from API
  const loadEnquiries = async () => {
    try {
      const response = await axios.get(`${API_URLS.enquiries}/get-all-phone`);
      console.log(response.data.phones);
      setInterestedPersons(response.data.phones || []);
    } catch (error) {
      console.error('Failed to load enquiries:', error);
      setInterestedPersons([]);
    }
  };

  // Mock booking data - replace with actual API when available
  useEffect(() => {
    const mockBookings = [
      {
        id: '1',
        bookingNumber: 'BK001',
        customerName: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        propertyName: 'Hampton Villa',
        checkIn: '2025-09-15',
        checkOut: '2025-09-18',
        guests: 4,
        totalAmount: 84000,
        status: 'confirmed',
        bookingDate: '2025-08-20',
        specialRequests: 'Need early check-in'
      }
    ];
    setBookingDetails(mockBookings);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Property CRUD Operations
  const handleAddProperty = async (propertyData) => {
    try {
      const formData = new FormData();
      
      // Append basic fields
      formData.append('title', propertyData.title);
      formData.append('description', propertyData.description);
      formData.append('propertyType', propertyData.propertyType);
      formData.append('location', propertyData.location);
      formData.append('address', propertyData.address);
      formData.append('price', propertyData.price);
      
      // Append space details as JSON string
      formData.append('spaceDetails', JSON.stringify({
        bedrooms: parseInt(propertyData.bedrooms) || 0,
        bathrooms: parseInt(propertyData.bathrooms) || 0,
        guests: parseInt(propertyData.guests) || 0,
        size: propertyData.size || "",
        livingArea: propertyData.livingArea === 'true',
        diningArea: propertyData.diningArea === 'true',
        kitchen: propertyData.kitchen || "None",
        driverAccommodation: propertyData.driverAccommodation === 'true'
      }));
      
      // Append arrays as JSON strings
      formData.append('amenities', JSON.stringify(propertyData.amenities || []));
      formData.append('badges', JSON.stringify(propertyData.badges || []));
      formData.append('specialFeatures', propertyData.specialFeatures || '');
      
      // Append images
      if (propertyData.images && propertyData.images.length > 0) {
        propertyData.images.forEach((image) => {
          if (image.file) {
            formData.append('images', image.file);
          }
        });
      }

      const response = await axios.post(`${API_URLS.properties}/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        await loadProperties();
        showNotification('Property added successfully!');
      }
    } catch (error) {
      console.error('Failed to add property:', error);
      showNotification('Failed to add property', 'error');
    }
  };

  const handleUpdateProperty = async (propertyData) => {
    try {
      const formData = new FormData();
      
      // Only append fields that have changed
      if (propertyData.title) formData.append('title', propertyData.title);
      if (propertyData.description) formData.append('description', propertyData.description);
      if (propertyData.propertyType) formData.append('propertyType', propertyData.propertyType);
      if (propertyData.location) formData.append('location', propertyData.location);
      if (propertyData.address) formData.append('address', propertyData.address);
      if (propertyData.price) formData.append('price', propertyData.price);
      
      if (propertyData.bedrooms || propertyData.bathrooms || propertyData.guests) {
        formData.append('spaceDetails', JSON.stringify({
          bedrooms: parseInt(propertyData.bedrooms) || 0,
          bathrooms: parseInt(propertyData.bathrooms) || 0,
          guests: parseInt(propertyData.guests) || 0,
          size: propertyData.size || "",
          livingArea: propertyData.livingArea === 'true',
          diningArea: propertyData.diningArea === 'true',
          kitchen: propertyData.kitchen || "None",
          driverAccommodation: propertyData.driverAccommodation === 'true'
        }));
      }
      
      if (propertyData.amenities) formData.append('amenities', JSON.stringify(propertyData.amenities));
      if (propertyData.badges) formData.append('badges', JSON.stringify(propertyData.badges));
      if (propertyData.specialFeatures) formData.append('specialFeatures', propertyData.specialFeatures);
      
      // Handle new images
      if (propertyData.newImages && propertyData.newImages.length > 0) {
        propertyData.newImages.forEach((image) => {
          if (image.file) {
            formData.append('images', image.file);
          }
        });
      }

      const response = await axios.put(`${API_URLS.properties}/update/${propertyData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        await loadProperties();
        showNotification('Property updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update property:', error);
      showNotification('Failed to update property', 'error');
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const response = await axios.delete(`${API_URLS.properties}/delete/${propertyId}`);
        if (response.status === 200) {
          await loadProperties();
          showNotification('Property deleted successfully!', 'success');
        }
      } catch (error) {
        console.error('Failed to delete property:', error);
        showNotification('Failed to delete property', 'error');
      }
    }
  };

  // Location CRUD Operations
  const handleAddLocation = async (locationData) => {
    try {
      const formData = new FormData();
      formData.append('name', locationData.name);
      
      if (locationData.imageFile) {
        formData.append('image', locationData.imageFile);
      }

      const response = await axios.post(`${API_URLS.locations}/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        await loadLocations();
        showNotification('Location added successfully!');
      }
    } catch (error) {
      console.error('Failed to add location:', error);
      showNotification('Failed to add location', 'error');
    }
  };

  const handleDeleteLocation = async (locationName) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        const response = await axios.delete(`${API_URLS.locations}/delete/${encodeURIComponent(locationName)}`);
        if (response.status === 200) {
          await loadLocations();
          showNotification('Location deleted successfully!');
        }
      } catch (error) {
        console.error('Failed to delete location:', error);
        showNotification('Failed to delete location', 'error');
      }
    }
  };

  // Offer CRUD Operations
  const handleAddOffer = async (offerData) => {
    try {
      const response = await axios.post(`${API_URLS.offers}/add-offer`, {
        code: offerData.code,
        discountPercentage: parseInt(offerData.discountPercentage),
        title: offerData.title,
        discription: offerData.description,
        expiryDate: offerData.expiryDate
      });

      if (response.status === 201) {
        await loadOffers();
        showNotification('Offer added successfully!');
      }
    } catch (error) {
      console.error('Failed to add offer:', error);
      showNotification('Failed to add offer', 'error');
    }
  };

  const handleUpdateOffer = async (offerData) => {
    try {
      const response = await axios.put(`${API_URLS.offers}/update-offer/${offerData.code}`, {
        discountPercentage: parseInt(offerData.discountPercentage),
        title: offerData.title,
        discription: offerData.description,
        expiryDate: offerData.expiryDate
      });

      if (response.status === 200) {
        await loadOffers();
        showNotification('Offer updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update offer:', error);
      showNotification('Failed to update offer', 'error');
    }
  };

  const handleDeleteOffer = async (offerCode) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        const response = await axios.delete(`${API_URLS.offers}/delete-offer/${offerCode}`);
        if (response.status === 200) {
          await loadOffers();
          showNotification('Offer deleted successfully!');
        }
      } catch (error) {
        console.error('Failed to delete offer:', error);
        showNotification('Failed to delete offer', 'error');
      }
    }
  };

  // Enquiry management functions
  const handleDeleteEnquiry = async (phone) => {
    try {
      const response = await axios.post(`${API_URLS.enquiries}/delete-phone/:${phone}`);
      if (response.status === 200) {
        setFlag(!flag);
        showNotification('Enquiry deleted successfully!');
      }
    } catch (error) {
      console.error('Failed to delete enquiry:', error);
      showNotification('Failed to delete enquiry!', 'error');
    }
  };

  // Booking management functions
  const handleDeleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookingDetails(bookingDetails.filter(b => b.id !== id));
      showNotification('Booking deleted successfully!', 'error');
    }
  };

  const handleUpdateBookingStatus = (id, status) => {
    setBookingDetails(bookingDetails.map(b => 
      b.id === id ? { ...b, status } : b
    ));
    showNotification(`Booking ${status} successfully!`);
  };

  // Modal functions
  const openAddPropertyModal = () => {
    setCurrentProperty(null);
    setIsPropertyModalOpen(true);
  };

  const openEditPropertyModal = (property) => {
    setCurrentProperty(property);
    setIsPropertyModalOpen(true);
  };

  const openAddLocationModal = () => {
    setCurrentLocation(null);
    setIsLocationModalOpen(true);
  };

  const openEditLocationModal = (location) => {
    setCurrentLocation(location);
    setIsLocationModalOpen(true);
  };

  const openAddOfferModal = () => {
    setCurrentOffer(null);
    setIsOfferModalOpen(true);
  };

  const openEditOfferModal = (offer) => {
    setCurrentOffer(offer);
    setIsOfferModalOpen(true);
  };

  const openBookingModal = (booking) => {
    setCurrentBooking(booking);
    setIsBookingModalOpen(true);
  };

  // Chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Properties Listed',
        data: [3, 5, 7, 9, properties.length, properties.length + 1, properties.length + 2],
        borderColor: secondaryColor,
        backgroundColor: secondaryColor,
        tension: 0.1,
      },
      {
        label: 'Bookings',
        data: [2, 4, 6, 8, bookingDetails.length, bookingDetails.length + 2, bookingDetails.length + 3],
        borderColor: primaryColor,
        backgroundColor: primaryColor,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Property Listings & Bookings Trends',
        color: secondaryColor,
        font: { size: 16 }
      },
    },
    scales: { y: { beginAtZero: true } }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: lightBgColor }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: secondaryColor }}></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: lightBgColor }}>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="w-64 text-white flex flex-col shadow-lg"
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="p-6 border-b" style={{ borderColor: `${primaryColor}50` }}>
        <Link to={"/Images"}> <h1 className="text-3xl font-bold text-white">Admin Panel</h1></Link> 
          <p className="text-white/80 text-sm">Quercus Oak Stays</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <MenuItem
            icon={<FiHome />}
            label="Dashboard"
            isActive={activeMenuItem === 'dashboard'}
            onClick={() => setActiveMenuItem('dashboard')}
          />
          <MenuItem
            icon={<FiList />}
            label="Manage Properties"
            isActive={activeMenuItem === 'properties'}
            onClick={() => setActiveMenuItem('properties')}
          />
          <MenuItem
            icon={<FiMap />}
            label="Manage Locations"
            isActive={activeMenuItem === 'locations'}
            onClick={() => setActiveMenuItem('locations')}
          />
          <MenuItem
            icon={<FaGift />}
            label="Manage Offers"
            isActive={activeMenuItem === 'offers'}
            onClick={() => setActiveMenuItem('offers')}
          />
          <MenuItem
            icon={<FaUserAlt />}
            label="Enquiries"
            isActive={activeMenuItem === 'enquiries'}
            onClick={() => setActiveMenuItem('enquiries')}
          />
          <MenuItem
            icon={<FiCalendar />}
            label="Booking Details"
            isActive={activeMenuItem === 'bookings'}
            onClick={() => setActiveMenuItem('bookings')}
          />
          <MenuItem
            icon={<FiPlus />}
            label="Add New Property"
            isActive={activeMenuItem === 'add-property'}
            onClick={openAddPropertyModal}
          />
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex justify-between items-center p-6 bg-white border-b border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">
            {activeMenuItem.replace('-', ' ')}
          </h2>
          <div className="flex items-center space-x-4">
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`px-4 py-2 rounded-lg text-white ${
                  notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                {notification.message}
              </motion.div>
            )}
            <button className="p-2 rounded-full" style={{ backgroundColor: lightBgColor }}>
              <FiUser className="h-5 w-5" style={{ color: secondaryColor }} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeMenuItem === 'dashboard' && (
            <Dashboard 
              properties={properties} 
              interestedPersons={interestedPersons}
              bookingDetails={bookingDetails}
              offers={offers}
              chartData={chartData} 
              chartOptions={chartOptions} 
            />
          )}
          {activeMenuItem === 'properties' && (
            <PropertyList
              properties={properties}
              onEdit={openEditPropertyModal}
              onDelete={handleDeleteProperty}
              onAdd={openAddPropertyModal}
            />
          )}
          {activeMenuItem === 'locations' && (
            <LocationList
              locations={locations}
              onEdit={openEditLocationModal}
              onDelete={handleDeleteLocation}
              onAdd={openAddLocationModal}
            />
          )}
          {activeMenuItem === 'offers' && (
            <OffersList
              offers={offers}
              onEdit={openEditOfferModal}
              onDelete={handleDeleteOffer}
              onAdd={openAddOfferModal}
            />
          )}
          {activeMenuItem === 'enquiries' && (
            <EnquiriesList 
              enquiries={interestedPersons} 
              properties={properties}
              onDelete={handleDeleteEnquiry}
            />
          )}
          {activeMenuItem === 'bookings' && (
            <BookingsList
              bookings={bookingDetails}
              onDelete={handleDeleteBooking}
              onUpdateStatus={handleUpdateBookingStatus}
              onViewDetails={openBookingModal}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isPropertyModalOpen && (
          <PropertyModal
            property={currentProperty}
            locations={locations}
            onClose={() => setIsPropertyModalOpen(false)}
            onSave={(property) => {
              if (property.id) {
                handleUpdateProperty(property);
              } else {
                handleAddProperty(property);
              }
              setIsPropertyModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLocationModalOpen && (
          <LocationModal
            location={currentLocation}
            onClose={() => setIsLocationModalOpen(false)}
            onSave={(location) => {
              handleAddLocation(location);
              setIsLocationModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOfferModalOpen && (
          <OfferModal
            offer={currentOffer}
            onClose={() => setIsOfferModalOpen(false)}
            onSave={(offer) => {
              if (offer.id) {
                handleUpdateOffer(offer);
              } else {
                handleAddOffer(offer);
              }
              setIsOfferModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBookingModalOpen && (
          <BookingDetailsModal
            booking={currentBooking}
            onClose={() => setIsBookingModalOpen(false)}
            onUpdateStatus={handleUpdateBookingStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Property Modal Component
const PropertyModal = ({ property, locations, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState({
    id: property?._id || '',
    title: property?.title || '',
    description: property?.description || '',
    location: property?.location || '',
    address: property?.address || '',
    price: property?.price || '',
    bedrooms: property?.spaceDetails?.bedrooms || '',
    bathrooms: property?.spaceDetails?.bathrooms || '',
    guests: property?.spaceDetails?.guests || '',
    size: property?.spaceDetails?.size || '',
    propertyType: property?.propertyType || '',
    amenities: property?.amenities || [],
    images: [],
    badges: property?.badges || [],
    specialFeatures: property?.specialFeatures || '',
    livingArea: property?.spaceDetails?.livingArea?.toString() || 'true',
    diningArea: property?.spaceDetails?.diningArea?.toString() || 'true',
    kitchen: property?.spaceDetails?.kitchen || 'Staff only',
    driverAccommodation: property?.spaceDetails?.driverAccommodation?.toString() || 'true'
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  // Available options
  const availableAmenities = [
    "Private Pool", "High-Speed WiFi", "Secure Parking", "Smart TV",
    "Central AC", "Gourmet Kitchen", "Laundry", "Garden", "Gym",
    "Spa", "Balcony", "Terrace", "Fireplace", "BBQ Area"
  ];

  const propertyTypes = [
    "Villa", "Apartment", "House", "Penthouse", "Condo", 
    "Townhouse", "Studio", "Mansion", "Cottage", "Chalet"
  ];

  const availableBadges = [
    "Oceanfront", "Luxury Collection", "Award Winner", "New Listing",
    "Pet Friendly", "Family Friendly", "Romantic Getaway", "Business Travel"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const toggleBadge = (badge) => {
    setFormData(prev => ({
      ...prev,
      badges: prev.badges.includes(badge)
        ? prev.badges.filter(b => b !== badge)
        : [...prev.badges, badge]
    }));
  };

  const handleImageUpload = useCallback((files) => {
    const newImages = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      alt: file.name
    }));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  }, []);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  }, [handleImageUpload]);

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Property title is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    }

    if (step === 2) {
      if (!formData.location.trim()) newErrors.location = 'Location is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    }

    if (step === 3) {
      if (!formData.bedrooms || formData.bedrooms <= 0) newErrors.bedrooms = 'Number of bedrooms is required';
      if (!formData.bathrooms || formData.bathrooms <= 0) newErrors.bathrooms = 'Number of bathrooms is required';
      if (!formData.guests || formData.guests <= 0) newErrors.guests = 'Maximum guests is required';
      if (!formData.size.trim()) newErrors.size = 'Property size is required';
    }

    if (step === 4) {
      if (!property && formData.images.length === 0) newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSave(formData);
    }
  };

  const StepIndicator = () => (
    <div className="flex justify-center items-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${
              currentStep >= step
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white border-amber-600'
                : 'bg-white text-amber-600 border-amber-300'
            }`}
            whileHover={{ scale: 1.1 }}
            animate={currentStep === step ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {currentStep > step ? <FaCheck /> : step}
          </motion.div>
          {step < totalSteps && (
            <div className={`w-12 h-1 mx-2 rounded transition-all duration-300 ${
              currentStep > step ? 'bg-gradient-to-r from-amber-600 to-yellow-600' : 'bg-amber-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative max-h-screen overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition duration-300"
        >
          <FiX className="h-6 w-6 text-gray-600" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-2">
            {property ? 'Edit Property' : 'Add New Property'}
          </h2>
          <p className="text-amber-700/70">Create a stunning listing for your luxury property</p>
        </div>

        <StepIndicator />

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">Basic Information</h3>
                  <p className="text-amber-700/70">Tell us about your property</p>
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-3 flex items-center">
                    <FiHome className="mr-2" />
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Luxury Oceanfront Villa"
                    className={`w-full px-4 py-3 bg-amber-50/50 border rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-amber-900 placeholder-amber-600/50 transition-all duration-300 ${
                      errors.title ? 'border-red-400 bg-red-50/50' : 'border-amber-200'
                    }`}
                  />
                  {errors.title && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 mt-2 flex items-center"
                    >
                      <FaTimes className="mr-1" size={14} />
                      {errors.title}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-3">Property Type *</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {propertyTypes.map((type, index) => (
                      <motion.button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, propertyType: type }))}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 text-center font-medium ${
                          formData.propertyType === type
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 border-amber-500 text-white shadow-lg'
                            : 'bg-amber-50/50 border-amber-200 text-amber-700 hover:border-amber-400'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                  {errors.propertyType && (
                    <motion.p className="text-red-500 mt-2 flex items-center">
                      <FaTimes className="mr-1" size={14} />
                      {errors.propertyType}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-3">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Describe your property in detail..."
                    className={`w-full px-4 py-3 bg-amber-50/50 border rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-amber-900 placeholder-amber-600/50 resize-none transition-all duration-300 ${
                      errors.description ? 'border-red-400 bg-red-50/50' : 'border-amber-200'
                    }`}
                  />
                  {errors.description && (
                    <motion.p className="text-red-500 mt-2 flex items-center">
                      <FaTimes className="mr-1" size={14} />
                      {errors.description}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Location & Pricing */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">Location & Pricing</h3>
                  <p className="text-amber-700/70">Where is your property and what's the price?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-amber-900 font-semibold mb-3 flex items-center">
                      <FiMapPin className="mr-2" />
                      Location *
                    </label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-amber-50/50 border rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-amber-900 transition-all duration-300 ${
                        errors.location ? 'border-red-400 bg-red-50/50' : 'border-amber-200'
                      }`}
                    >
                      <option value="">Select Location</option>
                      {locations.map(loc => (
                        <option key={loc._id} value={loc.name}>{loc.name}</option>
                      ))}
                    </select>
                    {errors.location && (
                      <motion.p className="text-red-500 mt-2 flex items-center">
                        <FaTimes className="mr-1" size={14} />
                        {errors.location}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-amber-900 font-semibold mb-3 flex items-center">
                      <FiDollarSign className="mr-2" />
                      Price per Night *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="450"
                      min="0"
                      className={`w-full px-4 py-3 bg-amber-50/50 border rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-amber-900 placeholder-amber-600/50 transition-all duration-300 ${
                        errors.price ? 'border-red-400 bg-red-50/50' : 'border-amber-200'
                      }`}
                    />
                    {errors.price && (
                      <motion.p className="text-red-500 mt-2 flex items-center">
                        <FaTimes className="mr-1" size={14} />
                        {errors.price}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-3">Full Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Full street address with postal code"
                    className={`w-full px-4 py-3 bg-amber-50/50 border rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-amber-900 placeholder-amber-600/50 transition-all duration-300 ${
                      errors.address ? 'border-red-400 bg-red-50/50' : 'border-amber-200'
                    }`}
                  />
                  {errors.address && (
                    <motion.p className="text-red-500 mt-2 flex items-center">
                      <FaTimes className="mr-1" size={14} />
                      {errors.address}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Property Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">Property Details</h3>
                  <p className="text-amber-700/70">Specify the key details about your property</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'bedrooms', icon: <FaBed />, label: 'Bedrooms', placeholder: '3' },
                    { name: 'bathrooms', icon: <FaBath />, label: 'Bathrooms', placeholder: '2' },
                    { name: 'guests', icon: <FiUsers />, label: 'Max Guests', placeholder: '6' },
                    { name: 'size', icon: <FaRuler />, label: 'Size (sq ft)', placeholder: '2800' }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <label className="block text-amber-900 font-semibold mb-3 flex items-center">
                        {field.icon}
                        <span className="ml-2">{field.label} *</span>
                      </label>
                      <input
                        type={field.name === 'size' ? 'text' : 'number'}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        min={field.name !== 'size' ? '1' : undefined}
                        className={`w-full px-4 py-3 bg-amber-50/50 border rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-amber-900 placeholder-amber-600/50 transition-all duration-300 ${
                          errors[field.name] ? 'border-red-400 bg-red-50/50' : 'border-amber-200'
                        }`}
                      />
                      {errors[field.name] && (
                        <motion.p className="text-red-500 mt-2 flex items-center">
                          <FaTimes className="mr-1" size={14} />
                          {errors[field.name]}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-4">Amenities & Features</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableAmenities.map((amenity, index) => (
                      <motion.button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`flex items-center p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                          formData.amenities.includes(amenity)
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-lg'
                            : 'bg-green-50/50 border-green-300 text-green-700 hover:border-green-500'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <span className="font-medium">{amenity}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Property Badges */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-4">Property Badges</label>
                  <div className="flex flex-wrap gap-3">
                    {availableBadges.map((badge, index) => (
                      <motion.button
                        key={badge}
                        type="button"
                        onClick={() => toggleBadge(badge)}
                        className={`px-4 py-2 rounded-full border-2 font-medium transition-all duration-300 ${
                          formData.badges.includes(badge)
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 border-amber-500 text-white shadow-lg'
                            : 'bg-amber-50/50 border-amber-300 text-amber-700 hover:border-amber-500'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        {badge}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Images & Final Details */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">Images & Final Touch</h3>
                  <p className="text-amber-700/70">Upload stunning photos to showcase your property</p>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-4 flex items-center">
                    <FiImage className="mr-2" />
                    Property Images {!property && '*'}
                  </label>
                  
                  <div
                    className={`relative border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
                      dragActive 
                        ? 'border-amber-500 bg-amber-50/50 scale-105' 
                        : 'border-amber-300 bg-amber-50/30 hover:border-amber-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    <motion.div
                      animate={dragActive ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiUpload className="text-4xl text-amber-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-amber-900 mb-2">
                        Drag & Drop Images Here
                      </h4>
                      <p className="text-amber-700/70 mb-4">Or click to browse files</p>
                      <p className="text-amber-600/60">Supports: JPG, PNG, WebP (Max: 10MB each)</p>
                    </motion.div>
                    
                    <input
                      id="fileInput"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                    />
                  </div>

                  {errors.images && (
                    <motion.p className="text-red-500 mt-2 flex items-center">
                      <FaTimes className="mr-1" size={14} />
                      {errors.images}
                    </motion.p>
                  )}

                  {/* Image Preview Grid */}
                  {formData.images.length > 0 && (
                    <motion.div 
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formData.images.map((image, index) => (
                        <motion.div
                          key={image.id}
                          className="relative group rounded-xl overflow-hidden shadow-lg border border-amber-200"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <img 
                            src={image.url} 
                            alt={image.alt}
                            className="w-full h-24 object-cover"
                          />
                          <motion.button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaTimes size={10} />
                          </motion.button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Special Features */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-3">Special Features (Optional)</label>
                  <textarea
                    name="specialFeatures"
                    value={formData.specialFeatures}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Any additional features or unique selling points..."
                    className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-amber-900 placeholder-amber-600/50 resize-none transition-all duration-300"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-amber-200">
            <motion.button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-amber-200 text-amber-800 hover:bg-amber-300 shadow-lg'
              }`}
              whileHover={currentStep !== 1 ? { scale: 1.02 } : {}}
              whileTap={currentStep !== 1 ? { scale: 0.98 } : {}}
            >
              Previous
            </motion.button>

            <div className="text-amber-600 font-medium">
              Step {currentStep} of {totalSteps}
            </div>

            {currentStep < totalSteps ? (
              <motion.button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next Step
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSave className="mr-2" />
                {property ? 'Update Property' : 'Create Property'}
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Location Modal Component
const LocationModal = ({ location, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: location?.name || '',
    imageFile: null,
    imagePreview: location?.ImageUrl || ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Location name is required';
    if (!location && !formData.imageFile) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      }));
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative max-h-screen overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition duration-300"
        >
          <FiX className="h-6 w-6 text-gray-600" />
        </button>

        <h3 className="text-2xl font-bold mb-6" style={{ color: secondaryColor }}>
          {location ? 'Edit Location' : 'Add New Location'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Location Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Manali Hills"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-amber-500'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Location Image {!location && '*'}
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                errors.image ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-amber-500'
              }`}
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            
            {formData.imagePreview && (
              <div className="mt-4">
                <img 
                  src={formData.imagePreview} 
                  alt="Preview" 
                  className="h-48 w-full object-cover rounded-lg border"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Preview';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300 font-medium"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-6 py-2.5 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300 font-medium"
              style={{ backgroundColor: secondaryColor }}
            >
              Add Location
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Offer Modal Component
const OfferModal = ({ offer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: offer?._id || '',
    code: offer?.code || '',
    discountPercentage: offer?.discountPercentage || '',
    title: offer?.title || '',
    description: offer?.discription || '',
    expiryDate: offer?.expiryDate ? new Date(offer.expiryDate).toISOString().split('T')[0] : ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.code.trim()) newErrors.code = 'Offer code is required';
    if (!formData.discountPercentage || formData.discountPercentage <= 0 || formData.discountPercentage > 100) {
      newErrors.discountPercentage = 'Valid discount percentage is required (1-100)';
    }
    if (!formData.title.trim()) newErrors.title = 'Offer title is required';
    if (!formData.description.trim()) newErrors.description = 'Offer description is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Convert date to ISO string for API
      const offerData = {
        ...formData,
        expiryDate: new Date(formData.expiryDate).toISOString()
      };
      onSave(offerData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative max-h-screen overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition duration-300"
        >
          <FiX className="h-6 w-6 text-gray-600" />
        </button>

        <h3 className="text-2xl font-bold mb-6" style={{ color: secondaryColor }}>
          {offer ? 'Edit Offer' : 'Add New Offer'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Offer Code *
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g., ROOM50"
                disabled={!!offer} // Disable editing code for existing offers
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  errors.code ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-amber-500'
                } ${offer ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              />
              {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
            </div>

            <div>
              <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                Discount Percentage *
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  placeholder="50"
                  min="1"
                  max="100"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none pr-8 ${
                    errors.discountPercentage ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-amber-500'
                  }`}
                />
                <FiPercent className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.discountPercentage && <p className="mt-1 text-sm text-red-600">{errors.discountPercentage}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Offer Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Flat 50% OFF on Room Booking"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-amber-500'
              }`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Offer Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the offer details..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                errors.description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-amber-500'
              }`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date *
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]} // Minimum date is today
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                errors.expiryDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-amber-500'
              }`}
            />
            {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
          </div>

          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300 font-medium"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-6 py-2.5 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300 font-medium"
              style={{ backgroundColor: secondaryColor }}
            >
              {offer ? 'Update Offer' : 'Add Offer'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Dashboard Component
const Dashboard = ({ properties, interestedPersons, bookingDetails, offers, chartData, chartOptions }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-8"
  >
    <h3 className="text-3xl font-bold" style={{ color: secondaryColor }}>Dashboard Overview</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard
        title="Total Properties"
        value={properties.length}
        icon={<FaHotel />}
        color={primaryColor}
      />
      <DashboardCard
        title="Total Enquiries"
        value={interestedPersons.length}
        icon={<FiUser />}
        color={accentColor}
      />
      <DashboardCard
        title="Total Bookings"
        value={bookingDetails.length}
        icon={<FiCalendar />}
        color={secondaryColor}
      />
      <DashboardCard
        title="Active Offers"
        value={offers.length}
        icon={<FaGift />}
        color="#10B981"
      />
    </div>

    <div className="bg-white rounded-lg shadow-md p-6">
      <h4 className="text-xl font-semibold mb-4" style={{ color: secondaryColor }}>
        Properties & Bookings Trends
      </h4>
      <div className="h-80">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold mb-4" style={{ color: secondaryColor }}>
          Recent Properties
        </h4>
        <div className="space-y-4">
          {properties.slice(0, 3).map((property) => (
            <div key={property._id} className="flex items-start p-3 rounded-md hover:bg-gray-50 transition">
              <img 
                src={property.images?.[0]?.url || 'https://via.placeholder.com/150?text=Property+Image'} 
                alt={property.title} 
                className="h-16 w-16 object-cover rounded-md mr-4"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=Property+Image';
                }}
              />
              <div>
                <h5 className="font-medium text-gray-800">{property.title}</h5>
                <p className="text-sm text-gray-600">{property.location}</p>
                <p className="text-sm text-gray-600">₹{property.price}/night</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold mb-4" style={{ color: secondaryColor }}>
          Active Offers
        </h4>
        <div className="space-y-4">
          {offers.slice(0, 3).map((offer) => (
            <div key={offer._id} className="p-3 rounded-md hover:bg-gray-50 transition border-l-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-800">{offer.code}</h5>
                  <p className="text-sm text-gray-600">{offer.title}</p>
                  <p className="text-sm text-green-600 font-semibold">{offer.discountPercentage}% OFF</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Property List Component
const PropertyList = ({ properties, onEdit, onDelete, onAdd }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-3xl font-bold" style={{ color: secondaryColor }}>All Listed Properties</h3>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAdd}
        className="flex items-center px-4 py-2 rounded-lg shadow-md text-white font-medium"
        style={{ backgroundColor: secondaryColor }}
      >
        <FiPlus className="mr-2" />
        Add Property
      </motion.button>
    </div>
    
    {properties.length === 0 ? (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <FiHome className="mx-auto h-12 w-12 text-gray-400" />
        <h4 className="mt-2 text-lg font-medium text-gray-900">No properties found</h4>
        <p className="mt-1 text-gray-500">Get started by adding a new property</p>
      </div>
    ) : (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Night</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={property.images?.[0]?.url || 'https://via.placeholder.com/150?text=Property+Image'} 
                    alt={property.title} 
                    className="h-16 w-16 object-cover rounded-md"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Property+Image';
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{property.title}</div>
                  <div className="text-sm text-gray-500">{property.propertyType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{property.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.propertyType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onEdit(property)}
                      className="text-white p-2 rounded-full transition"
                      style={{ backgroundColor: primaryColor }}
                      title="Edit Property"
                    >
                      <FiEdit className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(property._id)}
                      className="text-white p-2 rounded-full transition bg-red-600"
                      title="Delete Property"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </motion.div>
);

// Location List Component
const LocationList = ({ locations, onEdit, onDelete, onAdd }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-3xl font-bold" style={{ color: secondaryColor }}>Locations</h3>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAdd}
        className="flex items-center px-4 py-2 rounded-lg shadow-md text-white font-medium"
        style={{ backgroundColor: secondaryColor }}
      >
        <FiPlus className="mr-2" />
        Add Location
      </motion.button>
    </div>
    
    {locations.length === 0 ? (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <FiMap className="mx-auto h-12 w-12 text-gray-400" />
        <h4 className="mt-2 text-lg font-medium text-gray-900">No locations found</h4>
        <p className="mt-1 text-gray-500">Get started by adding a new location</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div key={location._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={location.imageUrl} 
              alt={location.name} 
              className="h-48 w-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Location+Image';
              }}
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{location.name}</h4>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(location.name)}
                    className="text-white p-2 rounded-full transition bg-red-600"
                    title="Delete Location"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </motion.div>
);

// Offers List Component
const OffersList = ({ offers, onEdit, onDelete, onAdd }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-3xl font-bold" style={{ color: secondaryColor }}>Promotional Offers</h3>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAdd}
        className="flex items-center px-4 py-2 rounded-lg shadow-md text-white font-medium"
        style={{ backgroundColor: secondaryColor }}
      >
        <FiPlus className="mr-2" />
        Add Offer
      </motion.button>
    </div>
    
    {offers.length === 0 ? (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <FaGift className="mx-auto h-12 w-12 text-gray-400" />
        <h4 className="mt-2 text-lg font-medium text-gray-900">No offers found</h4>
        <p className="mt-1 text-gray-500">Get started by adding a new offer</p>
      </div>
    ) : (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {offers.map((offer) => {
              const isExpired = new Date(offer.expiryDate) < new Date();
              return (
                <tr key={offer._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{offer.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{offer.title}</div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">{offer.discription}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-bold text-green-600">{offer.discountPercentage}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(offer.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      isExpired 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {isExpired ? 'Expired' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onEdit(offer)}
                        className="text-white p-2 rounded-full transition"
                        style={{ backgroundColor: primaryColor }}
                        title="Edit Offer"
                      >
                        <FiEdit className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete(offer.code)}
                        className="text-white p-2 rounded-full transition bg-red-600"
                        title="Delete Offer"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </motion.div>
);

// Enquiries List Component
const EnquiriesList = ({ enquiries, properties, onDelete }) => {
  const getPropertyTitle = (propertyId) => {
    const property = properties.find(p => p._id === propertyId);
    return property ? property.title : 'Unknown Property';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-3xl font-bold mb-6" style={{ color: secondaryColor }}>Property Enquiries</h3>
      
      {enquiries.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <FiUser className="mx-auto h-12 w-12 text-gray-400" />
          <h4 className="mt-2 text-lg font-medium text-gray-900">No enquiries yet</h4>
          <p className="mt-1 text-gray-500">Enquiries will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                    <div className="text-sm text-gray-500">{enquiry.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiPhone className="mr-2" /> {enquiry.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getPropertyTitle(enquiry.propertyId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {enquiry.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(enquiry.phone)}
                      className="text-white p-2 rounded-full transition bg-red-600"
                      title="Delete Enquiry"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

// Bookings List Component
const BookingsList = ({ bookings, onDelete, onUpdateStatus, onViewDetails }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-3xl font-bold" style={{ color: secondaryColor }}>Booking Details</h3>
      <div className="flex space-x-2">
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          Confirmed: {bookings.filter(b => b.status === 'confirmed').length}
        </span>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
          Pending: {bookings.filter(b => b.status === 'pending').length}
        </span>
      </div>
    </div>
    
    {bookings.length === 0 ? (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
        <h4 className="mt-2 text-lg font-medium text-gray-900">No bookings yet</h4>
        <p className="mt-1 text-gray-500">Bookings will appear here</p>
      </div>
    ) : (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guest Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stay Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">#{booking.bookingNumber}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <FiMail className="mr-1" /> {booking.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <FiPhone className="mr-1" /> {booking.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{booking.propertyName}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">{booking.guests} guests</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  ₹{booking.totalAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onViewDetails(booking)}
                      className="text-white p-2 rounded-full transition"
                      style={{ backgroundColor: primaryColor }}
                      title="View Details"
                    >
                      <FiEdit className="h-4 w-4" />
                    </motion.button>
                    {booking.status === 'pending' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUpdateStatus(booking.id, 'confirmed')}
                        className="text-white p-2 rounded-full transition bg-green-600"
                        title="Confirm Booking"
                      >
                        <FiCheckCircle className="h-4 w-4" />
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(booking.id)}
                      className="text-white p-2 rounded-full transition bg-red-600"
                      title="Delete Booking"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </motion.div>
);

// Booking Details Modal
const BookingDetailsModal = ({ booking, onClose, onUpdateStatus }) => {
  if (!booking) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative max-h-screen overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition duration-300"
        >
          <FiX className="h-6 w-6 text-gray-600" />
        </button>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Details - #{booking.bookingNumber}
          </h3>
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {booking.status.toUpperCase()}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Guest Information</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {booking.customerName}</p>
                <p><span className="font-medium">Email:</span> {booking.email}</p>
                <p><span className="font-medium">Phone:</span> {booking.phone}</p>
                <p><span className="font-medium">Guests:</span> {booking.guests}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Booking Information</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Property:</span> {booking.propertyName}</p>
                <p><span className="font-medium">Check-in:</span> {new Date(booking.checkIn).toLocaleDateString()}</p>
                <p><span className="font-medium">Check-out:</span> {new Date(booking.checkOut).toLocaleDateString()}</p>
                <p><span className="font-medium">Booking Date:</span> {new Date(booking.bookingDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Payment Details</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  ₹{booking.totalAmount.toLocaleString()}
                </p>
                <p className="text-gray-600">Total Amount</p>
              </div>
            </div>

            {booking.specialRequests && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Special Requests</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700">{booking.specialRequests}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div className="flex space-x-3">
            {booking.status === 'pending' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onUpdateStatus(booking.id, 'confirmed');
                  onClose();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
              >
                <FiCheckCircle className="mr-2" />
                Confirm Booking
              </motion.button>
            )}
            {booking.status === 'confirmed' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onUpdateStatus(booking.id, 'cancelled');
                  onClose();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              >
                Cancel Booking
              </motion.button>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Helper Components
const MenuItem = ({ icon, label, isActive, onClick }) => (
  <motion.button
    whileHover={{ x: 5 }}
    onClick={onClick}
    className={`w-full flex items-center p-3 rounded-md transition duration-200 ${
      isActive ? 'bg-white/10 text-white shadow-inner' : 'hover:bg-white/10 text-white/90'
    }`}
  >
    {icon}
    <span className="ml-3 font-medium">{label}</span>
  </motion.button>
);

const DashboardCard = ({ title, value, icon, color }) => (
  <div className="flex items-center p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-white">
    <div className="p-3 rounded-full mr-4 text-2xl" style={{ color, backgroundColor: `${color}20` }}>
      {icon}
    </div>
    <div>
      <h5 className="text-gray-600 font-medium">{title}</h5>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  </div>
);

export default DashboardAdminPanel;
