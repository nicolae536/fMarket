var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var _ = require('underscore');
//import operators
require('rxjs/add/operator/map'); //-map
var createUserDialog_1 = require('../../../components/createUserDialog/createUserDialog');
var actionDialog_1 = require('../../../components/actionDialog/actionDialog');
var usersService_1 = require('../../../services/usersService');
var user_1 = require('../../../models/user');
//import mocks
var mock_Status_1 = require('../../../services/mock-providers/mock-Status');
var notificationService_1 = require("../../../services/notificationService");
var localizationService_1 = require("../../../services/localizationService");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var applicationPath = '/app/pages/adminPage/usersPage';
var UsersPage = (function () {
    function UsersPage(_userService, _notificationService, _localizationService) {
        this._userService = _userService;
        this._notificationService = _notificationService;
        this._localizationService = _localizationService;
        this.statusList = mock_Status_1.STATUS;
        this.usersPerPage = 10;
        this.emailFilter = "";
        this.nameFilter = "";
        this.cityId = -1;
        this.selectedStatusFilter = null;
        this.pagination = { totalItems: 1, currentPage: 1, maxSize: 7 };
        this.getCities();
    }
    UsersPage.prototype.ngOnInit = function () {
        var me = this;
        this.getUsers();
        this._notificationService.removeLoading();
    };
    UsersPage.prototype.referenceActionDialogInComponent = function (modal) {
        this.actionDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    };
    UsersPage.prototype.referenceCreateUserDialogInComponent = function (modal) {
        this.userDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    };
    UsersPage.prototype.getUsers = function () {
        var me = this;
        this._userService.getUsersWithFilters(this.idFilter, this.emailFilter, this.nameFilter, this.selectedStatusFilter, this.cityId, this.pagination['currentPage'])
            .subscribe(function (response) {
            me.usersList = response['data'];
            me.pagination['totalItems'] = response['totalPages'];
            me.pagination['currentPage'] = response['page'];
            console.log(response);
        }, function (error) {
            console.log(error);
            //todo handler
        });
    };
    //user actions
    UsersPage.prototype.toggleEditMode = function (user) {
        user.userBackup = _.clone(user);
        user.isInEditMode = true;
    };
    UsersPage.prototype.closeEditMode = function (user) {
        user.email = user.userBackup.email;
        user.name = user.userBackup.name;
        user.status = user.userBackup.status;
        user.city = user.userBackup.city;
        user.cityId = user.userBackup.cityId;
        user.isInEditMode = false;
    };
    UsersPage.prototype.deleteUser = function (user) {
        var me = this;
        this.actionDialog.show("Are you sure that you want to delete this user ?", user);
    };
    UsersPage.prototype.actionDialogConfirmDelete = function (user) {
        var me = this;
        this.actionDialog.hide();
        this._userService.deleteUser(user)
            .subscribe(function (response) {
            var userIndex = me.usersList.indexOf(user);
            if (userIndex !== -1) {
                me.usersList.splice(userIndex, 1);
            }
        }, function (error) {
            //display be message
        });
    };
    UsersPage.prototype.saveEditedUser = function (user) {
        var _this = this;
        user.isInEditMode = false;
        this._userService.updateUser(user)
            .subscribe(function (response) {
            //success
        }, function (error) {
            //display be message
            var userIndex = _this.usersList.indexOf(user);
            if (userIndex !== -1) {
                _this.usersList[userIndex] = _this.userBackup;
            }
        });
    };
    UsersPage.prototype.getCities = function () {
        var me = this;
        me._localizationService.getCityList()
            .subscribe(function (succesR) {
            me['cityList'] = [{ id: -1, name: "Alege..." }].concat(succesR);
        }, function (error) {
            me.cityList = [];
        });
    };
    //grid
    UsersPage.prototype.createAccount = function () {
        this.userDialog.show("", new user_1.User());
    };
    UsersPage.prototype.confirmCreateUser = function () {
        var me = this;
        //post to backend
        this._userService.createUser(this.userDialog.getValue()).subscribe(function (resp) {
            me.userDialog.hide();
            me.getUsers();
        }, function (error) {
            //display message
        });
    };
    UsersPage.prototype.applyFilters = function () {
        this.getUsers();
    };
    UsersPage = __decorate([
        core_1.Component({
            selector: 'users-Page',
            templateUrl: applicationPath + '/usersPage.html',
            styleUrls: [applicationPath + '/usersPage.css'],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [actionDialog_1.ActionDialog, createUserDialog_1.CreateUserDialog, common_1.NgForm, ng2_bootstrap_1.PAGINATION_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [usersService_1.UserService, notificationService_1.NotificationService, localizationService_1.LocalizationService])
    ], UsersPage);
    return UsersPage;
})();
exports.UsersPage = UsersPage;
//# sourceMappingURL=usersPage.js.map