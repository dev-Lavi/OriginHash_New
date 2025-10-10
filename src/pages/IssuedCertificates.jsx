import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './IssuedCertificates.module.css';
import { format } from 'date-fns';
import { isToday, isYesterday } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion'; // ✅ Import Framer Motion
import axiosInstance from '../api/axiosInstance';


const IssuedCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/certificates/my-issued", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCertificates(res.data.certificates);
      } catch (err) {
        toast.error("Failed to fetch issued certificates.");
        console.error(err);
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

    certificates.forEach(cert => {
      const createdDate = new Date(cert.createdAt);

      if (isToday(createdDate)) {
        today.push(cert);
      } else if (isYesterday(createdDate)) {
        yesterday.push(cert);
      } else {
        older.push(cert);
      }
    });

    return { today, yesterday, older };
  };

  const { today, yesterday, older } = groupCertificates();

  const renderSection = (label, data) => {
    if (data.length === 0) return null;

    return (
      <>
        <div className={styles.sectionLabel}>{label}</div>
        <AnimatePresence>
          {data.map((cert, index) => (
            <motion.div
              key={cert._id}
              className={styles.certificateRow}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }} // ✅ stagger effect
            >
              <div>{cert.studentName}</div>
              <div>{cert.courseName}</div>
              <div>{cert.studentEmail}</div>
              <div>{format(new Date(cert.issueDate), 'dd/MM/yyyy')}</div>
              <div>{cert.expiryDate ? format(new Date(cert.expiryDate), 'dd/MM/yyyy') : 'Null'}</div>
              <div>{cert.uniqueId}</div>
              <div>
                <a
                  href={`${import.meta.env.VITE_BACKEND_URL}${cert.imageLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.previewBtn}
                >
                  Preview
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </>
    );
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <h2 className={styles.pageTitle}>Issued Certificates</h2>

      <div className={styles.tableHeader}>
        <div>Issued to</div>
        <div>Course</div>
        <div>Contact</div>
        <div>Issue Date</div>
        <div>Expiry Date</div>
        <div>Certificate ID</div>
        <div>Preview</div>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading certificates...</div> // ✅ Custom loader class
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

export default IssuedCertificates;
