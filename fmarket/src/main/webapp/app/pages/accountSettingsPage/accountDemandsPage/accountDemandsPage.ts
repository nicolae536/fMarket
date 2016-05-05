/**
 * Created by nick_ on 4/26/2016.
 */
import {Component, OnInit, OnChanges} from "angular2/core";
import {CanActivate} from "angular2/router";
import {AuthorizationService} from "../../../services/authorizationService";
import {DemandService} from "../../../services/demandService";
import {RequestTypeService} from "../../../services/requestTypeService";
import {DemandsListPageBase} from "../../adminPage/demandsPage/demandsListPage/demandsListPageBase";

var applicationPath:string = '/app/pages/accountSettingsPage/accountDemandsPage';

@Component({
    selector: 'account-demands-Page',
    templateUrl: applicationPath + '/accountDemandsPage.html',
})
@CanActivate(()=> {
    return AuthorizationService.isLoggedIn();
})

export class AccountDemandsPage extends DemandsListPageBase implements OnInit, OnChanges {
    constructor(demandService:DemandService, requestTypeService:RequestTypeService) {
        super(demandService, requestTypeService);
    }

    ngOnInit():any {
        this.getUserDemandsWithFilter();
        this.getCities();
        this.getDomains();
    }

    ngOnChanges(changes:{}):any {

    }

    private getUserDemandsWithFilter() {
        let me = this;
        this._demandService.getUserDemandsWithFilter(this._searchObject)
            .map(response=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                response=> {
                    me._demandsList = response;
                },
                error=> {

                }
            )
    }
}