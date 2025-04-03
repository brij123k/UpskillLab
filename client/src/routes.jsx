import { lazy } from "react";
import GuestLayout from "./layout/GuestLayout";
// import AccountLayout from "./layouts/GuestLayout/AccountLayout";
// import Privacy from "./layouts/PrivacyLayout/Privacy";

// Replace lazyImport function with direct lazy imports
const Index = ({ children }) => {
  return (<>{children}</>)
}
const Home = lazy(() => import("./pages/Frontend/Home"));
const Success = lazy(() => import("./pages/Frontend/SuccessStory"));
const upcomingBatches = lazy(() => import("./pages/Frontend/UpcomingBatches"));
const StudentsBlog = lazy(() => import("./pages/Frontend/StudentsBlog"));
const ContactUs = lazy(() => import("./pages/Frontend/ContactUs"));
const CourseList = lazy(() => import("./pages/Frontend/CourseList"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Login = lazy(() => import("./pages/Auth/Login"));
const ForgotPasswordPage = lazy(() => import("./pages/Auth/ForgetPassword"));
const ResetPasswordPage = lazy(() => import("./pages/Auth/ResetPassword"));
const VerifyOTPPage = lazy(() => import("./pages/Auth/VerifyOTP"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
// const CourseDetails = lazy(() => import("./pages/Frontend/CourseDetails"));
// const Privacy = lazy(() => import("./pages/Privacy"));

export const routes = [
  { exact: true, path: "/", layout: GuestLayout, component: Home },
  { exact: true, path: "/Success-stories", layout: GuestLayout, component: Success},
  { exact: true, path: "/upcoming-batches", layout: GuestLayout, component: upcomingBatches},
  { exact: true, path: "/Students-Blog", layout: GuestLayout, component: StudentsBlog},
  { exact: true, path: "/ContactUs", layout: GuestLayout, component: ContactUs},
  { exact: true, path: "/CourseList", layout: GuestLayout, component: CourseList},
  // { exact: true, path: "/CourseDetails/:id", layout: Index, component: CourseDetails},
  { exact: true, path: "/Register", layout: Index, component: Register},
  { exact: true, path: "/Login", layout: Index, component: Login},
  { exact: true, path: "/ForgetPassword", layout: Index, component: ForgotPasswordPage},
  // { exact: true, path: "/ResetPassword/:token", layout: Index, component: ResetPasswordPage},
  { exact: true, path: "/ResetPassword", layout: Index, component: ResetPasswordPage},
  { exact: true, path: "/VerifyOTP", layout: Index, component: VerifyOTPPage},
  // { exact: true, path: "/PrivacyPolicy", layout: Privacy, component: Privacy},
  // { exact: true, path: "/TermsAndConditions", layout: Privacy, component: Privacy},
  { exact: true, path: "*", component: NotFoundPage },
];
