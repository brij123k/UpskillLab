import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ImageCarousel from '../../components/ImageCarousel'
import FAQ from '../../components/FAQ'
import StudentFeedBack from '../../components/Cards/StudentFeedBack'
import CardsContainer from '../../components/Cards/CardContainer'
import CourseCards from '../../components/Courses/CourseCards'



function Login() {

    const faqs = [
        {
            question: "Can I download course materials for offline use?",
            answer: "Yes, you can download course materials for offline use. Most platforms provide a download option for videos, PDFs, and other resources, but this depends on the course provider's settings. Check the course page for a download button or contact support if you don't see the option."
        },
        {
            question: "How do I access my course after purchase?",
            answer: "After purchasing a course, you can access it through your account dashboard. Log in to the platform, go to 'My Courses' or a similar section, and you'll find all your enrolled courses listed there."
        },
        {
            question: "Is there a refund policy?",
            answer: "Yes, most platforms offer a refund policy, typically within 30 days of purchase, if you haven't completed a significant portion of the course. Check the platform's refund policy for specific details."
        },
        {
            question: "How do I access my course after purchase?",
            answer: "After purchasing a course, you can access it through your account dashboard. Log in to the platform, go to 'My Courses' or a similar section, and you'll find all your enrolled courses listed there."
        },
        {
            question: "Is there a refund policy?",
            answer: "Yes, most platforms offer a refund policy, typically within 30 days of purchase, if you haven't completed a significant portion of the course. Check the platform's refund policy for specific details."
        },
    ];
    return (
        <>
            <Header />
            <div className="bg-[url('/images/bgStars.png')] bg-cover bg-center px-8">



                <StudentFeedBack />

                <CardsContainer />

            </div>
            <div className='flex flex-col px-4 py-8  items-center md:items-start md:flex-row justify-between lg:px-15 lg:py-2 bg-[#FDF8EE] font-roboto'>
                <div className='w-[25%]'>

                    <img src="/images/PremiumLearning.png" className=' ' />
                </div>
                <div p='flex w-[75%] justify-between'>
                    <div className='flex flex-1 justify-between '>
                        <div className='max-w-[400px]'>


                            <h1 className='text-4xl mt-10 font-bold tracking-[2px] leading-12' >Premium <span className='text-[#FF7426]'>Learning</span>
                                <br />
                                Experience</h1>

                            <div className='flex flex-col gap-3 mt-16'>
                                <div className='flex gap-4 items-center'>
                                    <img src="/images/heartImage.png" className='w-[52px] h-[52px]  p-3 rounded-lg bg-[#4D2C5E]' />
                                    <div >
                                        <h1 className='text-xl font-semibold'>Easily Accessible</h1>
                                        <h1 className='text-[#8A8A8A]'>Learning Will feel Very Comfortable With Upskilllab.</h1>
                                    </div>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <img src="/images/heartImage.png" className='w-[52px] h-[52px]  p-3 rounded-lg bg-[#4D2C5E]' />
                                    <div >
                                        <h1 className='text-xl font-semibold'>Easily Accessible</h1>
                                        <h1 className='text-[#8A8A8A]'>Learning Will feel Very Comfortable With Upskilllab.</h1>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
                <img src="/images/Arrow.png" className='hidden md:inline h-[200px]' />

            </div>
            <CourseCards />
            <div className='px-4 lg:px-20'>

                <ImageCarousel />
            </div>

            <FAQ faqs={faqs} />


            {/* 
            {/* <PremiumLearning /> 
            */}
            <Footer />
        </>
    )
}

export default Login
