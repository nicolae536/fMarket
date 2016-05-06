import {Component, Output, Input, EventEmitter} from 'angular2/core';
import {ModalDialog} from '../modalDialog/modalDialog';

@Component({
    selector: 'action-dialog',
    templateUrl: 'app/components/actionDialog/actionDialog.html'
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
