/**
 * Created by NicolaeB on 7/11/2016.
 */
import {provideRouter, RouterConfig} from '@angular/router';

import {HomePage} from "./pages/homePage/homePage";
import {RegistrationPage} from "./pages/registrationPage/registrationPage";
import {LoginPage} from "./pages/registrationPage/loginPage/loginPage";
import {ForgetPasswordPage} from "./pages/registrationPage/forgetPasswordPage/forgetPasswordPage";
import {SuccessPage} from "./pages/registrationPage/successPages/successPage";
import {AdminPage} from "./pages/adminPage/adminPage";
import {AccountSettingsPage} from "./pages/accountSettingsPage/accountSettingsPage";
import {CompanieDetailPage} from "./pages/companiesPage/companieDetailPage/companieDetailPage";
import {TokenConfirmPage} from "./pages/registrationPage/tokenConfirmPage/tokenConfirmPage";
import {CompaniesPage} from "./pages/companiesPage/companiesPage";

import {ACCOUNT_SETTINGS_PAGE_ROUTE_PROVIDERS} from './pages/accountSettingsPage/account.routes';
import {ADMIN_PAGE_ROUTE_PROVIDERS} from "./pages/adminPage/admin.routes";
import {Role} from "./models/Roles";

export const routes:RouterConfig = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'registration',
        component: RegistrationPage
    },{
        path: 'login',
        component: LoginPage
    },{
        path: 'forget-password',
        component: ForgetPasswordPage
    },{
        path: 'success/:succesOption',
        component: SuccessPage
    },{
        path: 'admin',
        component: AdminPage,
    },{
        path: 'account',
        component: AccountSettingsPage,
    },{
        path: 'firme',
        component: CompaniesPage
    },{
        path: 'firma-detalii/:id',
        component: CompanieDetailPage
    },{
        path: 'confirm/:registration?token',
        component: TokenConfirmPage
    },{
        path: '*',
        component: HomePage
    },
    ...ADMIN_PAGE_ROUTE_PROVIDERS,
    ...ACCOUNT_SETTINGS_PAGE_ROUTE_PROVIDERS
]


export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
]