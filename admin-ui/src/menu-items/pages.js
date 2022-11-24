// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { GrGamepad } from 'react-icons/gr';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    GrGamepad
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'page',
    title: 'Page',
    type: 'group',
    children: [
        {
            id: 'login1',
            title: 'Login',
            type: 'item',
            url: '/login',
            icon: icons.LoginOutlined,
            target: true
        },
        {
            id: 'register1',
            title: 'Register',
            type: 'item',
            url: '/register',
            icon: icons.ProfileOutlined,
            target: true
        }
    ]
};

export default pages;
