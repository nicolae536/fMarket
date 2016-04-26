import {DemandStatus} from "./DemandStatus";
/**
 * Created by NicolaeB on 4/26/2016.
 */
export class DemandAdminDto{
    public id:number;

    public title:string;

    public accountId:string;

    public creationDate:Date;

    public status:DemandStatus;//to do find a way to map this to a enum string
}
