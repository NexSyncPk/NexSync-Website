import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, Button } from "../components";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import type { ContactFormData } from "../types";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "", subject: "" });
      }, 1000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "nexsyncpvtltd@gmail.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "0324-3240157",
      description: "Mon-Fri from 9am to 6pm",
    },
    {
      icon: MapPin,
      title: "Office",
      content: "NexSync",
      description: "National Incubation Center, NED University, Karachi, 75270",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-teal to-primary-blue text-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="main-heading">Get in Touch</h1>
            <p className="text-xl lg:text-2xl opacity-90">
              Ready to start your next project? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
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
              Contact Information
            </h2>
            <p className="text-xl text-secondary-steel max-w-3xl mx-auto">
              Choose the best way to reach us. We're here to help!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full duration-200 transition-all ease-linear ring-1 ring-slate-300 shadow-xl">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-orange rounded-full flex items-center justify-center mx-auto">
                      <info.icon size={32} className="text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-secondary-navy mb-2">
                    {info.title}
                  </h3>

                  <p className="text-lg font-medium text-primary-blue mb-2">
                    {info.content}
                  </p>

                  <p className="text-secondary-steel">{info.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-background-ice">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className=" shadow-xl ring-1 ring-slate-300 transition-all ease-linear duration-200 hover:scale-[1.03]">
                <h2 className="text-3xl font-bold text-secondary-navy mb-6">
                  Send us a Message
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-8"
                  >
                    <CheckCircle
                      size={64}
                      className="text-green-500 mx-auto mb-4"
                    />
                    <h3 className="text-2xl font-semibold text-secondary-navy mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-secondary-steel">
                      Thank you for reaching out. We'll get back to you soon!
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-secondary-navy mb-2"
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-secondary-navy mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-secondary-navy mb-2"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="project">Project Discussion</option>
                        <option value="career">Career Opportunity</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-secondary-navy mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all resize-none ${
                          errors.message ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Tell us about your project or inquiry..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full hover:transform-none"
                    >
                      <Send size={20} className="mr-2 " />
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full ring-1 ring-slate-300 transition-all ease-linear duration-200 hover:scale-[1.03] shadow-xl">
                <h3 className="text-2xl font-bold text-secondary-navy mb-6">
                  Find Us
                </h3>
                <div className="w-full h-64 lg:h-96 bg-gradient-to-br from-secondary-steel to-secondary-navy rounded-lg flex items-center justify-center">
                  {/* <div className="text-center text-white">
                    <MapPin size={48} className="mx-auto mb-4" />
                    <p className="text-lg">Interactive Map</p>
                    <p className="text-sm opacity-75">Coming Soon</p>
                  </div> */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.0717804193782!2d67.1129801!3d24.929624499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33932bc557c5d%3A0x38073c4629dcd4a3!2sNational%20Incubation%20Center%20Karachi!5e0!3m2!1sen!2s!4v1750053137172!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-secondary-navy">
                      Address
                    </h4>
                    <p className="text-secondary-steel">
                      National Incubation Center, NED University, Karachi, 75270
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-navy">
                      Business Hours
                    </h4>
                    <p className="text-secondary-steel">
                      Monday - Friday: 8:00 AM - 6:00 PM
                    </p>
                    <p className="text-secondary-steel">
                      Weekend: By appointment
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
