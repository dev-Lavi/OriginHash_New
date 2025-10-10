import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, isToday, isYesterday } from "date-fns";
import styles from "./allIssuedCertificates.module.css";
import axiosInstance from "../api/axiosInstance";
const AllIssuedCertificates = () => {
  const [certificates, setCertificates] = useState([]);

useEffect(() => {
  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get("/api/v1/certificates/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    }
  };

  fetchCertificates();
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

  const renderTableHeader = () => (
    <div className={`${styles.row} ${styles.headerRow}`}>
      <div>Issued to</div>
      <div>Course</div>
      <div>Contact</div>
      <div>Issue Date</div>
      <div>Expiry Date</div>
      <div>Certificate ID</div>
      <div>Preview</div>
    </div>
  );

  const renderCertificateRow = (cert, index) => (
    <div className={styles.row} key={cert._id}>
      <div>{cert.studentName}</div>
      <div>{cert.courseName}</div>
      <div>{cert.studentEmail}</div>
      <div>{format(new Date(cert.issueDate), "dd/MM/yyyy")}</div>
      <div>
        {cert.expiryDate
          ? format(new Date(cert.expiryDate), "dd/MM/yyyy")
          : "Null"}
      </div>
      <div>{cert.uniqueId}</div>
      <div>
        <a
          href={`${import.meta.env.VITE_BACKEND_URL}${cert.imageLink}`}
          alt="Certificate Preview"
          className={styles.previewLink}
        >
          Preview
        </a>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Issued Certificates</h2>
      {renderTableHeader()}

      {today.length > 0 && (
        <>
          <h3 className={styles.sectionTitle}>Today</h3>
          {today.map(renderCertificateRow)}
        </>
      )}

      {yesterday.length > 0 && (
        <>
          <h3 className={styles.sectionTitle}>Yesterday</h3>
          {yesterday.map(renderCertificateRow)}
        </>
      )}

      {older.length > 0 && (
        <>
          <h3 className={styles.sectionTitle}>Earlier</h3>
          {older.map(renderCertificateRow)}
        </>
      )}
    </div>
  );
};

export default AllIssuedCertificates;
