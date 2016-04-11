System.register(['angular2/core', '../../../../components/menuComponent/menuTreeComponent', '../../../../services/categoriesMenuService', "../../../../components/menuComponent/menuItemDialog/menuItemDialog"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, menuTreeComponent_1, categoriesMenuService_1, menuItemDialog_1;
    var applicationPath, CategoriesMenuPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
                    this.getDomains();
                };
                CategoriesMenuPage.prototype.referenceModal = function (modal) {
                    this._menuItemModal = modal;
                };
                CategoriesMenuPage.prototype.getMenuDictionary = function () {
                    var me = this;
                    this._categoriesMenuService.getMenuDictionary()
                        .map(function (response) {
                        if (response._body.length > 0) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me.menuDictionary = response;
                    }, function (error) {
                        me.menuDictionary = [];
                    });
                };
                CategoriesMenuPage.prototype.selectMenuItem = function (menuItem) {
                    //
                };
                CategoriesMenuPage.prototype.showAddMenuModal = function (parentId) {
                    this._modalInterface = { parentId: parentId, operationType: "new", positiveLabel: "Create", id: null };
                    this._menuItemModal.show(this._modalInterface);
                };
                CategoriesMenuPage.prototype.addMenuItem = function (response) {
                    var me = this;
                    me._categoriesMenuService.addMenuItem(response).map(function (response) {
                        if (response._body.length > 0) {
                            return response.json();
                        }
                    }).subscribe(function (response) {
                        me._menuItemModal.hide();
                        me.getMenuDictionary();
                    }, function (error) {
                        me._menuItemModal.showErrors();
                    });
                };
                CategoriesMenuPage.prototype.showEditMenuModal = function (menuToUpdate) {
                    this._menuItemModal.update({ operationType: "update", positiveLabel: "Update", menuModel: menuToUpdate, id: null });
                };
                CategoriesMenuPage.prototype.editMenuItem = function (response) {
                    var me = this;
                    me._categoriesMenuService.updateMenuItem(response).map(function (response) {
                        if (response._body.length > 0) {
                            return response.json();
                        }
                    }).subscribe(function (response) {
                        me._menuItemModal.hide();
                        me.getMenuDictionary();
                    }, function (error) {
                        me._menuItemModal.showErrors();
                    });
                };
                CategoriesMenuPage.prototype.deleteMenuItem = function (id) {
                    var _this = this;
                    this._categoriesMenuService.deleteMenuItem(id).map(function (response) {
                        if (response._body.length > 0) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        _this.getMenuDictionary();
                    }, function (errod) {
                    });
                };
                CategoriesMenuPage.prototype.getDomains = function () {
                    var me = this;
                    this._categoriesMenuService.getDomains().map(function (response) {
                        if (response._body.length > 0) {
                            return response.json();
                        }
                    }).subscribe(function (response) {
                        me._domains = response;
                    }, function (error) {
                        console.log(me._domains);
                        me._domains = [];
                    });
                };
                CategoriesMenuPage = __decorate([
                    core_1.Component({
                        selector: 'companies-Page',
                        templateUrl: applicationPath + '/categoriesMenuPage.html',
                        styleUrls: [applicationPath + '/categoriesMenuPage.css'],
                        //encapsulation: ViewEncapsulation.None,
                        providers: [categoriesMenuService_1.CategoriesMenuService],
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