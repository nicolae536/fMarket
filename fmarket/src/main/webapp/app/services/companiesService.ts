/**
 * Created by nick_ on 5/6/2016.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {FMarketApi} from "./fMarketApi";

import {ISearchCompanie} from "../models/interfaces/iSearchCompanie";
import {IStarReview} from "../models/interfaces/iStarReview";
import {IMessageReview} from "../models/interfaces/iMessageReview";

@Injectable()
export class CompaniesService{
    private api:FMarketApi;
    private COMPANIE_CONTROLLER = '/companies'

    constructor(http:Http){
        this.api = new FMarketApi(http);
    }

    getCompanies(searchQuery:string){
        return this.api.get(this.COMPANIE_CONTROLLER + `/all?p=${searchQuery}`);
    }

    getCompanieDetails(id:number){
        return this.api.get(this.COMPANIE_CONTROLLER +`/details/${id}`);
    }

    addStarsReview(review:IStarReview){
        return this.api.post(this.COMPANIE_CONTROLLER +'/review/stars', JSON.stringify(review));
    }

    addMessageReview(review:IMessageReview){
        return this.api.post(this.COMPANIE_CONTROLLER +'/review/stars', JSON.stringify(review));
    }
}