import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Button } from "../components";
import { benefits, mockJobs } from "../data/mockData";
import { DollarSign, Users, Home, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Job } from "@/types";
import { getJobs } from "@/api/services";

const benefitIconMap = {
  Home,
  BookOpen,
  Star,
};

export const CareersPage: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedPosition, setSelectedType] = useState<string>("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Simulating fetching jobs from an API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getJobs();
      if (response && response.data && response.data.length > 0) {
        console.log("Fetched jobs:", response.data);
        setJobs(response.data);
      } else {
        // Fallback to mock data if API fails or returns empty data
        setJobs(mockJobs);
        console.warn("API response was empty or invalid, using mock data");
        // Don't set error here since we're using fallback data
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      // Use mock data as fallback when API call fails
      setJobs(mockJobs);
      console.warn("API call failed, using mock data as fallback");
      // Optionally show a subtle warning instead of error
      // setError("Using sample data - API temporarily unavailable");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  // Re-fetch jobs when component becomes visible again (when navigating back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && jobs.length === 0) {
        fetchJobs();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [jobs.length]);
  const filteredJobs = jobs.filter((job: Job) => {
    const departmentMatch =
      selectedDomain === "all" || job.domain === selectedDomain;
    const typeMatch =
      selectedPosition === "all" || job.position === selectedPosition;
    return departmentMatch && typeMatch;
  });

  const domain = ["all", "development", "design", "marketing"];
  const position = ["all", "full-time", "intern", "contract"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-navy to-primary-blue text-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 main-heading">
              Join NexSync
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 mb-8">
              Build the future with us. We're looking for passionate individuals
              who want to make a difference.
            </p>{" "}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-md:items-center ">
              <Button
                className="btn-secondary"
                onClick={() => {
                  const jobSection = document.getElementById("open-positions");
                  if (jobSection) {
                    jobSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                View Open Positions
              </Button>
              <Link to="/contact">
                <Button className="border-white text-white hover:bg-white hover:text-secondary-navy px-14 bg-transparent border-2 ">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-navy mb-6">
              Why Work With Us?
            </h2>
            <p className="text-xl text-secondary-steel max-w-3xl mx-auto">
              Join a team that values innovation, growth, and work-life balance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent =
                benefitIconMap[benefit.icon as keyof typeof benefitIconMap];

              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full shadow-xl ease-linear duration-200 transition-all ring-1 ring-slate-300">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-orange rounded-full flex items-center justify-center mx-auto">
                        <IconComponent size={32} className="text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-secondary-navy mb-4">
                      {benefit.title}
                    </h3>

                    <p className="text-secondary-steel">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>{" "}
      {/* Job Listings */}
      <section id="open-positions" className="py-20 bg-background-ice">
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

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
              <p className="mt-4 text-lg text-secondary-steel">
                Loading positions...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-xl text-red-600 mb-4">{error}</p>
              <Button
                onClick={fetchJobs}
                className="bg-primary-blue text-white hover:bg-primary-blue/90"
              >
                Try Again
              </Button>
            </div>
          )}

          {!loading && !error && (
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
                      </div>

                      <div className="mt-6 lg:mt-0 lg:ml-8">
                        <Link to={`/job/${job.id}`}>
                          {" "}
                          <Button className="w-full lg:w-auto">
                            Apply Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>{" "}
                </motion.div>
              ))}
            </div>
          )}

          {!loading && !error && filteredJobs.length === 0 && (
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
        </div>
      </section>
    </div>
  );
};
