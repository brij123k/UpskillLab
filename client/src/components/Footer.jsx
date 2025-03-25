import React from 'react';

function Footer() {
    return (
        <footer className="bg-[#FDF8EE] text-[#606060] w-full py-8">
            <div className="container px-8 lg:flex ">
                <div>
                    <img src='images/Logo.png' />
                    <p className="text-[#606060] text-sm my-6">
                        Lorem ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem ipsum has been the industry's standard dummy a type specimen book.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* About Us */}


                    {/* Company */}
                    <div>
                        <h3 className="text-[#00052E] text-xl font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-[#606060] hover:text-white">How to work?</a></li>
                            <li><a href="#" className="text-[#606060] hover:text-white">Popular Course</a></li>
                            <li><a href="#" className="text-[#606060] hover:text-white">Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[#00052E] text-xl font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-[#606060] hover:text-white">How to work?</a></li>
                            <li><a href="#" className="text-[#606060] hover:text-white">Popular Course</a></li>
                            <li><a href="#" className="text-[#606060] hover:text-white">Service</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-[#00052E] text-xl font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-[#606060] hover:text-white">FAQ</a></li>
                            <li><a href="#" className="text-[#606060] hover:text-white">Help Center</a></li>
                            <li><a href="#" className="text-[#606060] hover:text-white">Career</a></li>
                            <li><a href="#" className="text-[#606060] hover:text-white">Privacy</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-[#00052E] text-xl font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="tel:+09137053875" className="text-[#606060] hover:text-white">+0913-705-3875</a></li>
                            <li><a href="mailto:ElizabethJ@jourrapide.com" className="text-[#606060] hover:text-white">ElizabethJ@jourrapide.com</a></li>
                            <li className="text-[#606060]">4808 Skinner Hollow Road Days Creek, OR 97429</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;