import { FaUser, FaLock, FaEnvelope, FaGoogle } from "react-icons/fa";
import illustration from "../assets/illustarion.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import './Register.css';
import axiosInstance from "../api/axiosInstance";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("signup");

  // States for form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);

  //handle Google login error
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const error = params.get("error");

  if (error === "not_registered") {
    toast.info("You need to register first before using Google login", {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: true, // 👈 ensure close button is visible
    });


    setTimeout(() => {
      params.delete("error");
      navigate(`?${params.toString()}`, { replace: true });
    }, 100); 
  }
}, [location.search, navigate]);

  // Handle form submit
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name || !email || !password || !userType) {
    toast.error("Please fill in all fields.");
    return;
  }

  const payload = {
    name,
    email,
    password,
    role: userType,
  };

  try {
    setLoading(true);
    const response = await axiosInstance.post("/api/v1/users/register", payload);

    if (response.data.success) {
      toast.success("Please verify your email!");
      setTimeout(() => {
        navigate("/"); // Redirect to login
      }, 1500);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed.");
  } finally {
    setLoading(false);
  }
};

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6C4CFF]/50 to-[#edeef7]/60 p-4 relative">

         {/* White circle attached to top left of the form */}
      <span className="forgot-circle absolute z-0"
        style={{
          width: '9vw',
          height: '9vw',
          minWidth: '60px',
          minHeight: '60px',
          maxWidth: '120px',
          maxHeight: '120px',
          borderRadius: '50%',
          background: 'white',
          opacity: 0.8,
          boxShadow: '0 0 40px 0 #e0e7ff',
          top: '20%',
          left: '20%',
          transform: 'translate(-110%, -110%)'
        }}
      ></span>
      <span className="forgot-circle absolute z-0"
        style={{
          width: '9vw',
          height: '9vw',
          minWidth: '60px',
          minHeight: '60px',
          maxWidth: '120px',
          maxHeight: '120px',
          borderRadius: '50%',
          background: '#735FFF',
          opacity: 0.7,
          boxShadow: '0 0 40px 0 #7568ff44',
          bottom: '23%',
          right: '20%',
          transform: 'translate(110%, 110%)'
        }}
      ></span>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden relative z-10 mt-0">
  
  {/* Right Illustration Section */}
  <div className="bg-[#735fff] hidden md:flex items-center justify-center relative">
    <img
      src={illustration}
      alt="Illustration"
      className="w-[60%] max-w-md drop-shadow-xl rounded-2xl"
    />
  </div>

  {/* Left Form Section - Reduced padding and spacing */}
  <div className="flex flex-col justify-center p-6 overflow-y-auto">
    
    {/* Sign In / Sign Up Switch - Reduced margin */}
    <div className="flex bg-gray-100 rounded-xl mb-4 w-full max-w-xs mx-auto">
      <button
        className={`flex-1 py-2 rounded-xl font-semibold transition text-sm ${
          activeTab === "signin"
            ? "bg-white text-gray-900 shadow border border-gray-300"
            : "text-gray-400"
        }`}
        onClick={() => {
          setActiveTab("signin");
          navigate("/");
        }}
      >
        Login
      </button>
      <button
        className={`flex-1 py-2 rounded-xl font-semibold transition text-sm ${
          activeTab === "signup"
            ? "bg-white text-gray-900 shadow border border-gray-300"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab("signup")}
      >
        Register
      </button>
    </div>

    <h2 className="text-2xl font-bold text-center mb-1">REGISTER</h2>
    <p className="text-center text-gray-500 mb-4 text-sm">
      Create your account to get started
    </p>

    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-xl">
        <FaUser className="text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Enter your Full Name"
          className="bg-transparent w-full outline-none text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-xl">
        <FaEnvelope className="text-gray-400 text-sm" />
        <input
          type="email"
          placeholder="Enter your Email"
          className="bg-transparent w-full outline-none text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-xl">
        <FaLock className="text-gray-400 text-sm" />
        <input
          type="password"
          placeholder="Enter your Password"
          className="bg-transparent w-full outline-none text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* User Type Radios - More compact */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-3 sm:gap-4 rounded-xl border border-[#e0e7ff] bg-white py-2.5 px-3">
        {["admin", "corporate", "individual"].map((type) => (
          <label key={type} className="flex items-center gap-2 font-semibold text-gray-700 text-sm">
            <input
              type="radio"
              className="w-4 h-4 border-2 border-[#a5b4fc] focus:ring-0"
              name="userType"
              value={type}
              checked={userType === type}
              onChange={() => setUserType(type)}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#6C4CFF] hover:bg-[#5c3fe0] text-white py-2.5 rounded-xl shadow-md font-semibold transition text-sm"
      >
        {loading ? "Registering..." : "Register Now"}
      </button>
    </form>

    {/* Already have an account */}
    <div className="mt-4 flex flex-col items-center">
      <p className="text-gray-600 text-sm">
        Already have an account?
        <button
          className="ml-1 text-[#6C4CFF] font-semibold hover:underline transition"
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Login
        </button>
      </p>
    </div>
  </div>
</div>
      <ToastContainer />
    </div>
  );
};

export default Register;
