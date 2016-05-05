/**
 * Created by nick_ on 4/26/2016.
 */
import {Component} from "angular2/core";
import {CanActivate} from "angular2/router";
import {AuthorizationService} from "../../../services/authorizationService";

var applicationPath:string = '/app/pages/accountSettingsPage/accountDemandsPage';

@Component({
    selector: 'account-edit-Page',
    templateUrl: applicationPath + '/accountDemandsPage.html',
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn();})

export class AccountDemandsPage{

}