import {
  deleteJobApp,
  getAllJobApplications,
  handleResumeDownload,
} from "@/api/services";
import { ConfirmationModal } from "@/components";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  DollarSign,
  Calendar,
  FileText,
  Briefcase,
  Clock,
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAvailabilityBadge,
  getEducationLabel,
  getPositionBadge,
  formatDate,
  formatSalary,
} from "@/components/utils/helpers";
import type { JobApplication } from "@/types";
import { mockJobApplications } from "@/data/mockData";

// Types based on the migration schema

// Mock data for demonstration

const JobsOverview = () => {
  const [JobApplications, setJobApplications] = useState(mockJobApplications);

  // Delete modal state management
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] =
    useState<JobApplication | null>(null);
  const [deletingApplicationId, setDeletingApplicationId] = useState<
    number | null
  >(null);

  const fetchJobApplications = async () => {
    try {
      const response = await getAllJobApplications();
      if (response && response.data) {
        console.log("Job Applications fetched successfully:", response.data);
        setJobApplications(response.data);
      }
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  // Function to handle resume download

  useEffect(() => {
    fetchJobApplications();
  }, []);

  // Handle delete modal
  const handleDeleteClick = (application: JobApplication) => {
    setApplicationToDelete(application);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!applicationToDelete) return;

    if (deletingApplicationId === applicationToDelete.id) return; // Prevent multiple clicks

    setDeletingApplicationId(applicationToDelete.id);
    try {
      // Call API to delete job application
      const response = await deleteJobApp(
        applicationToDelete.id.toString(),
        "soft"
      );
      if (response && response.status) {
        console.log("Job Application deleted successfully:", response.data);
        toast.success("Job Application deleted successfully");
        // Refresh applications list after deletion
        await fetchJobApplications();
        setShowDeleteModal(false);
        setApplicationToDelete(null);
      } else {
        throw new Error("Failed to delete application");
      }
    } catch (error) {
      console.error("Error deleting job application:", error);
      toast.error("Failed to delete job application");
    } finally {
      setDeletingApplicationId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setApplicationToDelete(null);
  };

  // Legacy function for backward compatibility (should be replaced with handleDeleteClick)
  const handleRemoveApplication = (id: number) => {
    const application = JobApplications.find((app) => app.id === id);
    if (application) {
      handleDeleteClick(application);
    }
  };

  return (
    <div className="py-10 bg-background-ice mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-navy mb-4">
            Job Applications Overview
          </h2>
          <p className="text-lg text-secondary-steel max-w-3xl mx-auto">
            Review and manage job applications from talented candidates across
            various positions
          </p>

          <div className="grid grid-cols-2 md:grid-cols-2 max-sm:grid-cols-1 gap-6 mt-12 place-items-center">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-blue" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-secondary-navy">
                    {JobApplications.length}
                  </p>
                  <p className="text-sm text-secondary-steel">
                    Total Applications
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary-teal/10 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-blue" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-secondary-navy">
                    {JobApplications.filter((app) => !app.isDeleted).length}
                  </p>
                  <p className="text-sm text-secondary-steel">
                    Active Applications
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-orange/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary-orange" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-secondary-navy">
                    {
                      JobApplications.filter(
                        (app) => app.availability === "remote"
                      ).length
                    }
                  </p>
                  <p className="text-sm text-secondary-steel">
                    Remote Preference
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-secondary-navy">
                    {formatSalary(
                      JobApplications.reduce(
                        (avg, app) => avg + app.expectedSalary,
                        0
                      ) / JobApplications.length
                    )}
                  </p>
                  <p className="text-sm text-secondary-steel">
                    Avg. Expected Salary
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {JobApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-primary-blue to-secondary-teal p-6 text-white">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{application.name}</h3>
                      <p className="text-white/80">
                        Application #{application.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getAvailabilityBadge(
                        application.availability
                      )}`}
                    >
                      {application.availability.charAt(0).toUpperCase() +
                        application.availability.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Job Position Info */}
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">
                        {application.jobPosting.title}
                      </h4>
                      <p className="text-white/80">
                        {application.jobPosting.domain}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPositionBadge(
                        application.jobPosting.position
                      )}`}
                    >
                      {application.jobPosting.position.charAt(0).toUpperCase() +
                        application.jobPosting.position.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-3 text-primary-blue" />
                    <span className="text-sm truncate">
                      {application.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-end text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-primary-blue" />
                    <span className="text-sm">{application.phoneNumber}</span>
                  </div>
                  <div className="flex items-center text-gray-600 sm:col-span-2">
                    <MapPin className="w-4 h-4 mr-3 text-primary-blue" />
                    <span className="text-sm">{application.address}</span>
                  </div>
                </div>

                {/* Education & Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-3 text-secondary-teal" />
                    <div>
                      <p className="text-sm font-medium">
                        {getEducationLabel(application.lastEducation)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Class of {application.yearOfPassing}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end text-gray-600">
                    <DollarSign className="w-4 h-4 mr-3 text-secondary-teal" />
                    <div>
                      <p className="text-sm font-medium">
                        {formatSalary(application.expectedSalary)}
                      </p>
                      <p className="text-xs text-gray-500">Expected Salary</p>
                    </div>
                  </div>
                </div>

                {/* Salary Comparison */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-y-2 items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Salary Comparison
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div>
                          <p className="text-xs text-gray-500">Expected</p>
                          <p className="text-sm font-semibold text-primary-blue">
                            {formatSalary(application.expectedSalary)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Job Offers</p>
                          <p className="text-sm font-semibold text-secondary-teal">
                            {formatSalary(application.jobPosting.salary)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="max-sm:text-left text-right">
                      <p className="text-xs text-gray-500">Difference</p>
                      <p
                        className={`text-sm font-semibold ${
                          application.expectedSalary <=
                          application.jobPosting.salary
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {application.expectedSalary <=
                        application.jobPosting.salary
                          ? "+"
                          : ""}
                        {formatSalary(
                          application.jobPosting.salary -
                            application.expectedSalary
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resume & Application Date */}
                <div className="flex items-center justify-between mb-6 max-sm:flex-col max-sm:items-start max-sm:gap-y-2">
                  <div className="flex items-center text-gray-600">
                    <FileText className="w-4 h-4 mr-3 text-primary-orange" />
                    <div>
                      <p className="text-sm font-medium">
                        {application.resume}
                      </p>
                      <p className="text-xs text-gray-500">Resume</p>
                    </div>
                  </div>{" "}
                  <button
                    onClick={() => handleResumeDownload(application)}
                    className="flex items-center text-primary-blue hover:text-primary-blue/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      !application.resumeDownloadUrl &&
                      !application.resumeDirectUrl
                    }
                  >
                    <Download className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Download</span>
                  </button>
                </div>

                {/* Application Timeline */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Applied: {formatDate(application.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Updated: {formatDate(application.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleRemoveApplication(application?.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      Remove Application
                    </button>
                    {/* <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                      Schedule Interview
                    </button> */}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Briefcase className="w-3 h-3 mr-1" />
                    <span>Job ID: {application.jobPostingsId}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>{" "}
        {/* Summary Cards */}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Job Application"
        message={`Are you sure you want to delete the job application from "${applicationToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deletingApplicationId === applicationToDelete?.id}
        variant="danger"
      />
    </div>
  );
};

export default JobsOverview;
