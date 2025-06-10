import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/sections/HeroSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* About NexSync Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-navy mb-8">
              About NexSync
            </h2>
            <p className="text-xl text-secondary-steel leading-relaxed">
              At NexSync, we believe in the power of technology to transform businesses and create 
              meaningful connections. Founded by a team of passionate developers and designers, we 
              specialize in crafting digital experiences that not only look beautiful but deliver 
              real value to our clients and their customers.
            </p>
          </motion.div>
        </div>
      </section>

      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
    </div>
  );
};
