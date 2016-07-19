import {Component, Injectable, Input, Output, EventEmitter} from '@angular/core';
import {FORM_DIRECTIVES} from "@angular/forms";

import {ModalDialog} from '../modalDialog/modalDialog';
import {Subscriber} from '../../models/subscriber';
import {CustomValidators} from "../../models/Angular2ExtensionValidators";
import {Field} from "../../models/forms/registerAccount";
import * as template from './createSubscriberDialog.html';

@Component({
    selector: 'create-subscriber-dialog',
    template: template,
    directives: [FORM_DIRECTIVES]
})

export class CreateSubscriberDialog extends ModalDialog {
    @Input('title') title:string = "Adauga abonat nou";
    @Input('cancel-label') cancelLabel:string = 'Cancel';
    @Input('positive-label') positiveLabel:string = 'Creeaza abonat';
    @Output('loaded') loadedEmitter:EventEmitter<CreateSubscriberDialog> = new EventEmitter<CreateSubscriberDialog>();
    @Output('create-subscriber') createEmitter:EventEmitter<Object> = new EventEmitter<Object>();

    cityList:Array<Object>;
    statusList:Array<Object>;

    constructor() {
        super();
    }

    ngOnInit() {
        this.loadedEmitter.emit(this);
    }

    submitSubscriber(){        
        this.createEmitter.emit(this.responseObject ? this.responseObject['value'] : null);
    }

    reinitModel(){
        this.responseObject = new Field('email', true, '');
    }
}
