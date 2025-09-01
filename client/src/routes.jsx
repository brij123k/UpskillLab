import { lazy } from "react";
import GuestLayout from "./layout/GuestLayout";
import TeacherPanelLayout from "./layout/TeacherPanelLayout";
import StudentPanelLayout from "./layout/StudentPanelLayout";
import { exact } from "prop-types";
import AuthGuard from "./AuthGuard";
import ProtectedRoute from "./components/ProtectedRoute";
const Index = ({ children }) => {
  return (<>{children}</>)
}
const Home = lazy(() => import("./pages/Frontend/Home"));
const Success = lazy(() => import("./pages/Frontend/SuccessStory"));
const upcomingBatches = lazy(() => import("./pages/Frontend/UpcomingBatches"));
const StudentsBlog = lazy(() => import("./pages/Frontend/StudentsBlog"));
const BlogDetailPage = lazy(()=>import("./pages/Frontend/BlogDetail"))
const ContactUs = lazy(() => import("./pages/Frontend/ContactUs"));
const CourseList = lazy(() => import("./pages/Frontend/CourseList"));
const Career = lazy(() => import("./pages/Frontend/Career"));
const AboutSection = lazy(() => import("./pages/Frontend/AboutSection"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Login = lazy(() => import("./pages/Auth/Login"));
const ForgotPasswordPage = lazy(() => import("./pages/Auth/ForgetPassword"));
const ResetPasswordPage = lazy(() => import("./pages/Auth/ResetPassword"));
const VerifyOTPPage = lazy(() => import("./pages/Auth/VerifyOTP"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const CourseDetailsPage = lazy(() => import("./pages/Frontend/CourseDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const TeacherRegistration = lazy(() => import("./pages/TeacherRegistration"));




// Teacher Pannel lazyImport 
const TeacherDashboard= lazy(()=> import("./pages/Dashboard/Teacher/TeacherDashboard"))
const TeacherProfile= lazy(()=> import("./pages/Dashboard/Teacher/TeacherProfile"))
const StudyMaterials= lazy(()=> import("./pages/Dashboard/Teacher/StudyMaterials"))
const ClassSchedule= lazy(()=> import("./pages/Dashboard/Teacher/ClassSchedule"))
const TeacherSuggestions= lazy(()=> import("./pages/Dashboard/Teacher/TeacherSuggestion"))
const MarketAnalysis= lazy(()=> import("./pages/Dashboard/Teacher/MarketAnalysis"))
const LiveClasses= lazy(()=> import("./pages/Dashboard/Teacher/LiveClasses"))
const DoubtHandling= lazy(()=> import("./pages/Dashboard/Teacher/DoubtHandling"))
const TeacherNotifications= lazy(()=> import("./pages/Dashboard/Teacher/TeacherNotifications"))


// Student Panel lazyImport
const StudentOnboarding = lazy(()=> import("./pages/Dashboard/Student/StudentOnboarding"))
const StudentDashboard= lazy(()=> import("./pages/Dashboard/Student/StudentDashboard"))
const StudentStudyMaterials= lazy(()=> import("./pages/Dashboard/Student/StudyMaterials"))
const StudentClassSchedule= lazy(()=> import("./pages/Dashboard/Student/ClassSchedule"))
const StudentLiveClasses= lazy(()=> import("./pages/Dashboard/Student/LiveClasses"))
const StudentHistory= lazy(()=> import("./pages/Dashboard/Student/StudentHistory"))
const StudentJobs= lazy(()=> import("./pages/Dashboard/Student/StudentJobs"))
const StudentNotification= lazy(()=> import("./pages/Dashboard/Student/StudentNotification"))
const StudentProfile= lazy(()=> import("./pages/Dashboard/Student/StudentProfile"))
const StudentRecordedVideos= lazy(()=> import("./pages/Dashboard/Student/StudentRecordedVideos"))
const RecordedVideoPlayer= lazy(()=> import("./pages/Dashboard/Student/VideoPlayerPage"))
const StudentTrends= lazy(()=> import("./pages/Dashboard/Student/StudentTrends"))
const StudentDoubts= lazy(()=> import("./pages/Dashboard/Student/StudentDoubts"))
const StudentTestimonial= lazy(()=> import("./pages/Dashboard/Student/StudentTestimonial"))
const StudentBlogs= lazy(()=> import("./pages/Dashboard/Student/StudentBlogs"))


const TeacherProtectedLayout = ({ children }) => (
  <ProtectedRoute allowedRoles={['TEACHER']}>
    <TeacherPanelLayout>
      {children}
    </TeacherPanelLayout>
  </ProtectedRoute>
);

const StudentProtectedLayout = ({ children }) => (
  <ProtectedRoute allowedRoles={['STUDENT']}>
    <StudentPanelLayout>
      {children}
    </StudentPanelLayout>
  </ProtectedRoute>
);


export const routes = [
  { exact: true, path: "/", layout: GuestLayout, component: Home },
  { exact: true, path: "/success-stories", layout: GuestLayout, component: Success},
  { exact: true, path: "/upcoming-batches/", layout: GuestLayout, component: upcomingBatches},
  { exact: true, path: "/blog", layout: GuestLayout, component: StudentsBlog},
  { exact: true, path: "/BlogDetail/:id/:slug",layout:GuestLayout,component:BlogDetailPage},
  { exact: true, path: "/contactus", layout: GuestLayout, component: ContactUs},
  { exact: true, path: "/courselist", layout: GuestLayout, component: CourseList},
  { exact: true, path: "/career", layout: GuestLayout, component: Career},
  { exact: true, path: "/about", layout: GuestLayout, component: AboutSection},
  // { exact: true, path: "/CourseDetails/:id", layout: GuestLayout, component: CourseDetailsPage},
  { exact: true, path: "/category/batch/:id", layout: GuestLayout, component: CourseDetailsPage},
  {
    exact: true, path: "/:category/course/:id", layout: GuestLayout, component: CourseDetailsPage},
  { exact: true, path: "/register", layout: Index, component: Register},
  { exact: true, path: "/login", layout: Index, component: Login},
  { exact: true, path: "/forgetPassword", layout: Index, component: ForgotPasswordPage},
  // { exact: true, path: "/ResetPassword/:token", layout: Index, component: ResetPasswordPage},
  { exact: true, path: "/ResetPassword", layout: Index, component: ResetPasswordPage},
  { exact: true, path: "/VerifyOTP", layout: Index, component: VerifyOTPPage},
  { exact: true, path: "/TermsOfService", layout: Index, component: TermsOfService},
  { exact: true, path: "/privacypolicy", layout: Index, component: PrivacyPolicy},
  { exact: true, path: "/RefundPolicy", layout: Index, component: RefundPolicy},
  { exact: true, path: "/teacher/register", layout: Index, component: TeacherRegistration},
  { exact: true, path: "*", component: NotFoundPage },

  // Teacher Panel Routes 

  { exact: true, path:"/Teacher/Dashboard", layout:TeacherProtectedLayout, component:TeacherDashboard},
  { exact: true, path:"/Teacher/Profile", layout:TeacherProtectedLayout, component:TeacherProfile},
  { exact: true, path:"/Teacher/StudyMaterials", layout:TeacherProtectedLayout, component:StudyMaterials},
  { exact: true, path:"/Teacher/Schedule", layout:TeacherProtectedLayout, component:ClassSchedule},
  { exact: true, path:"/Teacher/Suggestions", layout:TeacherProtectedLayout, component:TeacherSuggestions},
  { exact: true, path:"/Teacher/Analysis", layout:TeacherProtectedLayout, component:MarketAnalysis},
  { exact: true, path:"/Teacher/Classes", layout:TeacherProtectedLayout, component:LiveClasses},
  { exact: true, path:"/Teacher/Doubt", layout:TeacherProtectedLayout, component:DoubtHandling},
  { exact: true, path:"/Teacher/Notifications", layout:TeacherProtectedLayout, component:TeacherNotifications},
  
  // Student Panel Routes
  { exact: true, path:"/Student/Onboarding", layout:Index, component:StudentOnboarding},
  { exact: true, path:"/Student/Dashboard", layout:StudentProtectedLayout, component:StudentDashboard},
  { exact: true, path:"/Student/StudyMaterials", layout:StudentProtectedLayout, component:StudentStudyMaterials},
  { exact: true, path:"/Student/Schedule", layout:StudentProtectedLayout, component:StudentClassSchedule},
  { exact: true, path:"/Student/Classes", layout:StudentProtectedLayout, component:StudentLiveClasses},
  { exact: true, path:"/Student/History", layout:StudentProtectedLayout, component:StudentHistory},
  { exact: true, path:"/Student/Jobs", layout:StudentProtectedLayout, component:StudentJobs},
  { exact: true, path:"/Student/Notifications", layout:StudentProtectedLayout, component:StudentNotification},
  { exact: true, path:"/Student/Profile", layout:StudentProtectedLayout, component:StudentProfile},
  { exact: true, path:"/Student/Recorded-videos", layout:StudentProtectedLayout, component:StudentRecordedVideos},
  { exact: true, path:"/Student/videos/:id", layout:StudentProtectedLayout, component:RecordedVideoPlayer},
  { exact: true, path:"/Student/Doubts", layout:StudentProtectedLayout, component:StudentDoubts},
  { exact: true, path:"/Student/Trends", layout:StudentProtectedLayout, component:StudentTrends},
  { exact: true, path:"/Student/Testimonial", layout:StudentProtectedLayout, component:StudentTestimonial},
  { exact: true, path:"/Student/Blogs", layout:StudentProtectedLayout, component:StudentBlogs},
];
