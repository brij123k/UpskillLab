import React, { Suspense, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLoading from "./components/PageLoading";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./AuthGuard";

import CardsContainer from './components/Cards/CardContainer'
import StudentFeedBack  from './components/Cards/StudentFeedBack'
import CourseCards from './components/Courses/CourseCards'
import PremiumLearning from './components/PremiumLearning'

const App = () => {
  return (
    <Router>
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
          <StudentFeedBack/>
   <CardsContainer/>
   <PremiumLearning/>
    <CourseCards/>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default App;

function RenderRoutes({ data }) {
  return (
    <div>
    <Routes>
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
