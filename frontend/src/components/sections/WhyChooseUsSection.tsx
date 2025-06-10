import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Zap } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const reasons = [
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We stay ahead of technology trends to deliver cutting-edge solutions that give you a competitive advantage.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our skilled professionals bring years of experience and passion to every project we undertake.',
    },
    {
      icon: CheckCircle,
      title: 'Proven Results',
      description: 'We have a track record of delivering successful projects on time and exceeding client expectations.',
    },
  ];

  return (
    <section className="py-20 bg-background-ice">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-navy mb-6">
            Why Choose Us?
          </h2>
          <p className="text-xl text-secondary-steel max-w-3xl mx-auto">
            We combine technical expertise with creative vision to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="mb-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <reason.icon size={40} className="text-primary-blue" />
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-secondary-navy mb-4">
                {reason.title}
              </h3>
              
              <p className="text-secondary-steel leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
