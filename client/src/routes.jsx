import { lazy } from "react";
import GuestLayout from "./layout/GuestLayout";
// import AccountLayout from "./layouts/GuestLayout/AccountLayout";
// import Privacy from "./layouts/PrivacyLayout/Privacy";

// Replace lazyImport function with direct lazy imports
const Index = ({ children }) => {
  return (<>{children}</>)
}
const Home = lazy(() => import("./pages/Frontend/Home"));
const Home2 = lazy(() => import("./pages/Frontend/Home2"));
const Success = lazy(() => import("./pages/Frontend/SuccessStory"));
const upcomingBatches = lazy(() => import("./pages/Frontend/UpcomingBatches"));
const StudentsBlog = lazy(() => import("./pages/Frontend/StudentsBlog"));
const ContactUs = lazy(() => import("./pages/Frontend/ContactUs"));
// const Login = lazy(() => import("./pages/Auth/Login"));

export const routes = [
  { exact: true, path: "/", layout: GuestLayout, component: Home },
  { exact: true, path: "/home2", layout: GuestLayout, component: Home2 },
  { exact: true, path: "/Success-stories", layout: Index, component: Success},
  { exact: true, path: "/upcoming-batches", layout: Index, component: upcomingBatches},
  { exact: true, path: "/Students-Blog", layout: Index, component: StudentsBlog},
  { exact: true, path: "/ContactUs", layout: Index, component: ContactUs},
  { exact: true, path: "*", component: Success },
];
