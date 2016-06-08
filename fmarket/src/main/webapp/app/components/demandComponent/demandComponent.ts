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
import {MenuTreeDialog} from "../menuComponent/menuTreeDialog/menuTreeDialog";
import {IMenuItem} from "../../models/interfaces/iMenuItem";

let template = require('./demandComponent.html');

@Component({
    selector: 'demand-component',
    template:template,
    directives: [FORM_DIRECTIVES, SelectComponent, MenuTreeDialog]
})
export class DemandComponent implements OnInit, OnChanges {

    @Input('city-list') _cityList:Array<Select2Item>;
    @Input('demand-data') _demandData:Demand = new Demand();

    @Input('positive-label') positiveLabel:string = 'Creaza cerere';
    @Input('menu-tree-data') menuDictionary;

    @Output('demand-component-loaded') _componentLoaded:EventEmitter<DemandComponent> = new EventEmitter<DemandComponent>();

    @Output('submit-new-demand') _demandFormSubmit:EventEmitter<DemandComponent> = new EventEmitter<DemandComponent>();
    private _formBuilder:FormBuilder;

    private _demandForm:ControlGroup;
    private _treeDictionary;
    private _selectCityCompnent:SelectComponent;
    private _selectedDomain:IMenuItem = {
        id: -1,
        name: 'Alege domeniu...',
        level: -1,
        parentId: -1,
        orderNr: -1,
        domainId: -1,
        hasChildrens: false
    };

    foobarItems;
    private isUserLoggedIn;
    private _menuTreeDialog:MenuTreeDialog;
    private title:string;

    constructor(_formBuilder:FormBuilder) {
        this._formBuilder = _formBuilder;
        this._demandForm = this._formBuilder.group([]);
        this.title = 'Adauga cerere';
    }

    ngOnInit():any {
        this.fetchUserEmail();
        this.buildDemandForm();
        this._componentLoaded.emit(this);
    }

    ngOnChanges(changes:{}):any {
        if (AuthorizationService.isLoggedIn() && changes['_demandData']) {
            this.fetchUserEmail();
        }

        if (changes.hasOwnProperty('menuDictionary')) {
            this._treeDictionary = this.menuDictionary;
        }
    }

    removeSelectedDomain(){
        this._selectedDomain = {
            id: -1,
            name: 'Alege domeniu...',
            level: -1,
            parentId: -1,
            orderNr: -1,
            domainId: -1,
            hasChildrens: false
        };
    }

    public showDomainsDialog() {
        this._menuTreeDialog.showMenuTreeDialog();
    }

    private getFormControllClass(property) {
        let condition = String(this._demandData[property]).length > 0;
        if(this._demandForm.controls[property]){
            condition = condition && this._demandForm.controls[property].dirty && this._demandForm.controls[property].valid;
        }

        if(!condition && this._demandForm.controls[property].pristine){
            return '';
        }

        return condition ? 'glyphicon glyphicon-ok pointer-cursor checking-item': 'glyphicon glyphicon-remove pointer-cursor checking-item';
    }

    private fetchUserEmail() {
        let user = AuthorizationService.getActiveUserState();
        this.isUserLoggedIn = false;

        if (user) {
            this.isUserLoggedIn = user.loggedIn;
            this._demandData.email = user.email;
        }
    }

    private buildDemandForm() {
        this._demandForm.addControl('title', this._formBuilder.control(this._demandData.title, Validators.required));
        this._demandForm.addControl('message', this._formBuilder.control(this._demandData.message, Validators.required));
        this._demandForm.addControl('email', this._formBuilder.control(this._demandData.email, Validators.compose([Validators.required, CustomValidators.validateEmail])));
        this._demandForm.addControl('cities', this._formBuilder.control(this._demandData.cities));
        this._demandForm.addControl('domain', this._formBuilder.control(this._demandData.domain));
        this._demandForm.addControl('termsAgreed', this._formBuilder.control(this._demandData.termsAgreed, Validators.required));
        this._demandForm.addControl('phone', this._formBuilder.control(this._demandData.phone, Validators.compose([Validators.required, Validators.minLength(10), CustomValidators.validatePhoneNumber])));
        this._demandForm.addControl('name', this._formBuilder.control(this._demandData.name, Validators.required));
        // this._demandForm.addControl('agreePhoneContact', this._formBuilder.control(this._demandData.agreePhoneContact));
        // this._demandForm.addControl('agreeEmailContact', this._formBuilder.control(this._demandData.agreeEmailContact));
        this._demandForm.addControl('allCities', this._formBuilder.control(this._demandData.allCities));
    }

    private removeDemandControls() {
        this._demandForm.removeControl('title');
        this._demandForm.removeControl('message');
        this._demandForm.removeControl('email');
        this._demandForm.removeControl('cities');
        this._demandForm.removeControl('domain');
        this._demandForm.removeControl('termsAgreed');
        this._demandForm.removeControl('phone');
        // this._demandForm.removeControl('agreePhoneContact');
        // this._demandForm.removeControl('agreeEmailContact');
        this._demandForm.removeControl('name');
        this._demandForm.removeControl('allCities');
    }

    public restData() {
        this.removeDemandControls();
        this.buildDemandForm();
    }

    private demandFormSubmit() {
        //toDo take domain from select the two way binding does not work properly
        if (this._demandForm.valid && this._selectedDomain.id !== -1) {
            let formValue = this._demandForm.value;
            formValue.domain = this._selectedDomain;
            formValue.cities = this._selectCityCompnent._selectedItems;
            this._demandFormSubmit.emit(formValue);
        }
    }

    private referenceCitiesComponent(_selectCityCompnent) {
        this._selectCityCompnent = _selectCityCompnent;
    }

    public IsValid():boolean {
        return this._demandForm.valid
            || this._selectedDomain.id !== -1
            || (this._selectCityCompnent._selectedItems.length > 0 || this._demandForm.value['allCities'])
    }

    public get getDemandFormData():IDemand {
        if (this.IsValid()) {
            let formValue = this._demandForm.value;
            formValue.domain = this._selectedDomain;
            formValue.cities = this._selectCityCompnent._selectedItems;
            return formValue;
        }
        return null;
    }

    checkIfUserIsLoggedId() {

    }

    referenceDialogInDemandComponent(menuItemsModal) {
        this._menuTreeDialog = menuItemsModal;
    }

    selectItemUsingMenu(item:IMenuItem) {
        this._selectedDomain = item;
    }
}

