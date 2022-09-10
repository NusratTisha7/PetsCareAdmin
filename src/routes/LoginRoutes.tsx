import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';
import ForgotPassword from "../pages/authentication/auth-forms/ForgotPassword";
import ResetPassword from "../pages/authentication/auth-forms/ResetPassword";

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        },
        {
            path: 'forgot-password',
            element: <ForgotPassword/>
        },
        {
            path: 'reset-password',
            element: <ResetPassword/>
        }
    ]
};

export default LoginRoutes;
