import config from 'src/config';
export const navItems = [
  {
    id: 1,
    title: 'Store',
    path: config.routes.home,
    subnav: [
      // {
      //   id: 1,
      //   title: 'Best Seller',
      //   path: `/products/q=best-seller`,
      // },
      // {
      //   id: 2,
      //   title: 'Lastest',
      //   path: `/products/q=latest`,
      // },
      // {
      //   id: 3,
      //   title: 'Specials',
      //   path: `/products/q=special`,
      // },
    ],
  },
  // {
  //   id: 2,
  //   title: 'Community',
  //   path: config.routes.home,
  //   subnav: [
  //     // {
  //     //   id: 1,
  //     //   title: 'Home',
  //     //   path: config.routes.home,
  //     // },
  //     // {
  //     //   id: 2,
  //     //   title: 'Discussions',
  //     //   path: config.routes.home,
  //     // },
  //   ],
  // },
  {
    id: 3,
    title: 'About',
    path: config.routes.about,
  },
  {
    id: 4,
    title: 'Contact',
    path: config.routes.contact,
  },
];
