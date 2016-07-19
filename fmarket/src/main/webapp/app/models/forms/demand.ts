/**
 * Created by NicolaeB on 4/27/2016.
 */
import {Select2Item} from "../../components/selectComponent/selectComponent";
import {Field} from "./registerAccount";
import { IDemand } from '../interfaces/iDemand';

// export class Demand implements IDemand {
//     id:string;
//     title:string='';
//     message:string='';
//     email:string='';
//     cities:Array<Select2Item>;
//     domain:Select2Item;
//     termsAgreed:boolean = false;
//     phone: string ='';
//     name:string = '';
//     agreePhoneContact:boolean = false;
//     agreeEmailContact:boolean = false;
//     allCities:boolean = false;
//     isInEditMode:boolean = false;
//     domainId:number = -1;
// }

export class DemandFields {
    id:Field;
    title:Field;
    message:Field;
    email:Field;
    cities:Field;
    domain:Field;
    termsAgreed:Field;
    phone: Field
    name: Field
    agreePhoneContact: Field;
    agreeEmailContact: Field;
    allCities: Field;
    isInEditMode: Field;
    domainId: Field;

    constructor() {
        this.id = new Field('id', true, '');
        this.title = new Field('id', true, '');
        this.message = new Field('id', true, '');
        this.email = new Field('id', true, '');
        this.cities = new Field('id', true, new Array<Select2Item>());
        this.domain = new Field('id', true, new Select2Item());
        this.termsAgreed = new Field('id', true, false);
        this.phone = new Field('id', true, '');
        this.name = new Field('id', true, '');
        this.agreePhoneContact = new Field('id', true, false);
        this.agreeEmailContact = new Field('id', true, false);
        this.allCities = new Field('id', true, false);
        this.isInEditMode = new Field('id', true, false);
        this.domainId = new Field('id', true, '');        
    }

    public getValueData(): IDemand{
        return {
            id: this.id.value.toString(),
            title: this.title.value.toString(),
            message: this.message.value.toString(),
            email: this.email.value.toString(),
            cities: this.cities.value as Array<Select2Item>,
            domain: this.domain.value as Select2Item,
            termsAgreed: !!this.termsAgreed.value,
            phone: this.phone.value.toString(),
            name: this.name.value.toString(),
            agreePhoneContact: !!this.agreePhoneContact.value,
            agreeEmailContact: !!this.agreeEmailContact.value,
            allCities: !!this.allCities.value,
            domainId: this.domainId.value.toString()
        }
    }
}