import config from 'src/config';

// Layouts
import { HeaderOnly, HeaderOnlyProPlus } from 'src/layouts';
import { HeaderOnlyPro } from 'src/layouts';

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
import DefaultLayoutPro from 'src/layouts/DefaultLayoutPro';
// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.notFound, component: NotFound, layout: HeaderOnly },
  { path: config.routes.about, component: AboutPage, layout: HeaderOnlyPro },
  { path: config.routes.contact, component: Contact, layout: HeaderOnly },

  { path: config.routes.product, component: Product, layout: HeaderOnlyPro },

  { path: config.routes.products, component: Products, layout: DefaultLayoutPro },
  { path: config.routes.allProduct, component: Products, layout: DefaultLayoutPro },
  { path: config.routes.allProductWithDefaultPagination, component: Products },
  { path: config.routes.allProductWithPagination, component: Products },

  { path: config.routes.search, component: Search, layout: DefaultLayoutPro },
  { path: config.routes.searchWithPagination, component: Search, layout: DefaultLayoutPro },
  { path: config.routes.searchWithDefaultPagination, component: Search, layout: DefaultLayoutPro },

  { path: config.routes.categoryWithPagination, component: Category, layout: DefaultLayoutPro },
  { path: config.routes.categoryWithDefaultPagination, component: Category, layout: DefaultLayoutPro },
  { path: config.routes.categoryWithGenre, component: Category, layout: DefaultLayoutPro },
  { path: config.routes.category, component: Category, layout: DefaultLayoutPro },
];

// Private routes
const privateRoutes = [
  { path: config.routes.profile, component: Profile, layout: HeaderOnlyProPlus },

  { path: config.routes.cart, component: CartPage, layout: HeaderOnlyPro },
  { path: config.routes.wishlist, component: WishListPage, layout: HeaderOnlyPro },
  { path: config.routes.checkout, component: CheckoutPage, layout: HeaderOnlyPro },
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
