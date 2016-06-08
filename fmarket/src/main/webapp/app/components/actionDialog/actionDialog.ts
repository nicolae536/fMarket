import {Component, Output, Input, EventEmitter} from '@angular/core';
import {ModalDialog} from '../modalDialog/modalDialog';
let template = require('./actionDialog.html');
@Component({
    selector: 'action-dialog',
    template:template
})

export class ActionDialog extends ModalDialog{
    @Input('title') title:string;
    @Input('positive-label') positiveLabel:string = 'OK';
    @Input('cancel-label') cancelLabel:string = 'Cancel';
    @Output('loaded') loadedEmitter:EventEmitter<ActionDialog> = new EventEmitter<ActionDialog>();
    @Output('action-confirmed') confirmAction:EventEmitter<Object> = new EventEmitter<Object>();

    constructor() {
        super();
    }

    ngOnInit() {
        this.loadedEmitter.emit(this);
    }
}
