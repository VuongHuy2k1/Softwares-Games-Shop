import config from '../configs/index';

// Pages
import Login from '../pages/Login/index';

import Dash from 'pages/Dashboard/dashboad';
import Contact from 'pages/Contact/index';
import RecentOrders from 'pages/RecentOrders/index';

import User from 'pages/UserList/index';
import NewUser from 'pages/UserNew/index';
import EditUser from 'pages/UserEdit/index';
import UserProfile from 'pages/UserProfile/index';
import UserRole from 'pages/UserRole/index';

import Game from 'pages/GameList/index';
import GameNewGenre from 'pages/GameNewGenre/index';
import NewGame from 'pages/GameNew/index';
import EditGame from 'pages/GameEdit/index';
import ProfileGame from 'pages/GameProfile/index';
import GameGenre from 'pages/GameGenre/index';

// Route
const adminRoutes = [
    { path: config.routes.dashboard, component: Dash },
    { path: config.routes.contact, component: Contact },

    { path: config.routes.recentOrders, component: RecentOrders },

    { path: config.routes.listGame, component: Game },
    { path: config.routes.newGame, component: NewGame },
    { path: config.routes.editGame, component: EditGame },
    { path: config.routes.profileGame, component: ProfileGame },
    { path: config.routes.genreGame, component: GameGenre },
    { path: config.routes.newGenre, component: GameNewGenre },

    { path: config.routes.user, component: User },
    { path: config.routes.newUser, component: NewUser },
    { path: config.routes.editUser, component: EditUser },
    { path: config.routes.userRole, component: UserRole },
    { path: config.routes.userProfile, component: UserProfile }
];

const authRoutes = [{ path: config.routes.login, component: Login }];

export { adminRoutes, authRoutes };
