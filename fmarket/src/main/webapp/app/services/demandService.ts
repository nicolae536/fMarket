/**
 * Created by nick_ on 4/16/2016.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {CITYES} from "./mock-providers/mock-City";
import {FMarketApi} from "./fMarketApi";
import {Observable} from "rxjs/Observable";
import {Demand} from "../components/demandComponent/demandComponent";


@Injectable()
export class DemandService {
    private _DemandController:string = '/demands';
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
        return this.api.post(this._DemandController, JSON.stringify(demand));
    }
}
