import { lazy } from "react";
import GuestLayout from "./layout/GuestLayout";
import TeacherPanelLayout from "./layout/TeacherPanelLayout";
import StudentPanelLayout from "./layout/StudentPanelLayout";
import { exact } from "prop-types";


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
const Register = lazy(() => import("./pages/Auth/Register"));
const Login = lazy(() => import("./pages/Auth/Login"));
const ForgotPasswordPage = lazy(() => import("./pages/Auth/ForgetPassword"));
const ResetPasswordPage = lazy(() => import("./pages/Auth/ResetPassword"));
const VerifyOTPPage = lazy(() => import("./pages/Auth/VerifyOTP"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const CourseDetailsPage = lazy(() => import("./pages/Frontend/CourseDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));




// Teacher Pannel lazyImport 
const TeacherDashboard= lazy(()=> import("./pages/Dashboard/Teacher/TeacherDashboard"))
const TeacherProfile= lazy(()=> import("./pages/Dashboard/Teacher/TeacherProfile"))
const StudyMaterials= lazy(()=> import("./pages/Dashboard/Teacher/StudyMaterials"))
const ClassSchedule= lazy(()=> import("./pages/Dashboard/Teacher/ClassSchedule"))
const TeacherSuggestions= lazy(()=> import("./pages/Dashboard/Teacher/TeacherSuggestions"))
const MarketAnalysis= lazy(()=> import("./pages/Dashboard/Teacher/MarketAnalysis"))
const LiveClasses= lazy(()=> import("./pages/Dashboard/Teacher/LiveClasses"))
const DoubtHandling= lazy(()=> import("./pages/Dashboard/Teacher/DoubtHandling"))
const TeacherNotifications= lazy(()=> import("./pages/Dashboard/Teacher/TeacherNotifications"))


// Student Panel lazyImport
const StudentDashboard= lazy(()=> import("./pages/Dashboard/Student/StudentDashboard"))

export const routes = [
  { exact: true, path: "/", layout: GuestLayout, component: Home },
  { exact: true, path: "/Success-stories", layout: GuestLayout, component: Success},
  { exact: true, path: "/upcoming-batches/", layout: GuestLayout, component: upcomingBatches},
  { exact: true, path: "/Students-Blog", layout: GuestLayout, component: StudentsBlog},
  { exact: true, path: "/BlogDetail/:id",layout:GuestLayout,component:BlogDetailPage},
  { exact: true, path: "/ContactUs", layout: GuestLayout, component: ContactUs},
  { exact: true, path: "/CourseList", layout: GuestLayout, component: CourseList},
  // { exact: true, path: "/CourseDetails/:id", layout: GuestLayout, component: CourseDetailsPage},
  { exact: true, path: "/courseDetails/batch/:id", layout: GuestLayout, component: CourseDetailsPage},
  {
    exact: true, path: "/courseDetails/course/:id", layout: GuestLayout, component: CourseDetailsPage},
  { exact: true, path: "/Register", layout: Index, component: Register},
  { exact: true, path: "/Login", layout: Index, component: Login},
  { exact: true, path: "/ForgetPassword", layout: Index, component: ForgotPasswordPage},
  // { exact: true, path: "/ResetPassword/:token", layout: Index, component: ResetPasswordPage},
  { exact: true, path: "/ResetPassword", layout: Index, component: ResetPasswordPage},
  { exact: true, path: "/VerifyOTP", layout: Index, component: VerifyOTPPage},
  { exact: true, path: "/TermsOfService", layout: Index, component: TermsOfService},
  { exact: true, path: "/PrivacyPolicy", layout: Index, component: PrivacyPolicy},
  { exact: true, path: "*", component: NotFoundPage },

  // Teacher Panel Routes 

  { exact: true, path:"/Teacher/Dashboard", layout:TeacherPanelLayout, component:TeacherDashboard},
  { exact: true, path:"/Teacher/Profile", layout:TeacherPanelLayout, component:TeacherProfile},
  { exact: true, path:"/Teacher/StudyMaterials", layout:TeacherPanelLayout, component:StudyMaterials},
  { exact: true, path:"/Teacher/Schedule", layout:TeacherPanelLayout, component:ClassSchedule},
  { exact: true, path:"/Teacher/Suggestions", layout:TeacherPanelLayout, component:TeacherSuggestions},
  { exact: true, path:"/Teacher/Analysis", layout:TeacherPanelLayout, component:MarketAnalysis},
  { exact: true, path:"/Teacher/Classes", layout:TeacherPanelLayout, component:LiveClasses},
  { exact: true, path:"/Teacher/Doubt", layout:TeacherPanelLayout, component:DoubtHandling},
  { exact: true, path:"/Teacher/Notifications", layout:TeacherPanelLayout, component:TeacherNotifications},
  
  // Student Panel Routes
  { exact: true, path:"/Student/Dashboard", layout:StudentPanelLayout, component:StudentDashboard},
];
