/**
 * Created by nick_ on 6/8/2016.
 */
import {Component, OnInit, ElementRef, AfterViewInit, ViewChild} from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import {JqueryService} from "../../../services/jqueryService";
import {ApplicationConstants} from "../../../models/applicationConstansts";
import {GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/core";
import {CompaniesService} from "../../../services/companiesService";
import {NotificationService} from "../../../services/notificationService";
import {ENTER_LEAVE_ANIMATION} from "../../pageAnimations/enterLeavePage";

import { RatingComponent } from './../../../components/ratingComponent/ratingComponent';

@Component({
    selector: 'compnaie-details-Page',
    // template:template,
    templateUrl: '/app/pages/companiesPage/companieDetailPage/companieDetailPage.html',
    directives: [GOOGLE_MAPS_DIRECTIVES, RatingComponent],
    animations: ENTER_LEAVE_ANIMATION,
})
export class CompanieDetailPage implements OnInit, AfterViewInit {
    private companiesService:CompaniesService;
    private _notificationService:NotificationService;
    private _activatedRoute:ActivatedRoute;

    @ViewChild('mapMerkerRef') mapMerkerRef:ElementRef;
    private companieDetailsModel = {};
    private mapModel:Map;
    private marketModel:Marker;
    private comments = [];
    private commentsOpen:boolean = false;
    private comment:string = '';
    private companyId:number;
    private hoveredItemId:number;
    companyReview:number=-1;

    private ratinArray = [1,2,3,4,5];

    constructor(companiesService:CompaniesService, notificationService:NotificationService, activatedRoute:ActivatedRoute) {
        this.companiesService = companiesService;
        this._activatedRoute = activatedRoute;
        this._notificationService = notificationService;        
    }

    ngOnInit():any {
        
        JqueryService.removeElementWithAnimation('#' + ApplicationConstants.LOADING_SPINNER);
        this.mapModel = {lat: 51.673858, lng: 7.815982, zoom: 15};
        this.marketModel = {lat: 51.673858, lng: 7.815982, label: 'Nume companie', draggable: false};

        let me = this;
        this._activatedRoute.params.subscribe(params=>{
            me.companyId = params['id'];
            this.getCompanyDetails();
        })
    }

    ngAfterViewInit():any {
        let me = this;
        setTimeout(function () {
            me.mapMerkerRef.nativeElement.click();
        }, 500)
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

    getCompanyDetails() {
        let me = this;
        this.companiesService.getCompanieDetailsForUsers(this.companyId)
            .subscribe(
                succ=> {
                    me.companieDetailsModel = succ;
                    if(succ){
                        // me.mapModel = {lat: succ.latitude , lng: succ.longitude, zoom: 15};
                        // me.marketModel = {lat: succ.latitude , lng: succ.longitude, label: succ.name, draggable: false};
                    }
                    
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
                    me._notificationService.emitErrorNotificationToRootComponent('Reviewul nu a putut fi adaugat', 5);
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
