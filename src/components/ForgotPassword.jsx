import { FaEnvelope } from "react-icons/fa";
import illustration from "../assets/illustarion.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/axiosInstance";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/api/v1/users/forgot-password", { email });
      toast.success("Reset link sent successfully!");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Error sending reset link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6C4CFF]/50 to-[#edeef7]/60 p-4 relative">
      {/* White circle top-left */}
      <span className="absolute z-0 hidden sm:block"
        style={{
          top: '0',
          left: '0',
          width: '7rem',
          height: '7rem',
          borderRadius: '50%',
          background: 'white',
          opacity: 0.8,
          boxShadow: '0 0 40px 0 #e0e7ff'
        }}
      ></span>

      {/* Purple circle bottom-right */}
      <span className="absolute z-0 hidden sm:block"
        style={{
          bottom: '0',
          right: '0',
          width: '7rem',
          height: '7rem',
          borderRadius: '50%',
          background: '#735FFF',
          opacity: 0.7,
          boxShadow: '0 0 40px 0 #7568ff44'
        }}
      ></span>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl grid md:grid-cols-2 overflow-hidden relative z-10 mt-0 md:mt-8">
        {/* Right Illustration */}
        <div className="bg-[#735fff] hidden md:flex items-center justify-center">
          <img src={illustration} alt="Illustration" className="w-[50%] max-w-md drop-shadow-xl rounded-2xl" />
        </div>

        {/* Left Form */}
        <div className="flex flex-col justify-center p-6 overflow-y-auto">
          <h2 className="text-3xl font-bold text-center mb-2">FORGOT PASSWORD</h2>
          <p className="text-center text-gray-500 mb-6">Enter your email and we'll send you a reset link</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-xl">
              <FaEnvelope className="text-gray-400 text-sm" />
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6C4CFF] hover:bg-[#5c3fe0] text-white py-2.5 rounded-xl shadow-md font-semibold transition text-sm"
            >
              Send Reset Link
            </button>
          </form>

          {/* Links */}
          <div className="mt-8 flex flex-col items-center space-y-3">
            <button
              className="text-[#6C4CFF] font-semibold hover:underline transition text-sm"
              type="button"
              onClick={() => navigate("/")}
            >
              Back to Login
            </button>
            <p className="text-gray-600">
              Need an account?
              <button
                className="ml-2 text-[#6C4CFF] font-semibold hover:underline transition text-sm"
                type="button"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
