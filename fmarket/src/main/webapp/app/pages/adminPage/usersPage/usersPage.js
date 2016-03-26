System.register(['angular2/core', 'angular2/common', 'angular2/http', 'rxjs/add/operator/map', '../../../components/pageWithNavigation/pageWithNavigation', '../../../components/createUserDialog/createUserDialog', '../../../components/actionDialog/actionDialog', '../../../components/modalDialog/modalDialog', '../../../services/usersService', '../../../models/user'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, http_1, pageWithNavigation_1, createUserDialog_1, actionDialog_1, modalDialog_1, usersService_1, user_1;
    var applicationPath, UsersPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (pageWithNavigation_1_1) {
                pageWithNavigation_1 = pageWithNavigation_1_1;
            },
            function (createUserDialog_1_1) {
                createUserDialog_1 = createUserDialog_1_1;
            },
            function (actionDialog_1_1) {
                actionDialog_1 = actionDialog_1_1;
            },
            function (modalDialog_1_1) {
                modalDialog_1 = modalDialog_1_1;
            },
            function (usersService_1_1) {
                usersService_1 = usersService_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/usersPage';
            UsersPage = (function (_super) {
                __extends(UsersPage, _super);
                function UsersPage(_userService) {
                    _super.call(this);
                    this._userService = _userService;
                    // userPageNumber: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
                    // userPagesSubNumber: Array<number> = new Array<number>();
                    // currentPageIndex: number = 1;
                    this.cityList = [
                        { id: -1, name: "Chose..." },
                        { id: 1, name: "Cluj" },
                        { id: 2, name: "Dorna" },
                        { id: 3, name: "Blaj" }];
                    this.statusList = [
                        { status: null, displayName: "Chose..." },
                        { status: user_1.AccountStatus.AUTO, displayName: "AUTO" },
                        { status: user_1.AccountStatus.ACTIVE, displayName: "ACTIVE" },
                        { status: user_1.AccountStatus.DISABLED, displayName: "DISABLED" },
                        { status: user_1.AccountStatus.DISABLED, displayName: "PENDING" }];
                    this.usersPerPage = 10;
                    this.emailFilter = "";
                    this.nameFilter = "";
                    this.cityId = -1;
                    this.selectedStatusFilter = null;
                }
                UsersPage.prototype.ngOnInit = function () {
                    var me = this;
                    this.getUsers();
                };
                UsersPage.prototype.referenceActionDialogInComponent = function (modal) {
                    this.actionDialog = modal; // Here you get a reference to the modal so you can control it programmatically
                };
                UsersPage.prototype.referenceCreateUserDialogInComponent = function (modal) {
                    this.userDialog = modal; // Here you get a reference to the modal so you can control it programmatically
                };
                UsersPage.prototype.getUsers = function () {
                    var me = this;
                    this._userService.getUsersWithFilters("", this.emailFilter, this.nameFilter, this.selectedStatusFilter, this.cityId, this.currentPageIndex)
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) {
                        me.usersList = response.data;
                        me.mapPageIndexes(response.totalPages, response.page);
                        console.log(response);
                    }, function (error) {
                        console.log(error);
                        //todo handler
                    });
                };
                //user actions
                UsersPage.prototype.toggleEditMode = function (user) {
                    user.isInEditMode = true;
                };
                UsersPage.prototype.editUser = function (user) {
                    var me = this;
                    this.userDialog.editUser(user, this.cityList, this.statusList).then(function (actionResult) {
                        me._userService.updateUser(user);
                    });
                };
                UsersPage.prototype.deleteUser = function (user) {
                    var _this = this;
                    this.actionDialog.show().then(function (actionResult) {
                        if (response && response.actionResult == modalDialog_1.DialogActionResult.CANCEL) {
                            return;
                        }
                        var userIndex = _this.usersList.indexOf(user);
                        if (userIndex !== -1) {
                            _this.usersList.splice(userIndex, 1);
                        }
                    });
                };
                UsersPage.prototype.saveEditedUser = function (user) {
                    user.isInEditMode = false;
                };
                //grid
                UsersPage.prototype.createAccount = function () {
                    var _this = this;
                    this.userDialog.show(this.cityList, this.statusList).then(function (response) {
                        if (response && response.actionResult == modalDialog_1.DialogActionResult.CANCEL) {
                            _this.userDialog.clearData();
                            return;
                        }
                        //post to backend
                        _this._userService.createUser(_this.userDialog.getValue()).subscribe(function (resp) {
                            //todo do something with the response
                        });
                    });
                };
                UsersPage.prototype.sortUsers = function (user) {
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
                        providers: [usersService_1.UserService, http_1.HTTP_PROVIDERS],
                        directives: [actionDialog_1.ActionDialog, createUserDialog_1.CreateUserDialog, common_1.NgForm]
                    }), 
                    __metadata('design:paramtypes', [usersService_1.UserService])
                ], UsersPage);
                return UsersPage;
            }(pageWithNavigation_1.PageWithNavigation));
            exports_1("UsersPage", UsersPage);
        }
    }
});
//# sourceMappingURL=usersPage.js.map