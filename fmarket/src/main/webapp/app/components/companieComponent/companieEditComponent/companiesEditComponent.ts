/**
 * Created by nick_ on 5/6/2016.
 */
import * as _ from 'underscore';
import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {FormBuilder, Control, Validators} from "@angular/common";

import {CompanieDto} from "../../../models/companieDto";
import {NewCompanyRequest} from "../../../models/newCompanyRequest";
import {CustomValidators} from "../../../models/Angular2ExtensionValidators";
import {SelectComponent} from "../../selectComponent/selectComponent";
@Component({
    selector:'companies-edit-componet',
    templateUrl:'/app/components/companieComponent/companieEditComponent/companieEditComponent.html',
    directives:[ROUTER_DIRECTIVES, SelectComponent]
})
export class CompaniesEditComponent implements OnInit{
    @Input('companie-model') _companieEditFormModel:NewCompanyRequest;

    @Output('save-edited-companie') saveCompanieEmitter:EventEmitter<CompanieDto>=new EventEmitter<CompanieDto>();
    @Output('reference-companie-edit-component') loaded:EventEmitter<CompaniesEditComponent>=new EventEmitter<CompaniesEditComponent>();
    private _formBuilder:FormBuilder;
    private selectCity:SelectComponent;
    private selectCompanyDomain:SelectComponent;
    private selectDemandDomain:SelectComponent;
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
        this._companieEditForm.addControl('name',this._formBuilder.control(
            this._companieEditFormModel.name,Validators.compose([Validators.required, Validators.minLength(3)])));
        this._companieEditForm.addControl('email',this._formBuilder.control(
            this._companieEditFormModel.email,Validators.compose([Validators.required, CustomValidators.validateEmail])));
        this._companieEditForm.addControl('phone',this._formBuilder.control(
            this._companieEditFormModel.phone,Validators.compose([Validators.required, CustomValidators.validatePhoneNumber])));
        this._companieEditForm.addControl('contactPerson',this._formBuilder.control(
            this._companieEditFormModel.contactPerson,Validators.compose([Validators.required, Validators.minLength(3)])));
        this._companieEditForm.addControl('address',this._formBuilder.control(
            this._companieEditFormModel.address, Validators.required));
        this._companieEditForm.addControl('cityId',this._formBuilder.control(
            this._companieEditFormModel.cityId, Validators.required));
        this._companieEditForm.addControl('companyDomain',this._formBuilder.control(
            this._companieEditFormModel.companyDomain, Validators.required));
        this._companieEditForm.addControl('demandDomains',this._formBuilder.control(
            this._companieEditFormModel.demandDomains, Validators.required));
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

    referenceSelectCityComponent($event:SelectComponent){
        this.selectCity = $event;
    }

    referenceSelectCompanyDomainComponent($event:SelectComponent){
        this.selectCompanyDomain = $event;
    }

    referenceSelectDemandDomainComponent($event:SelectComponent){
        this.selectDemandDomain = $event;
    }
}