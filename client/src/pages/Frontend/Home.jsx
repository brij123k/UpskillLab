import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ImageCarousel from '../../components/ImageCarousel'
import { FiArrowRight } from 'react-icons/fi';
import FAQ from '../../components/FAQ'
import StudentFeedBack from '../../components/Cards/StudentFeedBack'
import CardsContainer from '../../components/Cards/CardContainer'
import CarouselContainer from '../../components/carousel'
import CourseCards from '../../components/Courses/CourseCards'
import EnqueryBanner from '../../components/banners/EnqueryBanner'
import EducationBanner from '../../components/banners/EducationBanner'
import ScrollableCategories from '../../components/Cards/Categories'
import SuccessTestimonial from '../../components/testimonial/SuccessTestimonial '
import StudentTestimonials from '../../components/testimonial/StudentsTestimonial'
import AdmissionForm from '../../components/Forms/AdmissionForm'
import { Faqs } from '../../data';
function Home() {

    const faqs = Faqs;
    return (
        <>
      
            <div>
                <CarouselContainer />
            </div>
            <div className="bg-[url('/images/bgStars.png')] bg-cover bg-center px-8">



                <StudentFeedBack />

                <CardsContainer />

            </div>
            <div className='w-full bg-[#FDF8EE] font-roboto'>
                <div className='max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 md:py-12 lg:py-16'>
                    <div className='flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-12 2xl:gap-16'>
                        {/* Image Column - Responsive Width */}
                        <div className='w-full lg:w-[50%] flex justify-center'>
                            <img
                                src="/images/PremiumLearning.png"
                                alt="Premium Learning"
                                className='w-[200px] sm:w-[250px] md:w-[280px] lg:w-full max-w-[300px] 2xl:max-w-[350px] object-contain'
                            />
                        </div>

                        {/* Content Column - Responsive Width */}
                        <div className='w-full lg:w-[50%] flex flex-col xl:flex-row items-center lg:items-start gap-8 xl:gap-12'>
                            {/* Main Heading + Features */}
                            <div className='flex-1 max-w-[600px] 2xl:max-w-[700px]'>
                                <h1 className='text-3xl sm:text-4xl md:text-5xl xl:text-[3.25rem] 2xl:text-[3.75rem] font-bold leading-tight md:leading-snug'>
                                    Premium <span className='text-[#FF7426]'>Learning</span> Experience
                                </h1>

                                <div className='mt-8 sm:mt-10 md:mt-12 space-y-4 sm:space-y-5'>
                                    {/* Feature 1 */}
                                    <div className='flex gap-4 sm:gap-5 items-start'>
                                        <div className='flex-shrink-0 bg-[#4D2C5E] p-3 sm:p-4 rounded-lg'>
                                            <img
                                                src="/images/heartImage.png"
                                                alt="Accessible"
                                                className='w-8 h-8 sm:w-10 sm:h-10'
                                            />
                                        </div>
                                        <div>
                                            <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800'>
                                                Easily Accessible
                                            </h2>
                                            <p className='text-gray-600 text-sm sm:text-base mt-1'>
                                                Learning will feel very comfortable with UpskillLab.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Feature 2 */}
                                    <div className='flex gap-4 sm:gap-5 items-start'>
                                        <div className='flex-shrink-0 bg-[#4D2C5E] p-3 sm:p-4 rounded-lg'>
                                            <img
                                                src="/images/heartImage.png"
                                                alt="Comfortable"
                                                className='w-8 h-8 sm:w-10 sm:h-10'
                                            />
                                        </div>
                                        <div>
                                            <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800'>
                                                Comfortable Learning
                                            </h2>
                                            <p className='text-gray-600 text-sm sm:text-base mt-1'>
                                                Enjoy a seamless educational journey with our platform.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow Image - Hidden on mobile */}
                            <div className='hidden xl:flex flex-shrink-0 self-center 2xl:self-start'>
                                <img
                                    src="/images/Arrow.png"
                                    alt="Arrow"
                                    className='h-[120px] xl:h-[150px] 2xl:h-[180px] object-contain'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <CourseCards />
            <div className='py-4'>
                <EnqueryBanner />
            </div>
            <div className='px-4 lg:px-20'>

                <ImageCarousel />


            </div>
            <EducationBanner />
            <div className='py-4'>
                <ScrollableCategories />
            </div>
            <div className='py-4'>
                <SuccessTestimonial />
            </div>
            <div className='py-4'>
                <StudentTestimonials />
            </div>
            <div className='py-4'>
                <AdmissionForm />
            </div>
            <FAQ faqs={faqs} />

            <div className="bg-[#f7e4be] pt-3">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#f7e4be] rounded-xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Side - Text Content */}
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-2">
                                    <p className="text-2xl font-medium text-gray-700"><span className='text-[#FF7426]'>G</span>et In Touch</p>
                                </div>
                                <div className="mb-6">
                                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                        For Queries, Feedback or Assistance
                                    </h2>
                                </div>
                                <div>
                                    <button className="bg-[#4d2c5e] hover:bg-[#3a2148] text-white font-bold py-3 px-6 rounded-4xl transition-all duration-300 flex items-center">
                                        Contact Us <FiArrowRight className="ml-2" />
                                    </button>
                                </div>
                            </div>

                            {/* Right Side - Image */}
                            <div className="hidden md:block relative bg-[#f7e4be]">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src="/images/contact Us.png" // Replace with your image path
                                        alt="Contact us illustration"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 
            {/* <PremiumLearning /> 
            */}
          
        </>
    )
}

export default Home
