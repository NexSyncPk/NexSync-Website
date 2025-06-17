import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../../data/mockData";
import api from "@/api/interceptor";
import { getTestimonialsData } from "@/api/services";
import type { Testimonial } from "@/types";

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const getTestimonials = async () => {
    try {
      const response = await getTestimonialsData();
      if (response && response.data) {
        console.log("Testimonials Data:", response);
        setTestimonials(response.data);
      }
    } catch (error) {
      console.error("Error fetching testimonials data:", error);
    }
  };

  // Fetch testimonials on component mount
  useEffect(() => {
    const fetchData = async () => {
      await getTestimonials();
    };
    fetchData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 bg-secondary-navy text-white border-b border-gray-600">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from the companies we've
            helped succeed.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-8">
              <Quote size={48} className="text-primary-blue mx-auto mb-6" />
              <p className="text-2xl lg:text-3xl font-light leading-relaxed italic mb-8">
                "{testimonials[currentIndex]?.feedback}"
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {testimonials[currentIndex]?.name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <h4 className="text-xl font-semibold text-gray-200">
                  {testimonials[currentIndex]?.name}
                </h4>
                <p className="text-gray-300">
                  {testimonials[currentIndex]?.designation} at{" "}
                  {testimonials[currentIndex]?.company}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all duration-200"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-primary-blue"
                      : "bg-white bg-opacity-30 hover:bg-opacity-50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all duration-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
