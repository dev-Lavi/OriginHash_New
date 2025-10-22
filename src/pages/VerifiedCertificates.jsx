import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, isToday, isYesterday } from "date-fns";
import styles from "./VerifiedCertificates.module.css";
import axiosInstance from "../api/axiosInstance";

const VerifiedCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerifiedCertificates = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/certificates/my-verified`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setCertificates(response.data.certificates);
        } else {
          console.error("Failed to fetch certificates");
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerifiedCertificates();
  }, []);

  const groupCertificatesByDate = () => {
    const today = [];
    const yesterday = [];
    const older = [];

    certificates.forEach((cert) => {
      const createdAt = new Date(cert.createdAt);
      if (isToday(createdAt)) today.push(cert);
      else if (isYesterday(createdAt)) yesterday.push(cert);
      else older.push(cert);
    });

    return { today, yesterday, older };
  };

  const { today, yesterday, older } = groupCertificatesByDate();

  const renderCertificateRow = (cert, index) => (
    <div className={`${styles.row} ${styles.fadeIn}`} key={cert._id} style={{ animationDelay: `${index * 0.1}s` }}>
      <div>{cert.studentName}</div>
      <div>{cert.courseName}</div>
      <div>{cert.studentEmail}</div>
      <div>{format(new Date(cert.issueDate), "dd/MM/yyyy")}</div>
      <div>{cert.expiryDate ? format(new Date(cert.expiryDate), "dd/MM/yyyy") : "Null"}</div>
      <div>{cert.uniqueId}</div>
      <div className={cert.verified ? styles.success : styles.failed}>
        {cert.verified ? "Success" : "No"}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 lg:ml-64">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Verified Certificates</h2>

        <div className={styles.container}>
          <div className={`${styles.row} ${styles.headerRow}`}>
            <div>Verified by</div>
            <div>Course</div>
            <div>Contact</div>
            <div>Issue Date</div>
            <div>Expiry Date</div>
            <div>Certificate ID</div>
            <div>Payment</div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading certificates...</div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No verified certificates found.</p>
            </div>
          ) : (
            <>
              {today.length > 0 && (
                <>
                  <h3 className={styles.sectionTitle}>Today</h3>
                  {today.map((cert, i) => renderCertificateRow(cert, i))}
                </>
              )}

              {yesterday.length > 0 && (
                <>
                  <h3 className={styles.sectionTitle}>Yesterday</h3>
                  {yesterday.map((cert, i) => renderCertificateRow(cert, i))}
                </>
              )}

              {older.length > 0 && (
                <>
                  <h3 className={styles.sectionTitle}>Earlier</h3>
                  {older.map((cert, i) => renderCertificateRow(cert, i))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifiedCertificates;
