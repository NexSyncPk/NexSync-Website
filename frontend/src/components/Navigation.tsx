import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  external?: boolean;
}

const navigationItems: NavigationItem[] = [
  { id: "1", label: "Home", path: "/" },
  { id: "2", label: "About", path: "/about" },
  { id: "3", label: "Careers", path: "/careers" },
  { id: "4", label: "Contact", path: "/contact" },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="section-container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center w-cover h-9 space-x-1 ">
            <img src="/Logo.png" alt="Logo" className="w-full h-full" />
            <span className="text-2xl font-bold text-secondary-navy">
              NexSync
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`text-lg font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-primary-blue border-b-2 border-primary-blue"
                    : "text-secondary-steel hover:text-primary-blue"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "text-primary-blue"
                        : "text-secondary-steel hover:text-primary-blue"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
