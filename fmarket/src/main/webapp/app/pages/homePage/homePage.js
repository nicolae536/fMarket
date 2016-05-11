"use strict";
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
 * Created by nick_ on 4/12/2016.
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var categoriesMenuService_1 = require("../../services/categoriesMenuService");
var demandService_1 = require("../../services/demandService");
var demandDialogComponent_1 = require("../../components/demandComponent/demandDialogComponent/demandDialogComponent");
var jqueryService_1 = require("../../services/jqueryService");
var Angular2ExtensionValidators_1 = require("../../models/Angular2ExtensionValidators");
var subscribersService_1 = require("../../services/subscribersService");
var notificationService_1 = require("../../services/notificationService");
var folderPath = '/app/pages/homePage';
var HomePage = (function () {
    function HomePage(_categoriesMenuService, _demandService, subscribersService, formBuilder, notificationService) {
        this.scrollProperty = 'scrollY';
        this._categoriesMenuService = _categoriesMenuService;
        this._demandService = _demandService;
        this._subscribersService = subscribersService;
        this._formBuilder = formBuilder;
        this._notificationService = notificationService;
    }
    HomePage.prototype.ngOnInit = function () {
        this.getCityes();
        this.getDomains();
        this._subscribeForm = this._formBuilder.group([]);
        this._subscribeForm.addControl('email', this._formBuilder.control('', common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validateEmail])));
    };
    HomePage.prototype.referenceDemandDialog = function (demandDialog) {
        this._demandDialog = demandDialog;
    };
    HomePage.prototype.submitSubscriber = function () {
        var _this = this;
        if (!this._subscribeForm.valid) {
            return;
        }
        var me = this;
        this._subscribersService.subscribeTowebsite(this._subscribeForm.value)
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (success) {
            me._subscribeForm.removeControl('email');
            _this._subscribeForm.addControl('email', _this._formBuilder.control('', common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validateEmail])));
            me._notificationService.emitNotificationToRootComponent({
                type: 'success',
                dismisable: true,
                message: 'Te-ai inscris cu success!',
                timeout: 5
            });
        }, function (error) {
            me._notificationService.emitNotificationToRootComponent({
                type: 'danger',
                dismisable: true,
                message: error.message,
                timeout: 5
            });
        });
    };
    HomePage.prototype.goToCreateDemand = function () {
        jqueryService_1.JqueryService.animateScroll(this.createDemamdViewRef, 'easeInQuad', 500);
    };
    HomePage.prototype.goToHowWeWork = function () {
        jqueryService_1.JqueryService.animateScroll(this.howWeWorkRef, 'easeInQuad', 500);
    };
    HomePage.prototype.createDemand = function (demand) {
        var me = this;
        if (!this._demandDialog.isValidResponse()) {
            return;
        }
        this._demandService.createDemand(demand).map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        }).subscribe(function (respose) {
            me._demandDialog.closeDemandDialog();
        }, function (error) {
            console.log(error.message);
        });
    };
    HomePage.prototype.getCityes = function () {
        var me = this;
        this._demandService.getCityList()
            .subscribe(function (response) {
            me._cityes = response.map(function (city) {
                return {
                    displayName: city['name'],
                    boundItem: city
                };
            });
        }, function (error) {
            console.log(error.message);
            me._cityes = [];
        });
    };
    HomePage.prototype.getDomains = function () {
        var me = this;
        this._categoriesMenuService.getDomains()
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        }).subscribe(function (response) {
            me._domains = response.map(function (domain) {
                return {
                    displayName: domain['name'],
                    boundItem: domain
                };
            });
        }, function (error) {
            console.log(error.message);
            me._domains = [];
        });
    };
    __decorate([
        core_1.ViewChild('createDemandComponent'), 
        __metadata('design:type', core_1.ElementRef)
    ], HomePage.prototype, "createDemamdViewRef", void 0);
    __decorate([
        core_1.ViewChild('howWeWork'), 
        __metadata('design:type', core_1.ElementRef)
    ], HomePage.prototype, "howWeWorkRef", void 0);
    HomePage = __decorate([
        core_1.Component({
            selector: 'home-page',
            templateUrl: folderPath + '/homePage.html',
            directives: [demandDialogComponent_1.DemandDialogComponent]
        }), 
        __metadata('design:paramtypes', [categoriesMenuService_1.CategoriesMenuService, demandService_1.DemandService, subscribersService_1.SubscribersService, common_1.FormBuilder, notificationService_1.NotificationService])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
//# sourceMappingURL=homePage.js.map