System.register(['angular2/core', '../../../../components/menuComponent/menuTreeComponent'], function(exports_1, context_1) {
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
    var core_1, menuTreeComponent_1;
    var applicationPath, CategoriesMenuPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (menuTreeComponent_1_1) {
                menuTreeComponent_1 = menuTreeComponent_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/categoriesPage/categoriesMenuPage';
            CategoriesMenuPage = (function () {
                function CategoriesMenuPage() {
                    this.menuDictionary = [];
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
                };
                CategoriesMenuPage = __decorate([
                    core_1.Component({
                        selector: 'companies-Page',
                        templateUrl: applicationPath + '/categoriesMenuPage.html',
                        styleUrls: [applicationPath + '/categoriesMenuPage.css'],
                        //encapsulation: ViewEncapsulation.None, 
                        //providers:[RequestTypeService, HTTP_PROVIDERS], 
                        directives: [menuTreeComponent_1.MenuTreeComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], CategoriesMenuPage);
                return CategoriesMenuPage;
            }());
            exports_1("CategoriesMenuPage", CategoriesMenuPage);
        }
    }
});
//# sourceMappingURL=CategoriesMenuPage.js.map