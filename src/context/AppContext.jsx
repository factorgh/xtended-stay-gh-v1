import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import paymentService from "../services/paymentService";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const currency = "GH₵";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [searchedCities, setSearchedCities] = useState([]);

  // Facility icons
  const facilityIcons = {
    "Free WiFi": assets.freeWifiIcon,
    "Air Conditioning": assets.airconIcon,
    "Pool Access": assets.poolIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
  };

  // Authentication functions
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsOwner(data.user.role === "admin");
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsOwner(data.user.role === "admin");
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsOwner(false);
    navigate("/");
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Add token to axios requests
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      console.log(data.rooms);
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/auth/me")
        .then(({ data }) => {
          if (data.success) {
            setUser(data.user);
            setIsOwner(data.user.role === "admin");
          }
        })
        .catch((error) => {
          localStorage.removeItem("token");
          setUser(null);
          setIsOwner(false);
        });
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  const value = {
    currency,
    navigate,
    user,
    setUser,
    isOwner,
    setIsOwner,
    axios,
    showHotelReg,
    setShowHotelReg,
    facilityIcons,
    rooms,
    setRooms,
    searchedCities,
    setSearchedCities,
    login,
    register,
    logout,
    paymentService,
    getToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
