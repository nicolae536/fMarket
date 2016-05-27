/**
 * Created by nick_ on 5/5/2016.
 */

import {Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree} from "@angular/router";
// import {RouteParams} from "@angular/common";

@Component({
    selector:'success-register-page',
    templateUrl: 'app/pages/registrationPage/successPages/successPage.html',
    directives:[ROUTER_DIRECTIVES]
})
export class SuccessPage implements OnActivate{
    private _router:Router;
    private message;

    constructor(router:Router){
        this._router = router;
    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        let succesOption = curr.getParam('succesOption');

        switch (succesOption) {
            case 'success-registration':
                this.message = 'Ati fost inregistrat cu success. O sa primiti un email pentru a confirma contul creat';
                break;
            case 'success-rest-password':
                this.message ='Parola a fost resetata cu success. O sa primiti un email pentru a confirma resetarea parolei';
                break;
            case 'create-demand':
                this.message ='Cererea a fost creata cu success.';
                break;
        }
    }
}