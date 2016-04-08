System.register(['angular2/core', 'angular2/http', '../../../../components/menuComponent/menuTreeComponent', '../../../../services/categoriesMenuService'], function(exports_1) {
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
    var core_1, http_1, menuTreeComponent_1, categoriesMenuService_1;
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
                    this.menuDictionary = [
                        { id: 12, layer: 0, name: 'asd' },
                        { id: 13, layer: 0, name: 'asda' },
                        { id: 14, layer: 0, name: 'asdd' },
                        { id: 15, layer: 1, parentId: 13, name: 'asds' },
                        { id: 16, layer: 1, parentId: 13, name: 'asdg' },
                        { id: 17, layer: 1, parentId: 13, name: 'asdxz' },
                        { id: 18, layer: 1, parentId: 14, name: 'asd1e' },
                        { id: 19, layer: 2, parentId: 17, name: 'asd1e1' },
                        { id: 20, layer: 2, parentId: 17, name: 'asd1e2' },
                        { id: 21, layer: 2, parentId: 17, name: 'asd1e3' }];
                    this.getMenuDictionary();
                };
                CategoriesMenuPage.prototype.selectMenuItem = function (menuItem) {
                    //
                };
                CategoriesMenuPage.prototype.addMenuItem = function (menuItem) {
                    this._categoriesMenuService.addMenuItem(menuItem);
                };
                CategoriesMenuPage.prototype.getMenuDictionary = function () {
                    var _this = this;
                    this._categoriesMenuService.getMenuDictionary()
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) {
                        _this.menuDictionary = response.data;
                    }, function (error) {
                        _this.companieTypes = [];
                    });
                    ;
                };
                CategoriesMenuPage = __decorate([
                    core_1.Component({
                        selector: 'companies-Page',
                        templateUrl: applicationPath + '/categoriesMenuPage.html',
                        styleUrls: [applicationPath + '/categoriesMenuPage.css'],
                        //encapsulation: ViewEncapsulation.None,
                        providers: [categoriesMenuService_1.CategoriesMenuService, http_1.HTTP_PROVIDERS],
                        directives: [menuTreeComponent_1.MenuTreeComponent]
                    }), 
                    __metadata('design:paramtypes', [categoriesMenuService_1.CategoriesMenuService])
                ], CategoriesMenuPage);
                return CategoriesMenuPage;
            })();
            exports_1("CategoriesMenuPage", CategoriesMenuPage);
        }
    }
});
//# sourceMappingURL=CategoriesMenuPage.js.map