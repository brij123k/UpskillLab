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
// const Login = lazy(() => import("./pages/Auth/Login"));

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
  { exact: true, path: "*", component: Success },
];
