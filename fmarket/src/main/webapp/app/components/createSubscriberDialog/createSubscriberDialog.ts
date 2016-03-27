import {Component, Injectable, Input, Output, EventEmitter} from 'angular2/core';
import {ModalDialog, DialogActionResult} from '../modalDialog/modalDialog';
import {Subscriber} from '../../models/subscriber';

@Component({
  selector: 'create-subscriber-dialog',
  templateUrl: 'app/components/createSubscriberDialog/createSubscriberDialog.html'
})

export class CreateSubscriberDialog extends ModalDialog{
  modaleMode: string = "newSubscriber";
  @Input('title') title: string = "Add new user";
  @Input('cancel-label') cancelLabel: string = 'Cancel';
  @Input('positive-label') positiveLabel: string = 'Create User';
  @Output('loaded') loadedEmitter: EventEmitter<CreateSubscriberDialog> = new EventEmitter<CreateSubscriberDialog>();
  
  cityList:  Array<Object>;         
  statusList: Array<Object>;
  newSubscriber: Subscriber = new Subscriber();

  constructor() {
  	super();
  }
  
  ngOnInit() {
    this.loadedEmitter.next(this);
    console.log('modal inited');
  }
  
  clearData(){
    this.newSubscriber = new Subscriber();
  }

  setValue(subscriber: Subscriber){
    this.newSubscriber = subscriber;
  }

  getValue():Subscriber{
    return this.newSubscriber;
  }    
}
