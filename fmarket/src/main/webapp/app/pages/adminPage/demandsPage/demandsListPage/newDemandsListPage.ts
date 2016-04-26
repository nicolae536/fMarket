/**
 * Created by nick_ on 4/23/2016.
 */
/**
 * Created by nick_ on 4/22/2016.
 */
import {Component, OnChanges, OnInit} from "angular2/core";
import {DemandListBaseComponent} from "../../../../components/demandComponent/demandListBase/demandListBase";
import {DemandService} from "../../../../services/demandService";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {DemandsListPageBase} from "./demandsListPageBase";

let applicationPath:string = '/app/pages/adminPage/demandsPage/demandsListPage';

@Component({
    selector: 'new-demands-list-page',
    templateUrl: applicationPath + '/demandsListPageBase.html',
    styleUrls: [applicationPath + '/demandsListPageBase.css'],
    directives: [DemandListBaseComponent],
    providers: [DemandService, RequestTypeService]
})
export class NewDemandsListPage extends DemandsListPageBase implements OnInit, OnChanges{

    constructor(_demandService:DemandService, _requestTypeService:RequestTypeService){
        super(_demandService,_requestTypeService);
        this._demandsRoute = '/new';
    }

    public ngOnInit():any {
        //this.getCities();
        this.getNewDemandsList();
    }

    public ngOnChanges(changes:{}):any {
        /*if(changes && changes['_demandsList']){
            this.getDomains();
        }*/
    }
}