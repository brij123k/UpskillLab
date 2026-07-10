import React, { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiLoader, FiUser, FiUsers, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getDataHandlerWithToken } from '../../../config/services';
import ApiConfig from '../../../config/apiConfig';

const sectionConfig = [
  {
    key: 'upcoming',
    title: 'Upcoming',
    description: 'Sessions scheduled for the future',
    icon: FiCalendar,
    accent: 'bg-purple-100 text-purple-700',
  },
  {
    key: 'present',
    title: 'Present',
    description: 'Sessions currently in progress',
    icon: FiClock,
    accent: 'bg-amber-100 text-amber-700',
  },
  {
    key: 'past',
    title: 'Past',
    description: 'Completed or already held sessions',
    icon: FiCheckCircle,
    accent: 'bg-emerald-100 text-emerald-700',
  },
];

const TeacherCounselling = () => {
  const [counsellings, setCounsellings] = useState({ upcoming: [], present: [], past: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCounsellings();
  }, []);

  const fetchCounsellings = async () => {
    try {
      setLoading(true);
      const response = await getDataHandlerWithToken(ApiConfig.teacherCounseling, null, null, true);
      setCounsellings({
        upcoming: response?.upcoming || [],
        present: response?.present || [],
        past: response?.past || [],
      });
    } catch (error) {
      console.error('Failed to fetch counselling sessions:', error);
      toast.error('Failed to load counselling sessions');
    } finally {
      setLoading(false);
    }
  };

const formatDate = (dateString) => {
  if (!dateString) return 'Not scheduled yet';

  const date = new Date(dateString.replace('Z', ''));

  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-purple-100 text-purple-700';
      case 'completed':
        return 'bg-emerald-100 text-emerald-700';
      case 'present':
        return 'bg-amber-100 text-amber-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf8ee] p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">Student Counsellings</h1>
            <p className="text-gray-600">Review upcoming, ongoing, and past counselling sessions for your students.</p>
          </div>
          <div className="rounded-xl border border-[#4D2C5E]/10 bg-white px-4 py-3 shadow-sm">
            <p className="text-sm text-gray-500">Sessions overview</p>
            <p className="font-semibold text-[#4D2C5E]">
              {counsellings.upcoming.length} upcoming • {counsellings.present.length} present • {counsellings.past.length} past
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center rounded-2xl bg-white shadow-sm">
            <div className="flex flex-col items-center gap-3 text-gray-600">
              <FiLoader className="h-8 w-8 animate-spin text-[#4D2C5E]" />
              <p>Loading counselling sessions...</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {sectionConfig.map((section) => {
              const items = counsellings[section.key] || [];
              const Icon = section.icon;

              return (
                <section key={section.key} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-xl p-3 ${section.accent}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                        <p className="text-sm text-gray-500">{section.description}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                      {items.length} {items.length === 1 ? 'session' : 'sessions'}
                    </span>
                  </div>

                  {items.length === 0 ? (
                    <div className="flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-gray-500">
                      <FiAlertCircle className="mb-2 h-6 w-6" />
                      <p>No {section.key} counselling sessions available.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 lg:grid-cols-2">
                      {items.map((session) => (
                        <article key={session._id} className="rounded-xl border border-gray-200 bg-[#fcfaf7] p-4 shadow-sm">
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {session.studentId?.fullName || 'Unknown student'}
                              </h3>
                              <p className="text-sm text-gray-500">Student ID: {session.studentId?._id || 'N/A'}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusBadge(session.status)}`}>
                              {session.status || 'unknown'}
                            </span>
                          </div>

                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <FiUser className="h-4 w-4 text-[#4D2C5E]" />
                              <span>Counsellor: {session.counsellorId?.name || 'Unassigned'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiCalendar className="h-4 w-4 text-[#4D2C5E]" />
                              <span>{formatDate(session.scheduledAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiUsers className="h-4 w-4 text-[#4D2C5E]" />
                              <span>{session.month}/{session.year}</span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCounselling;
