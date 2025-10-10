import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const verifyEmail = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/verify/${token}`
    );

    // Since backend returns 200 for success, this will only run on success
    setMessage(`✅ ${res.data.message}`);
    toast.success(res.data.message);
    setTimeout(() => navigate("/"), 2000);
    
  } catch (err) {
    console.error('Verification error:', err);

    // Handle 400 and other error status codes
    const errorMsg = err.response?.data?.message || "Verification failed";
    
    setMessage(`❌ ${errorMsg}`);
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6C4CFF]/50 to-[#edeef7]/60 p-4">

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
      
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        {loading ? (
          <p className="text-gray-600">Verifying your email...</p>
        ) : (
          <p className="text-sm text-gray-700">{message}</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;
