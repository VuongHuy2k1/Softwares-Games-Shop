import Home from '../pages/Home';
import ListGame from '../pages/ListGame';
import Login from '../pages/Login';
import User from '../pages/User';
import Order from '../pages/Order';

const adminRouter = [
    { path: '/', component: Home },
    { path: '/list', component: ListGame },
    { path: '/user', component: User },
    { path: '/order', component: Order },
    { path: '/login', component: Login, layout: null },
];

export { adminRouter };
