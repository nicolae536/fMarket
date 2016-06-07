/**
 * Created by nick_ on 4/23/2016.
 */
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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var requestTypeService_1 = require("../../../../services/requestTypeService");
var categoriesMenuService_1 = require("../../../../services/categoriesMenuService");
var localizationService_1 = require("../../../../services/localizationService");
var demandListBase_1 = require("../../../../components/demandComponent/demandListBase/demandListBase");
var demandService_1 = require("../../../../services/demandService");
var demandsListPageBase_1 = require("./demandsListPageBase");
var menuTreeDialog_1 = require("../../../../components/menuComponent/menuTreeDialog/menuTreeDialog");
var notificationService_1 = require("../../../../services/notificationService");
var applicationPath = '/app/pages/adminPage/demandsPage/demandsListPage';
var NewDemandsListPage = (function (_super) {
    __extends(NewDemandsListPage, _super);
    function NewDemandsListPage(router, _categoriesMenuService, _demandService, _requestTypeService, _localizationService, _notificationService) {
        _super.call(this, router, _categoriesMenuService, _demandService, _requestTypeService, _localizationService, _notificationService);
        this.pageName = 'new-demands';
        this._demandsRoute = '/new';
    }
    NewDemandsListPage.prototype.ngOnInit = function () {
        //this.getCities();
        this.getNewDemandsList();
    };
    NewDemandsListPage.prototype.removeDemand = function (demand) {
        var me = this;
        this._demandService.declineDemand(demand)
            .subscribe(function (response) {
            me.getNewDemandsList();
        }, function (error) {
            me.getNewDemandsList();
        });
    };
    NewDemandsListPage.prototype.ngOnChanges = function (changes) {
        /*if(changes && changes['_demandsList']){
            this.getDomains();
        }*/
    };
    NewDemandsListPage = __decorate([
        core_1.Component({
            selector: 'new-demands-list-page',
            templateUrl: applicationPath + '/demandsListPageBase.html',
            styleUrls: [applicationPath + '/demandsListPageBase.css'],
            directives: [demandListBase_1.DemandListBaseComponent, menuTreeDialog_1.MenuTreeDialog]
        }), 
        __metadata('design:paramtypes', [router_1.Router, categoriesMenuService_1.CategoriesMenuService, demandService_1.DemandService, requestTypeService_1.RequestTypeService, localizationService_1.LocalizationService, notificationService_1.NotificationService])
    ], NewDemandsListPage);
    return NewDemandsListPage;
})(demandsListPageBase_1.DemandsListPageBase);
exports.NewDemandsListPage = NewDemandsListPage;
//# sourceMappingURL=newDemandsListPage.js.map