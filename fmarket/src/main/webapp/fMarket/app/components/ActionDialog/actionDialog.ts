import {Component, Injectable, View, Input, Output, EventEmitter} from 'angular2/core';
import {ModalDialog} from '../ModalDialog/modalDialog';

@Component({
  selector: 'action-dialog'
})
@View({
  templateUrl: 'app/components/ActionDialog/actionDialog.html'
})


export class ActionDialog extends ModalDialog{
  @Output('loaded') loadedEmitter: EventEmitter<ActionDialog> = new EventEmitter<ActionDialog>();

  constructor() {
  	super();
  }
}
