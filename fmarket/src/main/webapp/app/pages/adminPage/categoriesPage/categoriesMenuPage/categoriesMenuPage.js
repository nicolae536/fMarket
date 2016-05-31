var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var menuTreeComponent_1 = require("../../../../components/menuComponent/menuTreeComponent");
var categoriesMenuService_1 = require("../../../../services/categoriesMenuService");
var menuItemDialog_1 = require("../../../../components/menuComponent/menuItemDialog/menuItemDialog");
var selectComponent_1 = require("../../../../components/selectComponent/selectComponent");
var authorizationService_1 = require("../../../../services/authorizationService");
var Roles_1 = require("../../../../models/Roles");
var applicationPath = '/app/pages/adminPage/categoriesPage/categoriesMenuPage';
var CategoriesMenuPage = (function () {
    function CategoriesMenuPage(_categoriesMenuService) {
        this.menuDictionary = [];
        this.isAdminUser = authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN);
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
    CategoriesMenuPage.prototype.addMenuItem = function (newDomainMenuItemRequest) {
        var me = this;
        me._categoriesMenuService.addMenuItem(newDomainMenuItemRequest)
            .subscribe(function (response) {
            me._menuItemModal.hide();
            me.getMenuDictionary();
        }, function (error) {
            // me._menuItemModal.showErrors();
        });
    };
    CategoriesMenuPage.prototype.showEditMenuModal = function (menuToUpdate) {
        this._menuItemModal.update({
            operationType: "update",
            positiveLabel: "Update",
            menuModel: menuToUpdate,
            id: null
        });
    };
    CategoriesMenuPage.prototype.editMenuItem = function (updateDomainMenuItemRequest) {
        var me = this;
        me._categoriesMenuService.updateMenuItem(updateDomainMenuItemRequest)
            .subscribe(function (response) {
            me._menuItemModal.hide();
            me.getMenuDictionary();
        }, function (error) {
            // me._menuItemModal.showErrors();
        });
    };
    CategoriesMenuPage.prototype.deleteMenuItem = function (id) {
        var _this = this;
        this._categoriesMenuService.deleteMenuItem(id)
            .subscribe(function (response) {
            _this.getMenuDictionary();
        }, function (errod) {
        });
    };
    CategoriesMenuPage.prototype.getDomains = function () {
        var me = this;
        this._categoriesMenuService.getDomains()
            .subscribe(function (response) {
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
            directives: [menuTreeComponent_1.MenuTreeComponent, menuItemDialog_1.MenuItemDialog, selectComponent_1.SelectComponent],
        }), 
        __metadata('design:paramtypes', [categoriesMenuService_1.CategoriesMenuService])
    ], CategoriesMenuPage);
    return CategoriesMenuPage;
})();
exports.CategoriesMenuPage = CategoriesMenuPage;
//# sourceMappingURL=categoriesMenuPage.js.map