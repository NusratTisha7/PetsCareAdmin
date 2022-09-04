import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';


import BlankPage from "../pages/BlankPage"
import ProductCategory from "../pages/ProductCategory"
import Brand from "../pages/Brand"
import PetCategory from "../pages/PetCategory"
import Pets from "../pages/Pets"
import PetReviews from "../pages/PetReviews"
import Products from "../pages/Products"
import ProductReviews from "../pages/ProductReviews"
import Offers from "../pages/Offers"

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard')));


const MainRoutes = {
    path: '/' ,
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'blank-page',
            element: <BlankPage/>,
        },

        {
            path: 'product-category',
            element: <ProductCategory/>
        },
        {
            path: 'brand',
            element: <Brand/>
        },
        {
            path: 'products',
            element: <Products/>
        },
        {
            path: 'pet-category',
            element: <PetCategory/>
        },
        {
            path: 'pets',
            element: <Pets/>
        },
        {
            path: 'pet-reviews',
            element: <PetReviews/>
        },
        {
            path: 'product-reviews',
            element: <ProductReviews/>
        },
        {
            path: 'offers',
            element: <Offers/>
        }
    ]
};

export default MainRoutes;
