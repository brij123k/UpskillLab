import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiFacebook,
  FiAward,
  FiUser,
  FiBook
} from 'react-icons/fi';
import { getDataHandler } from '../config/services';

function TeacherSlider() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeachers = async () => {
    try {
      const response = await getDataHandler('getActiveTeacher');
      if (response?.teachers) {
        setTeachers(response.teachers);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const isValidLink = (link) => {
    return link && link !== "" && (link.startsWith("http") || link.startsWith("www"));
  };
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0].toUpperCase()).join('');
  };
  if (loading) {
    return (
      <div className="bg-[#f9f2e6] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-8 w-8 mx-auto border-4 border-[#FF7426] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-base text-gray-800">Loading our expert mentors...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#f9f2e6] py-12 px-4" id="teachers">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
            Meet Our <span className="text-[#FF7426]">Expert Mentors</span>
          </h2>
        </div>

        {teachers.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl shadow-lg max-w-sm mx-auto">
            <FiUser className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-3 text-base font-medium text-gray-800">No mentors available</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later for our expert mentors</p>
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {teachers.map((teacher) => (
              <SwiperSlide key={teacher._id}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
                  {/* Teacher Image */}
                  <div className="relative h-40 bg-gray-100">
                    {teacher.image ? (
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FF7426] to-[#FFD1B2]">
                        <span className="text-gray-800 text-3xl font-bold">
                          {getInitials(teacher.name)}
                         
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF7426]"></div>
                  </div>

                  {/* Teacher Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#4D2C5E] mb-1">{teacher.name}</h3>
                      <p className="text-[#4D2C5E] font-medium text-sm mb-3">
                        {teacher.expertise && teacher.expertise !== "string"
                          ? teacher.expertise
                          : "Professional Mentor"}
                      </p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {teacher.bio && teacher.bio !== "string"
                          ? teacher.bio
                          : `${teacher.name} has extensive experience in their field.`}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center">
                        <FiAward className="text-[#FF7426] mr-1.5 h-4 w-4" />
                        <div>
                          <p className="text-xs text-gray-500">Experience</p>
                          <p className="font-medium text-gray-800 text-sm">
                            {teacher.experience && teacher.experience !== "string"
                              ? teacher.experience
                              : "10+ years"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiBook className="text-[#FF7426] mr-1.5 h-4 w-4" />
                        <div>
                          <p className="text-xs text-gray-500">Qualification</p>
                          <p className="font-medium text-gray-800 text-sm">
                            {teacher.qualification && teacher.qualification !== "string"
                              ? teacher.qualification
                              : "Masters"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex h-8 justify-center space-x-3 pt-3 border-t border-gray-200">
                      {isValidLink(teacher.social_links?.linkedin) && (
                        <a
                          href={teacher.social_links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF7426] hover:text-gray-800 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <FiLinkedin size={16} />
                        </a>
                      )}
                      {isValidLink(teacher.social_links?.github) && (
                        <a
                          href={teacher.social_links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF7426] hover:text-gray-800 transition-colors"
                          aria-label="GitHub"
                        >
                          <FiGithub size={16} />
                        </a>
                      )}
                      {isValidLink(teacher.social_links?.twitter) && (
                        <a
                          href={teacher.social_links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF7426] hover:text-gray-800 transition-colors"
                          aria-label={teacher.social_links.twitter.includes('x.com') ? 'X' : 'Twitter'}
                        >
                          {teacher.social_links.twitter.includes('x.com') ? (
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="inline-block"
                            >
                              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                            </svg>
                          ) : (
                            <FiTwitter size={16} />
                          )}
                        </a>
                      )}
                      {isValidLink(teacher.social_links?.facebook) && (
                        <a
                          href={teacher.social_links.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF7426] hover:text-gray-800 transition-colors"
                          aria-label="Facebook"
                        >
                          <FiFacebook size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <style jsx>{`
        .swiper-pagination-bullet {
          background-color: #FF7426 !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background-color: #FF7426 !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

export default TeacherSlider;