import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TexturedBorderBox from '../../components/Cards/TexturedBorderBox'
import ImageCarousel from '../../components/ImageCarousel'



function Login() {

    return (
        <>

            <Header />
            <div className="bg-[#FDF8EE] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 gap-6 py-8">
                <TexturedBorderBox
                    imageSrc="/images/card1.jpeg"
                    title="Course Title"
                    description="Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text."
                />
                <TexturedBorderBox
                    imageSrc="/images/card1.jpeg"
                    title="Course Title"
                    description="Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text."
                />
                <TexturedBorderBox
                    imageSrc="/images/card1.jpeg"
                    title="Course Title"
                    description="Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text."
                />
            </div>
            <ImageCarousel />


            <Footer />
        </>
    )
}

export default Login
