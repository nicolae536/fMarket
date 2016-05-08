import {Component, Injectable, Input, Output, EventEmitter} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, Validators} from "@angular/common";

import {ModalDialog} from '../modalDialog/modalDialog';
import {Subscriber} from '../../models/subscriber';
import {CustomValidators} from "../../models/Angular2ExtensionValidators";

@Component({
    selector: 'create-subscriber-dialog',
    templateUrl: 'app/components/createSubscriberDialog/createSubscriberDialog.html',
    directives:[FORM_DIRECTIVES]
})

export class CreateSubscriberDialog extends ModalDialog {
    modaleMode:string = "newSubscriber";
    @Input('title') title:string = "Add new user";
    @Input('cancel-label') cancelLabel:string = 'Cancel';
    @Input('positive-label') positiveLabel:string = 'Create User';
    @Output('loaded') loadedEmitter:EventEmitter<CreateSubscriberDialog> = new EventEmitter<CreateSubscriberDialog>();
    @Output('create-subscriber') createEmitter:EventEmitter<Object> = new EventEmitter<Object>();

    cityList:Array<Object>;
    statusList:Array<Object>;

    _subscriberForm
    private _formBuilder:FormBuilder;

    constructor(formBuilder:FormBuilder) {
        super();
        this._formBuilder = formBuilder;
    }

    ngOnInit() {
        this.loadedEmitter.emit(this);
        this.responseObject = new Subscriber();

        this._subscriberForm = this._formBuilder.group([]);
        this.buildForm();
    }

    clearData() {
        this.responseObject = new Subscriber();
    }

    setValue(subscriber:Subscriber) {
        this.responseObject = subscriber;
    }

    getValue():Subscriber {
        return this.responseObject as Subscriber;
    }

    cancelCreateSubscriber(){
        this._subscriberForm.removeControl('email');
        this.buildForm();
        this.cancelAction();
    }

    public buildForm() {
        this._subscriberForm.addControl('email', this._formBuilder.control(this.responseObject['email'], Validators.compose([Validators.required, CustomValidators.validateEmail])));
    }

    submitSubscriber(){
        if(!this._subscriberForm.valid){
            return;
        }

        this.createEmitter.emit(this.responseObject);
    }
}
