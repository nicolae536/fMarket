var newCompanyRequest_1 = require("../../../../models/newCompanyRequest");
var CompaniesEditBase = (function () {
    function CompaniesEditBase(location, router, companiesService, notificationService, localizationService) {
        this._router = router;
        this._companiesService = companiesService;
        this._notificationService = notificationService;
        this._location = location;
        this._localizationService = localizationService;
        this._companie = newCompanyRequest_1.NewCompanyRequest.getEmptyCompany();
    }
    CompaniesEditBase.prototype.referenceComponent = function (companieEditComponent) {
        this._companieEditComponent = companieEditComponent;
    };
    CompaniesEditBase.prototype.goToPreviousLocation = function () {
        this._location.back();
    };
    CompaniesEditBase.prototype.getCities = function () {
        var me = this;
        this._localizationService.getCityList()
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (success) {
            me._cities = me._localizationService.mapNameToSelect2Item(success);
        }, function (error) {
            me._cities = new Array();
        });
    };
    CompaniesEditBase.prototype.getCompanieDomains = function () {
        var me = this;
        this._companiesService.getCompanieDomains()
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (success) {
            me._companyDomains = me._localizationService.mapNameToSelect2Item(success);
        }, function (error) {
            me._companyDomains = new Array();
        });
    };
    CompaniesEditBase.prototype.getDomains = function () {
        var me = this;
        this._companiesService.getDemandDomanins()
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (success) {
            me._domains = me._localizationService.mapNameToSelect2Item(success);
        }, function (error) {
            me._domains = new Array();
        });
    };
    return CompaniesEditBase;
})();
exports.CompaniesEditBase = CompaniesEditBase;
//# sourceMappingURL=companiesEditBase.js.map