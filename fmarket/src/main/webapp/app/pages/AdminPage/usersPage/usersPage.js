System.register(['angular2/core', 'angular2/common', 'angular2/http', '../../../components/CreateUserDialog/createUserDialog', '../../../components/ActionDialog/actionDialog', '../../../components/ModalDialog/modalDialog', '../../../services/usersService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, http_1, createUserDialog_1, actionDialog_1, modalDialog_1, usersService_1;
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
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/usersPage';
            UsersPage = (function () {
                function UsersPage(_userService) {
                    this._userService = _userService;
                    this.usersList = new Array();
                    this.userPageNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
                    this.userPagesSubNumber = new Array();
                    this.currentPageIndex = 1;
                    this.cityList = ["Cluj", "Dorna", "Blaj"];
                    this.statusList = ["Active", "Inactive", "Pending"];
                    this.usersPerPage = 10;
                    this.emailFilter = "";
                    this.nameFilter = "";
                    this.cityFilter = "";
                    this.selectedStatusFilter = "";
                    this.userPagesSubNumber = this.userPageNumber.slice(0, 5);
                }
                UsersPage.prototype.ngOnInit = function () {
                    this.getUsers();
                };
                UsersPage.prototype.referenceActionDialogInComponent = function (modal) {
                    this.actionDialog = modal;
                };
                UsersPage.prototype.referenceCreateUserDialogInComponent = function (modal) {
                    this.userDialog = modal; // Here you get a reference to the modal so you can control it programmatically
                };
                UsersPage.prototype.getUsers = function () {
                    var _this = this;
                    this._userService.getUsers().then(function (users) {
                        _this.usersList = users;
                        console.log(users);
                    });
                };
                //user actions
                UsersPage.prototype.toggleEditMode = function (user) {
                    user.isInEditMode = true;
                };
                UsersPage.prototype.editUser = function (user) {
                    this.userDialog.editUser(user, this.cityList, this.statusList).then(function (actionResult) {
                        // body...
                    });
                };
                UsersPage.prototype.deleteUser = function (user) {
                    var _this = this;
                    this.actionDialog.show().then(function (actionResult) {
                        if (actionResult == modalDialog_1.DialogActionResult.CANCEL) {
                            return;
                        }
                        var index = _this.usersList.indexOf(user);
                        if (index) {
                            _this.usersList.splice(index, 1);
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
                        if (response == modalDialog_1.DialogActionResult.CANCEL) {
                            return;
                        }
                        //post to backend
                        _this.userDialog.getValue();
                    });
                };
                UsersPage.prototype.sortUsers = function (user) {
                };
                UsersPage.prototype.applyFilters = function () {
                    var _this = this;
                    this._userService.getUsersWithFilters(this.emailFilter, this.nameFilter, this.selectedStatusFilter, this.cityFilter).then(function (users) {
                        _this.usersList = users;
                    });
                };
                UsersPage.prototype.navigateLeft = function () {
                    if (this.currentPageIndex - 1 > this.userPageNumber[0]) {
                        return;
                    }
                    this.currentPageIndex = this.currentPageIndex - 1;
                    this.goToPage(this.currentPageIndex);
                };
                UsersPage.prototype.navigateRight = function () {
                    if (this.currentPageIndex + 1 === this.userPageNumber.length) {
                        return;
                    }
                    this.currentPageIndex = this.currentPageIndex + 1;
                    this.goToPage(this.currentPageIndex);
                };
                UsersPage.prototype.goToPageUsingIndex = function (pageIndex) {
                    this.currentPageIndex = pageIndex;
                    this.goToPage(this.currentPageIndex);
                };
                UsersPage.prototype.isPageActive = function (page) {
                    if (page === this.currentPageIndex) {
                        return 'btn btn-default active-page';
                    }
                    return 'btn btn-default';
                };
                UsersPage.prototype.goToPage = function (pageIndex) {
                    if (this.userPagesSubNumber.length === this.userPageNumber.length) {
                        //get users with filters from that page
                        return;
                    }
                    var elementIndex = this.userPagesSubNumber.indexOf(this.currentPageIndex);
                    var auxArray = JSON.parse(JSON.stringify(this.userPagesSubNumber));
                    if (elementIndex > 2) {
                        var lastElement = auxArray[auxArray.length - 1];
                        var indexOfItemToTake = this.userPageNumber.indexOf(lastElement) + 1;
                        if (indexOfItemToTake === this.userPageNumber.length) {
                            this.currentPageIndex = this.userPageNumber[this.userPageNumber.length - 1];
                            return;
                        }
                        auxArray = auxArray.slice(1, 5);
                        auxArray[auxArray.length] = this.userPageNumber[indexOfItemToTake];
                    }
                    if (elementIndex < 2) {
                        var firstElement = auxArray[0];
                        var indexOfItemToTake = this.userPageNumber.indexOf(firstElement) - 1;
                        if (indexOfItemToTake === -1) {
                            this.currentPageIndex = 0;
                            return;
                        }
                        auxArray = auxArray.slice(0, 4);
                        auxArray.unshift(this.userPageNumber[indexOfItemToTake]);
                    }
                    this.userPagesSubNumber = auxArray;
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
            }());
            exports_1("UsersPage", UsersPage);
        }
    }
});
//# sourceMappingURL=usersPage.js.map