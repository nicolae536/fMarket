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
 * Created by nick_ on 6/8/2016.
 */
var core_1 = require("@angular/core");
var jqueryService_1 = require("../../../services/jqueryService");
var applicationConstansts_1 = require("../../../models/applicationConstansts");
// import {GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/core";
var companiesService_1 = require("../../../services/companiesService");
var notificationService_1 = require("../../../services/notificationService");
var CompanieDetailPage = (function () {
    function CompanieDetailPage(companiesService, notificationService) {
        this.companieDetailsModel = {};
        this.comments = [];
        this.commentsOpen = false;
        this.comment = '';
        this.companiesService = companiesService;
        this._notificationService = notificationService;
    }
    CompanieDetailPage.prototype.ngOnInit = function () {
        this.mapModel = { lat: 51.673858, lng: 7.815982, zoom: 15 };
        this.marketModel = { lat: 51.673858, lng: 7.815982, label: 'Nume companie', draggable: false };
        jqueryService_1.JqueryService.removeElementWithAnimation('#' + applicationConstansts_1.ApplicationConstants.LOADING_SPINNER);
    };
    CompanieDetailPage.prototype.routerOnActivate = function (curr, prev, currTree, prevTree) {
        this.companyId = Number(curr.getParam('id'));
        this.getCompanyDetails();
        this.getCompanyReviews();
    };
    CompanieDetailPage.prototype.ngAfterViewInit = function () {
        var me = this;
        setTimeout(function () {
            me.mapMerkerRef.nativeElement.click();
        }, 500);
    };
    CompanieDetailPage.prototype.setOverItem = function (number) {
        this.hoveredItemId = number;
    };
    CompanieDetailPage.prototype.getClassUsingSelectedId = function (id) {
        if (this.hoveredItemId >= id) {
            return "glyphicon glyphicon-star";
        }
        return "glyphicon glyphicon-star-empty";
    };
    CompanieDetailPage.prototype.getCompanyReviews = function () {
        var me = this;
        this.companiesService.getCompanyReviews(this.companyId)
            .subscribe(function (succ) {
            me.comments = succ;
        }, function (err) {
        });
    };
    CompanieDetailPage.prototype.asd = function () {
        this.commentsOpen = !this.commentsOpen;
        if (this.commentsOpen) {
            this.getCompanyReviews();
        }
    };
    CompanieDetailPage.prototype.getCompanyDetails = function () {
        var me = this;
        this.companiesService.getCompanieDetailsForUsers(this.companyId)
            .subscribe(function (succ) {
            me.companieDetailsModel = succ;
        }, function (err) {
            me._notificationService.emitErrorNotificationToRootComponent('Detaliile companiei nu pot fi afisate', 5);
        });
    };
    CompanieDetailPage.prototype.addComment = function () {
        var me = this;
        this.companiesService.addMessageReviewForUsers({ message: this.comment, companyId: this.companyId })
            .subscribe(function (succ) {
            me.comment = '';
        }, function (err) {
            me._notificationService.emitErrorNotificationToRootComponent('Comentariul nu a putut fi adaugat', 5);
        });
    };
    CompanieDetailPage.prototype.addStarsNumber = function (nr) {
        var me = this;
        this.companiesService.addStarsReviewForUsers({ starsNr: nr, companyId: this.companyId })
            .subscribe(function (succ) {
            me.comment = '';
        }, function (err) {
            me._notificationService.emitErrorNotificationToRootComponent('Comentariul nu a putut fi adaugat', 5);
        });
    };
    __decorate([
        core_1.ViewChild('mapMerkerRef'), 
        __metadata('design:type', core_1.ElementRef)
    ], CompanieDetailPage.prototype, "mapMerkerRef", void 0);
    CompanieDetailPage = __decorate([
        core_1.Component({
            selector: 'compnaie-details-Page',
            // template:template,
            templateUrl: '/app/pages/companiesPage/companieDetailPage/companieDetailPage.html',
        }), 
        __metadata('design:paramtypes', [companiesService_1.CompaniesService, notificationService_1.NotificationService])
    ], CompanieDetailPage);
    return CompanieDetailPage;
}());
exports.CompanieDetailPage = CompanieDetailPage;
//# sourceMappingURL=companieDetailPage.js.map