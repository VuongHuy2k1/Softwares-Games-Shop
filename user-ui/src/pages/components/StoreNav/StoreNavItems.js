import config from 'src/config';

export const storeNavItems = [
  {
    id: 1,
    title: 'Your Store',
    title_vi: 'Cửa hàng',
    path: '/',
    subnav: [
      {
        id: 1,
        title: 'Home',
        title_vi: 'Trang chủ',
        path: '/',
      },
      {
        id: 2,
        title: 'Community Recommends',
        title_vi: 'Trang cộng đồng',
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
    title_vi: 'Mới & Đáng chú ý',
    path: '/',
    subnav: [
      {
        id: 1,
        title: 'Best Seller',
        title_vi: 'Bán chạy',
        path: `/products/q=best-seller`,
      },
      {
        id: 2,
        title: 'New & Trending',
        title_vi: 'Mới Nhất',
        path: `/products/q=latest`,
      },
      {
        id: 3,
        title: 'Current Specials',
        title_vi: 'Khuyến Mãi',
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
    title_vi: 'Thể Loại',
    path: config.routes.category,
  },
  {
    id: 4,
    title: 'News',
    title_vi: 'Tin Tức',
    path: '/',
  },
];
