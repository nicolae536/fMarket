/**
 * Created by nick_ on 6/8/2016.
 */
import {Component, OnInit, ElementRef, AfterViewInit, ViewChild} from "@angular/core";
import {JqueryService} from "../../../services/jqueryService";
import {ApplicationConstants} from "../../../models/applicationConstansts";

import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

@Component({
    selector: 'compnaie-details-Page',
    // template:template,
    templateUrl:'/app/pages/companiesPage/companieDetailPage/companieDetailPage.html',
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
})
export class CompanieDetailPage implements OnInit, AfterViewInit {
    @ViewChild('mapMerkerRef') mapMerkerRef:ElementRef;

    companieDetailsModel = {};
    mapModel:Map;
    marketModel:Marker;

    comments=[];
    commentsOpen:boolean=false;

    ngOnInit():any {
        this.mapModel = {lat:51.673858, lng:7.815982, zoom:15};
        this.marketModel = {lat:51.673858, lng:7.815982, label:'Nume companie', draggable:false};

        JqueryService.removeElementWithAnimation('#'+ApplicationConstants.LOADING_SPINNER);
    }

    ngAfterViewInit():any {
        let me=this;
        setTimeout(function () {
            me.mapMerkerRef.nativeElement.click();
        }, 500)
    }

}

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}

interface Map {
    lat: number;
    lng: number;
    zoom: number;
}
