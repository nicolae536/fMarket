/**
 * Created by NicolaeB on 4/27/2016.
 */
import {IDemand} from "./interfaces/iDemand";
import {Select2Item} from "../components/selectComponent/selectComponent";


export class Demand implements IDemand {
    id:string;
    title:string='';
    message:string='';
    email:string='';
    cities:Array<Select2Item>;
    domain:Select2Item;
    termsAgreed:boolean = false;
    phone: string ='';
    name:string = '';
    agreePhoneContact:boolean = false;
    agreeEmailContact:boolean = false;
    allCities:boolean = false;
    isInEditMode:boolean = false;
    domainId:number = -1;
}