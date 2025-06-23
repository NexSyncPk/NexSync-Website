import { motion } from "framer-motion";
import { Card, Button, ConfirmationModal } from "../components";
import { DollarSign, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreatePostForm from "../components/utils/CreatePostForm";
import type { Job } from "@/types";
import { deleteJobById, getJobs, toggleJobArchive } from "@/api/services";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

export const CurrentJobs: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedPosition, setSelectedType] = useState<string>("all");
  const { setIsFormOpen } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await getJobs();
      if (response && response.data) {
        console.log("Fetched jobs:", response.data);
        setJobs(response.data);
      } else {
        console.error("Failed to fetch job postings");
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on selected criteria
  const filteredJobs = jobs.filter((job: Job) => {
    const departmentMatch =
      selectedDomain === "all" || job.domain === selectedDomain;
    const typeMatch =
      selectedPosition === "all" || job.position === selectedPosition;
    return departmentMatch && typeMatch;
  });
  const domain = ["all", "development", "design", "marketing"];
  const position = ["all", "full-time", "intern", "contract"];
  const [form, setForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<number | null>(null);
  const [archivingJobId, setArchivingJobId] = useState<number | null>(null);

  // Handle delete modal
  const handleDeleteClick = (job: Job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return;

    if (deletingJobId === jobToDelete.id) return; // Prevent multiple clicks

    setDeletingJobId(jobToDelete.id);
    try {
      // Call API to delete job by ID
      await deleteJobById(jobToDelete.id.toString());
      console.log("Job deleted successfully");
      toast.success("Job deleted successfully");
      // Refresh job list after deletion
      await fetchJobs();
      setShowDeleteModal(false);
      setJobToDelete(null);
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    } finally {
      setDeletingJobId(null);
    }
  };
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setJobToDelete(null);
  };
  const handleToggleArchive = async (jobId: number) => {
    if (archivingJobId === jobId) return; // Prevent multiple clicks

    setArchivingJobId(jobId);
    try {
      const response = await toggleJobArchive(jobId.toString());
      if (response) {
        console.log("Job archive status toggled successfully:", response);
        // Refresh job list after toggling archive status
        toast.success("Job archive status updated successfully");
        fetchJobs();
      } else {
        console.error("Failed to toggle job archive status");
        toast.error("Failed to toggle job archive status");
      }
    } catch (error) {
      console.error("Error toggling job archive status:", error);
      toast.error("Error toggling job archive status. Please try again.");
    } finally {
      setArchivingJobId(null);
    }
  };

  return (
    <section className=" py-20 bg-background-ice">
      <div className="absolute w-28 h-14 bg-red-200 top-14 right-2">
        <Button
          className="w-full h-full"
          onClick={() => {
            setIsFormOpen(true);
            setForm(true);
          }}
        >
          Create
        </Button>
      </div>
      {/* Job Listings */}
      <section className="py-20 bg-background-ice">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-navy mb-6 text-center">
              Open Positions
            </h2>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <div className="space-x-2">
                <span className="text-secondary-steel font-medium">
                  Department:
                </span>
                {domain.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDomain(dept)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedDomain === dept
                        ? "bg-primary-blue text-white"
                        : "bg-white text-secondary-steel hover:bg-gray-100"
                    }`}
                  >
                    {dept.charAt(0).toUpperCase() + dept.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-x-2">
                <span className="text-secondary-steel font-medium">Type:</span>
                {position.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedPosition === type
                        ? "bg-primary-orange text-white"
                        : "bg-white text-secondary-steel hover:bg-gray-100"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() +
                      type.slice(1).replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>{" "}
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
              <span className="ml-3 text-lg text-secondary-steel">
                Loading jobs...
              </span>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {filteredJobs.map((job: Job, index: number) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:border-primary-blue hover:scale-[1.02] transition-all ease-linear duration-200 ring-1 ring-slate-200 shadow-xl">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <h3 className="text-2xl font-semibold text-secondary-navy">
                              {job.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                job.position === "full-time"
                                  ? "bg-green-100 text-green-800"
                                  : job.position === "intern"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {job.position.replace("-", " ").toUpperCase()}
                            </span>
                          </div>

                          <p className="text-secondary-steel mb-4">
                            {job.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-secondary-steel mb-4">
                            <div className="flex items-center gap-1">
                              <Users size={16} />
                              {job.domain}
                            </div>
                            {job.salary && (
                              <div className="flex items-center gap-1">
                                <DollarSign size={16} />
                                {job.salary}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium text-secondary-navy">
                              Requirements:
                            </h4>
                            <ul className="list-disc list-inside text-secondary-steel space-y-1">
                              {job?.requirements?.map((req, idx) => (
                                <li key={idx}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        </div>{" "}
                        <div className="mt-6 lg:mt-0 lg:ml-8 flex flex-col lg:flex-row gap-4">
                          <Button
                            className="w-full lg:w-auto"
                            onClick={() => handleToggleArchive(job?.id)}
                            disabled={archivingJobId === job.id}
                          >
                            {archivingJobId === job.id
                              ? "Processing..."
                              : job.isArchived
                              ? "Unarchive"
                              : "Archive"}
                          </Button>{" "}
                          <Button
                            className="w-full lg:w-auto bg-red-500 hover:bg-red-600"
                            onClick={() => handleDeleteClick(job)}
                            disabled={deletingJobId === job.id}
                          >
                            {deletingJobId === job.id
                              ? "Deleting..."
                              : "Delete"}
                          </Button>
                        </div>{" "}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {!isLoading && filteredJobs.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center py-12"
                >
                  <p className="text-xl text-secondary-steel">
                    No positions match your current filters. Try adjusting your
                    search criteria.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>{" "}
      {form && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-20">
          <CreatePostForm setForm={setForm} fetchJobs={fetchJobs} />
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Job"
        message={`Are you sure you want to delete the job "${jobToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deletingJobId === jobToDelete?.id}
        variant="danger"
      />
    </section>
  );
};

export default CurrentJobs;
