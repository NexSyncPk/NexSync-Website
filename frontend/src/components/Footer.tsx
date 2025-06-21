import React from "react";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-navy text-white py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 place-items-center ">
          {/* Company Info */}
          <div className="space-y-4 px-2">
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 bg-gradient-to-r from-primary-blue to-primary-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div> */}
              <img src="/Logo.png" alt="NexSync" width={70} height={70} />
              <span className="text-2xl font-bold">NexSync</span>
            </div>
            <p className="text-gray-300">
              Building innovative digital solutions for tomorrow's challenges.
            </p>
          </div>

          {/* Quick Links */}
          {/* <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-gray-300 hover:text-primary-blue transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-gray-300 hover:text-primary-blue transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/careers"
                className="block text-gray-300 hover:text-primary-blue transition-colors"
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className="block text-gray-300 hover:text-primary-blue transition-colors"
              >
                Contact
              </Link>
            </div>
          </div> */}

          {/* Contact Info */}
          <div className="space-y-4 px-2">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-primary-blue" />
                <span className="text-gray-300">nexsyncpvtltd@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-primary-blue" />
                <span className="text-gray-300">0324-3240157</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-primary-blue" />
                <span className="text-gray-300">
                  National Incubation Center, NED University, Karachi, 75270
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/nexsyncpvtltd/"
                className="p-2 bg-gray-700 rounded-lg hover:bg-primary-blue transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/nexsyncpvtltd/"
                className="p-2 bg-gray-700 rounded-lg hover:bg-primary-blue transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/923243240157"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-lg hover:bg-primary-blue transition-colors"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 NexSync. All rights reserved. Built with ❤️ for innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};
