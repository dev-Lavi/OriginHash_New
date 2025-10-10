import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IssueCertificate = () => {
  const [form, setForm] = useState({
    studentEmail: '',
    studentName: '',
    courseName: '',
    issueDate: '',
    expiryDate: '',
  });
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setShowPreview(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/api/v1/certs/issue",
        {
          studentEmail: form.studentEmail,
          studentName: form.studentName,
          courseName: form.courseName,
          issueDate: form.issueDate,
          expiryDate: form.expiryDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setResponse(res.data.certificate);
      setShowPreview(true);
      toast.success("Certificate issued successfully!");
    } catch (err) {
      const message = err.response?.data?.message || 'An error occurred';
      setError(message);
      setShowPreview(false);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <ToastContainer />
      <h2 className="text-center mb-4 fw-bold">📜 Issue Certificate</h2>

      <div className="row g-4">
        {/* Form Section */}
        <div className="col-lg-6">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title mb-3">Enter Certificate Details</h5>
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="studentEmail" placeholder="Email"
                    required name="studentEmail" value={form.studentEmail} onChange={handleChange} />
                  <label htmlFor="studentEmail">Student Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="studentName" placeholder="Name"
                    required name="studentName" value={form.studentName} onChange={handleChange} />
                  <label htmlFor="studentName">Student Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="courseName" placeholder="Course"
                    required name="courseName" value={form.courseName} onChange={handleChange} />
                  <label htmlFor="courseName">Course Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="date" className="form-control" id="issueDate"
                    required name="issueDate" value={form.issueDate} onChange={handleChange} />
                  <label htmlFor="issueDate">Issue Date</label>
                </div>

                <div className="form-floating mb-3"> 
  <input
    type="date"
    className="form-control"
    id="expiryDate"
    name="expiryDate"
    value={form.expiryDate}
    onChange={(e) => {
      setForm({
        ...form,
        expiryDate: e.target.value // "" if not chosen
      });
    }}
  />
  <label htmlFor="expiryDate">Expiry Date</label>
</div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Issuing..." : "Issue Certificate"}
                </button>
              </form>
            </div>
          </div>
        </div>

        
{/* Preview Section */}
<div className="col-lg-6">
  <div className="card shadow border-0">
    <div className="card-body text-center">
      <h5 className="card-title mb-3">Certificate Preview</h5>

      {showPreview && response ? (
        <>
          <div className="border rounded p-3 mb-3 bg-light">
            {/* Show image preview */}
             <img 
  src={response.pngUrl} 
  alt="Certificate Preview"
  className="img-fluid mb-3 border"
  style={{ maxHeight: "400px", objectFit: "contain" }}
/>
          </div>

          <div className="d-flex gap-2 justify-content-center">
            {response.pngUrl && (
              <a
                href={`${response.pngUrl.split("\\").pop()}`}
                download
                className="btn btn-outline-success btn-sm"
              >
                Download PNG
              </a>
            )}
            {response.pdfUrl && (
              <a
                href={`${response.pdfUrl.split("\\").pop()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-danger btn-sm"
              >
                View PDF
              </a>
            )}
          </div>
        </>
      ) : (
        <p className="text-muted">
          Fill in the details and click <b>Issue</b> to preview the certificate.
        </p>
      )}
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default IssueCertificate;
