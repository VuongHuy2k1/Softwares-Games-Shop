// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { BsMailbox } from 'react-icons/bs';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    BsMailbox,
    RiMoneyDollarCircleLine
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'contact',
    title: 'Client',
    type: 'group',
    children: [
        {
            id: 'contact',
            title: 'Contact',
            type: 'item',
            url: '/contact',
            icon: icons.BsMailbox
        },
        {
            id: 'recentOrders',
            title: 'Recent Orders',
            type: 'item',
            url: '/recent-orders',
            icon: icons.RiMoneyDollarCircleLine
        }
    ]
};

export default pages;
