import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../api/axiosInstance";

export default function PaymentPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvCode, setCvCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState(null); // ✅ For preview

  const uniqueId = localStorage.getItem("uniqueId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uniqueId) {
      toast.error("No uniqueId found. Please verify certificate first.", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      const res = await axiosInstance.post(
    "/api/v1/cert/verify/payment",
        {
          uniqueId,
          cardNumber,
          expiryMonth,
          expiryYear,
          cvCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Payment successful!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });

      // ✅ Store certificate for preview
      setCertificate(res.data.cert);

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment failed", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Payment Form */}
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">💳 Payment Details</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Valid Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Expiry Month</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    required
                  />
                </div>
                <div className="col">
                  <label className="form-label">Expiry Year</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="YY"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    required
                  />
                </div>
                <div className="col">
                  <label className="form-label">CV Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CV"
                    value={cvCode}
                    onChange={(e) => setCvCode(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <strong>Final Payment</strong>
                <span>$4200</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ✅ Certificate Preview */}
      {certificate && (
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 text-center">
            <h3>🎉 Payment Successful! Here’s your Certificate</h3>
            <img
              src={certificate.pngUrl}
              alt="Certificate"
              className="img-fluid border rounded shadow mt-3"
            />
            <div className="mt-3">
              <a
                href={certificate.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success me-2"
              >
                Download PDF
              </a>
              <a
                href={certificate.pngUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary"
              >
                Download PNG
              </a>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
