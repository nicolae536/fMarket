/**
 * Created by nick_ on 6/8/2016.
 */
import {Component, OnInit, ElementRef, AfterViewInit, ViewChild} from "@angular/core";
import {OnActivate, RouteSegment, RouteTree} from "@angular/router";
import {JqueryService} from "../../../services/jqueryService";
import {ApplicationConstants} from "../../../models/applicationConstansts";
import {GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/core";
import {CompaniesService} from "../../../services/companiesService";
import {NotificationService} from "../../../services/notificationService";
import {ENTER_LEAVE_ANIMATION} from "../../pageAnimations/enterLeavePage";

@Component({
    selector: 'compnaie-details-Page',
    // template:template,
    templateUrl: '/app/pages/companiesPage/companieDetailPage/companieDetailPage.html',
    directives: [GOOGLE_MAPS_DIRECTIVES],
    animations: ENTER_LEAVE_ANIMATION,
})
export class CompanieDetailPage implements OnInit, AfterViewInit, OnActivate {
    private companiesService:CompaniesService;
    private _notificationService:NotificationService;

    @ViewChild('mapMerkerRef') mapMerkerRef:ElementRef;
    private companieDetailsModel = {};
    private mapModel:Map;
    private marketModel:Marker;
    private comments = [];
    private commentsOpen:boolean = false;
    private comment:string = '';
    private companyId:number;
    private hoveredItemId:number;
    companyReview:number;

    constructor(companiesService:CompaniesService, notificationService:NotificationService) {
        this.companiesService = companiesService;
        this._notificationService = notificationService;
    }

    ngOnInit():any {
        this.mapModel = {lat: 51.673858, lng: 7.815982, zoom: 15};
        this.marketModel = {lat: 51.673858, lng: 7.815982, label: 'Nume companie', draggable: false};

        JqueryService.removeElementWithAnimation('#' + ApplicationConstants.LOADING_SPINNER);
    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        this.companyId = Number(curr.getParam('id'));

        this.getCompanyDetails();
        this.getCompanyReviews();
    }

    ngAfterViewInit():any {
        let me = this;
        setTimeout(function () {
            me.mapMerkerRef.nativeElement.click();
        }, 500)
    }

    setOverItem(number){
        this.hoveredItemId = number;
    }

    getClassUsingSelectedId(id){
        if(this.hoveredItemId >= id){
            return "glyphicon glyphicon-star"
        }

        return "glyphicon glyphicon-star-empty";
    }

    getCompanyReviews(){
        let me = this;
        this.companiesService.getCompanyReviews(this.companyId)
            .subscribe(
                succ=> {
                    me.comments = succ;
                },
                err=> {
                }
            );
    }

    asd(){
        this.commentsOpen = !this.commentsOpen;

        if(this.commentsOpen){
            this.getCompanyReviews();
        }
    }

    getCompanyDetails() {
        let me = this;
        this.companiesService.getCompanieDetailsForUsers(this.companyId)
            .subscribe(
                succ=> {
                    me.companieDetailsModel = succ;
                },
                err=> {
                    me._notificationService.emitErrorNotificationToRootComponent('Detaliile companiei nu pot fi afisate', 5);
                }
            );

    }

    addComment(){
        let me = this;
        this.companiesService.addMessageReviewForUsers({message: this.comment, companyId:this.companyId})
            .subscribe(
                succ=> {
                    me.comment= '';
                },
                err=> {
                    me._notificationService.emitErrorNotificationToRootComponent('Comentariul nu a putut fi adaugat', 5);
                }
            );
    }

    addStarsNumber(nr){
        let me = this;
        this.companiesService.addStarsReviewForUsers({starsNr: nr, companyId:this.companyId})
            .subscribe(
                succ=> {
                    me.comment= '';
                },
                err=> {
                    me._notificationService.emitErrorNotificationToRootComponent('Comentariul nu a putut fi adaugat', 5);
                }
            );
    }

}

interface Marker {
    lat:number;
    lng:number;
    label?:string;
    draggable:boolean;
}

interface Map {
    lat:number;
    lng:number;
    zoom:number;
}
