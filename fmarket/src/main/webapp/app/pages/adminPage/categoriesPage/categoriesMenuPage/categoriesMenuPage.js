System.register(['angular2/core', 'angular2/http', '../../../../components/menuComponent/menuTreeComponent', '../../../../services/categoriesMenuService', "../../../../components/menuComponent/menuItemDialog/menuItemDialog"], function(exports_1) {
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
    var core_1, http_1, menuTreeComponent_1, categoriesMenuService_1, menuItemDialog_1;
    var applicationPath, CategoriesMenuPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (menuTreeComponent_1_1) {
                menuTreeComponent_1 = menuTreeComponent_1_1;
            },
            function (categoriesMenuService_1_1) {
                categoriesMenuService_1 = categoriesMenuService_1_1;
            },
            function (menuItemDialog_1_1) {
                menuItemDialog_1 = menuItemDialog_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/categoriesPage/categoriesMenuPage';
            CategoriesMenuPage = (function () {
                function CategoriesMenuPage(_categoriesMenuService) {
                    this.menuDictionary = [];
                    this._categoriesMenuService = _categoriesMenuService;
                    // code...
                }
                CategoriesMenuPage.prototype.ngOnInit = function () {
                    this.getMenuDictionary();
                };
                CategoriesMenuPage.prototype.referenceModal = function (modal) {
                    this._menuItemModal = modal;
                };
                CategoriesMenuPage.prototype.getMenuDictionary = function () {
                    var _this = this;
                    this._categoriesMenuService.getMenuDictionary()
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) {
                        _this.menuDictionary = response.data;
                    }, function (error) {
                        _this.menuDictionary = [];
                    });
                    ;
                };
                CategoriesMenuPage.prototype.selectMenuItem = function (menuItem) {
                    //
                };
                CategoriesMenuPage.prototype.addMenuItem = function (parentId) {
                    var _this = this;
                    this._modalInterface = { parentId: parentId, operationType: "new", positiveLabel: "Create", id: null };
                    this._menuItemModal.show(this._modalInterface).then(function (response) {
                        _this._categoriesMenuService.addMenuItem(response).map(function (response) {
                            response.json();
                        }).subscribe(function (response) {
                            _this._menuItemModal.hide();
                            _this.getMenuDictionary();
                        }, function (error) {
                            _this._menuItemModal.showErrors();
                        });
                    });
                };
                CategoriesMenuPage.prototype.editMenuItem = function (menuToUpdate) {
                    var _this = this;
                    var newInterface = { menuModel: menuToUpdate, operationType: "update", positiveLabel: "Update", id: null };
                    this._menuItemModal.update(newInterface).then(function (response) {
                        _this._categoriesMenuService.updateMenuItem(response).map(function (response) {
                            response.json();
                        }).subscribe(function (response) {
                            _this._menuItemModal.hide();
                            _this.getMenuDictionary();
                        }, function (error) {
                            _this._menuItemModal.showErrors();
                        });
                    });
                };
                CategoriesMenuPage.prototype.deleteMenuItem = function (id) {
                    var _this = this;
                    this._categoriesMenuService.deleteMenuItem(id).map(function (response) {
                        response.json();
                    })
                        .subscribe(function (response) {
                        _this.getMenuDictionary();
                    });
                };
                CategoriesMenuPage = __decorate([
                    core_1.Component({
                        selector: 'companies-Page',
                        templateUrl: applicationPath + '/categoriesMenuPage.html',
                        styleUrls: [applicationPath + '/categoriesMenuPage.css'],
                        //encapsulation: ViewEncapsulation.None,
                        providers: [categoriesMenuService_1.CategoriesMenuService, http_1.HTTP_PROVIDERS],
                        directives: [menuTreeComponent_1.MenuTreeComponent, menuItemDialog_1.MenuItemDialog],
                    }), 
                    __metadata('design:paramtypes', [categoriesMenuService_1.CategoriesMenuService])
                ], CategoriesMenuPage);
                return CategoriesMenuPage;
            })();
            exports_1("CategoriesMenuPage", CategoriesMenuPage);
        }
    }
});
//# sourceMappingURL=categoriesMenuPage.js.map