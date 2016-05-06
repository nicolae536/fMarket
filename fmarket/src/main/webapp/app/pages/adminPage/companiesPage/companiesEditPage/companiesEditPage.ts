/**
 * Created by nick_ on 5/6/2016.
 */

import {OnInit, Component} from "angular2/core";
import {CompanieDto} from "../../../../models/companieDto";
import {CompaniesService} from "../../../../services/companiesService";
import {RouteParams, Router, CanActivate} from "angular2/router";
import {NotificationService} from "../../../../services/notificationService";
import {CompaniesEditComponent} from "../../../../components/companieComponent/companieEditComponent/companiesEditComponent";
import {AuthorizationService} from "../../../../services/authorizationService";
import {Role} from "../../../../models/Roles";


@Component({
    selector:'companies-edit-page',
    templateUrl:'/app/pages/adminPage/companiesPage/companiesEditPage/companiesEditPage.html',
    directives:[CompaniesEditComponent]
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})

export class CompaniesEditPage implements OnInit {
    private _companieEditComponent:CompaniesEditComponent;

    private _companiesService:CompaniesService;

    private _companie:CompanieDto;
    private _routeParametres:RouteParams;
    private _notificationService:NotificationService;
    private _router:Router;

    constructor(router:Router,companiesService:CompaniesService, routeParametres:RouteParams, notificationService:NotificationService) {
        this._router = router;
        this._companiesService = companiesService;
        this._routeParametres = routeParametres;
        this._notificationService = notificationService;
    }

    referenceComponent(companieEditComponent:CompaniesEditComponent){
        this._companieEditComponent = companieEditComponent;
    }

    ngOnInit():any {
        let me=this;
        this._companiesService.getCompanieDetails(parseInt(this._routeParametres.get('id')))
            .map(response=>{
                if(response.text().length>0){
                    return response.json();
                }
            })
            .subscribe(
                response=>{
                    me._companie = response;
                },
                error=>{
                    me._notificationService.emitNotificationToRootComponent({type:'danger', dismisable:true, message:'Erroare la incarcarea companiei!'});
                    me._router.navigate(['Admin/Companies']);
                }
            )
    }

    saveCompanie(companieDto:CompanieDto){
        //this._companiesService.
    }
}