/**
 * Created by NicolaeB on 5/27/2016.
 */
import {Injectable} from '@angular/core';
import {FMarketApi} from "./fMarketApi";
import {Select2Item} from "../components/selectComponent/selectComponent";


@Injectable()
export class LocalizationService {
    private api:FMarketApi;

    constructor(api:FMarketApi) {
        this.api = api;
    }

    getCityList() {
        return this.api.get('/cities')
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