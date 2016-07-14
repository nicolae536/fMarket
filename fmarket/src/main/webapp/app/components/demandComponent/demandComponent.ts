/**
 * Created by nick_ on 4/16/2016.
 */
import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/forms";

import { LocalStorageService } from '../../services/localStorageService';
import { ApplicationConstants } from "../../models/applicationConstansts";

import {SelectComponent, Select2Item} from "../selectComponent/selectComponent";
import {DemandFields} from "../../models/forms/demand";
import {CustomValidators} from "../../models/Angular2ExtensionValidators";
import {AuthorizationService} from "../../services/authorizationService";
import {MenuTreeDialog} from "../menuComponent/menuTreeDialog/menuTreeDialog";
import {IMenuItem} from "../../models/interfaces/iMenuItem";
import * as template from './demandComponent.html';

@Component({
    selector: 'demand-component',
    template: template,
    directives: [FORM_DIRECTIVES, SelectComponent, MenuTreeDialog]
})
export class DemandComponent implements OnInit, OnChanges {

    @Input('city-list') _cityList:Array<Select2Item>;
    @Input('demand-data') demandFields:DemandFields = new DemandFields();

    @Input('positive-label') positiveLabel:string = 'Creaza cerere';
    @Input('menu-tree-data') menuDictionary;
    @Input('activate-validation') activateValidation:boolean;

    @Output('demand-component-loaded') _componentLoaded:EventEmitter<DemandComponent> = new EventEmitter<DemandComponent>();
    @Output('submit-new-demand') _demandFormSubmit:EventEmitter<DemandComponent> = new EventEmitter<DemandComponent>();

    private _localStorageService:LocalStorageService;

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

    private isUserLoggedIn;
    private _menuTreeDialog:MenuTreeDialog;
    private title:string;

    constructor(localStorageService:LocalStorageService) {
        this._localStorageService = localStorageService;
        this.title = 'Adauga cerere';
    }

    ngOnInit():any {
        this.fetchUserEmail();
        
        this._localStorageService.storageStateChange.subscribe(newState=>{
            if(newState.keyChanged !== ApplicationConstants.ACTIVE_USER_STATE){
                return;
            }
            this.fetchUserEmail();
        })
        
        this._componentLoaded.emit(this);
    }

    

    ngOnChanges(changes:{}):any {
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

    public removeEmail(){
        this.demandFields.email.value = '';
        this.fetchUserEmail();
    }

    private getFormControllClass(property) {
        let condition = false;
        return condition ? 'glyphicon glyphicon-ok pointer-cursor checking-item': 'glyphicon glyphicon-remove pointer-cursor checking-item';
    }

    private fetchUserEmail() {
        let user = AuthorizationService.getActiveUserState();
        this.isUserLoggedIn = false;

        if (user) {
            this.isUserLoggedIn = user.loggedIn;
            this.demandFields.email.value = user.email;
        }
    }

    private onSubmit() {
        //toDo take domain from select the two way binding does not work properly
        // if (this._demandForm.valid && this._selectedDomain.id !== -1) {
            // let formValue = this._demandForm.value;
            // formValue.domain = this._selectedDomain;
            // formValue.cities = this._selectCityCompnent._selectedItems;
            // this._demandFormSubmit.emit(formValue);
        // }
        
    }

    private referenceCitiesComponent(_selectCityCompnent) {
        this._selectCityCompnent = _selectCityCompnent;
    }

    referenceDialogInDemandComponent(menuItemsModal) {
        this._menuTreeDialog = menuItemsModal;
    }

    onSelectMenuItem(item:IMenuItem) {
        this._selectedDomain = item;
    }
}

