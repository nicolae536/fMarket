import {Field} from './registerAccount';
import { NewCompanyRequest } from '../newCompanyRequest';
import {Select2Item} from '../../components/selectComponent/selectComponent';
import * as _ from 'underscore'; 

export class CompanyFormModel {
    name:Field;
    email:Field;
    phone:Field;
    contactPerson:Field;
    address:Field;
    city:Field;
    companyDomain:Field;
    demandDomains:Field;
    password:Field;
    id:Field


    constructor(name?, email?, phone?, contactPerson?, address?, cityId?, companyDomainId?, demandDomains?, id?) {
        this.name = new Field('name', true, name);
        this.email = new Field('email', true, email);
        this.phone = new Field('phone', true, phone);
        this.contactPerson = new Field('contactPerson', true, contactPerson);
        this.address = new Field('address', true, address);
        this.city = new Field('city', true, cityId);

        this.companyDomain = new Field('companyDomain', true, companyDomainId);
        this.demandDomains = new Field('demandDomains', true, demandDomains);
        this.password = new Field('password', true, '');
        this.id = new Field('id', true, id);
    }

    public getValues():NewCompanyRequest{
        let companySubmitDomain = this.companyDomain.value as Select2Item;
        let citySubmit = this.city.value as Select2Item;

        let companyRequest = new NewCompanyRequest(
            this.name.value.toString(),
            this.email.value.toString(),
            this.phone.value.toString(),
            this.contactPerson.value.toString(),
            this.address.value.toString(),
            citySubmit && citySubmit.boundItem ? +citySubmit.boundItem['id'] : null,
            companySubmitDomain && companySubmitDomain.boundItem ? +companySubmitDomain.boundItem['id'] : null,
            this.getDemandDomains()            
        )
        companyRequest.password = this.password.value.toString();
        if(this.id.value){
            companyRequest['id'] = this.id.value;             
        }

        return companyRequest;
    }

    public getDemandDomains():Array<number>{
        let mirrorObject = this.demandDomains.value as Array<Select2Item>; 
        return _.map(mirrorObject, (value)=>{
            if(value && value.boundItem){
                return value.boundItem['id'];
            }
        })
    }
}