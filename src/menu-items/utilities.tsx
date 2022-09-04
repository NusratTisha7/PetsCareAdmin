// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Payments',
    type: 'group',
    children: [
        {
            id: 'blankPage',
            title: 'Blank Page',
            type: 'item',
            url: '/blank-page',
            icon: icons.FontSizeOutlined
        },
        {
            id: 'productCategory',
            title: 'Product Category',
            type: 'item',
            url: '/product-category',
            icon: icons.FontSizeOutlined
        },
        {
            id: 'brand',
            title: 'Brand',
            type: 'item',
            url: '/brand',
            icon: icons.BarcodeOutlined
        },
        {
            id: 'products',
            title: 'Products',
            type: 'item',
            url: '/products',
            icon: icons.AntDesignOutlined
        },
        {
            id: 'petCategory',
            title: 'Pet Category',
            type: 'item',
            url: '/pet-category',
            icon: icons.AntDesignOutlined
        },
        {
            id: 'pets',
            title: 'Pets',
            type: 'item',
            url: '/pets',
            icon: icons.AntDesignOutlined
        },
        {
            id: 'petReviews',
            title: 'Pet Reviews',
            type: 'item',
            url: '/pet-reviews',
            icon: icons.AntDesignOutlined
        },
        {
            id: 'productReviews',
            title: 'Product Reviews',
            type: 'item',
            url: '/product-reviews',
            icon: icons.AntDesignOutlined
        },
        {
            id: 'offers',
            title: 'Offers',
            type: 'item',
            url: '/offers',
            icon: icons.AntDesignOutlined
        }
        
    ]
};

export default utilities;
