/**
 * Created by NicolaeB on 5/26/2016.
 */
export class DemandSearchObject {
    accountId: string;
    page: number;
    status: string;
    domainId: number;
    domainName: string;

    constructor(accountId:string, page:number, status:string, domainId:number) {
        this.accountId = accountId;
        this.page = page;
        this.status = status;
        this.domainId = domainId;
    }
}