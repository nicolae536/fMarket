import {Component, Input, Output, OnInit, EventEmitter, ViewChild} from "@angular/core";
import {ModalDialog} from "../modalDialog/modalDialog";
import {UserForm} from "../../models/forms/user";
import {CustomValidators} from "../../models/Angular2ExtensionValidators";
import * as _ from 'underscore';

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
    
    @ViewChild('usersForm') private usersFormRef;

    @Output('loaded') loadedEmitter:EventEmitter<CreateUserDialog> = new EventEmitter<CreateUserDialog>();
    @Output('create-user') createUser:EventEmitter<Object> = new EventEmitter<Object>();

    private submittedNewUser = false;

    constructor() {
        super();
    }

    ngOnInit() {
        this.loadedEmitter.emit(this);
    }

    submitNewUser() {
        this.submittedNewUser = false;
        let response = this.responseObject as UserForm;
        
        if(!this.usersFormRef.valid){
            this.submittedNewUser = true;
            this.fatchFormErrors();
            return;
        }

        this.createUser.emit(response.getValue());
    }


    /**
     * Execute form chack after ngModelChange so the validator can recheck the new value
     */
    fatchFormErrors(newValue?, changedKey?){
        _.defer(()=>{
            for (var key in this.usersFormRef.controls) {
                this.responseObject[key].valid = this.usersFormRef.controls[key].valid;
            }
        });
        
    }

    reinitModel(){
        this.submittedNewUser = false;
        this.responseObject = new UserForm();
    }
}
