import {Component, Output, Input, EventEmitter} from '@angular/core';
import {ModalDialog} from "../../modalDialog/modalDialog";
import {Field} from "../../../models/forms/registerAccount";
import * as template from './rejectDemandDialogComponent.html';

@Component({
    selector: 'reject-demand-dialog',
    template: template,
})

export class RejectDemandDialogComponent extends ModalDialog {
    @Input('title') title: string = 'Mesaj';
    @Input('positive-label') positiveLabel: string = 'Refuza';
    @Input('cancel-label') cancelLabel: string = 'Cancel';
    @Output('loaded') loadedEmitter: EventEmitter<RejectDemandDialogComponent> = new EventEmitter<RejectDemandDialogComponent>();
    @Output('request-reject') rejectAction: EventEmitter<Object> = new EventEmitter<Object>();

    private rejectDemandMessage: Field = new Field('message', true, '');

    constructor() {
        super();
    }

    ngOnInit() {
        this.loadedEmitter.emit(this);
    }

    rejectDemandSubmit() {
        this.rejectAction.emit({message:this.rejectDemandMessage.value});
    }

    reinitModel(){
        this.rejectDemandMessage = new Field('message', true, '');
    }
}
