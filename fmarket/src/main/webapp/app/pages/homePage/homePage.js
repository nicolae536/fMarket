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
var categoriesMenuService_1 = require("../../services/categoriesMenuService");
var demandService_1 = require("../../services/demandService");
var demandDialogComponent_1 = require("../../components/demandComponent/demandDialogComponent/demandDialogComponent");
var jqueryService_1 = require("../../services/jqueryService");
var folderPath = '/app/pages/homePage';
var HomePage = (function () {
    function HomePage(_categoriesMenuService, _demandService) {
        this.scrollProperty = 'scrollY';
        this._categoriesMenuService = _categoriesMenuService;
        this._demandService = _demandService;
    }
    HomePage.prototype.ngOnInit = function () {
        this.getCityes();
        this.getDomains();
    };
    HomePage.prototype.referenceDemandDialog = function (demandDialog) {
        this._demandDialog = demandDialog;
    };
    HomePage.prototype.goToCreateDemand = function () {
        jqueryService_1.JqueryService.animateScroll(this.createDemamdViewRef, 'easeInQuad', 1000);
    };
    HomePage.prototype.goToHowWeWork = function () {
        jqueryService_1.JqueryService.animateScroll(this.howWeWorkRef, 'easeInQuad', 1000);
    };
    HomePage.prototype.scrollToElement = function (element, duration) {
        var _this = this;
        this.scrollProperty = this.scrollProperty == 'scrollY' ? 'pageYOffset' : 'scrollY';
        _.defer(function () {
            console.log(window[_this.scrollProperty]);
            var scrollDown = element.nativeElement.offsetTop > window[_this.scrollProperty];
            var positionToScroll = element.nativeElement.offsetTop - window[_this.scrollProperty];
            var speedPerDuration = positionToScroll / duration;
            var intervalRef = setInterval(function () {
                var previousScroll = window[_this.scrollProperty];
                window.scroll(0, window[_this.scrollProperty] += speedPerDuration);
                console.log((Math.abs(element.nativeElement.offsetTop - window[_this.scrollProperty]) <= Math.abs(speedPerDuration) + Math.sqrt(speedPerDuration))
                    || (Math.abs(previousScroll - window[_this.scrollProperty]) < 1)
                    || (window.scrollY < 0));
                if ((Math.abs(element.nativeElement.offsetTop - window[_this.scrollProperty]) <= Math.abs(speedPerDuration) + Math.sqrt(speedPerDuration))
                    || (Math.abs(previousScroll - window[_this.scrollProperty]) < 1)
                    || (window.scrollY < 0)) {
                    console.log("clear");
                    clearInterval(intervalRef);
                }
            }, Math.round(duration / positionToScroll));
        });
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
        __metadata('design:paramtypes', [categoriesMenuService_1.CategoriesMenuService, demandService_1.DemandService])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
//# sourceMappingURL=homePage.js.map