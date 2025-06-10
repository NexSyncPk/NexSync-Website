import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/index';
import { services } from '../../data/mockData';
import { Code, Smartphone, Cloud, Palette } from 'lucide-react';

const iconMap = {
  Code,
  Smartphone,
  Cloud,
  Palette,
};

export const ServicesSection: React.FC = () => {
  return (
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
            What We Do
          </h2>
          <p className="text-xl text-secondary-steel max-w-3xl mx-auto">
            We provide comprehensive digital solutions that help businesses thrive in the modern world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full group">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-orange rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={32} className="text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-secondary-navy mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-secondary-steel mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="text-sm text-secondary-steel bg-background-ice px-3 py-1 rounded-full inline-block mr-2 mb-2"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
