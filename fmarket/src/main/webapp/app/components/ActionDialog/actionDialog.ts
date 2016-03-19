import {Component, View, Output, Input, EventEmitter} from 'angular2/core';
import {ModalDialog} from '../ModalDialog/modalDialog';

@Component({
	selector: 'action-dialog'
})
@View({
	templateUrl: 'app/components/ActionDialog/actionDialog.html'
})


export class ActionDialog extends ModalDialog{
	@Input('title') title: string;
	@Input('positive-label') positiveLabel: string = 'OK';
	@Input('cancel-label') cancelLabel: string = 'Cancel';
	@Output('loaded') loadedEmitter: EventEmitter<ActionDialog> = new EventEmitter<ActionDialog>();
	constructor() {
		super();
	}
}
