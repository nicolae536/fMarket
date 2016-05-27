/**
 * Created by nick_ on 4/16/2016.
 */
import {Injectable} from "@angular/core";
import {FMarketApi} from "./fMarketApi";
import {Select2Item} from "../components/selectComponent/selectComponent";
import {Demand} from "../models/demand";
import * as _ from "underscore";
import {DemandSearchObject} from "../models/DemandSearchObject";

@Injectable()
export class DemandService {
    private _DemandController:string = '/admin/demands';
    private api:FMarketApi;

    constructor(api:FMarketApi) {
        this.api = api;
    }

    createDemand(demand:Demand) {
        var beckedDemand = this.convertDemand(demand);
        return this.api.post(this._DemandController, JSON.stringify(beckedDemand));
    }

    createUserDemand(demand:Demand) {
        var beckedDemand = this.convertToUserDemand(demand);
        return this.api.post('/demands', JSON.stringify(beckedDemand));
    }

    getDemandsWithFilters(search:DemandSearchObject) {
        let searchObj = this.getSearchObj(search);
        return this.api.post(this._DemandController + '/search', JSON.stringify(searchObj));
    }

    getUserDemandsWithFilter(search:Object) {
        return this.api.get('/demands');
    }

    getNewDemands() {
        return this.api.get(this._DemandController + '/new');
    }

    getDemandStatuses() {
        return this.api.get(this._DemandController + '/statuses');
    }

    getDemand(_demandId:number) {
        return this.api.get(this._DemandController + `/${_demandId}`);
    }

    acceptDemand(demand:Demand) {
        return this.api.post(this._DemandController + `/accept/${demand.id}`, JSON.stringify(''));
    }

    declineDemand(id:number) {
        return this.api.post(this._DemandController + `/decline/${id}`, JSON.stringify(''));
    }

    saveDemand(demand:Demand) {
        return this.api.put(this._DemandController, JSON.stringify(demand))
    }

    private convertDemand(demand:Demand) {
        let newDemand = demand;
        if (!demand) {
            return null;
        }

        newDemand.cities = _.map(demand.cities, (city:Select2Item)=> {
            return city.boundItem['id'];
        })
        newDemand.domain = demand.domain && demand.domain.boundItem ? demand.domain.boundItem['id'] : null;

        return newDemand;
    }

    private convertToUserDemand(demand:Demand) {
        let newDemand = demand;
        if (!demand) {
            return null;
        }

        newDemand.cities = _.map(demand.cities, (city:Select2Item)=> {
            return city.boundItem['id'];
        });
        newDemand.domainId = demand.domain && demand['domain']['domainId'] ? demand['domain']['domainId'] : null;

        return newDemand;
    }

    private getSearchObj(search:DemandSearchObject) {
        let response = {}
        if(search.accountId && !isNaN(parseInt(Number(search.accountId)))){
            response['accountId'] = search.accountId;
        }
        if(search.page && search.page > 0){
            response['page'] = search.page;
        }
        if(search.status && search.status.length > 0){
            response['status'] = search.status;
        }
        if(search.domainId > 0){
            response['domainId'] = search.domainId;
        }
        return response;
    }
}
