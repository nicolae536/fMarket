/**
 * Created by nick_ on 4/16/2016.
 */
import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from "@angular/core";
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from "@angular/common";
import {SelectComponent, Select2Item} from "../selectComponent/selectComponent";
import {IDemand} from "../../models/interfaces/iDemand";
import {Demand} from "../../models/demand";
import {CustomValidators} from "../../models/Angular2ExtensionValidators";
import {AuthorizationService} from "../../services/authorizationService";
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PHONE_REGEX = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;

const APPLICATION_PATH:string = '/app/components/demandComponent';

@Component({
    selector: 'demand-component',
    templateUrl: APPLICATION_PATH + '/demandComponent.html',
    directives: [FORM_DIRECTIVES, SelectComponent]
})
export class DemandComponent implements OnInit, OnChanges {

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
    private isUserLoggedIn;

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
        this.fetchUserEmail();
        this._demandForm.addControl('title', this._formBuilder.control(this._demandData.title, Validators.required));
        this._demandForm.addControl('message', this._formBuilder.control(this._demandData.message, Validators.required));
        this._demandForm.addControl('email', this._formBuilder.control(this._demandData.email, Validators.compose([Validators.required, CustomValidators.validateEmail])));
        this._demandForm.addControl('cities', this._formBuilder.control(this._demandData.cities));
        this._demandForm.addControl('domain', this._formBuilder.control(this._demandData.domain));
        this._demandForm.addControl('termsAgreed', this._formBuilder.control(this._demandData.termsAgreed, Validators.required));
        this._demandForm.addControl('phone', this._formBuilder.control(this._demandData.phone, Validators.compose([Validators.required, Validators.minLength(10), CustomValidators.validatePhoneNumber])));
        this._demandForm.addControl('name', this._formBuilder.control(this._demandData.name, Validators.required));
        this._demandForm.addControl('agreePhoneContact', this._formBuilder.control(this._demandData.agreePhoneContact));
        this._demandForm.addControl('agreeEmailContact', this._formBuilder.control(this._demandData.agreeEmailContact));
        this._demandForm.addControl('allCities', this._formBuilder.control(this._demandData.allCities));

        this._componentLoaded.emit(this);
    }

    ngOnChanges(changes:{}):any {
        if (AuthorizationService.isLoggedIn() && changes['_demandData']) {
            this.fetchUserEmail();
        }
    }

    fetchUserEmail() {
        let user = AuthorizationService.getActiveUserState();
        this.isUserLoggedIn = false;

        if(user){
            this.isUserLoggedIn = user.loggedIn;
            this._demandData.email = user.email;
        }
    }

    demandFormSubmit() {
        //toDo take domain from select the two way binding does not work properly
        if (this._demandForm.valid) {
            let formValue = this._demandForm.value;
            formValue.domain = this._selectDomainCompnent._selectedItem;
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
        return this._demandForm.valid || _.isEmpty(this._selectDomainCompnent._selectedItem) || (this._selectDomainCompnent._selectedItem && this._selectDomainCompnent._selectedItem === null) || this._selectDomainCompnent._selectedItems.length > 0;
    }

    public get getFormData():IDemand {
        if (this._demandForm.valid) {
            let formValue = this._demandForm.value;
            formValue.domain = this._selectDomainCompnent._selectedItem;
            formValue.cities = this._selectCityCompnent._selectedItems;
            return formValue;
        }
        return null;
    }

    get demandForm():ControlGroup {
        return this._demandForm;
    }

    checkIfUserIsLoggedId() {

    }
}

