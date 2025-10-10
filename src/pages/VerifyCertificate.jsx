import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import axiosInstance from "../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./VerifyCertificate.css";

const VerifyCertificate = () => {
  const [certId, setCertId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      const response = await axiosInstance.post(
        "/api/v1/cert/verify",
        { uniqueId: certId },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success, cert, message } = response.data;

      if (success && cert) {
        localStorage.setItem("uniqueId", cert.uniqueId);

        // ✅ Success toast
        toast.success("✅ Certificate found! Proceed to payment", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
        });

        // Navigate after short delay so user sees the toast
        setTimeout(() => {
          navigate("/verify/payment", { state: { cert } });
        }, 1200);
      } else {
        toast.error(message || "Invalid certificate or verification failed.", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <div className="icon-center">
          <MdVerified size={48} color="#5E5ADB" />
        </div>
        <h2>Verify Certificate</h2>
        <p style={{ marginBottom: "1rem", color: "#555" }}>
          Enter your certificate ID to verify
        </p>

        <input
          type="text"
          placeholder="Enter certificate ID"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          className="verify-input"
        />

        <button
          className="verify-button"
          onClick={handleVerify}
          disabled={loading || !certId.trim()}
        >
          {loading ? "Verifying..." : "Pay to Verify"}
        </button>
      </div>

      {/* ✅ Toast container */}
      <ToastContainer />
    </div>
  );
};

export default VerifyCertificate;
