var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by nick_ on 5/6/2016.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var companiesService_1 = require("../../../services/companiesService");
var notificationService_1 = require("../../../services/notificationService");
var selectComponent_1 = require("../../../components/selectComponent/selectComponent");
var companiesAdminListComponent_1 = require("../../../components/companieComponent/companieListComponent/companiesAdminListComponent");
var companySearchObject_1 = require("../../../models/companySearchObject");
var Ng2Pagination_1 = require("../../../models/Ng2Pagination");
var _ = require("underscore");
var template = require('./companiesPage.html');
var CompaniesPage = (function () {
    //</editor-fold>
    function CompaniesPage(router, companiesService, notificationService) {
        this._companiesList = new Array();
        this.searchFilter = new companySearchObject_1.CompanySearchObject();
        this.pagination = new Ng2Pagination_1.Ng2Pagination();
        this._router = router;
        this._companiesService = companiesService;
        this._notificationService = notificationService;
    }
    CompaniesPage.prototype.ngOnInit = function () {
        this.getCompaniesWithFilters();
        this.getCompanieDomains();
        this.getDomains();
    };
    CompaniesPage.prototype.referenceCompaniesDialog = function (_createCompanieDialog) {
        this._createCompanieDialog = _createCompanieDialog;
    };
    CompaniesPage.prototype.getCompaniesWithFilters = function () {
        var _this = this;
        var me = this;
        var obj = _.clone(this.searchFilter);
        obj.name = obj.name && obj.name.length > 0 ? obj.name : null;
        obj.companyDomain = this.selectCompanieDomain && this.selectCompanieDomain._selectedItem && this.selectCompanieDomain._selectedItem.boundItem ? this.selectCompanieDomain._selectedItem.boundItem['id'] : null;
        obj.demandDomains = this.selectDomain && this.selectDomain._selectedItems && this.selectDomain._selectedItems.length > 0 ? this.getDomainsFromSelect(this.selectDomain._selectedItems) : [];
        obj['page'] = this.pagination['currentPage'];
        this._companiesService.getCompanyWithFilters(obj)
            .subscribe(function (response) {
            me._companiesList = response.data;
            // me.pagination.currentPage = response.page;
            me.pagination.totalItems = response.totalPages;
            me.searchFilter['page'] = _this.pagination['currentPage'];
        }, function (error) {
            me._companiesList = [];
            me._notificationService.emitErrorNotificationToRootComponent('Eroare companiile nu pot fi afisate!', 5);
        });
    };
    CompaniesPage.prototype.getDomainsFromSelect = function (_selectedItems) {
        return _.map(_selectedItems, function (v) {
            if (v.boundItem)
                return v.boundItem['id'];
        });
    };
    CompaniesPage.prototype.getCompanieDomains = function () {
        var me = this;
        this._companiesService.getCompanieDomains()
            .subscribe(function (success) {
            me.companieDomains = me._companiesService.mapNameToSelect2Item(success);
        }, function (error) {
            me.companieDomains = new Array();
        });
    };
    CompaniesPage.prototype.getDomains = function () {
        var me = this;
        this._companiesService.getDemandDomanins()
            .subscribe(function (success) {
            me.domains = me._companiesService.mapNameToSelect2Item(success);
        }, function (error) {
            me.domains = new Array();
        });
    };
    CompaniesPage.prototype.referenceSelectCompanyDomainComponent = function ($event) {
        this.selectCompanieDomain = $event;
    };
    CompaniesPage.prototype.referenceSelectDemandDomainComponent = function ($event) {
        this.selectDomain = $event;
    };
    CompaniesPage.prototype.goToNewCompanyPage = function () {
        this._router.navigate(['/admin/ceeaza-companie/ceeaza']);
    };
    CompaniesPage.prototype.selectCompanie = function ($event) {
        this._router.navigate([("/admin/detalii-companie/" + $event.id)]);
    };
    CompaniesPage.prototype.removeCompanie = function ($event) {
        var me = this;
        this._companiesService.deleteCompany($event.id)
            .subscribe(function (result) {
            debugger;
            me.getCompaniesWithFilters();
        }, function (error) {
            debugger;
            me._notificationService.emitErrorNotificationToRootComponent('Compania nu a putut fi stearsa !', 5);
            me.getCompaniesWithFilters();
        });
    };
    CompaniesPage.prototype.submitSearch = function () {
        this.getCompaniesWithFilters();
    };
    CompaniesPage.prototype.chengeSearch = function ($event) {
        this.getCompaniesWithFilters();
    };
    CompaniesPage = __decorate([
        core_1.Component({
            selector: 'compnaies-Page',
            template: template,
            //styleUrls: [applicationPath + '/companiesPage.css'],
            directives: [companiesAdminListComponent_1.CompanieAdmminListComponent, selectComponent_1.SelectComponent, ng2_bootstrap_1.PAGINATION_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, companiesService_1.CompaniesService, notificationService_1.NotificationService])
    ], CompaniesPage);
    return CompaniesPage;
})();
exports.CompaniesPage = CompaniesPage;
//# sourceMappingURL=companiesPage.js.map