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

  if (loading) {
    return (
      <div className="bg-gradient-to-b bg-[#4D2C5E] to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-8 w-8 mx-auto border-4 border-[#FF7426] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-base text-gray-800">Loading our expert mentors...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-[#4D2C5E] to-white py-16 px-4" id="teachers">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#] mb-3">
            Meet Our <span className="text-[#FF7426]">Expert Mentors</span>
          </h2>
          <div className="w-20 h-1 bg-[#FF7426] mx-auto rounded-full"></div>
        </div>

        {teachers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg max-w-sm mx-auto px-6">
            <FiUser className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-800">No mentors available</h3>
            <p className="mt-2 text-gray-500">Check back later for our expert mentors</p>
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            pagination={{ 
              clickable: true, 
              dynamicBullets: true,
              dynamicMainBullets: 5
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="pb-14"
          >
            {teachers.map((teacher) => (
              <SwiperSlide key={teacher._id}>
               <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full md:flex md:flex-col transform hover:-translate-y-2 group">

                  {/* Teacher Image - Full width and height */}
                  <div className="relative h-72 w-full overflow-hidden">
                    {teacher.image ? (
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                        <FiUser className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-bold text-white">{teacher.name}</h3>
                      <p className="text-white/90 font-medium text-sm">
                        {teacher.expertise && teacher.expertise !== "string"
                          ? teacher.expertise
                          : "Professional Mentor"}
                      </p>
                    </div>
                  </div>

                  {/* Teacher Info */}
                 <div className="p-6 flex flex-col justify-between flex-1">

                    <div className="flex-1">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {teacher.bio && teacher.bio !== "string"
                          ? teacher.bio
                          : `${teacher.name} has extensive experience in their field.`}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">

                      <div className="flex items-center bg-[#FFF5EF] p-2 rounded-lg">
                        <div className="bg-[#FF7426] p-2 rounded-full mr-3">
                          <FiAward className="text-white h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Experience</p>
                          <p className="font-medium text-gray-800 text-sm">
                            {teacher.experience && teacher.experience !== "string"
                              ? teacher.experience
                              : "10+ years"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center bg-[#FFF5EF] p-2 rounded-lg">
                        <div className="bg-[#FF7426] p-2 rounded-full mr-3">
                          <FiBook className="text-white h-4 w-4" />
                        </div>
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
                    <div className="flex h-8 justify-center space-x-4 pt-4 border-t border-gray-200">
                      {isValidLink(teacher.social_links?.linkedin) && (
                        <a
                          href={teacher.social_links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4D2C5E] hover:text-[#FF7426] transition-colors p-2 rounded-full hover:bg-[#FFF5EF]"
                          aria-label="LinkedIn"
                        >
                          <FiLinkedin size={18} />
                        </a>
                      )}
                      {isValidLink(teacher.social_links?.github) && (
                        <a
                          href={teacher.social_links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4D2C5E] hover:text-[#FF7426] transition-colors p-2 rounded-full hover:bg-[#FFF5EF]"
                          aria-label="GitHub"
                        >
                          <FiGithub size={18} />
                        </a>
                      )}
                      {isValidLink(teacher.social_links?.twitter) && (
                        <a
                          href={teacher.social_links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4D2C5E] hover:text-[#FF7426] transition-colors p-2 rounded-full hover:bg-[#FFF5EF]"
                          aria-label={teacher.social_links.twitter.includes('x.com') ? 'X' : 'Twitter'}
                        >
                          {teacher.social_links.twitter.includes('x.com') ? (
                            <svg
                              viewBox="0 0 24 24"
                              width="18"
                              height="18"
                              fill="currentColor"
                              className="inline-block"
                            >
                              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                            </svg>
                          ) : (
                            <FiTwitter size={18} />
                          )}
                        </a>
                      )}
                      {isValidLink(teacher.social_links?.facebook) && (
                        <a
                          href={teacher.social_links.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4D2C5E] hover:text-[#FF7426] transition-colors p-2 rounded-full hover:bg-[#FFF5EF]"
                          aria-label="Facebook"
                        >
                          <FiFacebook size={18} />
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
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #FF7426 !important;
          opacity: 0.3;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 30px;
          border-radius: 5px;
        }
        .swiper-pagination {
          bottom: 30px !important;
          display: none;
        }
      `}</style>
    </section>
  );
}

export default TeacherSlider;
