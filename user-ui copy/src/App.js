import { Fragment, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { publicRoutes, authRoutes, privateRoutes } from 'src/routes';
import DefaultLayout, { HeaderOnly } from 'src/layouts';
import { scrollToPosition } from 'src/utils';

import config from './config';
import * as authServices from 'src/services/authServices';

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

          {authRoutes.map((route, index) => {
            const Page = route.component;
            const isLoggedIn = authServices.isLoggedIn();

            let Layout = HeaderOnly;
            // Login rồi không vào trang Login, Sign Up, Forget Password được nữa
            return (
              <Route
                key={index}
                path={route.path}
                element={
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
            let Layout = route.layout;
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
