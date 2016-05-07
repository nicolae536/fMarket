/**
 * Created by nick_ on 5/6/2016.
 */
import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
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

    getCompanies(search:ISearchCompanie){
        return this.api.post(this.COMPANIE_CONTROLLER + '/search', JSON.stringify(search));
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