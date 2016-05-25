/**
 * Created by nick_ on 5/5/2016.
 */

import {Component} from "@angular/core";
import {RouteParams, Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";

@Component({
    selector:'success-register-page',
    templateUrl: 'app/pages/registrationPage/successPages/successPage.html',
    directives:[ROUTER_DIRECTIVES]
})
export class SuccessPage{
    private _router:Router;
    private _params:RouteParams;
    private message;

    constructor(router:Router, params:RouteParams){
        this._router = router;
        this._params = params;
        let succesOption = this._params.get('succesOption');

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