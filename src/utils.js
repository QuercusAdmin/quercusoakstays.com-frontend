import { DEBUG_LOG } from "./config/configuration";

import { toast } from "react-toastify";
import axiosInstance from './axiosInstance';

export function isLoggedIn(adminType) {
    let session = getObject(adminType) || {};
    session = Object?.keys(session).length && JSON.parse(session);
    let accessToken = session && session && session['jwtToken'] || "";
    return accessToken;
}

export function getObject(key) {
    if (window && window.localStorage) {
      return window.localStorage?.getItem(key);
    }
  }

  window.Buffer = window.Buffer || require("buffer").Buffer;


  export const debugLog = (...args) => {
    if (DEBUG_LOG) {
      console.log(...args);
    }
  };

  export const uploadImage = async (file, type) => {

    const MAX_FILE_SIZE = 5 * 1024 * 1024; 
    const MAX_FILE_SIZE_MB = 5;

    if (!file) {
      toast.error("No File Selected.", { position: toast.POSITION.TOP_RIGHT });
      return "";
    }
  
    if (file.type === "application/pdf") {
      toast.error("PDF Formats are not Allowed !", { position: toast.POSITION.TOP_RIGHT });
      return "";
    }

    if (file.size > MAX_FILE_SIZE) {
        toast.error(`File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB.`, { position: toast.POSITION.TOP_RIGHT });
        return "";
    }
  
    try {

      const fileDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to read file."));
        reader.readAsDataURL(file);
      });
  
      const image = new Image();
      image.src = fileDataUrl;
  
      await new Promise((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Failed to load image."));
      });
  
      if (["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        const formData = new FormData();
        formData.append("file", file);
  
        const accessToken = JSON.parse(localStorage.getItem("hotel")).jwtToken;
        
        const response = await axiosInstance.post(`/upload?owner=hotel&imageType=${type ==='kyc' ? 'private' : 'public'}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${accessToken}`,
          },
        });
  
        if (response.status === 200 && response.data.data?.url) {
          toast.success("Upload Successfull !", { position: toast.POSITION.TOP_RIGHT });
          return response.data.data.url; 
        } else {
          toast.error("Upload Unsuccessfull !", { position: toast.POSITION.TOP_RIGHT });
          return "";
        }
      } else {
        toast.error("Only JPEG, JPG, and PNG Image Formats are allowed !.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return "";
      }
    } catch (error) {
      debugLog("Error during upload:", error);
      toast.error("Upload Unsuccessfull !", { position: toast.POSITION.TOP_RIGHT });
      return "";
    }
  };


  export const uploadBase64Image = async (image,token,type) => {
    try{

        const MAX_FILE_SIZE = 5 * 1024 * 1024; 
        const MAX_FILE_SIZE_MB = 5;

        const base64String = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        const estimatedSize = base64String.length * (3/4);

        if (estimatedSize > MAX_FILE_SIZE) {
            toast.error(`File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB.`, { position: toast.POSITION.TOP_RIGHT });
            return "";
        }
  

        let data=JSON.stringify({
          img: image,
          owner : 'hotel',
          imageType :type ==='kyc' ? 'private' : 'public'

        })

        const response = await axiosInstance.post(`/uploadbase64`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (response.status === 200 && response.data.data?.url) {
          return response.data.data.url; 
        } else {
          return "";
        }
      
      } catch (error) {
        debugLog("Error during upload:", error);
        return "";
      }

  }

