System.register(['angular2/core', 'angular2/http', "../models/user", "./mock-providers/mock-Users"], function(exports_1, context_1) {
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
    var core_1, http_1, user_1, mock_Users_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (mock_Users_1_1) {
                mock_Users_1 = mock_Users_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http) {
                    this.adminUsersControllerRoute = '/admin/users';
                    console.log('Http injected');
                    this.http = http;
                }
                UserService.prototype.getUsers = function () {
                    return Promise.resolve(mock_Users_1.USERS);
                };
                UserService.prototype.updateUser = function (user) {
                    this.http.put('/admin/users', JSON.stringify(user));
                };
                UserService.prototype.createUser = function (user) {
                    return this.http.post(this.adminUsersControllerRoute, JSON.stringify(user), this.getRequestOptions());
                };
                UserService.prototype.getUsersWithFilters = function (id, emailFilter, nameFilter, selectedStatusFilter, cityId, pageIndex) {
                    var requestOptions = this.buildSearchObject(id, emailFilter, nameFilter, selectedStatusFilter, cityId, pageIndex);
                    return this.http.post(this.adminUsersControllerRoute + '/search?page=' + pageIndex, JSON.stringify(requestOptions), this.getRequestOptions());
                };
                UserService.prototype.buildSearchObject = function (id, emailFilter, nameFilter, selectedStatusFilter, cityId, pageIndex) {
                    var requestOptions = {
                        id: id,
                        email: emailFilter,
                        name: nameFilter,
                        status: selectedStatusFilter ? selectedStatusFilter : user_1.AccountStatus.AUTO,
                        cityId: cityId === -1 ? null : cityId
                    };
                    return requestOptions;
                };
                UserService.prototype.getRequestOptions = function () {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return { headers: headers };
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=usersService.js.map