/**
 * Created by nick_ on 6/8/2016.
 */
import {Component, OnInit} from "@angular/core";
import {JqueryService} from "../../../services/jqueryService";
import {ApplicationConstants} from "../../../models/applicationConstansts";

// let template = require('./companieDetailPage.html');

@Component({
    selector: 'compnaie-details-Page',
    // template:template,
    templateUrl:'/app/pages/companiesPage/companieDetailPage/companieDetailPage.html'
})
export class CompanieDetailPage implements OnInit {
    ngOnInit():any {
        JqueryService.removeElementWithAnimation('#'+ApplicationConstants.LOADING_SPINNER)
    }

}
