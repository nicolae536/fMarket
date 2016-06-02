/**
 * Created by nick_ on 5/5/2016.
 */

import {Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree} from "@angular/router";
import {JqueryService} from "../../../services/jqueryService";
import {ApplicationConstants} from "../../../models/applicationConstansts";
// import {RouteParams} from "@angular/common";

@Component({
    selector:'success-register-page',
    templateUrl: 'app/pages/registrationPage/successPages/successPage.html',
    directives:[ROUTER_DIRECTIVES]
})
export class SuccessPage implements OnActivate{
    private _router:Router;
    private message;
    private title;

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