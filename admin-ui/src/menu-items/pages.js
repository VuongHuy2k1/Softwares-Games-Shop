// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { BsMailbox } from 'react-icons/bs';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    BsMailbox
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'contact',
    title: 'Contact',
    type: 'group',
    children: [
        {
            id: 'contact',
            title: 'Contact',
            type: 'item',
            url: '/contact',
            icon: icons.BsMailbox
        }
    ]
};

export default pages;
