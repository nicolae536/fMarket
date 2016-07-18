/**
 * Created by nick_ on 5/6/2016.
 */
import * as _ from "underscore";
import {Component, Input, Output, EventEmitter, OnInit, ViewChild} from "@angular/core";
import {CompanyFormModel} from "../../../models/forms/company";
import {NewCompanyRequest} from "../../../models/newCompanyRequest";
import {SelectComponent, Select2Item} from "../../selectComponent/selectComponent";
import * as template from './companieEditComponent.html';

@Component({
    selector: 'companies-edit-componet',
    template:template,
    directives: [SelectComponent],
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
    @Input('companie-model') companieEditFormModel: CompanyFormModel;

    @Input('company-domains') _companyDomains:Array<Select2Item>;
    @Input('cities') _cities:Array<Select2Item>;
    @Input('domains') _domains:Array<Select2Item>;
    
    @Input('edit-mode') isInEditMode:boolean;

    @ViewChild('companieEditForm') companieEditForm;

    @Output('save-edited-companie') saveCompanieEmitter:EventEmitter<NewCompanyRequest> = new EventEmitter<NewCompanyRequest>();
    @Output('reference-companie-edit-component') loaded:EventEmitter<CompaniesEditComponent> = new EventEmitter<CompaniesEditComponent>();
    @Output('discard-changes-companie') discardChangesEmitter:EventEmitter<any> = new EventEmitter<any>();

    private selectCity:SelectComponent;
    private selectCompanyDomain:SelectComponent;
    private selectDemandDomain:SelectComponent;
    private _companieEditForm;
    private fileUpload;

    constructor() {}

    ngOnInit():any {
        this.loaded.emit(this);
    }

    saveFile($event) {
        this.fileUpload = $event.srcElement.files;
    }

    saveEditedCompanie() {
        if (!this.companieEditForm.valid) {
            this.fatchViewErrors();
            return;
        }

        var requestObject = this.companieEditFormModel.getValues();
        requestObject['logoFile'] = this.fileUpload;

        this.saveCompanieEmitter.emit(requestObject);
    }

    fatchViewErrors(){
        
    }

    syncViewWithModel(newValue, key, valid){
        this.companieEditFormModel[key].value = newValue;

        //todo check this
        this.companieEditFormModel[key].valid = true;                
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