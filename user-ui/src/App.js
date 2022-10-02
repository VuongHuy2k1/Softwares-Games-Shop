import { Fragment, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { publicRouters } from "./router";
import DefaultLayout from "./layouts/DefaultLayout";

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
        </Routes>
      </>
    </div>
  );
}

export default App;
