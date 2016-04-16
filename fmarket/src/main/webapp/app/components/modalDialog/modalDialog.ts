import {Input, Output, EventEmitter} from 'angular2/core';

export class ModalDialog {
    responseObject:Object;
    showModal:boolean = false;
    message:string;

    @Output('action-confirmed') confirmAction:EventEmitter<Object> = new EventEmitter<Object>();

    show(message?:string, responseObject?:Object) {
        this.showModal = true;
        this.message = message ? message : "";
        this.responseObject = responseObject;
    }

    hide() {
        this.showModal = false;
        this.message = "";
        this.responseObject = this.responseObject['getNewInstance'] && typeof this.responseObject['getNewInstance'] == "function" ? this.responseObject['getNewInstance']():null;
    }

    positiveAction() {
        this.confirmAction.emit(this.responseObject);
    }

    cancelAction() {
        this.hide();
    }

    stopPropagation($event){
        $event.stopPropagation();
    }
}

/**
 * The possible reasons a modal has been closed.
 */
export enum DialogActionResult { POSITIVE, CANCEL }
/**
 * Models the result of closing a modal dialog.
 */


 