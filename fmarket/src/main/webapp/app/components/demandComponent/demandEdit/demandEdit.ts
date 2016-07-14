/**
 * Created by nick_ on 4/20/2016.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {DemandDetailsDTO} from "../../../models/demandDetailsDTO";
import {SelectComponent, Select2Item} from "../../selectComponent/selectComponent";

let template = require('./demandEdit.html');

@Component({
    selector: 'demand-edit-component',
    template:template,
    directives:[SelectComponent]
})
export class DemandEditComponent {
    @Input('demand') _demand:DemandDetailsDTO;
    @Input('demand-domains') _domains:Array<Select2Item>;
    @Output('reject-demand') rejectDemandEvent: EventEmitter<number> = new EventEmitter<number>();
    @Output('accept-demand') acceptDemandEvent: EventEmitter<DemandDetailsDTO> = new EventEmitter<DemandDetailsDTO>();
    @Output('save-demand') saveDemandEvent: EventEmitter<DemandDetailsDTO> = new EventEmitter<DemandDetailsDTO>();
    @Output('go-to-List') goToListEmitter: EventEmitter<any> = new EventEmitter<any>();
    selectDemandComponent:SelectComponent;

    constructor() {}

    acceptDemand(){
        this.acceptDemandEvent.emit(this._demand);
    }

    rejectDemand(){
        this.rejectDemandEvent.emit(Number(this._demand.id));
    }

    referenceDemandsComponent($event){
        this.selectDemandComponent = $event;
    }

    saveEditedDemand(){
        this._demand.isInEditMode = false;
        this.saveDemandEvent.emit(this._demand);
    }

    goBackToPreviousPage(){
        this.goToListEmitter.emit({});
    }
}