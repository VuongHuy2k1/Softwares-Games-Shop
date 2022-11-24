import config from '../configs/index';

// Layout
import MainLayout from 'layout/MainLayout/index';
import MinimalLayout from 'layout/MinimalLayout/index';
import EmptyLayout from 'layout/EmptyLayout/index';
// Pages
import Login from '../pages/Login/index';
import Game from 'pages/gameList/index';
import User from 'pages/userList/index';
import NewUser from 'pages/newUser/index';
import UserProfile from 'pages/userProfile/index';
import Dashboard from 'pages/dashboard/index';

// Route
const adminRoutes = [
    { path: config.routes.dashboard, component: Dashboard, layout: MainLayout },
    { path: config.routes.game, component: Game, layout: MainLayout },
    { path: config.routes.user, component: User, layout: MainLayout },
    { path: config.routes.newUser, component: NewUser, layout: MainLayout },
    { path: config.routes.userProfile, component: UserProfile, layout: MainLayout }
];

const authRoutes = [{ path: config.routes.login, component: Login, layout: EmptyLayout }];

export { adminRoutes, authRoutes };
