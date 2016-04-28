import {Component, Injectable, Input, Output, EventEmitter} from 'angular2/core';
import {ModalDialog} from '../modalDialog/modalDialog';
import {Subscriber} from '../../models/subscriber';

@Component({
    selector: 'create-subscriber-dialog',
    templateUrl: 'app/components/createSubscriberDialog/createSubscriberDialog.html'
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

    constructor() {
        super();
    }

    ngOnInit() {
        this.loadedEmitter.emit(this);
        this.responseObject = new Subscriber();
    }

    createSubscriber(){
        this.createEmitter.emit(this.responseObject);
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

}
