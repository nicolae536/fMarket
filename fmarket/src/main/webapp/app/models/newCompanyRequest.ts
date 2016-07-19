/**
 * Created by NicolaeB on 5/26/2016.
 */
export class NewCompanyRequest{
    name:string;
    email:string;
    phone:string;
    contactPerson:string;
    address:string;
    cityId:number;
    companyDomainId:number;
    demandDomainIds:Array<number>;    
    companyDomain:number;
    password:string;
    website:string;
    latitude:number;
    longitude:number;


    constructor(name:string, email:string, phone:string, contactPerson:string, address:string, cityId:number, companyDomainId:number, demandDomains:Array<number>, website?, latitude?, longitude?) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.contactPerson = contactPerson;
        this.address = address;
        this.cityId = cityId;
        this.companyDomainId = companyDomainId;
        this.demandDomainIds = demandDomains;
        this.website = website;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}