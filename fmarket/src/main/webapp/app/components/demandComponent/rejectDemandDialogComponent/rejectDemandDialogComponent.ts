import {Component, Output, Input, EventEmitter} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from "@angular/common";
import {ModalDialog} from "../../modalDialog/modalDialog";

@Component({
    selector: 'reject-demand-dialog',
    templateUrl: 'app/components/demandComponent/rejectDemandDialogComponent/rejectDemandDialogComponent.html'
})

export class RejectDemandDialogComponent extends ModalDialog{
    @Input('title') title:string = 'Mesaj';
    @Input('positive-label') positiveLabel:string = 'Refuza';
    @Input('cancel-label') cancelLabel:string = 'Cancel';
    @Output('loaded') loadedEmitter:EventEmitter<RejectDemandDialogComponent> = new EventEmitter<RejectDemandDialogComponent>();
    @Output('request-reject') rejectAction:EventEmitter<Object> = new EventEmitter<Object>();

    private _formBuilder:FormBuilder;
    private rejectDemand:ControlGroup;

    constructor(_formBuilder:FormBuilder) {
        this._formBuilder =_formBuilder;
        this.rejectDemand = this._formBuilder.group([]);
        super();
    }

    ngOnInit() {
        this.rejectDemand.addControl('message',this._formBuilder.control('',Validators.compose([Validators.minLength(5), Validators.required])));
        this.loadedEmitter.emit(this);
    }

    rejectDemandSubmit(){
        if(this.rejectDemand.valid) {
            this.rejectAction.emit(this.rejectDemand.value);
        }
    }
}
