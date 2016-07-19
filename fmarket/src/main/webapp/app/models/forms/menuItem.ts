/**
 * MenuItem
 */
import {Field} from './registerAccount';
import {INewDomainMenuItemRequest} from '../interfaces/iNewDomainMenuItemRequest';
import {IUpdateDomainMenuItemRequest} from '../interfaces/iUpdateDomainMenuItemRequest'; 

export class MenuItemForm {
    public id:Field;
    public parentId:Field;
    public name:Field;
    public orderNr:Field;
    public domainId:Field;


    constructor(id?:number, parentId?:number, name?:string, orderNr?:number, domainId?:number) { 
        this.id = new Field('id', true, id);
        this.parentId = new Field('parentId', true, parentId);
        this.name = new Field('name', true, name);
        this.orderNr = new Field('orderNr', true, orderNr);
        this.domainId = new Field('orderNr', true, domainId);
    }

    getNewMenuItemValues():INewDomainMenuItemRequest {
        return {
                    parentId: this.parentId.value,
                    name: this.name.value,
                    orderNr: this.orderNr.value,
                    domainId: this.domainId.value
                }
    }

    getEditMenuItemValues():IUpdateDomainMenuItemRequest{
        return {
                    id: this.id.value,
                    newName: this.name.value,
                    orderNr: this.orderNr.value,
                    domainId: this.domainId.value
                }
    }
}
