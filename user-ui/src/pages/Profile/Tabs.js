import InfoTab from './components/InfoTab';
import ProductTab from './components/ProductTab';
import SettingTab from './components/SettingTab';

export const Items = [
  {
    id: 1,
    title: 'my product',
    component: ProductTab,
  },
  {
    id: 2,
    title: 'personal information',
    component: InfoTab,
  },
  {
    id: 3,
    title: 'setting',
    component: SettingTab,
  },
];
