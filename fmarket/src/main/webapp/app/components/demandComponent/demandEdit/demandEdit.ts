/**
 * Created by nick_ on 4/20/2016.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {DemandDetailsDTO} from "../../../models/demandDetailsDTO";

const APPLICATION_PATH:string = '/app/components/demandComponent/demandEdit';

@Component({
    selector: 'demand-edit-component',
    templateUrl: APPLICATION_PATH + '/demandEdit.html',
})
export class DemandEditComponent {
    @Input('demand') _demand:DemandDetailsDTO;
    @Output('reject-demand') rejectDemandEvent: EventEmitter<number> = new EventEmitter<number>();
    @Output('accept-demand') acceptDemandEvent: EventEmitter<DemandDetailsDTO> = new EventEmitter<DemandDetailsDTO>();
    @Output('save-demand') saveDemandEvent: EventEmitter<DemandDetailsDTO> = new EventEmitter<DemandDetailsDTO>();
    @Output('go-to-List') goToListEmitter: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    acceptDemand(){
        this.acceptDemandEvent.emit(this._demand);
    }

    rejectDemand(){
        this.rejectDemandEvent.emit(Number(this._demand.id));
    }

    toggleEditMode(){
        this._demand.isInEditMode = true;
    }

    saveEditedDemand(){
        this._demand.isInEditMode = false;
        this.saveDemandEvent.emit(this._demand);
    }

    goBackToPreviousPage(){
        this.goToListEmitter.emit({});
    }
}