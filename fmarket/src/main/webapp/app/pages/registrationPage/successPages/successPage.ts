/**
 * Created by nick_ on 5/5/2016.
 */

import {Component, OnInit} from "@angular/core";
import {Router, ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {JqueryService} from "../../../services/jqueryService";
import {ApplicationConstants} from "../../../models/applicationConstansts";

let template = require('./successPage.html');

@Component({
    selector:'success-register-page',
    template: template,
    directives:[ROUTER_DIRECTIVES]
})
export class SuccessPage implements OnInit{

    //<editor-fold desc="Services">
    private _router:Router;
    private _activatedRoute:ActivatedRoute;
    //</editor-fold>

    //<editor-fold desc="Internal variables">
    private message;
    private title;
    //</editor-fold>

    constructor(router:Router, activatedRoute:ActivatedRoute){
        this._router = router;
        this._activatedRoute = activatedRoute;
        JqueryService.removeElementWithAnimation('#' + ApplicationConstants.LOADING_SPINNER);
    }

    ngOnInit():any {
        this._activatedRoute.params.subscribe(params =>
            this.activateView(params['succesOption'])
        );
    }

    activateView(succesOption: string):void {
        switch (succesOption) {
            case SuccessPageOptions.SuccessRegistration:
                this.title = 'Inregistrare cu seccess';
                this.message = 'Ati fost inregistrat cu success. O sa primiti un email pentru a confirma contul creat';
                break;
            case SuccessPageOptions.SuccessRestPassword:
                this.title = 'Inregistrare cu seccess';
                this.message ='Parola a fost resetata cu success. O sa primiti un email pentru a confirma resetarea parolei';
                break;
            case SuccessPageOptions.CreateDemand:
                this.title = 'Cerere trimisa cu seccess';
                this.message ='Operatorii nostri vor prelua cererea in cel mai scurt timp.';
                break;
        }
    }
}

export class SuccessPageOptions{
    public static SuccessRegistration:string = 'success-registration';
    public static SuccessRestPassword:string = 'success-rest-password';
    public static CreateDemand:string = 'create-demand';
}