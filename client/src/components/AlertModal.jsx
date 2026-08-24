import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Modal = ({ open, onClose, title, message, confirmText = "OK", onConfirm }) => {
  const { theme } = useTheme();

  if(!open) return null; 

  const colorMap = {
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  onConfirm?.();
                  onClose();
                }}
                className={` text-white font-medium px-5 py-2 rounded-lg ${colorMap[theme] || colorMap.blue}`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
