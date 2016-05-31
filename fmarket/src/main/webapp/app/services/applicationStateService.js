"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by NicolaeB on 5/31/2016.
 */
/**
 * Created by nick_ on 4/24/2016.
 */
var core_1 = require('@angular/core');
var localStorageService_1 = require("./localStorageService");
var authorizationService_1 = require("./authorizationService");
var Roles_1 = require("../models/Roles");
var applicationConstansts_1 = require("../models/applicationConstansts");
var ApplicationStateService = (function () {
    function ApplicationStateService(localStorageService) {
        this._localStorageService = localStorageService;
    }
    ApplicationStateService.prototype.setApplicationSessionState = function (userState) {
        this._localStorageService.setItem(applicationConstansts_1.ApplicationConstants.ACTIVE_USER_STATE, userState);
    };
    ApplicationStateService.prototype.removeUserSession = function () {
        var userState = authorizationService_1.AuthorizationService.getActiveUserState();
        if (!userState.loggedIn) {
            return;
        }
        userState = {
            email: null,
            accountType: Roles_1.Role.USER,
            loggedIn: false
        };
        this._localStorageService.setItem(applicationConstansts_1.ApplicationConstants.ACTIVE_USER_STATE, userState);
    };
    ApplicationStateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [localStorageService_1.LocalStorageService])
    ], ApplicationStateService);
    return ApplicationStateService;
}());
exports.ApplicationStateService = ApplicationStateService;
//# sourceMappingURL=applicationStateService.js.map