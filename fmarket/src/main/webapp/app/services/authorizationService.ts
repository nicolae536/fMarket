/**
 * Created by nick_ on 5/5/2016.
 */
import {Route} from "@angular/router";
import {ApplicationConstants} from "../models/applicationConstansts";
import {HomePage} from "../pages/homePage/homePage";
import {RegistrationPage} from "../pages/registrationPage/registrationPage";
import {LoginPage} from "../pages/registrationPage/loginPage/loginPage";
import {ForgetPasswordPage} from "../pages/registrationPage/forgetPasswordPage/forgetPasswordPage";
import {AdminPage} from "../pages/adminPage/adminPage";
import {AccountSettingsPage} from "../pages/accountSettingsPage/accountSettingsPage";
import {SuccessPage} from "../pages/registrationPage/successPages/successPage";
import {TokenConfirmPage} from "../pages/registrationPage/tokenConfirmPage/tokenConfirmPage";

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
            new Route({
                path: '/',
                component: HomePage,
            }),
            new Route({
                path: '/registration',
                component: RegistrationPage
            }),
            new Route({
                path: '/login',
                component: LoginPage
            }),
            new Route({
                path: '/forget-password',
                component: ForgetPasswordPage
            }),
            new Route({
                path: '/success/:succesOption',
                component: SuccessPage
            }),
            new Route({
                path: '/admin',
                component: AdminPage
            }),
            new Route({
                path: '/account',
                component: AccountSettingsPage
            }),
            new Route({
                path: '/confirm/:registration?token',
                component: TokenConfirmPage
            }),
            new Route({
                path: '*',
                component: HomePage
            })];

        return applicationRoutes;
    }
}