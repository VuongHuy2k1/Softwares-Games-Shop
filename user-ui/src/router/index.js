import config from "../config";
import Home from "../page/Home";
const publicRouters = [{ path: config.routes.home, component: Home }];
const sellerRouters = [];
const customerRouters = [];
const authRouters = [];
export { publicRouters, sellerRouters, customerRouters, authRouters };
