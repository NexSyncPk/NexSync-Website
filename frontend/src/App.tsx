<<<<<<< HEAD

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { CareersPage } from "./pages/CareersPage";
import { ContactPage } from "./pages/ContactPage";
import ScrollToTop from "./components/utils/ScrollToTop";
import MainLayout from "./components/layouts/MainLayout";
import AdminDashboard from "./pages/AdminDashboard";
import CurrentJobs from "./components/sections/CurrentJobs";
import ArchivedJobs from "./components/sections/ArchivedJobs";
import JobsOverview from "./components/sections/JobsOverview";
import AdminLayout from "./components/layouts/AdminLayout";
import MediaHomePage from "./components/sections/MediaHomePage";
import MediaAboutPage from "./components/sections/MediaAboutPage";
import MediaCareersPage from "./components/sections/MediaCareersPage";
import MediaContactPage from "./components/sections/MediaContactPage";
import HighestAppliedJobs from "./components/sections/AppliedJobs";
import Traffic from "./components/sections/Traffic";
import UserEngagement from "./components/sections/UserEngagement";
import BounceRate from "./components/sections/BounceRate";
import ClickThroughRate from "./components/sections/ClickThroughRate";
import JobApplicationPage from "./pages/JobApplicationPage";
import { Toaster } from "react-hot-toast";
>>>>>>> 827af8b ([FIX]: Apply Job Form Created and some of the error in different components fixed)

function App() {
  return (
    <Router>
<<<<<<< HEAD
=======
      <Toaster />
      <ScrollToTop />
>>>>>>> 827af8b ([FIX]: Apply Job Form Created and some of the error in different components fixed)
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
=======
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
>>>>>>> 827af8b ([FIX]: Apply Job Form Created and some of the error in different components fixed)
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
