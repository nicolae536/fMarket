/**
 * Created by nick_ on 4/22/2016.
 */
import {Component, OnInit, OnChanges} from "@angular/core";
import {Router} from "@angular/router";

import {DemandService} from "../../../../services/demandService";
import {CategoriesMenuService} from "../../../../services/categoriesMenuService";
import {LocalizationService} from "../../../../services/localizationService";
import {NotificationService} from "../../../../services/notificationService";

import {DemandListBaseComponent} from "../../../../components/demandComponent/demandListBase/demandListBase";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {DemandsListPageBase} from "./demandsListPageBase";
import {MenuTreeDialog} from "../../../../components/menuComponent/menuTreeDialog/menuTreeDialog";

let applicationPath:string = '/app/pages/adminPage/demandsPage/demandsListPage';

@Component({
    selector: 'demands-list-page',
    templateUrl: applicationPath + '/demandsListPageBase.html',
    styleUrls: [applicationPath + '/demandsListPageBase.css'],
    directives: [DemandListBaseComponent, MenuTreeDialog]
})
// @CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})
export class AllDemandsListPage extends DemandsListPageBase implements OnInit, OnChanges {
    pageName='demands';
    constructor(router:Router,
                _categoriesMenuService:CategoriesMenuService,
                _demandService:DemandService,
                _requestTypeService:RequestTypeService,
                _localizationService:LocalizationService,
                _notificationService:NotificationService) {
        super(router,_categoriesMenuService, _demandService, _requestTypeService, _localizationService, _notificationService);
    }

    public ngOnInit():any {
        // this.getCities();
        this.getAllDemandsList();
        this.getMenuDictionary();
    }

    public ngOnChanges(changes:{}):any {
        // if(changes && changes['_demandsList']){
        //     this.getDomains();
        // }
    }
}