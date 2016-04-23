/**
 * Created by nick_ on 4/23/2016.
 */
/**
 * Created by nick_ on 4/22/2016.
 */
import {Component} from "angular2/core";
import {DemandListBaseComponent} from "../../../../components/demandComponent/demandListBase/demandListBase";
import {DemandService} from "../../../../services/demandService";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {DemandsListPage} from "./demandsListPage";

let applicationPath:string = '/app/pages/adminPage/demandsPage/demandsListPage';

@Component({
    selector: 'new-demands-list-page',
    templateUrl: applicationPath + '/demandsListPage.html',
    styleUrls: [applicationPath + '/demandsListPage.css'],
    directives: [DemandListBaseComponent],
    providers: [DemandService, RequestTypeService]
})
export class NewDemandsListPage extends DemandsListPage{
    constructor(_demandService:DemandService, _requestTypeService:RequestTypeService){
        super(_demandService,_requestTypeService);

        this._demandsRoute = '/new';
    }
}