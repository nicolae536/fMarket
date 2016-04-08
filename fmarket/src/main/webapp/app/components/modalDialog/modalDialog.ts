import {Input, Output, EventEmitter, OnInit} from 'angular2/core';

export class ModalDialog implements OnInit {
    showModal:boolean = false;
    resolveModal;
    message;

    @Output('loaded') loadedEmitter:EventEmitter<ModalDialog> = new EventEmitter<ModalDialog>();

    show(message?):Promise<DialogActionResult> {
        this.showModal = true;
        this.message = message ? message : "";
        var me = this;
        return new Promise<DialogActionResult>((resolve, reject)=> {
            me.resolveModal = resolve;
        });
    }

    hide() {
        this.showModal = false;
    }

    ngOnInit() {
        this.loadedEmitter.emit(this);
        console.log('modal inited');
    }

    positiveAction() {
        this.showModal = false;
        this.resolveModal(DialogActionResult.POSITIVE);
    }

    cancelAction() {
        console.log('sending close event');
        this.showModal = false;
        this.resolveModal(DialogActionResult.CANCEL);
    }

    stopPropagation($event) {
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


 