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


    constructor(name:string, email:string, phone:string, contactPerson:string, address:string, cityId:number, companyDomainId:number, demandDomains:Array<number>) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.contactPerson = contactPerson;
        this.address = address;
        this.cityId = cityId;
        this.companyDomainId = companyDomainId;
        this.demandDomainIds = demandDomains;
    }

    public static getEmptyCompany(){
        return new NewCompanyRequest("","","","","",-1,-1,[]);
    }
}