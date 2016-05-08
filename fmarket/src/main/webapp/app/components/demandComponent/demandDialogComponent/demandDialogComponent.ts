/**
 * Created by nick_ on 4/16/2016.
 */
import {Component, Output, Input, EventEmitter} from '@angular/core';
import {ModalDialog} from '../../modalDialog/modalDialog';
import {DemandComponent} from "../demandComponent";
import {Select2Item} from "../../selectComponent/selectComponent";
import {Demand} from "../../../models/demand";
const APPLICATION_PATH:string = '/app/components/demandComponent/demandDialogComponent';

@Component({
    selector: 'demand-dialog',
    templateUrl: APPLICATION_PATH + '/demandDialogComponent.html',
    directives:[DemandComponent]
})

export class DemandDialogComponent extends ModalDialog{
    @Input('city-list')_cityList:Array<Select2Item>;
    @Input('domain-List')_domainList:Array<Select2Item>;
    @Input('title') title:string;
    @Input('positive-label') positiveLabel:string = 'Creaza cerere';
    @Input('cancel-label') cancelLabel:string = 'Cancel';


    @Output('loaded') loadedEmitter:EventEmitter<DemandDialogComponent> = new EventEmitter<DemandDialogComponent>();
    @Output('action-confirmed') confirmAction:EventEmitter<Object> = new EventEmitter<Object>();

    private _demandComponent:DemandComponent;

    constructor() {
        super();
    }

    ngOnInit() {
        this.responseObject = new Demand();
        this.loadedEmitter.emit(this);
    }

    referenceDemandComponent(_demandComponent:DemandComponent){
        this._demandComponent = _demandComponent;
    }

    closeDemandDialog(){
        this.responseObject = new Demand();
        this.cancelAction();
    }

    isValidResponse():boolean{
        return this._demandComponent.IsValid();
    }

    createDemand(){
        if(this._demandComponent.IsValid()){
            this.responseObject = this._demandComponent.getFormData;
        }
        this.positiveAction();
    }
}
