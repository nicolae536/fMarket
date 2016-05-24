import {Input, Output, EventEmitter} from '@angular/core';

export class ModalDialog {
    responseObject:Object;
    showModal:boolean = false;
    message:string;

    @Output('action-confirmed') confirmAction:EventEmitter<Object> = new EventEmitter<Object>();
    private remove
        ;

    show(message?:string, responseObject?:Object) {
        this.showModal = true;
        this.message = message ? message : "";
        this.responseObject = responseObject;
    }

    hide() {
        let me=this;
        this.remove = true;
        setTimeout(()=>{
            this.showModal = false;
            me.remove = false;
        }, 300);
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
