/**
 * Created by nick_ on 5/6/2016.
 */

import {Component, Input, Output, EventEmitter, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {CompanieDto} from "../../../models/companieDto";
import {FormBuilder, Control} from "angular2/common";
@Component({
    selector:'companies-edit-componet',
    templateUrl:'/app/components/companieComponent/companieEditComponent/companieEditComponent.html',
    directives:[ROUTER_DIRECTIVES]
})
export class CompaniesEditComponent implements OnInit{
    @Input('companie') _companie:CompanieDto;

    @Output('save-edited-companie') saveCompanieEmitter:EventEmitter<CompanieDto>=new EventEmitter<CompanieDto>();
    @Output('reference-companie-edit-component') loaded:EventEmitter<CompaniesEditComponent>=new EventEmitter<CompaniesEditComponent>();
    private _formBuilder:FormBuilder;
    private _companieEditForm;

    constructor(formBuilder:FormBuilder){
        this._formBuilder = formBuilder;
    }

    ngOnInit():any {
        this._companieEditForm = this._formBuilder.group([]);
        this.buildCompanieEditForm();
    }

    private destroyCompanieEditForm(){
        let me=this;

        _.each(this.getCompanieFormControls(),(value)=>{
            me._companieEditForm.removeControl(value);
        })
    }

    private buildCompanieEditForm() {

    }

    private getCompanieFormControls() {
        let colector = [];

        _.each(this._companieEditForm.controls, (control:Control,name)=>{
            colector[name]=name;
        });

        return colector;
    }

    saveEditedCompanie(){
        if(!this._companieEditForm.valid){
            return;
        }

        this.saveCompanieEmitter.emit(this._companieEditForm.value);
    }
}