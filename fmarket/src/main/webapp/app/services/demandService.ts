/**
 * Created by nick_ on 4/16/2016.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {CITYES} from "./mock-providers/mock-City";
import {FMarketApi} from "./fMarketApi";
import {Observable} from "rxjs/Observable";
import {Demand} from "../components/demandComponent/demandComponent";
import {Select2Item} from "../components/selectComponent/selectComponent";


@Injectable()
export class DemandService {
    private _DemandController:string = '/admin/demands';
    private api:FMarketApi;

    constructor(http:Http) {
        this.api = new FMarketApi(http);
    }

    getCityList() {
        return new Observable((observer)=>{
            observer.next(CITYES);
        });
    }

    createDemand(demand:Demand) {
        var beckedDemand = this.convertDemand(demand);
        return this.api.post(this._DemandController, JSON.stringify(beckedDemand));
    }

    getDemandsWithFilters(search:Object){
        return this.api.post(this._DemandController + '/search', JSON.stringify(search));
    }

    getNewDemands(){
        return this.api.get(this._DemandController + '/new');
    }

    getDemandStatuses(){
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
        newDemand.cities = _.map(demand.cities, (city:Select2Item)=>{
            return city.boundItem['id'];
        })
        newDemand.domain = demand.domain.boundItem['id'];

        return newDemand;
    }
}
