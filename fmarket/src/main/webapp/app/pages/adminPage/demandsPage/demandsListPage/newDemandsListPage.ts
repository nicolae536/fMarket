/**
 * Created by nick_ on 4/23/2016.
 */
/**
 * Created by nick_ on 4/22/2016.
 */
import {Component, OnChanges, OnInit} from "@angular/core";
import {CanActivate} from "@angular/router-deprecated";

import {DemandListBaseComponent} from "../../../../components/demandComponent/demandListBase/demandListBase";
import {DemandService} from "../../../../services/demandService";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {DemandsListPageBase} from "./demandsListPageBase";
import {Role} from "../../../../models/Roles";
import {AuthorizationService} from "../../../../services/authorizationService";
import {CategoriesMenuService} from "../../../../services/categoriesMenuService";
import {MenuTreeDialog} from "../../../../components/menuComponent/menuTreeDialog/menuTreeDialog";

let applicationPath:string = '/app/pages/adminPage/demandsPage/demandsListPage';

@Component({
    selector: 'new-demands-list-page',
    templateUrl: applicationPath + '/demandsListPageBase.html',
    styleUrls: [applicationPath + '/demandsListPageBase.css'],
    directives: [DemandListBaseComponent, MenuTreeDialog]
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})
export class NewDemandsListPage extends DemandsListPageBase implements OnInit, OnChanges{
    pageName='new-demands';
    constructor(_categoriesMenuService:CategoriesMenuService, _demandService:DemandService, _requestTypeService:RequestTypeService){
        super(_categoriesMenuService, _demandService,_requestTypeService);
        this._demandsRoute = '/new';
    }

    public ngOnInit():any {
        //this.getCities();
        this.getNewDemandsList();
    }

    public ngOnChanges(changes:{}):any {
        /*if(changes && changes['_demandsList']){
            this.getDomains();
        }*/
    }
}