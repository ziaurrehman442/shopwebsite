// application
import { IMobileMenuLink } from '~/interfaces/mobile-menu-link';

const dataMobileMenuLinks: IMobileMenuLink[] = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'Shop',
        url: '/demo/shop/shop-grid-4-sidebar',
    },
    {
        title: 'Account',
        url: '/account/dashboard',
        submenu: [
            { title: 'Login & Register', url: '/account/login' },
            { title: 'Dashboard', url: '/account/dashboard' },
            { title: 'Garage', url: '/account/garage' },
            { title: 'Edit Profile', url: '/account/profile' },
            { title: 'Order History', url: '/account/orders' },
            {
                title: 'Order Details',
                url: {
                    href: '/account/orders/[id]?id=1',
                    as: '/account/orders/1',
                },
            },
            { title: 'Address Book', url: '/account/addresses' },
            {
                title: 'Edit Address',
                url: {
                    href: '/account/addresses/[id]?id=new',
                    as: '/account/addresses/new',
                },
            },
            { title: 'Change Password', url: '/account/password' },
        ],
    },
];

export default dataMobileMenuLinks;
