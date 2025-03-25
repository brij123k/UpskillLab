import { lazy } from "react";
// import AccountLayout from "./layouts/GuestLayout/AccountLayout";
// import Privacy from "./layouts/PrivacyLayout/Privacy";

// Replace lazyImport function with direct lazy imports
const Index = ({ children }) => {
  return (<>{children}</>)
}
const Login = lazy(() => import("./pages/Auth/Login"));

export const routes = [
  { exact: true, path: "/", layout: Index, component: Login },
];
