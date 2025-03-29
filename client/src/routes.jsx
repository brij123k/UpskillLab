import { lazy } from "react";
// import AccountLayout from "./layouts/GuestLayout/AccountLayout";
// import Privacy from "./layouts/PrivacyLayout/Privacy";

// Replace lazyImport function with direct lazy imports
const Index = ({ children }) => {
  return (<>{children}</>)
}
const Home = lazy(() => import("./pages/Frontend/Home"));
const Success = lazy(() => import("./pages/Frontend/SuccessStory"));
// const Login = lazy(() => import("./pages/Auth/Login"));

export const routes = [
  { exact: true, path: "/", layout: Index, component: Home },
  { exact: true, path: "/Success-stories", layout: Index, component: Success },
];
