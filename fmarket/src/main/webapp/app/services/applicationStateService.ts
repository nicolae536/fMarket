/**
 * Created by NicolaeB on 5/31/2016.
 */
/**
 * Created by nick_ on 4/24/2016.
 */
import {Injectable} from '@angular/core';
import {LocalStorageService} from "./localStorageService";
import {AuthorizationService} from "./authorizationService";
import {Role} from "../models/Roles";
import {ApplicationConstants} from "../models/applicationConstansts";

@Injectable()
export class ApplicationStateService {
    private _localStorageService:LocalStorageService;

    constructor(localStorageService:LocalStorageService){
        this._localStorageService = localStorageService;
    }

    setApplicationSessionState(userState){
        this._localStorageService.setItem(ApplicationConstants.ACTIVE_USER_STATE, userState);
    }

    removeUserSession() {
        let userState = AuthorizationService.getActiveUserState();
        if(!userState.loggedIn){
            return;
        }

        userState = {
            email: null,
            accountType: Role.USER,
            loggedIn: false
        };

        this._localStorageService.setItem(ApplicationConstants.ACTIVE_USER_STATE, userState);
    }
}