import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiClock, FiBook } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { getDataHandlerWithToken } from '../../../config/services';
import ApiConfig from '../../../config/apiConfig';

const VideoPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const endpoint = ApiConfig.recordedVideosbyid(id)
        const response = await getDataHandlerWithToken(endpoint,null, null, true);
        console.log(response)
        if (response && response.video) {
          setVideo(response.video);
        } else {
          setError('Video not found');
        }
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  const formatDuration = (duration) => {
    if (!duration) return '00:00';
    const parts = duration.split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      return `${hours}h ${minutes}m`;
    }
    return duration;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <h2 className="text-xl font-bold text-[#4D2C5E] mb-4">{error}</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152]"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!video) return null;

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#4D2C5E] hover:text-[#FF7426] mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to Videos
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Video Player */}
          <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <ReactPlayer
              url={video.videoUrl}
              width="100%"
              height="100%"
              controls={true}
              style={{ position: 'absolute', top: 0, left: 0 }}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload' // Disable download option in native controls
                  }
                }
              }}
            />
          </div>

          {/* Video Details */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#4D2C5E]">{video.title}</h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <FiClock className="mr-2" />
                  <span>{formatDate(video.createdAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDuration(video.duration)}</span>
                </div>
              </div>
              {/* <button className="flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152]">
                <FiDownload className="mr-2" />
                Download Video
              </button> */}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#4D2C5E] mb-2 flex items-center">
                  <FiBook className="mr-2" />
                  Course Information
                </h3>
                <p className="text-gray-700">
                  <span className="font-medium">Course:</span> {video.courseId?.courseName}
                </p>
                <p className="text-gray-700 mt-1">
                  <span className="font-medium">Chapter:</span> {video.chapterId?.name}
                </p>
                <p className="text-gray-700 mt-1">
                  <span className="font-medium">Week:</span> {video.chapterId?.week}
                </p>
                <p className="text-gray-700 mt-1">
                  <span className="font-medium">Session:</span> {video.chapterId?.session}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#4D2C5E] mb-2">Description</h3>
                <p className="text-gray-700">
                  {video.description || 'No description available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;