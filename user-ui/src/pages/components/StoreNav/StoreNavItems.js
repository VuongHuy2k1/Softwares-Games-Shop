import config from 'src/config';

export const storeNavItems = [
  {
    id: 1,
    title: 'Your Store',
    path: '/',
    subnav: [
      {
        id: 1,
        title: 'Home',
        path: '/',
      },
      {
        id: 2,
        title: 'Community Recommends',
        path: '/',
      },
      // {
      //   id: 3,
      //   title: 'Recently Viewed',
      //   path: '/',
      // },
    ],
  },
  {
    id: 2,
    title: 'New & Noteworthy',
    path: '/',
    subnav: [
      {
        id: 1,
        title: 'Best Seller',
        path: `/products/q=best-seller`,
      },
      {
        id: 2,
        title: 'New & Trending',
        path: `/products/q=latest`,
      },
      {
        id: 3,
        title: 'Current Specials',
        path: `/products/q=special`,
      },
      // {
      //   id: 4,
      //   title: 'Recently Updated',
      //   path: '/',
      // },
    ],
  },
  {
    id: 3,
    title: 'Categories',
    path: config.routes.category,
  },
  {
    id: 4,
    title: 'News',
    path: '/',
  },
];
