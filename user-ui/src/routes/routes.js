import config from 'src/config';

// Layouts
import { HeaderOnly } from 'src/layouts';

// Pages
import NotFound from 'src/pages/NotFound';
import Home from 'src/pages/Home';
import Category from 'src/pages/Category';
import Contact from 'src/pages/Contact';
import Profile from 'src/pages/Profile';
import Product from 'src/pages/Product';
import Products from 'src/pages/Products';
import Search from 'src/pages/Search';
import Login from 'src/pages/Login';
import SignUp from 'src/pages/SignUp';
import SendCodeForm from 'src/pages/SendCodeForm';
import SignUpCheck from 'src/pages/SignUpCheck';
import ForgetPassword from 'src/pages/ForgetPassword';
import CartPage from 'src/pages/CartPage';
import WishListPage from 'src/pages/WishListPage';
import AboutPage from 'src/pages/AboutPage';
import CheckoutPage from 'src/pages/CheckoutPage';

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.notFound, component: NotFound, layout: HeaderOnly },
  { path: config.routes.about, component: AboutPage, layout: HeaderOnly },
  { path: config.routes.contact, component: Contact, layout: HeaderOnly },

  { path: config.routes.product, component: Product, layout: HeaderOnly },

  { path: config.routes.products, component: Products },
  { path: config.routes.allProduct, component: Products },
  { path: config.routes.allProductWithDefaultPagination, component: Products },
  { path: config.routes.allProductWithPagination, component: Products },

  { path: config.routes.search, component: Search },
  { path: config.routes.searchWithPagination, component: Search },
  { path: config.routes.searchWithDefaultPagination, component: Search },

  { path: config.routes.categoryWithPagination, component: Category },
  { path: config.routes.categoryWithDefaultPagination, component: Category },
  { path: config.routes.categoryWithGenre, component: Category },
  { path: config.routes.category, component: Category, layout: HeaderOnly },
];

// Private routes
const privateRoutes = [
  { path: config.routes.profile, component: Profile },

  { path: config.routes.cart, component: CartPage },
  { path: config.routes.wishlist, component: WishListPage },
  { path: config.routes.checkout, component: CheckoutPage },
];

// Auth routes
const authRoutes = [
  { path: config.routes.login, component: Login },
  { path: config.routes.sendCode, component: SendCodeForm },
  { path: config.routes.signup, component: SignUp },
  { path: config.routes.signupCheck, component: SignUpCheck },
  { path: config.routes.forgetPassword, component: ForgetPassword },
];

export { publicRoutes, privateRoutes, authRoutes };
