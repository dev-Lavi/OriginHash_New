import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/axiosInstance";

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axiosInstance.post(
      `/api/v1/users/reset-password/${token}`,
      { newPassword } // axios automatically sends JSON
    );

    toast.success("Password reset successful!");
    setTimeout(() => navigate("/"), 2000); // redirect to login
  } catch (err) {
    if (err.response) {
      // Server responded with 400/500
      toast.error(err.response.data.message || "Something went wrong.");
    } else {
      // Network / server unreachable
      toast.error("Error connecting to server.");
    }
  } finally {
    setLoading(false);
  }
};

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
      
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border bg-gray-100 outline-none"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6C4CFF] text-white py-3 rounded-xl font-semibold hover:bg-[#5c3fe0] transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassword;
