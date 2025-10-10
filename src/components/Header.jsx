import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "./Header.css";
import DashboardIcon from "../assets/icons/dashboard.svg";
import BookIcon from '../assets/icons/book.svg';
import CertificateIcon from '../assets/icons/certificate.svg';
import UpdateIcon from '../assets/icons/update.svg';

const Sidebar = ({ visible, onClose, activeSection, setActiveSection }) => {
  const [certDrop, setCertDrop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Set active sublink and expand dropdown
  useEffect(() => {
    if (
      location.pathname.startsWith("/admin/issued-certificates") ||
      location.pathname.startsWith("/admin/verified-certificates")
    ) {
      setActiveSection("cert");
      setCertDrop(true);
    }
  }, [location.pathname, setActiveSection]);

  const handleCertLinkClick = (path, section) => {
    navigate(path);
    setActiveSection("cert");
    onClose(); // Close sidebar after navigation
  };

  return (
    <div className={`sidebar ${visible ? "show" : ""}`}>
      <div className="sidebar-logo">
        <img src="/logo.svg" alt="Logo" height={32} />
        <span style={{ marginLeft: 12, fontWeight: "600", fontSize: 18 }}>OriginHash</span>
        <button className="sidebar-close-btn" onClick={onClose}>
          <FaTimes size={20} />
        </button>
      </div>

      <div className="sidebar-nav">
        {/* Dashboard */}
        <div
          className={`sidebar-link${activeSection === "dashboard" ? " active" : ""}`}
          onClick={() => {
            navigate("/admin/courses");
            setActiveSection("dashboard");
            onClose();
          }}
        >
          <img src={DashboardIcon} alt="Dahboard" className="w-8 h-8" />
          <span>Dashboard</span>
        </div>

        {/* My Courses */}
        <div
          className={`sidebar-link${activeSection === "courses" ? " active" : ""}`}
          onClick={() => {
            navigate("#");
            setActiveSection("courses");
            onClose();
          }}
        >
          <img src={BookIcon} alt="Book" className="w-8 h-8" />
          <span>Courses</span>
        </div>
      
        <div className="certificates-icon">
        <div
          className={`sidebar-link cert-link${activeSection === "cert" ? " active" : ""}`}
          onClick={() => setCertDrop(v => !v)}
        >
        <img src={CertificateIcon} alt="Certificate" className="w-8 h-8" />
          <span>Certificates</span>
          {certDrop ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </div>
        </div>
        {certDrop && (
          <div className="sidebar-dropdown">
            <div
              className={`sidebar-sublink${location.pathname === "/admin/issue-certificate" ? " active" : ""}`}
              onClick={() => handleCertLinkClick("/admin/issue-certificate", "cert")}
            >
              Issue
            </div>
            <div
              className={`sidebar-sublink${location.pathname === "/admin/issued-certificates" ? " active" : ""}`}
              onClick={() => handleCertLinkClick("/admin/issued-certificates", "cert")}
            >
              Issued
            </div>
            <div
              className={`sidebar-sublink${location.pathname === "/admin/verified-certificates" ? " active" : ""}`}
              onClick={() => handleCertLinkClick("/admin/verified-certificates", "cert")}
            >
              Verified
            </div>
          </div>
        )}

        
        
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-link">
          <AiOutlineSetting size={20} style={{ marginRight: 8 }} />
          Settings
        </div>
        <div className="sidebar-link">
          <AiOutlineLogout size={20} style={{ marginRight: 8 }} />
          Logout
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ onHamburger }) => (
  <div className="navbar">
    <button className="hamburger" onClick={onHamburger}>
      <FaBars size={22} />
    </button>

    <div className="navbar-logo">
      <img src="/logo.svg" alt="OriginHash Logo" height={28} />
      <span style={{ marginLeft: 8, fontWeight: 600 }}>OriginHash</span>
    </div>

    <div className="navbar-profile">
      <img src="/admin.jpg" alt="Admin Avatar" className="navbar-avatar" />
    </div>
  </div>
);

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("cert");

  return (
    <>
      <Navbar onHamburger={() => setSidebarOpen(v => !v)} />
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </>
  );
};

export default Header;
