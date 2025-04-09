const url = "https://shark-app-ixo3s.ondigitalocean.app";

const ApiConfig = {
  url,
  // Auth
  login: `${url}/auth/login`,
  
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
};

export default ApiConfig;