// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// const BatchCard = ({
//   onEnroll,
//   startDate,
//   price,
//   remainingSeats,
//   originalPrice,
//   title,
//   batchId,
//   courseId,
//   courseCode,
//   batchCode,
//   batchTime,
//   duration,
//   mode,
// }) => {
//   const day = startDate.getDate();
//   const month = startDate.toLocaleString("default", { month: "short" });
//   const year = startDate.getFullYear();
//   const navigate = useNavigate();
//   return (
//     <motion.div
//       className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col h-full cursor-pointer relative"
//       whileHover={{
//         y: -5,
//         boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)",
//       }}
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       {/* Solid color header */}
//       <motion.div
//         className="bg-[#4D2C5E] p-4 border-b border-[#3A2250]"
//         whileHover={{ backgroundColor: "#3A2250" }}
//       >
//         <div className="flex justify-between items-start">
//           {/* Date with bounce animation */}
//           <motion.div
//             className="flex items-center space-x-3"
//             whileHover={{ scale: 1.03 }}
//           >
//             <motion.div
//               className="bg-[#FF7426] text-white rounded-lg w-12 h-12 flex flex-col items-center justify-center shadow-md"
//               whileHover={{ scale: 1.1 }}
//             >
//               <span className="text-lg font-bold leading-none">{day}</span>
//               <span className="text-xs uppercase mt-1">{month}</span>
//             </motion.div>
//             <span className="text-gray-300 text-sm">{year}</span>
//           </motion.div>

//           {/* Price with floating animation */}
//           <motion.div className="text-right">
//             <span className="text-2xl font-bold text-white">₹{price}</span>
//             <p className="text-xs text-gray-300 mt-1">Total Fee</p>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Card Body */}
//       <div className="p-4 flex-grow">
//         {/* Title with color change animation */}
//         <motion.h3
//           className="text-lg font-bold text-[#4D2C5E] mb-4 line-clamp-2"
//           whileHover={{
//             color: "#FF7426",
//             x: 3,
//           }}
//           transition={{ type: "spring" }}
//         >
//           {title}
//         </motion.h3>

//         {/* Info chips with separate colors */}
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           <motion.div
//             className="flex items-center bg-[#FF7426]/10 px-3 py-2 rounded-lg border border-[#FF7426]/20"
//             whileHover={{
//               scale: 1.03,
//               backgroundColor: "#FF7426/20",
//             }}
//           >
//             <div className="w-6 h-6 bg-[#FF7426] rounded-full mr-2 flex items-center justify-center text-white">
//               ⏰
//             </div>
//             <span className="text-sm text-[#FF7426]">{batchTime}</span>
//           </motion.div>

//           <motion.div
//             className="flex items-center bg-[#4D2C5E]/10 px-3 py-2 rounded-lg border border-[#4D2C5E]/20"
//             whileHover={{
//               scale: 1.03,
//               backgroundColor: "#4D2C5E/20",
//             }}
//           >
//             <div className="w-6 h-6 bg-[#4D2C5E] rounded-full mr-2 flex items-center justify-center text-white">
//               📆
//             </div>
//             <span className="text-sm text-[#4D2C5E]">{duration}</span>
//           </motion.div>

//           <motion.div
//             className="flex items-center bg-[#FF7426]/10 px-3 py-2 rounded-lg border border-[#FF7426]/20"
//             whileHover={{
//               scale: 1.03,
//               backgroundColor: "#FF7426/20",
//             }}
//           >
//             <div className="w-6 h-6 bg-[#FF7426] rounded-full mr-2 flex items-center justify-center text-white">
//               🖥️
//             </div>
//             <span className="text-sm text-[#FF7426]">{mode}</span>
//           </motion.div>

//           <motion.div
//             className="flex items-center bg-[#4D2C5E]/10 px-3 py-2 rounded-lg border border-[#4D2C5E]/20"
//             whileHover={{
//               scale: 1.03,
//               backgroundColor: "#4D2C5E/20",
//             }}
//           >
//             <div className="w-6 h-6 bg-[#4D2C5E] rounded-full mr-2 flex items-center justify-center text-white">
//               🔢
//             </div>
//             <span className="text-sm text-[#4D2C5E]">{remainingSeats} Seats</span>
//           </motion.div>
//         </div>
//       </div>

//       {/* Card Footer with solid color buttons */}
//       <div className="p-4 border-t border-gray-200">
//         <div className="flex justify-between gap-3">
//           <motion.button
//             className="text-[#4D2C5E] text-sm font-medium px-4 py-2 rounded-md border-2 border-[#4D2C5E] hover:bg-[#4D2C5E] hover:text-white transition-colors flex-1"
//             onClick={() => navigate(`/courseDetails/batch/${batchId}`, { 
//               state: { 
//                 courseId,
//                 courseCode,
//                 batchId,
//                 batchCode 
//               } 
//             })}

//             whileHover={{
//               scale: 1.02,
//               boxShadow: "0 2px 8px -1px rgba(77, 44, 94, 0.3)",
//             }}
//             whileTap={{ scale: 0.98 }}
//           >
//             View Details
//           </motion.button>
//           <motion.button
//             className="bg-[#FF7426] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#E56722] transition-colors flex-1 shadow-sm"
//             onClick={onEnroll}
//             whileHover={{
//               scale: 1.02,
//               boxShadow: "0 3px 10px -1px rgba(255, 116, 38, 0.4)",
//             }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Enroll Now
//           </motion.button>
//         </div>
//       </div>

//       {/* Floating decoration */}
//       <motion.div
//         className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF7426]"
//         animate={{
//           scale: [1, 1.3, 1],
//           transition: { repeat: Infinity, duration: 2 },
//         }}
//       />
//     </motion.div>
//   );
// };

// export default BatchCard;


import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BatchCard = ({
  onEnroll,
  startDate,
  price,
  remainingSeats,
  originalPrice,
  title,
  batchId,
  courseId,
  courseCode,
  batchCode,
  batchTime,
  duration,
  mode,
}) => {
  const navigate = useNavigate();
  
  // Normalize dates for accurate comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const batchDate = new Date(startDate);
  batchDate.setHours(0, 0, 0, 0);
  
  // Determine batch status
  const getBatchStatus = () => {
    if (batchDate < today) return "batch-started";
    if (batchDate.getTime() === today.getTime()) return "starting-today";
    return "upcoming";
  };
  
  const batchStatus = getBatchStatus();
  const isEnrollable = batchStatus === "upcoming";
  const isStartingToday = batchStatus === "starting-today";

  // Format date display
  const day = batchDate.getDate();
  const month = batchDate.toLocaleString("default", { month: "short" });
  const year = batchDate.getFullYear();

  return (
    <motion.div
      className={`bg-white rounded-xl overflow-hidden shadow-sm border ${
        isEnrollable 
          ? "border-gray-200 cursor-pointer" 
          : "border-gray-300 opacity-90"
      } flex flex-col h-full relative`}
      whileHover={{
        y: isEnrollable ? -5 : 0,
        boxShadow: isEnrollable ? "0 8px 20px -5px rgba(0, 0, 0, 0.1)" : "none",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Status ribbon */}
      {batchStatus !== "upcoming" && (
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-md text-xs font-bold text-white z-10 ${
          batchStatus === "batch-started" ? "bg-gray-500" : "bg-[#FF7426]"
        } shadow-md`}>
          {batchStatus === "batch-started" ? "Batch Started" : "Starting Today"}
        </div>
      )}

      {/* Solid color header */}
      <motion.div
        className={`p-4 border-b ${
          isEnrollable ? "bg-[#4D2C5E] border-[#3A2250]" : "bg-gray-500 border-gray-600"
        }`}
        whileHover={{ 
          backgroundColor: isEnrollable ? "#3A2250" : "rgb(107 114 128)" 
        }}
      >
        <div className="flex justify-between items-start">
          {/* Date with bounce animation */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: isEnrollable ? 1.03 : 1 }}
          >
            <motion.div
              className={`rounded-lg w-12 h-12 flex flex-col items-center justify-center shadow-md ${
                isEnrollable ? "bg-[#FF7426] text-white" : "bg-gray-400 text-gray-700"
              }`}
              whileHover={{ scale: isEnrollable ? 1.1 : 1 }}
            >
              <span className="text-lg font-bold leading-none">{day}</span>
              <span className="text-xs uppercase mt-1">{month}</span>
            </motion.div>
            <span className={`text-sm ${
              isEnrollable ? "text-gray-300" : "text-gray-200"
            }`}>{year}</span>
          </motion.div>

          {/* Price with floating animation */}
          <motion.div className="text-right">
            <span className={`text-2xl font-bold ${
              isEnrollable ? "text-white" : "text-gray-100"
            }`}>₹{price}</span>
            <p className={`text-xs mt-1 ${
              isEnrollable ? "text-gray-300" : "text-gray-200"
            }`}>Total Fee</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Card Body */}
      <div className="p-4 flex-grow">
        {/* Title with color change animation */}
        <motion.h3
          className={`text-lg font-bold mb-4 line-clamp-2 ${
            isEnrollable ? "text-[#4D2C5E] hover:text-[#FF7426]" : "text-gray-600"
          }`}
          whileHover={isEnrollable ? { x: 3 } : {}}
          transition={{ type: "spring" }}
        >
          {title}
        </motion.h3>

        {/* Info chips with separate colors */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Batch Time */}
          <motion.div
            className={`flex items-center px-3 py-2 rounded-lg border ${
              isEnrollable 
                ? "bg-[#FF7426]/10 border-[#FF7426]/20 text-[#FF7426]" 
                : "bg-gray-200/50 border-gray-300/50 text-gray-600"
            }`}
            whileHover={{ scale: isEnrollable ? 1.03 : 1 }}
          >
            <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${
              isEnrollable ? "bg-[#FF7426] text-white" : "bg-gray-400 text-gray-200"
            }`}>
              ⏰
            </div>
            <span className="text-sm">{batchTime}</span>
          </motion.div>

          {/* Duration */}
          <motion.div
            className={`flex items-center px-3 py-2 rounded-lg border ${
              isEnrollable 
                ? "bg-[#4D2C5E]/10 border-[#4D2C5E]/20 text-[#4D2C5E]" 
                : "bg-gray-200/50 border-gray-300/50 text-gray-600"
            }`}
            whileHover={{ scale: isEnrollable ? 1.03 : 1 }}
          >
            <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${
              isEnrollable ? "bg-[#4D2C5E] text-white" : "bg-gray-400 text-gray-200"
            }`}>
              📆
            </div>
            <span className="text-sm">{duration}</span>
          </motion.div>

          {/* Mode */}
          <motion.div
            className={`flex items-center px-3 py-2 rounded-lg border ${
              isEnrollable 
                ? "bg-[#FF7426]/10 border-[#FF7426]/20 text-[#FF7426]" 
                : "bg-gray-200/50 border-gray-300/50 text-gray-600"
            }`}
            whileHover={{ scale: isEnrollable ? 1.03 : 1 }}
          >
            <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${
              isEnrollable ? "bg-[#FF7426] text-white" : "bg-gray-400 text-gray-200"
            }`}>
              🖥️
            </div>
            <span className="text-sm">{mode}</span>
          </motion.div>

          {/* Remaining Seats */}
          <motion.div
            className={`flex items-center px-3 py-2 rounded-lg border ${
              isEnrollable 
                ? "bg-[#4D2C5E]/10 border-[#4D2C5E]/20 text-[#4D2C5E]" 
                : "bg-gray-200/50 border-gray-300/50 text-gray-600"
            }`}
            whileHover={{ scale: isEnrollable ? 1.03 : 1 }}
          >
            <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${
              isEnrollable ? "bg-[#4D2C5E] text-white" : "bg-gray-400 text-gray-200"
            }`}>
              🔢
            </div>
            <span className="text-sm">
              {remainingSeats} {remainingSeats === 1 ? "Seat" : "Seats"}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Card Footer with buttons */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between gap-3">
          {/* View Details Button */}
          <motion.button
            className={`text-sm font-medium px-4 py-2 rounded-md border-2 transition-colors flex-1 ${
              isEnrollable
                ? "text-[#4D2C5E] border-[#4D2C5E] hover:bg-[#4D2C5E] hover:text-white"
                : "text-gray-500 border-gray-400 hover:bg-gray-100"
            }`}
            onClick={() => navigate(`/courseDetails/batch/${batchId}`, { 
              state: { 
                courseId,
                courseCode,
                batchId,
                batchCode 
              } 
            })}
            whileHover={{
              scale: 1.02,
              boxShadow: isEnrollable 
                ? "0 2px 8px -1px rgba(77, 44, 94, 0.3)"
                : "none",
            }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
          
          {/* Enroll Button */}
          <motion.button
            className={`text-sm font-medium px-4 py-2 rounded-md transition-colors flex-1 shadow-sm ${
              isEnrollable
                ? "bg-[#FF7426] text-white hover:bg-[#E56722]"
                : isStartingToday
                  ? "bg-gray-400 text-gray-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            onClick={isEnrollable ? onEnroll : null}
            whileHover={
              isEnrollable
                ? {
                    scale: 1.02,
                    boxShadow: "0 3px 10px -1px rgba(255, 116, 38, 0.4)",
                  }
                : {}
            }
            whileTap={isEnrollable ? { scale: 0.98 } : {}}
            disabled={!isEnrollable}
          >
            {isEnrollable 
              ? "Enroll Now" 
              : isStartingToday 
                ? "Starting Today" 
                : "Batch Started"}
          </motion.button>
        </div>
      </div>

      {/* Floating decoration - only for enrollable batches */}
      {isEnrollable && (
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF7426]"
          animate={{
            scale: [1, 1.3, 1],
            transition: { repeat: Infinity, duration: 2 },
          }}
        />
      )}
    </motion.div>
  );
};

export default BatchCard;