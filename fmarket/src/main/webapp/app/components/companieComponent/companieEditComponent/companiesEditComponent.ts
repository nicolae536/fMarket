/**
 * Created by nick_ on 5/6/2016.
 */
import * as _ from "underscore";
import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {FormBuilder, Control, Validators, NgIf} from "@angular/common";
import {NewCompanyRequest} from "../../../models/newCompanyRequest";
import {CustomValidators} from "../../../models/Angular2ExtensionValidators";
import {SelectComponent, Select2Item} from "../../selectComponent/selectComponent";
@Component({
    selector: 'companies-edit-componet',
    templateUrl: '/app/components/companieComponent/companieEditComponent/companieEditComponent.html',
    directives: [SelectComponent, NgIf],
    styles:[`
        @media (max-width: 990px) {
            .actions {
                pa
            } 
            
            .actions .btn{
                width: 100%;
            }
        }
    `]
})
export class CompaniesEditComponent implements OnInit {
    @Input('companie-model') _companieEditFormModel:NewCompanyRequest;
    @Input('company-domains') _companyDomains:Array<Select2Item>;
    @Input('cities') _cities:Array<Select2Item>;
    @Input('domains') _domains:Array<Select2Item>;
    @Input('edit-mode') editMode:boolean;

    @Output('save-edited-companie') saveCompanieEmitter:EventEmitter<NewCompanyRequest> = new EventEmitter<NewCompanyRequest>();
    @Output('reference-companie-edit-component') loaded:EventEmitter<CompaniesEditComponent> = new EventEmitter<CompaniesEditComponent>();
    @Output('discard-changes-companie') discardChangesEmitter:EventEmitter<any> = new EventEmitter<any>();

    private _formBuilder:FormBuilder;
    private selectCity:SelectComponent;
    private selectCompanyDomain:SelectComponent;
    private selectDemandDomain:SelectComponent;
    private _companieEditForm;
    private fileUpload;

    constructor(formBuilder:FormBuilder) {
        this._formBuilder = formBuilder;
    }

    ngOnInit():any {
        this._companieEditForm = this._formBuilder.group([]);
        if (!this._companieEditFormModel) {
            this._companieEditFormModel = NewCompanyRequest.getEmptyCompany();
        }
        this.buildCompanieEditForm();
        this.loaded.emit(this);
    }

    private destroyCompanieEditForm() {
        let me = this;

        _.each(this.getCompanieFormControls(), (value)=> {
            me._companieEditForm.removeControl(value);
        })
    }

    private buildCompanieEditForm() {
        this._companieEditForm.addControl('name', this._formBuilder.control(
            this._companieEditFormModel.name, Validators.compose([Validators.required, Validators.minLength(3)])));
        this._companieEditForm.addControl('email', this._formBuilder.control(
            this._companieEditFormModel.email, Validators.compose([Validators.required, CustomValidators.validateEmail])));

        let passwordValidators = this.editMode ? [CustomValidators.validatePassword] : [Validators.required, CustomValidators.validatePassword];
        this._companieEditForm.addControl('password', this._formBuilder.control(
            this._companieEditFormModel.password, Validators.compose()));
        this._companieEditForm.addControl('phone', this._formBuilder.control(
            this._companieEditFormModel.phone, Validators.compose([Validators.required, CustomValidators.validatePhoneNumber])));
        this._companieEditForm.addControl('contactPerson', this._formBuilder.control(
            this._companieEditFormModel.contactPerson, Validators.compose([Validators.required, Validators.minLength(3)])));
        this._companieEditForm.addControl('address', this._formBuilder.control(
            this._companieEditFormModel.address, Validators.required));
        this._companieEditForm.addControl('cityId', this._formBuilder.control(
            this._companieEditFormModel.cityId));
        this._companieEditForm.addControl('companyDomain', this._formBuilder.control(
            this._companieEditFormModel.companyDomain));
        this._companieEditForm.addControl('demandDomains', this._formBuilder.control(
            this._companieEditFormModel.demandDomains));
    }

    private getCompanieFormControls() {
        let colector = [];

        _.each(this._companieEditForm.controls, (control:Control, name)=> {
            colector[name] = name;
        });

        return colector;
    }

    saveFile($event) {
        this.fileUpload = $event.srcElement.files;
    }

    saveEditedCompanie() {
        if (!this._companieEditForm.valid) {
            return;
        }

        var requestObject = _.clone(this._companieEditFormModel);
        requestObject.cityId = this.selectCity && this.selectCity._selectedItem && this.selectCity._selectedItem.boundItem ? this.selectCity._selectedItem.boundItem['id'] : null;
        requestObject.companyDomainId = this.selectCompanyDomain && this.selectCompanyDomain._selectedItem && this.selectCompanyDomain._selectedItem.boundItem ? this.selectCompanyDomain._selectedItem.boundItem['id'] : null;
        requestObject.demandDomains = this.selectDemandDomain && this.selectDemandDomain._selectedItems && this.selectDemandDomain._selectedItems.length > 0 ? this.getDemandDomains(this.selectDemandDomain._selectedItems) : null;
        requestObject['demandDomainIds'] = this.selectDemandDomain && this.selectDemandDomain._selectedItems && this.selectDemandDomain._selectedItems.length > 0? this.getDemandDomains(this.selectDemandDomain._selectedItems) : null;
        requestObject['logoFile'] = this.fileUpload;

        this.saveCompanieEmitter.emit(requestObject);
    }

    referenceSelectCityComponent($event:SelectComponent) {
        this.selectCity = $event;
    }

    referenceSelectCompanyDomainComponent($event:SelectComponent) {
        this.selectCompanyDomain = $event;
    }

    referenceSelectDemandDomainComponent($event:SelectComponent) {
        this.selectDemandDomain = $event;
    }

    goToPreviousPage() {
        this.discardChangesEmitter.emit(null);
    }

    private getDemandDomains(_selectedItems:Array<Object>) {
        return _.map(_selectedItems, (item)=> {
            if (item) {
                return item['boundItem']['id'];
            }
        });
    }
}