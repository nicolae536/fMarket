/**
 * Created by nick_ on 4/22/2016.
 */
import {Component, OnInit, OnChanges} from "angular2/core";
import {CanActivate} from "angular2/router";

import {DemandListBaseComponent} from "../../../../components/demandComponent/demandListBase/demandListBase";
import {DemandService} from "../../../../services/demandService";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {DemandsListPageBase} from "./demandsListPageBase";
import {Role} from "../../../../models/Roles";
import {AuthorizationService} from "../../../../services/authorizationService";

let applicationPath:string = '/app/pages/adminPage/demandsPage/demandsListPage';

@Component({
    selector: 'demands-list-page',
    templateUrl: applicationPath + '/demandsListPageBase.html',
    styleUrls: [applicationPath + '/demandsListPageBase.css'],
    directives: [DemandListBaseComponent]
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})
export class AllDemandsListPage extends DemandsListPageBase implements OnInit, OnChanges {

    constructor(_demandService:DemandService, _requestTypeService:RequestTypeService) {
        super(_demandService, _requestTypeService);
    }

    public ngOnInit():any {
        // this.getCities();
        this.getAllDemandsList();
    }

    public ngOnChanges(changes:{}):any {
        // if(changes && changes['_demandsList']){
        //     this.getDomains();
        // }
    }
}