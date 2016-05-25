/**
 * Created by nick_ on 4/26/2016.
 */
import {Component, OnInit, OnChanges} from "@angular/core";
import {CanActivate} from "@angular/router-deprecated";

import {AuthorizationService} from "../../../services/authorizationService";
import {DemandService} from "../../../services/demandService";
import {RequestTypeService} from "../../../services/requestTypeService";
import {DemandsListPageBase} from "../../adminPage/demandsPage/demandsListPage/demandsListPageBase";
import {CategoriesMenuService} from "../../../services/categoriesMenuService";

var applicationPath:string = '/app/pages/accountSettingsPage/accountDemandsPage';

@Component({
    selector: 'account-demands-Page',
    templateUrl: applicationPath + '/accountDemandsPage.html'
})
@CanActivate(()=> {
    return AuthorizationService.isLoggedIn();
})

export class AccountDemandsPage extends DemandsListPageBase implements OnInit, OnChanges {
    constructor(_categoriesMenuService:CategoriesMenuService, demandService:DemandService, requestTypeService:RequestTypeService) {
        super(_categoriesMenuService, demandService, requestTypeService);
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