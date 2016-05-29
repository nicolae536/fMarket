/**
 * Created by nick_ on 5/6/2016.
 */
import {Injectable} from "@angular/core";
import {FMarketApi} from "./fMarketApi";
import {IStarReview} from "../models/interfaces/iStarReview";
import {IMessageReview} from "../models/interfaces/iMessageReview";
import {NewCompanyRequest} from "../models/newCompanyRequest";
import {CompanySearchObject} from "../models/companySearchObject";
import {Select2Item} from "../components/selectComponent/selectComponent";
import * as _ from "underscore";

@Injectable()
export class CompaniesService{
    private api:FMarketApi;
    private COMPANIE_CONTROLLER = '/companies'
    private ADMIN_COMPANIE_CONTROLLER = '/admin'+this.COMPANIE_CONTROLLER;

    constructor(api:FMarketApi){
        this.api = api;
    }

    getCompaniesForUsers(searchQuery){
        return this.api.get(this.COMPANIE_CONTROLLER + `/all?p=${searchQuery}`);
    }

    getCompanieDetailsForUsers(id:number){
        return this.api.get(this.COMPANIE_CONTROLLER +`/details/${id}`);
    }

    addStarsReviewForUsers(review:IStarReview){
        return this.api.post(this.COMPANIE_CONTROLLER +'/review/stars', JSON.stringify(review));
    }

    addMessageReviewForUsers(review:IMessageReview){
        return this.api.post(this.COMPANIE_CONTROLLER +'/review/stars', JSON.stringify(review));
    }

    createCompany(newCompanyRequest:NewCompanyRequest){
        return this.api.post(this.ADMIN_COMPANIE_CONTROLLER, JSON.stringify(newCompanyRequest));
    }

    getCompanyWithFilters(searchObject:CompanySearchObject){
        return this.api.post(this.ADMIN_COMPANIE_CONTROLLER+'/search', JSON.stringify(searchObject));
    }

    getCompanyDetails(companyId:number){
        return this.api.get(this.ADMIN_COMPANIE_CONTROLLER+`${companyId}`);
    }

    editCompany(updatedCompany:NewCompanyRequest){
        return this.api.put(this.ADMIN_COMPANIE_CONTROLLER, JSON.stringify(updatedCompany));
    }

    deleteCompany(id:number){
        return this.api.delete(this.ADMIN_COMPANIE_CONTROLLER +`${id}`);
    }

    getCompanieDomains() {
        return this.api.get('/company/domains');
    }

    getDemandDomanins(){
        return this.api.get('/demand/domains');
    }

    mapNameToSelect2Item(array):Array<Select2Item>{
        return _.map(array,(item)=>{
            return {
                displayName:item['name'],
                boundItem:item
            }
        })
    }
}