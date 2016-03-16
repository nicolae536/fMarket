import {Input, Output, EventEmitter, OnInit} from 'angular2/core';

export class ModalDialog  implements OnInit{
  showModal: boolean = false;
  resolveModal;
  @Input('title') title: string;
  @Input('cancel-label') cancelLabel: string = 'Cancel';
  @Input('positive-label') positiveLabel: string = 'OK';
  @Output('loaded') loadedEmitter: EventEmitter<ModalDialog> = new EventEmitter<ModalDialog>();

  show():Promise<DialogAction> {
    this.showModal = true;
    var me=this;
    return new Promise<DialogAction>((resolve, reject)=>{
      me.resolveModal =  resolve;
    });    
  }

  hide(){
    this.showModal = false; 
  }  

  ngOnInit() {
    this.loadedEmitter.next(this);
    console.log('modal inited');
  }
  
  positiveAction() {
    this.showModal = false;
    this.resolveModal(DialogAction.POSITIVE);
  }

  cancelAction() {
    console.log('sending close event');
    this.showModal = false;
    this.resolveModal(DialogAction.CANCEL);
  }

  stopPropagation($event){
    $event.stopPropagation();
  }
}

/**
 * The possible reasons a modal has been closed.
 */
 export enum DialogAction { POSITIVE, CANCEL }
/**
 * Models the result of closing a modal dialog.
 */
 export interface ActionDialogResult {
   action: DialogAction;
 }


 