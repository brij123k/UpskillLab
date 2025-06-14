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

  return (
    <>
      {show && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none bg-black/30">
        <ExitIntentModalData onClose={() => setShow(false)} />
    </div>
      )}
      {/* rest of your content */}
    </>
  )
};

export default ExitIntentModal;
