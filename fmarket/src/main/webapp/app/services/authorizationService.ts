/**
 * Created by nick_ on 5/5/2016.
 */
import {ApplicationConstants} from "../models/applicationConstansts";
import {HomePage} from "../pages/homePage/homePage";
import {RegistrationPage} from "../pages/registrationPage/registrationPage";
import {LoginPage} from "../pages/registrationPage/loginPage/loginPage";
import {ForgetPasswordPage} from "../pages/registrationPage/forgetPasswordPage/forgetPasswordPage";
import {AdminPage} from "../pages/adminPage/adminPage";
import {AccountSettingsPage} from "../pages/accountSettingsPage/accountSettingsPage";
import {SuccessPage} from "../pages/registrationPage/successPages/successPage";
import {TokenConfirmPage} from "../pages/registrationPage/tokenConfirmPage/tokenConfirmPage";
import {CompaniesPage} from "../pages/companiesPage/companiesPage";
import {CompanieDetailPage} from "../pages/companiesPage/companieDetailPage/companieDetailPage";

export class AuthorizationService {

    public static getUserRole() {
        let activeUserState = this.getActiveUserState();
        if (!activeUserState) {
            return 'USER';
        }

        return activeUserState.accountType;
    }

    public static hasRole(userRole:string){
        return this.getUserRole() === userRole;
    }

    public static getUserEmail(){
        let activeUserState = this.getActiveUserState();
        if (!activeUserState) {
            return null;
        }

        return activeUserState.email;
    }

    public static isLoggedIn() {
        let activeUserState = this.getActiveUserState();
        if (!activeUserState) {
            return false;
        }

        return activeUserState.loggedIn;
    }

    public static getActiveUserState() {
        try {
            let activeUserState = localStorage.getItem(ApplicationConstants.ACTIVE_USER_STATE);
            return JSON.parse(activeUserState);
        }
        catch (error) {
            return null;
        }
    }

    public static getApplicationRootRoutes(){
        let applicationRoutes = [
            {
                path: '/',
                component: HomePage,
            },
            {
                path: '/registration',
                component: RegistrationPage
            },{
                path: '/login',
                component: LoginPage
            },{
                path: '/forget-password',
                component: ForgetPasswordPage
            },{
                path: '/success/:succesOption',
                component: SuccessPage
            },{
                path: '/admin',
                component: AdminPage
            },{
                path: '/account',
                component: AccountSettingsPage
            },{
                path: '/firme',
                component: CompaniesPage
            },{
                path: '/firma-detalii/:id',
                component: CompanieDetailPage
            },{
                path: '/confirm/:registration?token',
                component: TokenConfirmPage
            },{
                path: '*',
                component: HomePage
            }];

        return applicationRoutes;
    }
}