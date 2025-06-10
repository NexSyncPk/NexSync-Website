import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../components/ui/index';
import { jobOpenings, benefits } from '../data/mockData';
import { MapPin, Clock, DollarSign, Users, Home, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefitIconMap = {
  Home,
  BookOpen,
  Star,
};

export const CareersPage: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredJobs = jobOpenings.filter(job => {
    const departmentMatch = selectedDepartment === 'all' || job.department === selectedDepartment;
    const typeMatch = selectedType === 'all' || job.type === selectedType;
    return departmentMatch && typeMatch;
  });

  const departments = ['all', 'development', 'design', 'marketing'];
  const types = ['all', 'full-time', 'internship', 'contract'];

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
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Join NexSync
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 mb-8">
              Build the future with us. We're looking for passionate individuals who want to make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                View Open Positions
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary-navy">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-navy mb-6">
              Why Work With Us?
            </h2>
            <p className="text-xl text-secondary-steel max-w-3xl mx-auto">
              Join a team that values innovation, growth, and work-life balance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefitIconMap[benefit.icon as keyof typeof benefitIconMap];
              
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full">
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
      </section>

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
                <span className="text-secondary-steel font-medium">Department:</span>
                {departments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedDepartment === dept
                        ? 'bg-primary-blue text-white'
                        : 'bg-white text-secondary-steel hover:bg-gray-100'
                    }`}
                  >
                    {dept.charAt(0).toUpperCase() + dept.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="space-x-2">
                <span className="text-secondary-steel font-medium">Type:</span>
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedType === type
                        ? 'bg-primary-orange text-white'
                        : 'bg-white text-secondary-steel hover:bg-gray-100'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:border-primary-blue">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-semibold text-secondary-navy">
                          {job.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.type === 'full-time' ? 'bg-green-100 text-green-800' :
                          job.type === 'internship' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {job.type.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-secondary-steel mb-4">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-secondary-steel mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          {job.department}
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            {job.salary}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-secondary-navy">Requirements:</h4>
                        <ul className="list-disc list-inside text-secondary-steel space-y-1">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <Link to="/contact">
                        <Button className="w-full lg:w-auto">
                          Apply Now
                        </Button>
                      </Link>
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
                No positions match your current filters. Try adjusting your search criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};
