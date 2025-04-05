import React, { Suspense, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLoading from "./components/PageLoading";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./AuthGuard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/ScrollToTop";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <ScrollToTop/>
        <AuthProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Suspense fallback={<PageLoading />}>
            <RenderRoutes data={routes} />
          </Suspense>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

function RenderRoutes({ data }) {
  return (
    <div>
      <Routes>
      {/* <ScrollToTop /> */}
        {data.map((route, i) => {
          const Component = route.component;
          const Layout = route.layout || Fragment;
          const RouteElement = (
            <Route
              key={i}
              path={route.path}
              element={
                <Layout>
                  {route.protected ? (
                    <AuthGuard>
                      <Component />
                    </AuthGuard>
                  ) : (
                    <Component />
                  )}
                </Layout>
              }
            />
          );
          return RouteElement;
        })}
      </Routes>
    </div>
  );
}
