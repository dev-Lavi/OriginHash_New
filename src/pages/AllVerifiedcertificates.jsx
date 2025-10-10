// src/pages/VerifiedCertificates.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { isToday, isYesterday, format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./AllVerifiedCertificates.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const AllVerifiedCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/v1/certificates/all-verified",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCertificates(res.data.certificates || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch verified certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [token]);

  const groupCertificates = () => {
    const today = [];
    const yesterday = [];
    const older = [];

    certificates.forEach((cert) => {
      const createdDate = new Date(cert.createdAt);
      if (isToday(createdDate)) today.push(cert);
      else if (isYesterday(createdDate)) yesterday.push(cert);
      else older.push(cert);
    });

    return { today, yesterday, older };
  };

  const { today, yesterday, older } = groupCertificates();

  const renderSection = (label, data) => {
    if (!data.length) return null;

return (
  <motion.div
    className={styles.section}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h3 className={styles.sectionTitle}>{label}</h3>
    <AnimatePresence>
      {data.map((cert, index) => (
        <motion.div
          key={cert._id}
          className={styles.card}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
          }}
        >
          <div data-label="Verified by">{cert.studentName}</div>
          <div data-label="Course">{cert.courseName}</div>
          <div data-label="Contact">{cert.studentEmail}</div>
          <div data-label="Issue Date">
            {format(new Date(cert.issueDate), "dd/MM/yyyy")}
          </div>
          <div data-label="Expiry Date">
            {cert.expiryDate
              ? format(new Date(cert.expiryDate), "dd/MM/yyyy")
              : "Null"}
          </div>
          <div data-label="Certificate ID">{cert.uniqueId}</div>
          <div
            data-label="Payment"
            className={
              cert.verified ? styles.successStatus : styles.failedStatus
            }
          >
            {cert.verified ? "Success" : "No"}
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
);
    };

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <h2 className={styles.pageTitle}>Verified Certificates</h2>

      {/* Table Header */}
      <div className={styles.tableHeader}>
        <div>Verified by</div>
        <div>Course</div>
        <div>Contact</div>
        <div>Issue Date</div>
        <div>Expiry Date</div>
        <div>Certificate ID</div>
        <div>Payment</div>
      </div>

      {loading ? (
        <div>
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              height={50}
              style={{ marginBottom: "10px", borderRadius: "8px" }}
            />
          ))}
        </div>
      ) : (
        <>
          {renderSection("Today", today)}
          {renderSection("Yesterday", yesterday)}
          {renderSection("Earlier", older)}
        </>
      )}
    </div>
  );
};

export default AllVerifiedCertificates;
