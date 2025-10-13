import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import 'react-toastify/dist/ReactToastify.css';

// Update import paths to your assets
import Logo from '/glowlogo.svg';
import Abstract3D from '../assets/3dabstract.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);

  // Submit handler
const handleSubmit = async (e) => { 
  e.preventDefault();

  if (lockoutTime && Date.now() < lockoutTime) {
    toast.error("Login disabled for 1 hour due to too many failed attempts.");
    return;
  }

  if (!email || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  const payload = { email, password };

  try {
    setLoading(true);

    const res = await axiosInstance.post("/api/v1/users/login", payload);
    const { token, user } = res.data;

    if (token) {
      localStorage.setItem("authToken", token);
      toast.success("Login successful!");
      setWrongAttempts(0);
      setLockoutTime(null);
      setTimeout(() => {
        navigate("/services");
      }, 1000);
    } else {
      setWrongAttempts(prev => {
        const attempts = prev + 1;
        if (attempts >= 5) {
          setLockoutTime(Date.now() + 60 * 60 * 1000); // 1 hour lockout
          toast.error("Too many attempts. Login disabled for 1 hour.");
        }
        return attempts;
      });
      toast.error("Login failed.");
    }
  } catch (err) {
    setWrongAttempts(prev => {
      const attempts = prev + 1;
      if (attempts >= 5) {
        setLockoutTime(Date.now() + 60 * 60 * 1000); // 1 hour lockout
        toast.error("Too many attempts. Login disabled for 1 hour.");
      }
      return attempts;
    });
    toast.error(err.response?.data?.message || "Login failed.");
  } finally {
    setLoading(false);
  }
};


return (
    <div className="min-h-screen bg-[#452883] flex items-center justify-center relative font-sans">
        <img
    src={Abstract3D}
    alt="3D Abstract Layer"
    className="absolute top-0 left-0 w-[700px] h-auto z-20 pointer-events-none"
    style={{ maxWidth: '900px' }}
  />
      
      {/* Left Panel */}
      <div className="hidden xl:flex flex-col justify-between w-1/2 h-[700px] pt-[400px] py-10 pl-16 pr-12">
  <div>
    <div className="flex items-center mb-3">
      <img src={Logo} alt="OriginHash Logo" className="w-14 h-14 mr-3" />
      <span className="text-white text-3xl font-bold tracking-wide">OriginHash</span>
    </div>
     <h4 className="font-semibold text-white text-3xl mb-8 leading-tight" style={{ maxWidth: "570px" }}>
          Supply Chain Traceability Using Blockchain.
        </h4>
        {/* Buttons */}
        <div className="flex gap-8 mt-6">
          <button className="px-9 py-3 rounded-2xl border-2 border-[#7764ad] text-white bg-[#5e4d99] text-sm font-medium hover:bg-[#6f59bd] transition">
            What to Expect ?
          </button>
          <button className="px-9 py-3 rounded-2xl border-2 border-[#7764ad] text-white bg-[#5e4d99] text-sm font-medium hover:bg-[#6f59bd] transition">
            Explore More
          </button>
    </div>
  </div>
</div>

      
      {/* Form Card */}
      <div className="flex flex-col justify-center items-center w-full xl:w-[52%] min-h-[550px] xl:min-h-screen px-4 xl:pr-[60px] py-14 xl:py-0">
         <div className="bg-[#4d388d] rounded-[32px] xl:rounded-[43px] border-2 border-[#7764ad] shadow-xl xl:shadow-2xl w-full max-w-[410px] xl:max-w-[510px] px-6 xl:px-[45px] py-9 xl:pt-[34px] xl:pb-[34px] z-20">
             <h2 className="text-white font-semibold text-2xl xl:text-3xl mb-7 xl:mb-[35px] text-left">Log in to OriginHash</h2>
          
             <form className="flex flex-col gap-2 xl:gap-3" onSubmit={handleSubmit}>
  {/* Email Field */}
  <div>
              <label htmlFor="email" className="block font-medium text-white mb-1 text-sm">Your Email</label>
              <div className="flex flex-row-reverse items-center border-2 border-[#7764ad] rounded-[8px] bg-[#4d388d] px-3 xl:px-3 py-3 focus-within:border-[#a1dbec] transition">
                <FaUser className="text-[#a1dbec] ml-1 text-base" />
                <input
                  id="email"
                  type="email"
                  className="bg-transparent text-white text-sm w-full outline-none "
                  placeholder="Your Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="username"
                />
              </div>
  </div>
  {/* Password Field */}
   <div>
              <label htmlFor="password" className="block font-medium text-white mb-1 text-sm">Your Password</label>
              <div className="flex flex-row-reverse items-center border-2 border-[#7764ad] rounded-[8px] bg-[#4d388d] px-3 xl:px-3 py-3 focus-within:border-[#a1dbec] transition">
                <FaLock className="text-[#a1dbec] ml-1 text-base" />
                <input
                  id="password"
                  type="password"
                  className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/40"
                  placeholder="Your Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
  </div>
  {/* Checkbox and Forgot Password */}
   <div className="flex items-center justify-end mt-0 mb-2">
              <button
                type="button"
                className="text-white text-xs font-medium hover:underline"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>

  {/* Submit Button */}
 <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#a1dbec] border-2 border-[#7764ad] hover:bg-[#8bc3d4] text-[#362779] font-semibold text-sm rounded-lg py-3 shadow transition"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
</form>
 <div className="flex flex-col items-center mt-5 xl:mt-8">
            <span className="text-white font-medium text-xs xl:text-sm mb-1">Don’t have an account?</span>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full bg-[#5e4d99] border-2 border-[#7764ad] text-white font-semibold text-sm rounded-lg py-3 mt-1 hover:bg-[#6f59bd] transition"
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
