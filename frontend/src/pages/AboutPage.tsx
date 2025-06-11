import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "../components";
import { companyValues } from "../data/mockData";
import { Lightbulb, Award, Users, TrendingUp, Shield } from "lucide-react";

const iconMap = {
  Lightbulb,
  Award,
  Users,
  TrendingUp,
  Shield,
};

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-primary-orange text-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="main-heading">
              About NexSync
            </h1>
            <p className="text-xl lg:text-2xl opacity-90">
              We're on a mission to build the future of digital experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-secondary-navy mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-secondary-steel leading-relaxed">
                To empower businesses with innovative digital solutions that
                drive growth, enhance user experiences, and create lasting
                value. We believe that great technology should be accessible,
                reliable, and transformative.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-64 bg-gradient-to-br from-secondary-teal to-primary-blue rounded-2xl shadow-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-background-ice">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="w-full h-64 bg-gradient-to-br from-primary-orange to-secondary-navy rounded-2xl shadow-xl"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl font-bold text-secondary-navy mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-secondary-steel leading-relaxed">
                To be the leading digital innovation partner for businesses
                worldwide, setting new standards for quality, creativity, and
                technological excellence. We envision a future where every
                business can harness the full potential of digital
                transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-xl text-secondary-steel max-w-3xl mx-auto">
              These core principles guide everything we do and shape our company
              culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = iconMap[value.icon as keyof typeof iconMap];

              return (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full shadow-xl ring-1 ring-slate-300 transition-all ease-linear duration-200">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-orange rounded-full flex items-center justify-center mx-auto">
                        <IconComponent size={32} className="text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-secondary-navy mb-4">
                      {value.title}
                    </h3>

                    <p className="text-secondary-steel">{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background-ice">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-navy mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-secondary-steel mb-12 max-w-3xl mx-auto">
              Our diverse team of experts brings together years of experience in
              technology, design, and business strategy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              {[1, 2, 3,4].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center transition-all ease-linear duration-200 ring-1 ring-slate-200 shadow-xl">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary-blue to-primary-orange rounded-full mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold text-secondary-navy mb-2">
                      Team Member {index + 1}
                    </h3>
                    <p className="text-secondary-steel mb-4">Position Title</p>
                    <p className="text-sm text-secondary-steel">
                      Coming soon - meet our amazing team members!
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
