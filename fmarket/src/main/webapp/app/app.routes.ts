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
import {AuthorizationFilter} from "./services/AuthorizationFilter";

export const routes:RouterConfig = [
    {
        path: '',
        component: HomePage,
        canActivate: [AuthorizationFilter]
    },
    {
        path: 'registration',
        component: RegistrationPage,
        canActivate: [AuthorizationFilter]
    },{
        path: 'login',
        component: LoginPage,
        canActivate: [AuthorizationFilter]
    },{
        path: 'forget-password',
        component: ForgetPasswordPage,
        canActivate: [AuthorizationFilter]
    },{
        path: 'success/:succesOption',
        component: SuccessPage,
        canActivate: [AuthorizationFilter]
    },{
        path: 'admin',
        component: AdminPage,
        redirectTo: '',
        canActivate: [AuthorizationFilter],
        pathMatch:'full'
    },{
        path: 'account',
        component: AccountSettingsPage,
        redirectTo: '',
        canActivate: [AuthorizationFilter]
    },{
        path: 'firme',
        component: CompaniesPage,
        canActivate: [AuthorizationFilter]
    },{
        path: 'firma-detalii/:id',
        component: CompanieDetailPage,
        canActivate: [AuthorizationFilter]
    },{
        path: 'confirm/:registration?token',
        component: TokenConfirmPage,
        canActivate: [AuthorizationFilter]
    },{
        path: '*',
        component: HomePage,
        canActivate: [AuthorizationFilter]
    },
    ...ADMIN_PAGE_ROUTE_PROVIDERS,
    ...ACCOUNT_SETTINGS_PAGE_ROUTE_PROVIDERS
]


export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
]