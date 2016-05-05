/**
 * Created by nick_ on 5/5/2016.
 */
import {Route} from "angular2/router";
import {ApplicationConstants} from "../models/applicationConstansts";
import {HomePage} from "../pages/homePage/homePage";
import {RegistrationPage} from "../pages/registrationPage/registrationPage";
import {LoginPage} from "../pages/registrationPage/loginPage/loginPage";
import {ForgetPasswordPage} from "../pages/registrationPage/forgetPasswordPage/forgetPasswordPage";
import {AdminPage} from "../pages/adminPage/adminPage";
import {AccountSettingsPage} from "../pages/accountSettingsPage/accountSettingsPage";


export class AuthorizationService {

    public static getUserRole() {
        let activeUserState = this.getActiveUserState();
        if (!activeUserState) {
            return 'USER';
        }

        return activeUserState.role;
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

        return activeUserState.isLoggedIn;
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
                name: 'Home',
                component: HomePage,
                useAsDefault: true
            }),
            new Route({
                path: '/registration',
                name: 'Registration',
                component: RegistrationPage
            }),
            new Route({
                path: '/login',
                name: 'Login',
                component: LoginPage
            }),
            new Route({
                path: '/forget-password',
                name: 'ForgetPassword',
                component: ForgetPasswordPage
            })];

        if (AuthorizationService.getActiveUserState() === "ADMIN") {
            applicationRoutes.push(new Route({
                path: '/admin/...',
                name: 'Admin',
                component: AdminPage
            }));
        }

        if (AuthorizationService.isLoggedIn()) {
            applicationRoutes.push(
                new Route({
                    path: '/account/...',
                    name: 'Account',
                    component: AccountSettingsPage
                }));
        }

        return applicationRoutes;
    }
}