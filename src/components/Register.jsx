import { FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import Logo from "/glowlogo.svg";       // update path as necessary
import Slide1 from "../assets/desert.png"; // Update with your images
import Slide2 from "../assets/stars.png"; // Add your images
import Slide3 from "../assets/mountains.png"; // Add your images

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: Slide1, id: 0 },
    { image: Slide2, id: 1 },
    { image: Slide3, id: 2 }
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("error") === "not_registered") {
      toast.info("You need to register first before using Google login", { autoClose: 5000 });
      setTimeout(() => {
        params.delete("error");
        navigate(`?${params.toString()}`, { replace: true });
      }, 100);
    }
  }, [location.search, navigate]);

  // Slideshow functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !userType || !terms) {
      toast.error("Please fill in all fields and agree to the terms.");
      return;
    }
    try {
      setLoading(true);
      const payload = { name, email, password, role: userType };
      const response = await axiosInstance.post("/api/v1/users/register", payload);
      if (response.data.success) {
        toast.success("Please verify your email!");
        setTimeout(() => { navigate("/"); }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#726c91] min-h-screen h-screen">
      <div className="w-full max-w-[1200px] h-[90vh] bg-[#312a42] rounded-[32px] shadow-2xl flex overflow-hidden">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col w-[50%] bg-[#342f49] relative">
          {/* Header - Now absolutely positioned */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-8">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="OriginHash Logo" className="w-10 h-10" />
              <span className="text-white text-xl font-semibold">OriginHash</span>
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-[#6c4cff] text-white px-4 py-2 rounded-full hover:bg-[#5541b3] transition"
            >
              Back to website →
            </button>
          </div>

          {/* Slideshow Container - Now full height */}
          <div className="h-full w-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Footer - Now absolutely positioned */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
            <div className="text-center">
              <p className="text-white text-xl font-medium mb-4">
                Trace Verify<br />Trust OriginHash
              </p>
              <div className="flex gap-2 justify-center">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 ${
                      currentSlide === index ? "w-12 bg-white" : "w-8 bg-[#c5c5c5]"
                    } rounded-full transition-all`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">Create an account</h1>
          <p className="text-white mb-8">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-[#6c4cff] hover:underline"
            >
              Log in
            </button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#6b5ebb]/20 border-2 border-[#7764ad] rounded-lg p-3 text-white placeholder:text-white/60"
            />
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#6b5ebb]/20 border-2 border-[#7764ad] rounded-lg p-3 text-white placeholder:text-white/60"
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#6b5ebb]/20 border-2 border-[#7764ad] rounded-lg p-3 text-white placeholder:text-white/60"
              />
              <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1dbec]" />
            </div>

            <div className="flex justify-between bg-[#6b5ebb]/20 border-2 border-[#7764ad] rounded-lg p-3">
              {["Admin", "Corporate", "Individual"].map((type) => (
                <label key={type} className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    name="userType"
                    value={type.toLowerCase()}
                    checked={userType === type.toLowerCase()}
                    onChange={(e) => setUserType(e.target.value)}
                    className="accent-[#6c4cff]"
                  />
                  {type}
                </label>
              ))}
            </div>

            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="accent-[#6c4cff]"
              />
              I agree to the{" "}
              <span className="text-[#6c4cff] underline cursor-pointer">
                Terms & Conditions
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6c4cff] text-white py-3 rounded-lg font-medium hover:bg-[#5541b3] transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
