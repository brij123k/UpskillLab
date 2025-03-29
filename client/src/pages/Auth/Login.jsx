// import React from 'react'
// import Header from '../../components/Header'
// import Footer from '../../components/Footer'
// import ImageCarousel from '../../components/ImageCarousel'
// import { FiArrowRight } from 'react-icons/fi';
// import FAQ from '../../components/FAQ'
// import StudentFeedBack from '../../components/Cards/StudentFeedBack'
// import CardsContainer from '../../components/Cards/CardContainer'
// import CarouselContainer from '../../components/carousel'
// import CourseCards from '../../components/Courses/CourseCards'
// import EnqueryBanner from '../../components/banners/EnqueryBanner'
// import EducationBanner from '../../components/banners/EducationBanner'
// import ScrollableCategories from '../../components/Cards/Categories'
// import SuccessTestimonial from '../../components/testimonial/SuccessTestimonial '
// import StudentTestimonials from '../../components/testimonial/StudentsTestimonial'
// import AdmissionForm from '../../components/Forms/AdmissionForm'

// function Login() {
//     const cards = [
//         <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-2xl font-semibold">First Slide</h3>
//             <p className="text-gray-600 mt-2">This is the first card</p>
//         </div>,
//         <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-2xl font-semibold">Second Slide</h3>
//             <p className="text-gray-600 mt-2">This is the second card</p>
//         </div>,
//         <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-2xl font-semibold">Third Slide</h3>
//             <p className="text-gray-600 mt-2">This is the third card</p>
//         </div>,
//         <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-2xl font-semibold">Fourth Slide</h3>
//             <p className="text-gray-600 mt-2">This is the fourth card</p>
//         </div>,
//         <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-2xl font-semibold">Fifth Slide</h3>
//             <p className="text-gray-600 mt-2">This is the fifth card</p>
//         </div>,
//         <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-2xl font-semibold">First Slide</h3>
//             <p className="text-gray-600 mt-2">This is the first card</p>
//         </div>,
//         <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-2xl font-semibold">Second Slide</h3>
//             <p className="text-gray-600 mt-2">This is the second card</p>
//         </div>,
//         <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-2xl font-semibold">Third Slide</h3>
//             <p className="text-gray-600 mt-2">This is the third card</p>
//         </div>,
//         <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-2xl font-semibold">Fourth Slide</h3>
//             <p className="text-gray-600 mt-2">This is the fourth card</p>
//         </div>,
//         <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-2xl font-semibold">Fifth Slide</h3>
//             <p className="text-gray-600 mt-2">This is the fifth card</p>
//         </div>,
//     ];

//     const faqs = [
//         {
//             question: "Can I download course materials for offline use?",
//             answer: "Yes, you can download course materials for offline use. Most platforms provide a download option for videos, PDFs, and other resources, but this depends on the course provider's settings. Check the course page for a download button or contact support if you don't see the option."
//         },
//         {
//             question: "How do I access my course after purchase?",
//             answer: "After purchasing a course, you can access it through your account dashboard. Log in to the platform, go to 'My Courses' or a similar section, and you'll find all your enrolled courses listed there."
//         },
//         {
//             question: "Is there a refund policy?",
//             answer: "Yes, most platforms offer a refund policy, typically within 30 days of purchase, if you haven't completed a significant portion of the course. Check the platform's refund policy for specific details."
//         },
//         {
//             question: "How do I access my course after purchase?",
//             answer: "After purchasing a course, you can access it through your account dashboard. Log in to the platform, go to 'My Courses' or a similar section, and you'll find all your enrolled courses listed there."
//         },
//         {
//             question: "Is there a refund policy?",
//             answer: "Yes, most platforms offer a refund policy, typically within 30 days of purchase, if you haven't completed a significant portion of the course. Check the platform's refund policy for specific details."
//         },
//     ];
//     return (
//         <>
//             <Header />
//             <div>
//                 <CarouselContainer />
//             </div>
//             <div className="bg-[url('/images/bgStars.png')] bg-cover bg-center px-8">



//                 <StudentFeedBack />

//                 <CardsContainer />

//             </div>
//             <div className='flex flex-col px-4 py-8  items-center md:items-start md:flex-row justify-between lg:px-15 lg:py-2 bg-[#FDF8EE] font-roboto'>
//                 <div className='w-[25%]'>

//                     <img src="/images/PremiumLearning.png" className=' ' />
//                 </div>
//                 <div p='flex w-[75%] justify-between'>
//                     <div className='flex flex-1 justify-between '>
//                         <div className='max-w-[400px] lg:max-w-[500px]'>


//                             <h1 className='text-4xl xl:text-5xl mt-10 font-bold tracking-[2px] leading-12' >Premium <span className='text-[#FF7426]'>Learning</span>
//                                 <br />
//                                 Experience</h1>

//                             <div className='flex flex-col gap-3 mt-16'>
//                                 <div className='flex gap-4 items-center'>
//                                     <img src="/images/heartImage.png" className='w-[52px] h-[52px]  p-3 rounded-lg bg-[#4D2C5E]' />
//                                     <div >
//                                         <h1 className='text-xl xl:text-2xl font-semibold'>Easily Accessible</h1>
//                                         <h1 className='text-[#8A8A8A]'>Learning Will feel Very Comfortable With Upskilllab.</h1>
//                                     </div>
//                                 </div>
//                                 <div className='flex gap-4 items-center'>
//                                     <img src="/images/heartImage.png" className='w-[52px] h-[52px]  p-3 rounded-lg bg-[#4D2C5E]' />
//                                     <div >
//                                         <h1 className='text-xl xl:text-2xl font-semibold'>Easily Accessible</h1>
//                                         <h1 className='text-[#8A8A8A]'>Learning Will feel Very Comfortable With Upskilllab.</h1>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>


//                     </div>

//                 </div>
//                 <img src="/images/Arrow.png" className='hidden md:inline h-[200px]' />

//             </div>


//             <CourseCards />
//             <div className='py-4'>
//                 <EnqueryBanner />
//             </div>
//             <div className='px-4 lg:px-20'>

//                 <ImageCarousel />


//             </div>
//             <EducationBanner />
//             <div className='py-4'>
//                 <ScrollableCategories />
//             </div>
//             <div className='py-4'>
//                 <SuccessTestimonial />
//             </div>
//             <div className='py-4'>
//                 <StudentTestimonials />
//             </div>
//             <div className='py-4'>
//                 <AdmissionForm />
//             </div>
//             <FAQ faqs={faqs} />

//             <div className="bg-[#f7e4be] pt-3">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="bg-[#f7e4be] rounded-xl overflow-hidden">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                             {/* Left Side - Text Content */}
//                             <div className="p-8 md:p-12 flex flex-col justify-center">
//                                 <div className="mb-2">
//                                     <p className="text-2xl font-medium text-gray-700"><span className='text-[#FF7426]'>G</span>et In Touch</p>
//                                 </div>
//                                 <div className="mb-6">
//                                     <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
//                                         For Queries, Feedback or Assistance
//                                     </h2>
//                                 </div>
//                                 <div>
//                                     <button className="bg-[#4d2c5e] hover:bg-[#3a2148] text-white font-bold py-3 px-6 rounded-4xl transition-all duration-300 flex items-center">
//                                         Contact Us <FiArrowRight className="ml-2" />
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Right Side - Image */}
//                             <div className="hidden md:block relative bg-[#f7e4be]">
//                                 <div className="absolute inset-0 flex items-center justify-center">
//                                     <img
//                                         src="/images/contact Us.png" // Replace with your image path
//                                         alt="Contact us illustration"
//                                         className="w-full h-full object-contain"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* 
//             {/* <PremiumLearning /> 
//             */}
//             <Footer />
//         </>
//     )
// }

// export default Login
