import {Component, Output, Input, EventEmitter} from '@angular/core';
import {ModalDialog} from "../../modalDialog/modalDialog";
import {INewDomainMenuItemRequest} from "../../../models/interfaces/iNewDomainMenuItemRequest";
import {MenuTreeComponent} from "../menuTreeComponent";


@Component({
    selector: 'menu-tree-dialog',
    templateUrl: '/app/components/menuComponent/menuTreeDialog/menuTreeDialog.html',
    directives:[MenuTreeComponent]
})

export class MenuTreeDialog extends ModalDialog{
    @Input('title') title:string;
    @Input('positive-label') positiveLabel:string = 'OK';
    @Input('cancel-label') cancelLabel:string = 'Cancel';
    @Input('menu-data') menuDictionary;

    @Output('loaded') loadedEmitter:EventEmitter<MenuTreeDialog> = new EventEmitter<MenuTreeDialog>();
    @Output('action-confirmed') confirmAction:EventEmitter<Object> = new EventEmitter<Object>();

    constructor() {
        super();
    }

    ngOnInit() {
        this.loadedEmitter.emit(this);
    }

    selectMenuItem(menuItem:INewDomainMenuItemRequest) {
        //
    }
}
