import { motion } from "framer-motion";
import { Card, Button } from "../components";
import { MapPin, DollarSign, Users } from "lucide-react";
import { jobOpenings } from "../data/mockData";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreatePostForm from "../components/utils/CreatePostForm";
import type { Job } from "@/types";
import { getJobs } from "@/api/services";

export const CurrentJobs: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedPosition, setSelectedType] = useState<string>("all");

  const [jobs, setJobs] = useState<Job[]>([]);
  // Simulating fetching jobs from an API
  const fetchJobs = async () => {
    const response = await getJobs();
    if (response && response.data) {
      console.log("Fetched jobs:", response.data);
      setJobs(response.data);
    } else {
      console.error("Failed to fetch job postings");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchJobs();
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchData();
  }, []);

  const filteredJobs = (jobs.length !== 0 ? jobs : jobs).filter((job: Job) => {
    const departmentMatch =
      selectedDomain === "all" || job.domain === selectedDomain;
    const typeMatch =
      selectedPosition === "all" || job.position === selectedPosition;
    return departmentMatch && typeMatch;
  });

  const domain = ["all", "development", "design", "marketing"];
  const position = ["all", "full-time", "intern", "contract"];

  const [form, setForm] = useState(false);

  const user = "admin";

  return (
    <section className="py-20 bg-background-ice ">
      <div className="absolute w-28 h-14 bg-red-200 top-14 right-2">
        <Button className="w-full h-full" onClick={() => setForm(true)}>
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
            </div>
          </motion.div>

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

                    <div className="mt-6 lg:mt-0 lg:ml-8 flex flex-col lg:flex-row gap-4">
                      <Button className="w-full lg:w-auto">Archived</Button>
                      <Button className="w-full lg:w-auto bg-red-500">
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
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
      {form && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-20">
          <CreatePostForm setForm={setForm} />
        </div>
      )}
    </section>
  );
};

export default CurrentJobs;
