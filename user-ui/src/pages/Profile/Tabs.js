import InfoTab from './components/InfoTab';
import ProductTab from './components/ProductTab';
import SettingTab from './components/SettingTab';

export const Items = [
  {
    id: 1,
    title: 'my product',
    title_vi: 'sản phẩm của tôi',
    component: ProductTab,
  },
  {
    id: 2,
    title: 'personal information',
    title_vi: 'thông tin cá nhân',
    component: InfoTab,
  },
  {
    id: 3,
    title: 'setting',
    title_vi: 'cài đặt',
    component: SettingTab,
  },
];
