/**
 * Created by nick_ on 4/16/2016.
 */
import {Component, OnInit, Output, EventEmitter, Input} from "angular2/core";
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from "angular2/common";
import {SelectComponent, Select2Item} from "../selectComponent/selectComponent";

const APPLICATION_PATH:string = '/app/components/demandComponent';

@Component({
    selector: 'demand-component',
    templateUrl: APPLICATION_PATH + '/demandComponent.html',
    directives: [FORM_DIRECTIVES, SelectComponent],
    providers: [FormBuilder]
})
export class DemandComponent implements OnInit {
    @Input('city-list') _cityList:Array<Select2Item>;
    @Input('domain-List') _domainList:Array<Select2Item>;
    @Input('demand-data') _demandData:Demand;
    @Output('loaded') _componentLoaded:EventEmitter<DemandComponent> = new EventEmitter<DemandComponent>();
    @Output('submit') _componentSubmit:EventEmitter<DemandComponent> = new EventEmitter<DemandComponent>();

    private _formBuilder:FormBuilder;
    private _demandForm:ControlGroup;
    private _selectCityCompnent:SelectComponent;
    private _selectDomainCompnent:SelectComponent;

    foobarItems;

    constructor(_formBuilder:FormBuilder) {
        this._formBuilder = _formBuilder;
        this._demandForm = this._formBuilder.group([]);

        this.foobarItems = [
            {
                displayName: 'name',
                boundItem: null
            },
            {
                displayName: 'name1',
                boundItem: null
            },
            {
                displayName: 'name2',
                boundItem: null
            }];
    }

    ngOnInit():any {
        this._demandForm.addControl('title', this._formBuilder.control(this._demandData.title, Validators.required));
        this._demandForm.addControl('message', this._formBuilder.control(this._demandData.message, Validators.required));
        this._demandForm.addControl('email', this._formBuilder.control(this._demandData.email, Validators.required));
        this._demandForm.addControl('cityes', this._formBuilder.control(this._demandData.cityes));
        this._demandForm.addControl('domain', this._formBuilder.control(this._demandData.domain));
        this._demandForm.addControl('termsAgreed', this._formBuilder.control(this._demandData.termsAgreed, Validators.required));
        this._demandForm.addControl('phone', this._formBuilder.control(this._demandData.phone, Validators.required));
        this._demandForm.addControl('name', this._formBuilder.control(this._demandData.name, Validators.required));
        this._demandForm.addControl('agreePhoneContact', this._formBuilder.control(this._demandData.agreePhoneContact));
        this._demandForm.addControl('agreeEmailContact', this._formBuilder.control(this._demandData.agreeEmailContact));
        this._demandForm.addControl('allCities', this._formBuilder.control(this._demandData.allCities));

        this._componentLoaded.emit(this);
    }

    demandFormSubmit() {
        //toDo take domain from select the two way binding does not work properly
        if (this._demandForm.valid) {
            let formValue = this._demandForm.value;
            formValue.domain = this._selectDomainCompnent.selectedItem;
            this._componentSubmit.emit(formValue);
        }
    }

    referenceCitiesComponent(_selectCityCompnent) {
        this._selectCityCompnent = _selectCityCompnent;
    }

    referenceDomainComponent(_selectDomainCompnent) {
        this._selectDomainCompnent = _selectDomainCompnent;
    }

    public IsValid():boolean {
        return this._demandForm.valid;
    }

    public get getFormData():IDemand {
        if (this._demandForm.valid) {
            let formValue = this._demandForm.value;
            formValue.domain = this._selectDomainCompnent.selectedItem;
            formValue.cityes = this._selectCityCompnent._selectedItems;
            return formValue;
        }
        return null;
    }
}

export class Demand implements IDemand {
    title;
    message;
    email;
    cityes;
    domain;
    termsAgreed;
    phone;
    name;
    agreePhoneContact;
    agreeEmailContact;
    allCities;

}

export interface IDemand {
    title;
    message;
    email;
    cityes;
    domain;
    termsAgreed;
    phone;
    name;
    agreePhoneContact;
    agreeEmailContact;
    allCities;
}