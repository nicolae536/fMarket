System.register(['angular2/core', 'angular2/http', "./fMarketApi"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, fMarketApi_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (fMarketApi_1_1) {
                fMarketApi_1 = fMarketApi_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http) {
                    this.adminUsersControllerRoute = '/admin/users';
                    this.api = new fMarketApi_1.FMarketApi(http);
                }
                UserService.prototype.updateUser = function (user) {
                    return this.api.put(this.adminUsersControllerRoute + ("/" + user.id), JSON.stringify(user));
                };
                UserService.prototype.createUser = function (user) {
                    return this.api.post(this.adminUsersControllerRoute, JSON.stringify(user));
                };
                UserService.prototype.deleteUser = function (user) {
                    return this.api.delete(this.adminUsersControllerRoute + ("/" + user.id));
                };
                UserService.prototype.getUsersWithFilters = function (id, emailFilter, nameFilter, selectedStatusFilter, cityId, pageIndex) {
                    var requestOptions = this.buildSearchObject(id, emailFilter, nameFilter, selectedStatusFilter, cityId, pageIndex);
                    return this.api.post(this.adminUsersControllerRoute + ("/search?page=" + pageIndex), JSON.stringify(requestOptions));
                };
                UserService.prototype.buildSearchObject = function (id, emailFilter, nameFilter, selectedStatusFilter, cityId, pageIndex) {
                    var requestOptions = {
                        id: null,
                        email: emailFilter.length > 0 ? emailFilter : null,
                        name: nameFilter.length > 0 ? emailFilter : null,
                        status: selectedStatusFilter ? selectedStatusFilter : null,
                        cityId: cityId === -1 ? null : cityId
                    };
                    return requestOptions;
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserService);
                return UserService;
            })();
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=usersService.js.map