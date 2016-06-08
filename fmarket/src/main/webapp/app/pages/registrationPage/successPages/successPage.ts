/**
 * Created by nick_ on 5/5/2016.
 */

import {Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree} from "@angular/router";
import {JqueryService} from "../../../services/jqueryService";
import {ApplicationConstants} from "../../../models/applicationConstansts";

let template = require('./successPage.html');

@Component({
    selector:'success-register-page',
    template: template,
    directives:[ROUTER_DIRECTIVES]
})
export class SuccessPage implements OnActivate{
    //<editor-fold desc="Services">
    private _router:Router;
    //</editor-fold>

    //<editor-fold desc="Internal variables">
    private message;
    private title;
    //</editor-fold>

    constructor(router:Router){
        this._router = router;
        JqueryService.removeElementWithAnimation('#' + ApplicationConstants.LOADING_SPINNER);
    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        let succesOption = curr.getParam('succesOption');

        switch (succesOption) {
            case 'success-registration':
                this.title = 'Inregistrare cu seccess';
                this.message = 'Ati fost inregistrat cu success. O sa primiti un email pentru a confirma contul creat';
                break;
            case 'success-rest-password':
                this.title = 'Inregistrare cu seccess';
                this.message ='Parola a fost resetata cu success. O sa primiti un email pentru a confirma resetarea parolei';
                break;
            case 'create-demand':
                this.title = 'Cerere trimisa cu seccess';
                this.message ='Operatorii nostri vor prelua cererea in cel mai scurt timp.';
                break;
        }
    }
}