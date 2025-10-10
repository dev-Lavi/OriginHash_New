// src/components/GoogleCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      toast.success("Google login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Google login failed!");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      Logging in via Google...
      <ToastContainer />
    </div>
  );
};

export default GoogleCallback;
