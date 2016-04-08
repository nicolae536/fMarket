System.register(['angular2/core', '../../../../components/baseMenuComponent/baseMenuComponent'], function(exports_1) {
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
    var core_1, baseMenuComponent_1;
    var applicationPath, CategoriesMenuPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (baseMenuComponent_1_1) {
                baseMenuComponent_1 = baseMenuComponent_1_1;
            }],
        execute: function() {
            //import {RequestType} from '../../../../models/requestType';
            //import {RequestTypeService} from '../../../../services/requestTypeService';
            applicationPath = '/app/pages/adminPage/categoriesPage/categoriesMenuPage';
            CategoriesMenuPage = (function () {
                function CategoriesMenuPage() {
                    // code...
                }
                CategoriesMenuPage.prototype.ngOnInit = function () {
                    this.menuItems = new Array({ id: 0, displayName: "Item 0", hasChildren: true }, { id: 1, displayName: "Item 1", hasChildren: false }, { id: 2, displayName: "Item 2", hasChildren: false }, { id: 3, displayName: "Item 3", hasChildren: false });
                };
                CategoriesMenuPage = __decorate([
                    core_1.Component({
                        selector: 'companies-Page',
                        templateUrl: applicationPath + '/categoriesMenuPage.html',
                        styleUrls: [applicationPath + '/categoriesMenuPage.css'],
                        //encapsulation: ViewEncapsulation.None, 
                        //providers:[RequestTypeService, HTTP_PROVIDERS], 
                        directives: [baseMenuComponent_1.BaseMenuComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], CategoriesMenuPage);
                return CategoriesMenuPage;
            })();
            exports_1("CategoriesMenuPage", CategoriesMenuPage);
        }
    }
});
//# sourceMappingURL=CategoriesMenuPage.js.map