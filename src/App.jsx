import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import GoogleCallback from "./components/GoogleCallback";
import NotFound from "./pages/NotFound";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import AdminLogin from "./pages/AdminLogin";
import DashboardLayout from "./components/Layout"
import IssueCertificate from "./pages/Issuecert";
import IssuedCertificates from "./pages/IssuedCertificates";
import VerifiedCertificates from "./pages/VerifiedCertificates";
import AllIssuedCertificates from "./pages/allIssuedCertificates";
import VerifyCertificate from "./pages/VerifyCertificate";
import UserDashboardLayout from "./components/UserLayout";
import PaymentPage from "./pages/PaymentCert";
import SuperAdminDashboardLayout from "./components/SuperAdminLayout";
import AllVerifiedCertificates from "./pages/AllVerifiedcertificates";
import AvailableCoursesPage  from "./pages/coursePage";
import CourseDetailsPage from "./pages/courseDetailsPage";
import ModulesPage from "./pages/CourseVideos";
import CreateCourse from "./pages/CreateCourse";
import AdminCourses from "./pages/AdminCourses";
import AuthLayout from "./components/AuthLayout";
import Footerauth from "./components/Footerauth";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <Router>
      <>
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path="/" element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route
            path="/courses"
            element={
              <UserDashboardLayout>
                <AvailableCoursesPage />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/course/:id"
            element={
              <UserDashboardLayout>
                <CourseDetailsPage />
              </UserDashboardLayout>
            }
          />
                    <Route
            path="/services"
            element={
              <UserDashboardLayout>
                <Dashboard />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/course-details"
            element={
              <UserDashboardLayout>
                <CourseDetails />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/verify"
            element={
              <UserDashboardLayout>
                <VerifyCertificate />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/verify/payment"
            element={
              <UserDashboardLayout>
                <PaymentPage />
              </UserDashboardLayout>
            }
          />

                    <Route
            path="admin/issue-certificate"
            element={
              <DashboardLayout>
                <IssueCertificate />
              </DashboardLayout>
            }
          />
                              <Route
            path="admin/issued-certificates"
            element={
              <DashboardLayout>
                <IssuedCertificates />
              </DashboardLayout>
            }
          />
                                        <Route
            path="admin/verified-certificates"
            element={
              <DashboardLayout>
                <VerifiedCertificates />
              </DashboardLayout>
            }
          />
          <Route
            path="admin/course-videos"
            element={
              <DashboardLayout>
                <ModulesPage />
              </DashboardLayout>
            }
          />
          <Route
            path="admin/create-course"
            element={
              <DashboardLayout>
                <CreateCourse />
              </DashboardLayout>
            }
          />
          <Route
            path="admin/courses"
            element={
              <DashboardLayout>
                <AdminCourses />
              </DashboardLayout>
            }
          />
                                        <Route
            path="superadmin/issued-certificates"
            element={
              <SuperAdminDashboardLayout>
                <AllIssuedCertificates />
              </SuperAdminDashboardLayout>
            }
          />
          <Route
            path="superadmin/verified-certificates"
            element={
              <SuperAdminDashboardLayout>
                <AllVerifiedCertificates />
              </SuperAdminDashboardLayout>
            }
          />
          
        
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/auth/callback" element={<GoogleCallback />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/superadmin-login" element={<AuthLayout><SuperAdminLogin /></AuthLayout>} />
          <Route path="admin-login/admincredentials" element={<AuthLayout><AdminLogin /></AuthLayout>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
