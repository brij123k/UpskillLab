import React, { useState, useEffect } from "react";
import ExitIntentModalData from "./CustomInputs/ExitIntentModalData";
import { FiX } from "react-icons/fi"; // Using an icon for the 'X' button

const ExitIntentModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const showModal = () => {
      setShow(true);
    };

    const initialTimer = setTimeout(() => {
      showModal();
    }, 4000);

    const interval = setInterval(() => {
      setTimeout(() => {
        showModal();
      }, 4000);
    }, 240000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return show ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none bg-black/30">
      <div className="relative bg-white p-8 rounded-xl w-[90%] max-w-[800px] max-h-[80vh] overflow-y-auto shadow-lg text-center pointer-events-auto">
        {/* Close button at top right */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          aria-label="Close"
        >
          <FiX />
        </button>
        <ExitIntentModalData />
      </div>
    </div>
  ) : null;
};

export default ExitIntentModal;
