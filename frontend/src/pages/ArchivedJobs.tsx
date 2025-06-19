import { motion } from "framer-motion";
import { Card, Button, ConfirmationModal } from "../components";
import { DollarSign, Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { Job } from "@/types";
import {
  getArchivedJobs,
  deleteJobById,
  toggleJobArchive,
} from "@/api/services";
import toast from "react-hot-toast";

const ArchivedJobs = () => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  const [archivedJobs, setArchivedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingJobId, setDeletingJobId] = useState<number | null>(null);
  const [unarchivingJobId, setUnarchivingJobId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null); // Simulate fetching archived jobs (replace with actual API call)
  const fetchArchivedJobs = async () => {
    setIsLoading(true);
    try {
      const response = await getArchivedJobs();
      if (response && response.data) {
        setArchivedJobs(response.data);
      } else {
        console.error("Failed to fetch archived jobs");
        setArchivedJobs([]); // Set empty array if no data
      }
    } catch (error) {
      console.error("Error fetching archived jobs:", error);
      toast.error("Failed to fetch archived jobs");
      setArchivedJobs([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };
  // Fetch archived jobs when component mounts
  useEffect(() => {
    fetchArchivedJobs();
  }, []);

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
      await fetchArchivedJobs();
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
    if (unarchivingJobId === jobId) return; // Prevent multiple clicks

    setUnarchivingJobId(jobId);
    try {
      await toggleJobArchive(jobId.toString());
      console.log("Job archive status toggled successfully");
      toast.success("Job unarchived successfully");
      // Refresh job list after toggling archive status
      await fetchArchivedJobs();
    } catch (error) {
      console.error("Error toggling job archive status:", error);
      toast.error("Failed to unarchive job");
    } finally {
      setUnarchivingJobId(null);
    }
  };

  return (
    <div className="w-full min-h-[95vh] bg-background-ice flex flex-col items-center mt-10">
      <motion.h1
        className="text-4xl font-bold mt-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Archived Jobs
      </motion.h1>

      {isLoading ? (
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg text-secondary-steel">
            Loading archived jobs...
          </p>
        </motion.div>
      ) : archivedJobs.length !== 0 ? (
        <motion.div
          key={`archived-jobs-${archivedJobs.length}`}
          className="space-y-6 mt-10 w-full max-w-4xl px-4 pb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {archivedJobs.map((job, index) => (
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
                      disabled={unarchivingJobId === job?.id}
                    >
                      {unarchivingJobId === job?.id
                        ? "Unarchiving..."
                        : "Unarchive"}
                    </Button>
                    <Button
                      className="w-full lg:w-auto bg-red-500 hover:bg-red-600"
                      onClick={() => handleDeleteClick(job)}
                      disabled={deletingJobId === job.id}
                    >
                      {deletingJobId === job.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>{" "}
                </div>
              </Card>
            </motion.div>
          ))}{" "}
        </motion.div>
      ) : (
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg text-secondary-steel">
            No archived jobs found. All your archived jobs will be displayed
            here.
          </p>{" "}
        </motion.div>
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
    </div>
  );
};

export default ArchivedJobs;
