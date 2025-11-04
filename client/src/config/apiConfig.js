const url = "https://api.upskillab.com";
// const url = "http://localhost:3000"
const ApiConfig = {
  url,
  uploadFiles: `${url}/file`,
  // Auth
  // login: `${url}/auth/login`,
  otpLogin: `${url}/auth/otp-login`,         
  verifyOtp: `${url}/auth/otp/enter`, 
  getUserDetails: `${url}/auth/details`,
  refreshToken:`${url}/auth/refresh`,

  registerTeacher: `${url}/teachers`,
  getPublicJobs:`${url}/jobs/public/job`,
  postpublicApplication:`${url}/applications`,
  getAnnouncements:`${url}/announcements`,
  stats : `${url}/stats`,
  // Categories
  category: `${url}/category`,
  categoryByCode: (code) => `${url}/category/code/${code}`,
  getActiveTeacher:`${url}/teachers`,
  getAssociations:`${url}/associations`,
  successStroy: `${url}/stories`,
  // Courses
  course: `${url}/course`,
  courseByCode: (code) => `${url}/course/code/${code}`,
  courseDisplay: `${url}/course/display`,
  courseDisplaybyId:(id)=> `${url}/course/${id}`,
  
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
  manualRegister: `${url}/registration/no-batch`,
  manualRegister2: `${url}/registration/with-batch`,
  cashfreeCheckout: `${url}/payment/cashfree/redirect`,

  //blog
  blogs: `${url}/blogs`, // Base endpoint for all blog operations
  blogById: (id) => `${url}/blogs/${id}`, // For single blog operations
  blogbyBlogTitle: (slug)=>`${url}/blogs/blog/${slug}`,

  // Ebooks
  ebooks:`${url}/ebooks/public`,
  ebooksbyslug:(slug)=>`${url}/ebooks/public/${slug}`,
  ebooksUser:`${url}/ebook-access-logs`,

  // newslatters
  subscriber:`${url}/subscribers`,
  getnews:`${url}/news/public`,
  newsbyslug:(slug)=>`${url}/news/public/${slug}`,

  medicalExam:`${url}/medical-exams`,
  attemptExam:`${url}/medical-exams/attempt`,
  getMedicalQuestions:(examid)=>`${url}/medical-exams/${examid}/questions`,
  submitMedicalExam:`${url}/medical-exams/submit`,
  //youtube
  youtube: `${url}/youtube-videos?all=1`,

  getExamById:(examid) => `${url}/pcat/exams/${examid}`,
  getExam:`${url}/pcat/exams/ongoing/exam`,
  getUpcommingExam:`${url}/pcat/exams/upcomming/exam`,
  getExamStatus:(examId)=>`${url}/pcat-results/${examId}/stats`,

  registeruser:`${url}/pcat-users/register`,
  varifyOTP:`${url}/pcat-users/verify-otp`,

  getQuestionByExamId: (examId) => `${url}/pcat/questions/exam/${examId}`,
  updateAnser: (submissionId) => `${url}/pcat-submissions/${submissionId}`,

  postQuery: `${url}/queries`,
  getBootCamp:`${url}/bootcamp`,
  postPramotional:`${url}/pramotion`,
  postpramotionBootcamp:`${url}/pramotionBootcamp`,

  // teacher panel

  getResultById:(resultId) => `${url}/pcat-results/${resultId}`,

  teacherProfile:`${url}/teachers/me`,
  studyMaterial:`${url}/study-materials`,
  studyMaterialById:(id)=>`${url}/study-materials/${id}`,
  studyMaterialByTeacher:(id)=>`${url}/study-materials/teacher/${id}`,
  studentClassAttendance:(id)=>`${url}/live-classes/${id}/attendance/teacher`,
  teacherSugegstions:`${url}/suggestions`,
  teacherSugegstionsget:`${url}/suggestions/teacher`,
  // Schedule
  ClassSchedule:`${url}/Class-Schedule/teacher`,
  doubtsResponse:(id)=>`${url}/doubts/${id}/message`,
  Notifications:(role)=>`${url}/notifications/role/${role}`,
  NotificationsbyId:`${url}/notifications/user`,
  MarkAsReadNotifications:(id)=>`${url}/notifications/${id}/read`,
  deleteNotifications:(id)=>`${url}/notifications/${id}/`,
  resourse:`${url}/resources`,
  resoursebyId:(id)=>`${url}/resources/${id}`,


  // student panel
  profile:`${url}/students/me`,
  studentProfile:`${url}/enrollment`,
  my_referral:`${url}/referral/my-referrals`,
  referral:`${url}/referral/generate`,
  studyMaterialByCourse:(id)=>`${url}/study-materials/course/${id}`,
  doubts:`${url}/doubts`,
  StudentClassSchedule:`${url}/Class-Schedule/student`,
  getJobs:`${url}/jobs`,
  postApplications:`${url}/applications`,
  recordedVideos:`${url}/recorded-videos`,
  recordedVideosbyid:(id)=>`${url}/recorded-videos/${id}`,
  studentHistory:`${url}/student-info`,
  account:`${url}/api/payment-status`,
  trends:`${url}/resources`,
  studentAttendance:`${url}/live-classes/attendance`,
  updateStudentAttendance:(classId)=>`${url}/live-classes/${classId}/attendance`,
  appliedJobs:(email)=>`${url}/applications/applied-jobs/${email}`,

  studenttestimonial:`${url}/testimonials`,
  testimonilaById:(id)=>`${url}/testimonials/${id}`,

  studentBlogs:`${url}/blogs`,
  getStudentBlogs:`${url}/blogs/students`,
  studentBlogById:(id)=>`${url}/blogs/${id}`,
  couponsByCourseId:(id)=>`${url}/coupons/by-course/${id}`,

  feedback:`${url}/feedback`,
  feedbackwithId:(id)=>`${url}/feedback/${id}`,
  getFeedback:`${url}/feedback/my-feedbacks`,
  getResult:`${url}/attempts/my-result`,

  getExams:`${url}/exams/my/exams`,
  examCheck: (examId) => `${url}/exams/${examId}/student`,
  startExam: (examId) => `${url}/attempts/start/${examId}`,
  getExamPaper:(examId)=> `${url}/questions/exam/${examId}/student`,
  submitExam: (submissionId) => `${url}/attempts/${submissionId}/submit`,
  monitoringLog:(submissionId)=> `${url}/monitoring-logs/${submissionId}`,
  
};

export default ApiConfig;
