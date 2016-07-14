/**
 * Created by nick_ on 4/16/2016.
 */
import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/forms";

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
export class DemandComponent implements OnInit {

    @Input('city-list') _cityList:Array<Select2Item>;
    @Input('demand-data') demandFields:DemandFields = new DemandFields();

    @Input('positive-label') positiveLabel:string = 'Creaza cerere';
    @Input('menu-tree-data') menuDictionary;
    @Input('activate-validation') activateValidation:boolean;

    @Output('demand-component-loaded') $componentLoaded:EventEmitter<DemandComponent> = new EventEmitter<DemandComponent>();
    @Output('submit-new-demand') $demandFormSubmit:EventEmitter<DemandFields> = new EventEmitter<DemandFields>();

    private _menuTreeDialog:MenuTreeDialog;    
    private COMPONENT_TITLE:string;

    constructor() {
        this.COMPONENT_TITLE = 'Adauga cerere';
    }

    ngOnInit():any {
        this.fetchUserEmail();        
        this.$componentLoaded.emit(this);
    }  

    /**
     * Called from upper component to not inject a service here
     */
    public fetchUserEmail() {
        let user = AuthorizationService.getActiveUserState();
        this.demandFields.email.disabled = false;

        if (!user) {
            this.demandFields.email.value = '';
            return;
        }
        
        this.demandFields.email.disabled = user.loggedIn;
        this.demandFields.email.value = user.email;
    }

    //@Deprecated
    private getFormControllClass(property) {
        let condition = false;
        return condition ? 'glyphicon glyphicon-ok pointer-cursor checking-item': 'glyphicon glyphicon-remove pointer-cursor checking-item';
    }

    private onSubmit() {
        if(!this.hasNoErrors()){
            return;
        }

        this.$demandFormSubmit.emit(this.demandFields);
    }
    
    private hasNoErrors(){
        for(let key in this.demandFields){
            if(!this.demandFields[key].valid && typeof(this.demandFields[key]) !== 'function'){
                return false;
            }
        }

        return true;
    }

    private rebindCitiesToField($event){
        this.demandFields.cities.valid = $event.length > 0;
        this.demandFields.cities.value = $event; 
    }

    /**
     * Domain dialog component
     */
    private referenceDialogInDemandComponent(menuItemsModal) {
        this._menuTreeDialog = menuItemsModal;
    }

    private showDomainsDialog() {
        this._menuTreeDialog.showMenuTreeDialog();
    }

    //Set domanin using dialog selection
    private onSelectMenuItem(item:IMenuItem) {
        this.demandFields.domain.value = item;
    }
}

