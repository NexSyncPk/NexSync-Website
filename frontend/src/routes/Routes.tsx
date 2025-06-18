import { Route, Routes as BrowserRoutes, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { CareersPage } from "../pages/CareersPage";
import { ContactPage } from "../pages/ContactPage";
import MainLayout from "../components/layouts/MainLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLogin from "../pages/AdminLogin";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import CurrentJobs from "../pages/CurrentJobs";
import ArchivedJobs from "../pages/ArchivedJobs";
import JobsOverview from "../pages/JobsOverview";
import AdminLayout from "../components/layouts/AdminLayout";
import MediaHomePage from "../pages/MediaHomePage/MediaHomePage";
import MediaAboutPage from "../pages/Media About Page/MediaAboutPage";
import MediaContactPage from "../pages/MediaContactPage";
import HighestAppliedJobs from "../components/sections/AppliedJobs";
import Traffic from "../pages/Traffic";
import UserEngagement from "../pages/UserEngagement";
import BounceRate from "../components/sections/BounceRate";
import ClickThroughRate from "../components/sections/ClickThroughRate";
import JobApplicationPage from "../pages/JobApplicationPage";

const Routes = () => {
  return (
    <BrowserRoutes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <AboutPage />
          </MainLayout>
        }
      />
      <Route
        path="/careers"
        element={
          <MainLayout>
            <CareersPage />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <ContactPage />
          </MainLayout>
        }
      />
      <Route
        path="/job/:id"
        element={
          <MainLayout>
            <JobApplicationPage />
          </MainLayout>
        }
      />{" "}
      {/* Login Route (redirect to admin login) */}
      <Route path="/login" element={<AdminLogin />} />
      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLogin />} />
      {/* Admin Routes with AdminLayout and Authentication */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/JobsManagement/ApplicationOverview"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <JobsOverview />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/JobsManagement/CurrentJobs"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <CurrentJobs />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/JobsManagement/ArchivedJobs"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ArchivedJobs />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      {/* Routes for Media Management can be added here as needed */}
      {/* Example Media Management Routes */}
      <Route
        path="/MediaManagement/HomePage"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <MediaHomePage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/MediaManagement/AboutPage"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <MediaAboutPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/MediaManagement/ContactPage"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <MediaContactPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      {/* Analytics Routes */}
      <Route
        path="/Analytics/AppliedJobs"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <HighestAppliedJobs />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Analytics/Traffic"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Traffic />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Analytics/UserEngagement"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <UserEngagement />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Analytics/BounceRate"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <BounceRate />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Analytics/ClickThroughRate"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ClickThroughRate />
            </AdminLayout>{" "}
          </ProtectedRoute>
        }
      />
      {/* Catch-all route - redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </BrowserRoutes>
  );
};

export default Routes;
