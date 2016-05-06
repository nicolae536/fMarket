/**
 * Created by nick_ on 5/6/2016.
 */
import {Component, OnInit} from "angular2/core";
import {CanActivate, Router} from "angular2/router";
import {Role} from "../../../models/Roles";
import {AuthorizationService} from "../../../services/authorizationService";
import {CreateCompanieDialog} from "../../../components/companieComponent/createCompanieDialog/createCompanieDialog";
import {CompanieDto} from "../../../models/companieDto";
import {CompaniesService} from "../../../services/companiesService";
import {PaginationWrapper} from "../../../models/paginationWrapper";
import {NotificationService} from "../../../services/notificationService";


let applicationPath='/app/pages/adminPage/companiesPage'
@Component({
    selector: 'compnaies-Page',
    templateUrl: applicationPath + '/companiesPage.html',
    styleUrls: [applicationPath + '/companiesPage.css'],
    directives:[CreateCompanieDialog]
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})

export class CompaniesPage implements OnInit {
    private _createCompanieDialog:CreateCompanieDialog;

    private _notificationService:NotificationService;
    private _companiesService:CompaniesService;

    private _companiesList:Array<CompanieDto>;
    private _paginationWrapper:PaginationWrapper = new PaginationWrapper();

    private domainId:number;
    private name:string;
    private _router:Router;

    constructor(router:Router ,companiesService:CompaniesService, notificationService:NotificationService){
        this._router = router;
        this._companiesService = companiesService;
        this._notificationService = notificationService;
    }
    
    ngOnInit(){
        this._paginationWrapper.currentPage=1;
        this.getCompaniesWithFilters();
    }

    referenceCompaniesDialog(_createCompanieDialog:CreateCompanieDialog){
        this._createCompanieDialog = _createCompanieDialog;
    }

    requestNewCompanie($event:CompanieDto){

    }

    removeCompanie(companie:CompanieDto){
        //this._companiesService.
    }

    getNewPage(page:number){
        this._paginationWrapper.currentPage = page;
        this.getCompaniesWithFilters();
    }

    private getCompaniesWithFilters() {
        let me=this;

        this._companiesService.getCompanies({domainId:this.domainId, name:this.name, page:this._paginationWrapper.currentPage})
            .map(response =>{
                if(response.text().length>0){
                    return response.json();
                }
            })
            .subscribe(
                response=>{
                    me._companiesList = response;
                },
                error=>{
                    me._notificationService.emitNotificationToRootComponent({type:'danger', dismisable:true, message:'Eroare companiile nu pot fi afisate!'});
                }
            )
    }

    editCompanie(id){
        this._router.navigate(['Admin/CompanieDetails', {id:id}]);
    }
}
