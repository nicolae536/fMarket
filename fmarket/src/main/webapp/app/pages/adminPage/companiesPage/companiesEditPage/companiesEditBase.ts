/**
 * Created by NicolaeB on 5/26/2016.
 */
import {Router} from "@angular/router";
import {Location} from "@angular/common"
import {CompaniesEditComponent} from "../../../../components/companieComponent/companieEditComponent/companiesEditComponent";
import {CompaniesService} from "../../../../services/companiesService";
import {NotificationService} from "../../../../services/notificationService";
import {NewCompanyRequest} from "../../../../models/newCompanyRequest";
import {Select2Item} from "../../../../components/selectComponent/selectComponent";
import {LocalizationService} from "../../../../services/localizationService";

export class CompaniesEditBase{
    public _companieEditComponent:CompaniesEditComponent;
    public _router:Router;
    public _companiesService:CompaniesService;
    public _localizationService:LocalizationService;
    public _notificationService:NotificationService;
    public _location:Location;

    public _companie:NewCompanyRequest;
    public _companyDomains:Array<Object>;
    public _cities:Array<Object>;
    public _domains:Array<Object>;

    constructor(location:Location, router:Router, companiesService:CompaniesService, notificationService:NotificationService, localizationService:LocalizationService) {
        this._router = router;
        this._companiesService = companiesService;
        this._notificationService = notificationService;
        this._location = location;
        this._localizationService=localizationService;
        this._companie =NewCompanyRequest.getEmptyCompany();
    }

    referenceComponent(companieEditComponent:CompaniesEditComponent){
        this._companieEditComponent = companieEditComponent;
    }

    goToPreviousLocation(){
        this._location.back();
    }

    getCities(){
        let me =this;
        this._localizationService.getCityList()
            .subscribe(
                success=>{
                    me._cities = me._localizationService.mapNameToSelect2Item(success);
                },
                error=>{
                    me._cities = new Array<Select2Item>();
                }
            )
    }

    getCompanieDomains(){
        let me =this;
        this._companiesService.getCompanieDomains()
            .subscribe(
                success=>{
                    me._companyDomains = me._localizationService.mapNameToSelect2Item(success);
                },
                error=>{
                    me._companyDomains = new Array<Select2Item>();
                }
            )
    }

    getDomains(){
        let me =this;
        this._companiesService.getDemandDomanins()
            .subscribe(
                success=>{
                    me._domains = me._localizationService.mapNameToSelect2Item(success);
                },
                error=>{
                    me._domains = new Array<Select2Item>();
                }
            )
    }
}