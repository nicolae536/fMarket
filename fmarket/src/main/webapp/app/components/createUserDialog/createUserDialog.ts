import {Component, Input, Output, OnInit, EventEmitter} from "@angular/core";
import {ModalDialog} from "../modalDialog/modalDialog";
import {UserForm} from "../../models/forms/user";
import {CustomValidators} from "../../models/Angular2ExtensionValidators";
import * as template from './createUserDialog.html';

@Component({
    selector: 'create-user-dialog',
    template: template
})

export class CreateUserDialog extends ModalDialog implements OnInit {
    @Input('title') title:string = "Adauga utilizator nou";
    @Input('cancel-label') cancelLabel:string = 'Cancel';
    @Input('positive-label') positiveLabel:string = 'Creeaza utilizator';
    @Input('status-list') statusList:Array<Object>;
    @Input('city-list') cityList:Array<Object>;

    @Output('loaded') loadedEmitter:EventEmitter<CreateUserDialog> = new EventEmitter<CreateUserDialog>();
    @Output('create-user') createUser:EventEmitter<Object> = new EventEmitter<Object>();

    constructor() {
        super();
    }

    ngOnInit() {
        this.loadedEmitter.emit(this);
    }

    submitNewUser() {
        let response = this.responseObject as UserForm;
        this.createUser.emit(response.getValue());
    }

    reinitModel(){
        this.responseObject = new UserForm();
    }
}
