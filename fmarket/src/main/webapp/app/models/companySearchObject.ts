import { Select2Item } from './../components/selectComponent/selectComponent';
/**
 * Created by NicolaeB on 5/26/2016.
 */
export class CompanySearchObject{
    name:string = "";
    companyDomain:Select2Item;
    demandDomains:Array<Select2Item> = [];
    page:number =1;
}