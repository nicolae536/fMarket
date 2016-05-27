/**
 * Created by NicolaeB on 5/26/2016.
 */
import {Router} from "@angular/router";
import {Location} from "@angular/common"
import {CompaniesEditComponent} from "../../../../components/companieComponent/companieEditComponent/companiesEditComponent";
import {CompaniesService} from "../../../../services/companiesService";
import {NotificationService} from "../../../../services/notificationService";
import {NewCompanyRequest} from "../../../../models/newCompanyRequest";

export class CompaniesEditBase{
    public _companieEditComponent:CompaniesEditComponent;
    public _router:Router;
    public _companiesService:CompaniesService;
    public _notificationService:NotificationService;
    
    public _companie:NewCompanyRequest;
    private _location:Location;
    
    constructor(location:Location, router:Router, companiesService:CompaniesService, notificationService:NotificationService) {
        this._router = router;
        this._companiesService = companiesService;
        this._notificationService = notificationService;
        this._location = location;
    }

    referenceComponent(companieEditComponent:CompaniesEditComponent){
        this._companieEditComponent = companieEditComponent;
    }

    saveCompanie(companieDto:NewCompanyRequest){
        let me=this;

        this._companiesService.editCompany(companieDto)
            .map(response=>{
                if(response.text().length>0){
                    return response.json();
                }
            })
            .subscribe(
                success =>{
                    me._location.back();
                },
                error =>{

                }
            )
    }

    goToPreviousLocation(){
        this._location.back();
    }

    createCompanie($event:NewCompanyRequest){

    }

}