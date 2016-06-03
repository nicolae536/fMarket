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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var categoriesMenuService_1 = require("../../services/categoriesMenuService");
var demandService_1 = require("../../services/demandService");
var jqueryService_1 = require("../../services/jqueryService");
var subscribersService_1 = require("../../services/subscribersService");
var notificationService_1 = require("../../services/notificationService");
var localizationService_1 = require("../../services/localizationService");
var Angular2ExtensionValidators_1 = require("../../models/Angular2ExtensionValidators");
var demandComponent_1 = require("../../components/demandComponent/demandComponent");
var folderPath = '/app/pages/homePage';
var HomePage = (function () {
    //</editor-fold>
    function HomePage(_categoriesMenuService, router, _demandService, subscribersService, formBuilder, notificationService, _localizationService) {
        this.scrollProperty = 'scrollY';
        this._categoriesMenuService = _categoriesMenuService;
        this._router = router;
        this._demandService = _demandService;
        this._subscribersService = subscribersService;
        this._formBuilder = formBuilder;
        this._notificationService = notificationService;
        this._localizationService = _localizationService;
    }
    HomePage.prototype.ngOnInit = function () {
        this.getCities();
        this.getMenuDictionary();
        this._subscribeForm = this._formBuilder.group([]);
        this._subscribeForm.addControl('email', this._formBuilder.control('', common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validateEmail])));
        this._notificationService.removeLoading();
    };
    HomePage.prototype.ngAfterViewInit = function () {
        this._notificationService.removeLoading();
    };
    HomePage.prototype.ngAfterViewChecked = function () {
        this.rematchElementsOnView(null);
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
            .subscribe(function (success) {
            me._subscribeForm.removeControl('email');
            _this._subscribeForm.addControl('email', _this._formBuilder.control('', common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validateEmail])));
            me._notificationService.emitSuccessNotificationToRootComponent('Te-ai inscris cu success!', 5);
        }, function (error) {
            me._notificationService.emitErrorNotificationToRootComponent(error.message, 5);
        });
    };
    HomePage.prototype.goToCreateDemand = function () {
        jqueryService_1.JqueryService.animateScroll(this.createDemamdViewRef, 'easeInQuad', 500);
    };
    HomePage.prototype.goToHowWeWork = function () {
        jqueryService_1.JqueryService.animateScroll(this.howWeWorkRef, 'easeInQuad', 500);
    };
    HomePage.prototype.createDemand = function (demand) {
        var _this = this;
        var me = this;
        if (!this._demandDialog.IsValid()) {
            return;
        }
        this._demandService.createUserDemand(demand)
            .subscribe(function (respose) {
            me._demandDialog.restData();
            me._router.navigate(['/success/create-demand']);
        }, function (error) {
            _this._notificationService.emitErrorNotificationToRootComponent('Cererea nu a putut fi creata', 5);
        });
    };
    HomePage.prototype.getMenuDictionary = function () {
        var me = this;
        this._categoriesMenuService.getMenuDictionary()
            .subscribe(function (response) {
            me.menuDictionary = response;
        }, function (error) {
            me.menuDictionary = [];
        });
    };
    HomePage.prototype.getCities = function () {
        var me = this;
        this._localizationService.getCityList()
            .subscribe(function (response) {
            me._cityes = me._localizationService.mapNameToSelect2Item(response);
        }, function (error) {
            console.log(error.message);
            me._cityes = [];
        });
    };
    HomePage.prototype.rematchElementsOnView = function ($event) {
        jqueryService_1.JqueryService.makeElementsOfSameHeight(this.videoContainer.nativeElement, [this.videoRightContainer.nativeElement]);
        jqueryService_1.JqueryService.fitChildItemsInContainer(this.videoRightContainer.nativeElement);
    };
    __decorate([
        core_1.ViewChild('createDemandComponent'), 
        __metadata('design:type', core_1.ElementRef)
    ], HomePage.prototype, "createDemamdViewRef", void 0);
    __decorate([
        core_1.ViewChild('howWeWork'), 
        __metadata('design:type', core_1.ElementRef)
    ], HomePage.prototype, "howWeWorkRef", void 0);
    __decorate([
        core_1.ViewChild('videoContainer'), 
        __metadata('design:type', core_1.ElementRef)
    ], HomePage.prototype, "videoContainer", void 0);
    __decorate([
        core_1.ViewChild('videoRightContainer'), 
        __metadata('design:type', core_1.ElementRef)
    ], HomePage.prototype, "videoRightContainer", void 0);
    HomePage = __decorate([
        core_1.Component({
            selector: 'home-page',
            templateUrl: folderPath + '/homePage.html',
            directives: [demandComponent_1.DemandComponent]
        }), 
        __metadata('design:paramtypes', [categoriesMenuService_1.CategoriesMenuService, router_1.Router, demandService_1.DemandService, subscribersService_1.SubscribersService, common_1.FormBuilder, notificationService_1.NotificationService, localizationService_1.LocalizationService])
    ], HomePage);
    return HomePage;
})();
exports.HomePage = HomePage;
//# sourceMappingURL=homePage.js.map