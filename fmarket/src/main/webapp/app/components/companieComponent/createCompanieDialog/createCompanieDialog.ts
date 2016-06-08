/**
 * Created by nick_ on 5/6/2016.
 */
import * as _ from 'underscore';
import {FORM_DIRECTIVES, FormBuilder, Control} from "@angular/common";
import {Component, OnInit, EventEmitter, Output, Input} from "@angular/core";
import {ModalDialog} from "../../modalDialog/modalDialog";
import {CompanieDto} from "../../../models/companieDto";

let template = require('./createCompanieDialog.html');

@Component({
    selector:'create-companie-dialog',
    template:template,
    directives:[FORM_DIRECTIVES]
})
export class CreateCompanieDialog extends ModalDialog implements OnInit{
    _createCompanieForm;
    private _formBuilder:FormBuilder;
    @Input('title') title:string;

    @Output('reference-component') loaded:EventEmitter<CreateCompanieDialog>=new EventEmitter<CreateCompanieDialog>();

    constructor(formBuilder:FormBuilder){
        super();
        this._formBuilder = formBuilder;
        this.responseObject = new CompanieDto();
    }

    ngOnInit():any {
        this._createCompanieForm = this._formBuilder.group([]);
        this.buildCompanieForm();
        this.loaded.emit(this);
    }

    cancelCreateCompanie(){
        this.destroyCompanieForm();
        this.cancelAction();
        this.responseObject = new CompanieDto();
    }

    submitNewCompanie(){
        if(!this._createCompanieForm.valid){
            return;
        }

        this.positiveAction();
    }

    private destroyCompanieForm() {
        let me=this;

        _.each(this.getCompanieFormControls(),(value)=>{
            me._createCompanieForm.removeControl(value);
        })
    }

    private getCompanieFormControls() {
        let colector = [];

        _.each(this._createCompanieForm.controls, (control:Control,name)=>{
            colector[name]=name;
        });

        return colector;
    }

    private buildCompanieForm() {

    }
}