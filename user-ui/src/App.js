import { Fragment, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { publicRouters, authRouters } from "./router";
//Layout
import DefaultLayout from "./layouts/DefaultLayout";
import HeaderOnly from "./layouts/HeaderOnly/HeaderOnly";

import config from "./config";

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          {publicRouters.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {authRouters.map((route, index) => {
            const Page = route.component;
            // const isLoggedIn = authServices.isLoggedIn();
            let Layout = HeaderOnly;
            // Login rồi không vào trang Login, Sign Up, Forget Password được nữa
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  // isLoggedIn ? (
                  //   <Navigate to={config.routes.home} replace={true} />
                  // ) : (
                  <Layout>
                    <Page />
                  </Layout>
                  // )
                }
              />
            );
          })}
        </Routes>
      </>
    </div>
  );
}

export default App;
