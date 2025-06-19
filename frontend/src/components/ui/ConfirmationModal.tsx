import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "../index";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "danger" | "warning" | "info";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "danger",
}) => {
  const variantStyles = {
    danger: {
      icon: "text-red-600",
      confirmButton: "bg-red-600 hover:bg-red-700",
      border: "border-red-200",
    },
    warning: {
      icon: "text-yellow-600",
      confirmButton: "bg-yellow-600 hover:bg-yellow-700",
      border: "border-yellow-200",
    },
    info: {
      icon: "text-blue-600",
      confirmButton: "bg-blue-600 hover:bg-blue-700",
      border: "border-blue-200",
    },
  };

  const currentStyle = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className={`relative bg-white rounded-lg shadow-xl border-2 ${currentStyle.border} max-w-md w-full mx-4`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
              disabled={isLoading}
            >
              <X size={20} className="text-gray-400" />
            </button>

            {/* Content */}
            <div className="p-6">
              {/* Icon and Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-full bg-gray-100`}>
                  <AlertTriangle size={24} className={currentStyle.icon} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              </div>

              {/* Message */}
              <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2"
                >
                  {cancelText}
                </Button>
                <Button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`px-4 py-2 text-white ${
                    currentStyle.confirmButton
                  } ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? "Processing..." : confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
