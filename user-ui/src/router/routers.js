import HeaderOnly from "../layouts/HeaderOnly/HeaderOnly";

import config from "../config";

import Home from "../page/Home";
import Login from "../page/Login";
import SignUp from "../page/SignUp";
const publicRouters = [{ path: config.routes.home, component: Home }];
const sellerRouters = [];
const customerRouters = [];
const authRouters = [
  { path: config.routes.login, component: Login },
  { path: config.routes.signup, component: SignUp },
];
export { publicRouters, sellerRouters, customerRouters, authRouters };
