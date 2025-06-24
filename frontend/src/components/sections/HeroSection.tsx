import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Target } from "lucide-react";
import { Button } from "../ui/index.tsx";
import { Link } from "react-router-dom";
import { getHeroSectionData } from "@/api/services/userService.ts";
import { type HeroSectionAttributes } from "@/types/index.ts";

export const HeroSection: React.FC = () => {
  const [heroSection, setHeroSection] = useState<HeroSectionAttributes>();
  const getHeroSection = async () => {
    try {
      const response = await getHeroSectionData();
      if (response && response.data) {
        setHeroSection(response.data);
      }
    } catch (error) {
      console.error("Error fetching hero section data:", error);
    }
  };

  useEffect(() => {
    // Fetch hero section data on component mount
    const fetchHero = async () => {
      try {
        await getHeroSection();
      } catch (error) {
        console.error("Error in useEffect while fetching hero section:", error);
      }
    };
    fetchHero();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-background-ice via-white to-blue-50 flex items-center">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl lg:text-7xl font-bold text-secondary-navy leading-tight max-lg:mt-16"
              >
                Welcome to{" "}
                <span className="bg-gradient-to-r from-primary-blue to-primary-orange bg-clip-text text-transparent animated-text">
                  NexSync
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl lg:text-2xl text-secondary-steel leading-relaxed"
              >
                Building innovative digital solutions that transform businesses
                and create exceptional user experiences.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/careers">
                <Button size="lg" className="group">
                  Explore Careers
                  <ArrowRight
                    size={20}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>

              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-blue">
                  {heroSection?.noOfProjects || 50} +
                </div>
                <div className="text-secondary-steel">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-orange">
                  {heroSection?.noOfClients || 50}+
                </div>
                <div className="text-secondary-steel">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-teal">
                  {heroSection?.satisfactionPercentage || 99} %
                </div>
                <div className="text-secondary-steel">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="w-full h-96 bg-gradient-to-br from-primary-blue to-primary-orange rounded-3xl shadow-2xl animate-float">
                <div className="absolute inset-0 bg-white bg-opacity-20 rounded-3xl backdrop-blur-sm">
                  <img
                    src={heroSection?.heroImage || "Hero.jpg"}
                    alt=""
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-teal rounded-full flex items-center justify-center shadow-lg"
            >
              <Target size={32} className="text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary-orange rounded-full shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
