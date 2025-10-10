import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footerauth = () => {
  return (
    <footer className="bg-[#4A3897] backdrop-blur-md text-light py-5">
      <div className="container">
        <div className="row">
          {/* Left side - Logo - Centered on mobile, left-aligned on large screens */}
          <div className="col-lg-4 col-md-12 mb-4 mb-lg-0 text-center text-lg-start">
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
              <img
                src="/glowlogo.svg"
                alt="OriginHash"
                className="me-3"
                style={{ width: "40px", height: "40px" }}
              />
              <span className="h5 mb-0 text-white">OriginHash</span>
            </div>
            <div className="mt-3 text-center text-lg-start">
              <p className="text-white small mb-0">
                © 2025 OriginHash. All rights reserved.
              </p>
              {/* Social Media Icons */}
              <div className="d-flex gap-3 text-black mt-4 justify-content-center justify-content-lg-start">
                <a
                  href="https://linkedin.com/company/originhash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover-text-primary"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="xl" color="white" />
                </a>

                <a
                  href="https://instagram.com/originhash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover-text-primary"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} size="xl" color="white" />
                </a>

                <a
                  href="https://twitter.com/originhash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover-text-primary"
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} size="xl" color="white" />
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Two sections with offset to push them right */}
          <div className="col-lg-6 offset-lg-2 col-md-12">
            <div className="row">
              {/* First Section - Centered on mobile, left-aligned on large screens */}
              <div className="col-lg-6 col-md-6 col-sm-6 mb-4 mb-lg-0 text-center text-lg-start">
                <h5 className="text-white mb-3">About Us</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a
                      href="/faq"
                      className="text-white text-decoration-none hover-link"
                    >
                      FAQ
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="/mission"
                      className="text-white text-decoration-none hover-link"
                    >
                      Mission
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="/vision"
                      className="text-white text-decoration-none hover-link"
                    >
                      Vision
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="/support"
                      className="text-white text-decoration-none hover-link"
                    >
                      Support
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="text-white text-decoration-none hover-link"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Second Section - Centered on mobile, left-aligned on large screens */}
              <div className="col-lg-6 col-md-6 col-sm-6 text-center text-lg-start">
                <h5 className="text-white mb-3">Services</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a
                      href="/tracking"
                      className="text-white text-decoration-none hover-link"
                    >
                      Tracking
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="/tracing"
                      className="text-white text-decoration-none hover-link"
                    >
                      Tracing
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="/verification"
                      className="text-white text-decoration-none hover-link"
                    >
                      Verification
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="/training"
                      className="text-white text-decoration-none hover-link"
                    >
                      Training
                    </a>
                  </li>
                  <li>
                    <a
                      href="/authentication"
                      className="text-white text-decoration-none hover-link"
                    >
                      Authentication
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for hover effects */}
      <style jsx>{`
        .hover-link:hover {
          color: #6c4cff !important;
          transition: color 0.3s ease;
        }

        @media (max-width: 768px) {
          .row > div {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footerauth;
