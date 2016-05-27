/**
 * Created by nick_ on 4/26/2016.
 */
import {Component, OnInit, OnChanges} from "@angular/core";
// import {CanActivate} from "@angular/router-deprecated";
import {Router} from "@angular/router";
import {AuthorizationService} from "../../../services/authorizationService";
import {DemandService} from "../../../services/demandService";
import {RequestTypeService} from "../../../services/requestTypeService";
import {DemandsListPageBase} from "../../adminPage/demandsPage/demandsListPage/demandsListPageBase";
import {CategoriesMenuService} from "../../../services/categoriesMenuService";
import {LocalizationService} from "../../../services/localizationService";

var applicationPath:string = '/app/pages/accountSettingsPage/accountDemandsPage';

@Component({
    selector: 'account-demands-Page',
    templateUrl: applicationPath + '/accountDemandsPage.html'
})
export class AccountDemandsPage extends DemandsListPageBase implements OnInit, OnChanges {
    constructor(router:Router,
                _categoriesMenuService:CategoriesMenuService,
                _demandService:DemandService,
                _requestTypeService:RequestTypeService,
                localizationService:LocalizationService) {
        super(router, _categoriesMenuService, _demandService, _requestTypeService, localizationService);
    }

    ngOnInit():any {
        this.getUserDemandsWithFilter();
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