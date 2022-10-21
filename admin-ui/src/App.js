import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Fragment } from 'react';
import { adminRouter } from './routes';
import { MainLayout } from './component/layout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {adminRouter.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout === null ? Fragment : MainLayout;
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
            </div>
        </Router>
    );
}

export default App;
