/**
 * Created by nick_ on 4/9/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, DoCheck, ElementRef} from "@angular/core";
import {DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {FilterPipe} from "./filterPipe";
import * as template from './selectComponent.html'

@Component({
    selector: 'select-component',
    template: template,
    pipes: [FilterPipe],
    directives: [DROPDOWN_DIRECTIVES]
})
export class SelectComponent implements OnInit, DoCheck {
    @ViewChild('simpleSelectRef') simpleSelectRef:ElementRef;
    @ViewChild('multiSelectRef') multiSelectRef:ElementRef;

    /**
     * Input created for validation trigger
     */
    @Input('activate-validation') activateValidation:boolean;

    /**
     * Base select options
     *      @select-items - the list of items
     *      @single-item-selected - model for a single item selected when the select is used as a simple selector with autocomplete
     *      @multi-select - converts the single select in multiselect
     *      @selected-items - the list of selected items when we use the selector as a multiselect
     */
    @Input('select-items') items:Array<Select2Item>;
    @Input('single-item-selected') itemSelected:Select2Item;    
    @Input('multi-select') muliSelect:boolean;    
    @Input('selected-items') multiselectItemsSelected:Array<Select2Item>;

    /**
     * Events
     *      @loaded signals that the component was loaded
     *      @on-selection-change signals that a new item was selected
     */
    @Output('loaded') $loadedSelect:EventEmitter<SelectComponent> = new EventEmitter<SelectComponent>();
    @Output('on-selection-change') $selectionChangeEmitter:EventEmitter<any> = new EventEmitter<any>();

    /**
     * The null selection
     */
    private _chooseItemValue = {displayName: 'Alege...', boundItem: null};

    public dropdownOptions:DropdownOptions = {dropUp:false, searchQuery:'', isopen: false};

    ngOnInit():any {        
        this.itemSelected = this.itemSelected ? this.itemSelected : this._chooseItemValue;
        this.multiselectItemsSelected = this.multiselectItemsSelected ? this.multiselectItemsSelected : [];

        this.$loadedSelect.emit(this);
    }

    ngDoCheck() {
        this.computeSelectView();
        console.log(this.dropdownOptions.isopen);
    }

    private checkItemInDataSource(item:Select2Item) {
        for (var i = 0; i < this.items.length; i++) {
            var currentItem = this.items[i];

            if (currentItem.displayName === item.displayName && currentItem.boundItem === item.boundItem) {
                return true;
            }
        }

        return false;
    }

    private removeSelection($event) {
        $event.stopPropagation();

        this.itemSelected = this._chooseItemValue;
        this.multiselectItemsSelected = [];
    }

    removeItemFromSelection($event, item:Select2Item) {
        $event.stopPropagation();

        var index = this.multiselectItemsSelected.indexOf(item);
        if (index === -1) {
            return;
        }

        this.multiselectItemsSelected.splice(index, 1);
    }

    public onSelectionChenge(item) {
        this.itemSelected = item;

        if(this.multiselectItemsSelected.indexOf(item) === -1){
            this.multiselectItemsSelected.push(item);
        }

        if(this.muliSelect){
            this.$selectionChangeEmitter.emit(this.multiselectItemsSelected);
            return;
        }

        this.$selectionChangeEmitter.emit(this.itemSelected);
    }

    
    public selectItemById(domainId):void {
        if(this.muliSelect){
            return;// consider throw exception
        }

        var i=0;
        while(i<this.items.length){
            if(this.items[i].boundItem && this.items[i].boundItem['id'] === domainId ){
                this.onSelectionChenge(this.items[i]);
                return;
            }
            i++;
        }
    }

    /**
     * Component getters and setters
     */
    
    public getSelectedItem():Select2Item {
        return this.itemSelected;
    }

    public setSelectedItem(item:Select2Item) {
        this.itemSelected = item;
    }

    public getMultiselectedItems():Array<Select2Item> {
        return this.multiselectItemsSelected;
    }

    public setMultiselectedSelectedItems(items:Array<Select2Item>) {
        this.multiselectItemsSelected = items ? items : [];
    }

    /**
     * Compute the dropdown direction to drop down or to drop up
     */
    computeSelectView():any {
        let multiSelectRefPosition = null;
        let simpleSelectRefPosition = null;
        let documentHeight = Math.max(
            document.documentElement["clientHeight"],
            document.body["scrollHeight"],
            document.documentElement["scrollHeight"],
            document.body["offsetHeight"],
            document.documentElement["offsetHeight"]);

        if (this.multiSelectRef) {
            multiSelectRefPosition = this.getOffset(this.multiSelectRef.nativeElement);
        }
        if (this.simpleSelectRef) {
            simpleSelectRefPosition = this.getOffset(this.simpleSelectRef.nativeElement);
        }

        if (multiSelectRefPosition) {
            this.dropdownOptions.dropUp = multiSelectRefPosition.top + 305 > documentHeight ? true : false;
        }
        if (simpleSelectRefPosition) {
            this.dropdownOptions.dropUp = simpleSelectRefPosition.top + 305 > documentHeight ? true : false;
        }
    }

    private getOffset(el) {
        let rect = el.getClientRects();
        rect = rect.length > 0 ? rect[0] :  rect;
        let scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        let scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
    }

    /**
     * View checking functions
     */
    
    private getClassForComponent(){
        let classView = 'bs-ui-select-2 clearfix';
        
        if(this.dropdownOptions.dropUp){
            classView+= ' dropUp';
        }
        else{
            classView+= ' dropdown';
        }
        
        if(!this.activateValidation) {
            return classView;
        }        

        if(this.muliSelect){
            classView += this.multiselectItemsSelected.length > 0 ? ' ng-valid' : ' ng-invalid';
            return classView;                             
        }

        if(!this.muliSelect){
            classView += this.itemSelected.boundItem !== null ? ' ng-valid' : ' ng-invalid';                 
        }

        return classView;
    }
    
    private getCarretClass() {
        return this.dropdownOptions.isopen ? 
                "glyphicon glyphicon-chevron-up pull-right ui-select2-subscribeDatePicker-icon" 
            :   "glyphicon glyphicon-chevron-down pull-right ui-select2-subscribeDatePicker-icon";
    }

    private checkItems() {
        return !this.items || this.items.length < 1;
    }
    
}

//This definition will remain here so the component may be exported with his types
export class Select2Item {
    displayName:string;
    boundItem:Object;
    //selected:boolean;
}

//Dropdown interface

export interface DropdownOptions{
    isopen:boolean;
    searchQuery:string;
    dropUp:boolean;
}