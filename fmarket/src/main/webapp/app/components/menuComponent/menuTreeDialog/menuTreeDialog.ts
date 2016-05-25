import {Component, Output, Input, EventEmitter} from '@angular/core';
import {ModalDialog} from "../../modalDialog/modalDialog";
import {MenuTreeComponent} from "../menuTreeComponent";
import {IMenuItem} from "../../../models/interfaces/iMenuItem";


@Component({
    selector: 'menu-tree-dialog',
    templateUrl: '/app/components/menuComponent/menuTreeDialog/menuTreeDialog.html',
    directives:[MenuTreeComponent],
    styles:[`
        .modal-dialog .modal-body .menu-dialog-container{
            padding-right: 40px;
        }
    `]
})

export class MenuTreeDialog extends ModalDialog{
    @Input('title') title:string;
    @Input('positive-label') positiveLabel:string = 'OK';
    @Input('cancel-label') cancelLabel:string = 'Cancel';
    @Input('menu-tree-data') menuDictionary;
    @Input('enable-operations') enableOperations:boolean;

    @Output('loaded') loadedEmitter:EventEmitter<MenuTreeDialog> = new EventEmitter<MenuTreeDialog>();
    @Output('action-confirmed') confirmAction:EventEmitter<Object> = new EventEmitter<Object>();
    private menuTreeComponent:MenuTreeComponent;

    constructor() {
        super();
    }

    ngOnInit() {
        this.loadedEmitter.emit(this);
    }

    selectMenuItem(menuItem:IMenuItem) {
        if(!menuItem.hasChildrens){
            this.responseObject = menuItem;
            this.positiveAction();
            this.hide();
        }
    }

    referenceMenuTreeCompoent($event:MenuTreeComponent){
        this.menuTreeComponent=$event;
    }

    showMenuTreeDialog(){
        this.menuTreeComponent.reinitMenuSelection();
        this.show();
    }

}
