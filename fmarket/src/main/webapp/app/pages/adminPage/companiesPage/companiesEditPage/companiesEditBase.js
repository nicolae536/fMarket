"use strict";
var CompaniesEditBase = (function () {
    function CompaniesEditBase(location, router, companiesService, notificationService) {
        this._router = router;
        this._companiesService = companiesService;
        this._notificationService = notificationService;
        this._location = location;
    }
    CompaniesEditBase.prototype.referenceComponent = function (companieEditComponent) {
        this._companieEditComponent = companieEditComponent;
    };
    CompaniesEditBase.prototype.saveCompanie = function (companieDto) {
        var me = this;
        this._companiesService.editCompany(companieDto)
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (success) {
            me._location.back();
        }, function (error) {
        });
    };
    CompaniesEditBase.prototype.goToPreviousLocation = function () {
        this._location.back();
    };
    CompaniesEditBase.prototype.createCompanie = function ($event) {
    };
    return CompaniesEditBase;
}());
exports.CompaniesEditBase = CompaniesEditBase;
//# sourceMappingURL=companiesEditBase.js.map