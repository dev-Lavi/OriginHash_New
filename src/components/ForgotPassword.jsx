import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import Logo from "/glowlogo.svg";
import Slide1 from "../assets/flower.png";
import Slide2 from "../assets/gate.png";
import Slide3 from "../assets/window.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: Slide1, id: 0 },
    { image: Slide2, id: 1 },
    { image: Slide3, id: 2 }
  ];

  // Slideshow functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/v1/users/forgot-password", { email });
      toast.success("Reset link sent successfully! Check your email.");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error sending reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#726c91] min-h-screen p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[1000px] min-h-[550px] sm:min-h-[600px] lg:h-[90vh] bg-[#312a42] rounded-[24px] sm:rounded-[32px] shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left Section - Slideshow */}
        <div className="hidden lg:flex flex-col w-full lg:w-[50%] bg-[#342f49] relative">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={Logo} alt="OriginHash Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-white text-lg sm:text-xl font-semibold">OriginHash</span>
            </div>
          </div>

          {/* Slideshow Container */}
          <div className="h-full w-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Footer */}
<div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 lg:p-8">
  <div className="text-center">
    <p className="text-black text-lg sm:text-xl font-medium mb-3 sm:mb-4">
      "Security isn't just about stopping threats.<br />It's about enabling trust."
    </p>
    <div className="flex gap-2 justify-center">
      {slides.map((_, index) => (
        <span
          key={index}
          className={`h-1.5 sm:h-2 ${
            currentSlide === index ? "w-8 sm:w-12 bg-white" : "w-6 sm:w-8 bg-[#c5c5c5]"
          } rounded-full transition-all`}
        />
      ))}
    </div>
  </div>
</div>

        </div>

        {/* Right Section - Form */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          {/* Show logo and back button on mobile */}
          <div className="flex lg:hidden items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="OriginHash Logo" className="w-8 h-8" />
              <span className="text-white text-xl font-semibold">OriginHash</span>
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-[#6c4cff] text-white px-3 py-1.5 rounded-full text-sm hover:bg-[#5541b3] transition"
            >
              Back →
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Forgot Password?</h1>
          <p className="text-white mb-6 sm:mb-8 text-sm sm:text-base">
            Enter your email and we'll send you a reset link
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1dbec]" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
className="w-full bg-[#6b5ebb]/20 border-2 border-[#7764ad] rounded-lg p-2.5 sm:p-3 pl-10 sm:pl-12 text-sm sm:text-base text-white placeholder:text-white/60"

                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6c4cff] text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#5541b3] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 sm:mt-8 space-y-3 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-[#6c4cff] hover:underline text-sm sm:text-base font-medium block"
            >
              ← Back to Login
            </button>
            <p className="text-white text-sm sm:text-base">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-[#6c4cff] hover:underline font-medium"
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
