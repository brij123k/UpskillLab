const url = "https://api.upskillab.com";
// const url = "http://localhost:3000"
const ApiConfig = {
  url,
  uploadFiles: `${url}/file`,
  // Auth
  // login: `${url}/auth/login`,
  otpLogin: `${url}/auth/otp-login`,         // New endpoint for initiating OTP
  verifyOtp: `${url}/auth/otp/enter`, 
  getUserDetails: `${url}/auth/details`,
  refreshToken:`${url}/auth/refresh`,
  
  stats : `${url}/stats`,
  // Categories
  category: `${url}/category`,
  categoryByCode: (code) => `${url}/category/code/${code}`,
  
  successStroy: `${url}/stories`,
  // Courses
  course: `${url}/course`,
  courseByCode: (code) => `${url}/course/code/${code}`,
  courseDisplay: `${url}/course/display`,
  
  // Testimonials
  testimonial: `${url}/testimonials`,
  
  // Languages
  languages: `${url}/languages`,
  
  // Batches
  upcomingBatches: `${url}/batches/upcoming`,
  courseByBatchId:(id)=>`${url}/batches/${id}`,
  // banners
  landingPageCarousel:`${url}/banners`,
  premiumBanner:`${url}/premium-learning-experiences`,
  banner3:`${url}/banner3`,
  banner4s:`${url}/banner4`,

  //demosessions
  demoSession: `${url}/demosessions`,

  //Contact Us
  contactUs: `${url}/contact-us`,

  // Hiring Partner
  hiringPartners: `${url}/hiring-partners`,

  // courseDetails
  getCourseByCode: (code) => `${url}/course/code/${code}`,


  // payments
  batchRegistration: `${url}/registration/batch`,
  cashfreeCheckout: `${url}/payment/cashfree/redirect`,

  //blog
  blogs: `${url}/blogs`, // Base endpoint for all blog operations
  blogById: (id) => `${url}/blogs/${id}`, // For single blog operations

  //youtube
  youtube: `${url}/youtube-videos?all=1`, // Base endpoint for all youtube operations


  // teacher panel

  teacherProfile:`${url}/teachers/me`,
  studyMaterial:`${url}/study-materials`,
  studyMaterialById:(id)=>`${url}/study-materials/${id}`,
  studyMaterialByTeacher:(id)=>`${url}/study-materials/teacher/${id}`,

  teacherSugegstions:`${url}/suggestions`,
  teacherSugegstionsget:`${url}/suggestions/teacher`,
  // Schedule
  ClassSchedule:`${url}/Class-Schedule/teacher`,
  doubtsResponse:(id)=>`${url}/doubts/${id}/message`,
  Notifications:(role)=>`${url}/notifications/role/${role}`,
  MarkAsReadNotifications:(id)=>`${url}/notifications/${id}/read`,
  deleteNotifications:(id)=>`${url}/notifications/${id}/`,

  // student panel
  studentProfile:`${url}/enrollment`,
  studyMaterialByCourse:(id)=>`${url}/study-materials/course/${id}`,
  doubts:`${url}/doubts`,
  StudentClassSchedule:`${url}/Class-Schedule/student`,


};

export default ApiConfig;