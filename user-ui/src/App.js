<<<<<<< HEAD
import { Fragment, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { publicRouters, authRouters } from "./router";
//Layout
import DefaultLayout from "./layouts/DefaultLayout";
import HeaderOnly from "./layouts/HeaderOnly/HeaderOnly";

import config from "./config";
=======
import { Fragment, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { publicRoutes, authRoutes, privateRoutes } from 'src/routes';
import DefaultLayout, { HeaderOnly } from 'src/layouts';
import { scrollToPosition } from 'src/utils';
import config from './config';
import * as authServices from 'src/services/authServices';
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4

function App() {
  let location = useLocation();
  useEffect(() => {
    scrollToPosition(0);
  }, [location.pathname]);

  return (
    <div className="App">
      <>
        <Routes>
          {publicRoutes.map((route, index) => {
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
<<<<<<< HEAD
          {authRouters.map((route, index) => {
            const Page = route.component;
            // const isLoggedIn = authServices.isLoggedIn();
=======
          {authRoutes.map((route, index) => {
            const Page = route.component;
            const isLoggedIn = authServices.isLoggedIn();
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
            let Layout = HeaderOnly;
            // Login rồi không vào trang Login, Sign Up, Forget Password được nữa
            return (
              <Route
                key={index}
                path={route.path}
                element={
<<<<<<< HEAD
                  // isLoggedIn ? (
                  //   <Navigate to={config.routes.home} replace={true} />
                  // ) : (
                  <Layout>
                    <Page />
                  </Layout>
                  // )
=======
                  isLoggedIn ? (
                    <Navigate to={config.routes.home} replace={true} />
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = HeaderOnly;
            const isLoggedIn = authServices.isLoggedIn();
            // Chưa Loggin thì không vào được trang Profile, Cart, WishList, Checkout
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isLoggedIn ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to={config.routes.login} replace={true} />
                  )
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
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
