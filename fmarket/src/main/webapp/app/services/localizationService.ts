/**
 * Created by NicolaeB on 5/27/2016.
 */
import {Injectable} from '@angular/core';
import {FMarketApi} from "./fMarketApi";
import {Select2Item} from "../components/selectComponent/selectComponent";
import * as _ from 'underscore'


@Injectable()
export class LocalizationService {
    private api:FMarketApi;

    constructor(api:FMarketApi) {
        this.api = api;
    }

    getCityList() {
        return this.api.get<Array<Object>>('/cities')
    }

    mapNameToSelect2Item(array):Array<Select2Item>{
        return _.map(array,(item)=>{
            return {
                displayName:item['name'],
                boundItem:item
            }
        })
    }

    extractNameToSelect2Item(array):Array<Select2Item>{
        return _.map(array,(item)=>{
            return {
                displayName:item['name'],
                boundItem:{
                    id:item['id'],
                    name:item['name']
                }
            }
        })
    }
}