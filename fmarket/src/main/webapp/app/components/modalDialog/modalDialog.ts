import {Input, Output, EventEmitter} from '@angular/core';

export class ModalDialog {
    responseObject:Object = {};
    showModal:boolean = false;
    message:string = '';

    /**
     *
     */
    constructor() {
        this.reinitModel();        
    }

    @Output('action-confirmed') confirmAction:EventEmitter<Object> = new EventEmitter<Object>();
    private remove;

    show(message?:string, responseObject?:Object) {
        this.showModal = true;
        this.message = message ? message : "";
        
        if(!responseObject){
            this.reinitModel();
        }
        else{
            this.responseObject = responseObject;
        }
    }

    hide() {
        let me=this;
        this.remove = true;
        this.message = "";
        
        setTimeout(()=>{
            this.showModal = false;
            me.remove = false;
        }, 300);

        this.reinitModel();
    }

    hideWithoutAnimation() {
        this.showModal = false;
        this.remove = false;
        this.message = "";
        this.reinitModel();
    }

    positiveAction() {
        this.confirmAction.emit(this.responseObject);
    }

    stopPropagation($event){
        $event.stopPropagation();
    }

    
    reinitModel(){
        
    }
}
