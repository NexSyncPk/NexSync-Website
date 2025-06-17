import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { CareersPage } from "./pages/CareersPage";
import { ContactPage } from "./pages/ContactPage";
import ScrollToTop from "./components/utils/ScrollToTop";
import MainLayout from "./components/layouts/MainLayout";
import AdminDashboard from "./pages/AdminDashboard";
import CurrentJobs from "./pages/CurrentJobs";
import ArchivedJobs from "./pages/ArchivedJobs";
import JobsOverview from "./pages/JobsOverview";
import AdminLayout from "./components/layouts/AdminLayout";
import MediaHomePage from "./pages/MediaHomePage/MediaHomePage";
import MediaAboutPage from "./pages/MediaAboutPage";
import MediaCareersPage from "./pages/MediaCareersPage";
import MediaContactPage from "./pages/MediaContactPage";
import HighestAppliedJobs from "./components/sections/AppliedJobs";
import Traffic from "./pages/Traffic";
import UserEngagement from "./pages/UserEngagement";
import BounceRate from "./components/sections/BounceRate";
import ClickThroughRate from "./components/sections/ClickThroughRate";
import JobApplicationPage from "./pages/JobApplicationPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Routes>
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
            />

            {/* Admin Routes with AdminLayout */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />

            <Route
              path="/JobsManagement/ApplicationOverview"
              element={
                <AdminLayout>
                  <JobsOverview />
                </AdminLayout>
              }
            />

            <Route
              path="/JobsManagement/CurrentJobs"
              element={
                <AdminLayout>
                  <CurrentJobs />
                </AdminLayout>
              }
            />
            <Route
              path="/JobsManagement/ArchivedJobs"
              element={
                <AdminLayout>
                  <ArchivedJobs />
                </AdminLayout>
              }
            />
            {/* Routes for Media Management can be added here as needed */}
            {/* Example Media Management Routes */}
            <Route
              path="/MediaManagement/HomePage"
              element={
                <AdminLayout>
                  <MediaHomePage />
                </AdminLayout>
              }
            />
            <Route
              path="/MediaManagement/AboutPage"
              element={
                <AdminLayout>
                  <MediaAboutPage />
                </AdminLayout>
              }
            />
            <Route
              path="/MediaManagement/CareersPage"
              element={
                <AdminLayout>
                  <MediaCareersPage />
                </AdminLayout>
              }
            />
            <Route
              path="/MediaManagement/ContactPage"
              element={
                <AdminLayout>
                  <MediaContactPage />
                </AdminLayout>
              }
            />

            {/* Analytics Routes */}
            <Route
              path="/Analytics/AppliedJobs"
              element={
                <AdminLayout>
                  <HighestAppliedJobs />
                </AdminLayout>
              }
            />
            <Route
              path="/Analytics/Traffic"
              element={
                <AdminLayout>
                  <Traffic />
                </AdminLayout>
              }
            />
            <Route
              path="/Analytics/UserEngagement"
              element={
                <AdminLayout>
                  <UserEngagement />
                </AdminLayout>
              }
            />
            <Route
              path="/Analytics/BounceRate"
              element={
                <AdminLayout>
                  <BounceRate />
                </AdminLayout>
              }
            />
            <Route
              path="/Analytics/ClickThroughRate"
              element={
                <AdminLayout>
                  <ClickThroughRate />
                </AdminLayout>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
