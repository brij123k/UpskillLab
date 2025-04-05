const url = "https://shark-app-ixo3s.ondigitalocean.app";

const ApiConfig = {
  url,
  // Auth
  login: `${url}/auth/login`,
  
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

  // banners
  landingPageCarousel:`${url}/banners`,
  premiumBanner:`${url}/premium-learning-experiences`,
  banner3:`${url}/banner3`,
  banner4s:`${url}/banner4`,
};

export default ApiConfig;