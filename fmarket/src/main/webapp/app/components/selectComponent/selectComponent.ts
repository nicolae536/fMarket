/**
 * Created by nick_ on 4/9/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from "angular2/core";
import {DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {FilterPipe} from "./filterPipe";

@Component({
    selector: 'select-component',
    template: `
            <div dropdown [(isOpen)]="_dropdownStatus.isopen"class="bs-ui-select-2 dropdown clearfix">
                <span *ngIf="!muliSelect" dropdownToggle [style.pointerEvents]="checkItems()? 'none' : 'auto'" [disabled]="checkItems()" 
                    class="btn btn-default btn-secondary form-control ui-select-toggle dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">
                        <span *ngIf="!_selectedItem">Choose...</span>
                        <span *ngIf="_selectedItem && _selectedItem.displayName">{{_selectedItem.displayName}}</span>
                        <span [class]="getCarretClass()"></span>
                        <span class="glyphicon glyphicon-remove pull-right simple-dropdown" *ngIf="_selectedItem !== _chooseItemValue"(click)="removeSelection($event)"></span>
                </span>
                
                <button *ngIf="muliSelect" dropdownToggle [style.pointerEvents]="checkItems()? 'none' : 'auto'" [disabled]="checkItems()" 
                    class="btn btn-default btn-secondary form-control ui-select-toggle multiselect dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">
                    <div class="col-xs-10 col-md-10 clearfix">
                        <span *ngIf="_selectedItems.length < 1">Choose...</span>
                        <span class="label label-info pull-left" *ngFor="#item of _selectedItems">{{item.displayName}} <span (click)="removeItemFromSelection($event,item)">&times;</span></span>
                    </div>
                    <div class="col-xs-2 col-md-2">
                        <span [class]="getCarretClass()"></span>
                        <span *ngIf="_selectedItems.length > 0" class="glyphicon glyphicon-remove pull-right" (click)="removeSelection($event)"></span>
                    </div>
                </button>
                <div dropdownMenu class="ui-select2-list-container dropdown-menu" >
                        <div class="ui-select2-search">
                            <div *ngIf="searchQuery.length > 0" class="ui-select2-search-right-icon">
                                <span class="glyphicon glyphicon-remove" (click)="removeSearchQuery()"></span>
                            </div>
                            <input class="form-control" [(ngModel)]="searchQuery" placeholder="Search.."/>
                        </div>
                        <div class="ui-select2-list">
                            <div *ngIf="!muliSelect" class="ui-select2-list-item" (click)="selectItem(_chooseItemValue)">{{_chooseItemValue.displayName}}</div>
                            <div class="ui-select2-list-item" *ngFor="#i of items|filterItems:searchQuery" (click)="selectItem(i)">{{i.displayName}}</div>
                        </div>
                </div>
            </div>
    `,
    styles: [`
        .bs-ui-select-2{
            border-radius: 5px;
            position:relative;
            margin-bottom:10px;
        }

        .ui-select-toggle{
            text-align: left;
        }
        
        .bs-ui-select-2 .btn.btn-default.btn-secondary.form-control.ui-select-toggle.multiselect{
            padding-top: 7px;        
            height: auto;
            min-height: 34px;
        }
        
        .bs-ui-select-2 .btn.btn-default.btn-secondary.form-control.ui-select-toggle.dropdown-toggle .glyphicon.glyphicon-remove.pull-right{
            margin-right: 7px;
        }
        
        .bs-ui-select-2 .btn.btn-default.btn-secondary.form-control.ui-select-toggle.multiselect .label.label-info{
            margin-left: 5px;
            top: 2px;
            margin-bottom: 4px;
        }
        
        .bs-ui-select-2 .btn.btn-default.btn-secondary.form-control.ui-select-toggle.multiselect .col-xs-10,.col-md-10{
            padding-left: 0px;
        }
        
        .bs-ui-select-2 .btn.btn-default.btn-secondary.form-control.ui-select-toggle.multiselect .col-xs-2,.col-md-2{
            padding-right: 0px;
        }
        
        .bs-ui-select-2.dropdown .btn-default.active, .btn-default:active, .open>.dropdown-toggle.btn-default{
            background-color: white;
        }
        
        .ui-select2-list-container{            
            width:100%;
            padding-left: 5px;
            padding-right: 5px;
        }

        .ui-select2-list-container .ui-select2-list{
            max-height: 200px;
            overflow: auto;
        }

        .ui-select2-list-item{
            position: relative;
            display: block;
            padding: 10px 15px;
            margin-bottom: -1px;
            background-color: #fff;
        }

        .ui-select2-list-item:hover{
            background-color: lightgray;
            cursor: pointer;
        }        

        .ui-select2-search{
            padding: 3px 0px 5px 0px;
            border-bottom:1px solid #ccc;
            position: relative;
        }

        .ui-select2-search-right-icon{
            position: absolute;
            right: 10px;
            top: 12px;
            cursor: pointer;
        }
    `],
    pipes: [FilterPipe],
    directives: [DROPDOWN_DIRECTIVES]
})
export class SelectComponent implements OnInit, OnChanges {
    ngOnChanges(changes:{}):any {
        if(changes.hasOwnProperty('_selectedItem')){
            // this._selectedItem=
            console.log('selected item change', this._selectedItem);
        }
    }
    @Input('select-items') items:Array<Select2Item>;
    @Input('single-item-selected') _selectedItem:Select2Item;
    @Input('selected-items') _selectedItems:Array<Select2Item>;
    @Input('multi-select') muliSelect:boolean;

    @Output('loaded') loadedSelect:EventEmitter<SelectComponent> = new EventEmitter<SelectComponent>();
    _chooseItemValue = {displayName: 'Choose...', boundItem: null};
    private searchQuery = "";

    public _dropdownStatus:{isopen:boolean} = {isopen: false};

    ngOnInit():any {
        this.loadedSelect.emit(this);
        this._selectedItem =  this._selectedItem ? this._selectedItem : this._chooseItemValue;
        this._selectedItems = this._selectedItems ? this._selectedItems : [];
    }

    get selectedItem():Select2Item {
        return this._selectedItem;
    }

    set selectedItem(item:Select2Item) {
        this._selectedItem = item;
    }

    get multiselectItems():Array<Select2Item> {
        return this._selectedItems;
    }

    set multiselectSelectedItems(items:Array<Select2Item>) {
        this._selectedItems = items ? items : [];
    }

    private checkItems() {
        return !this.items || this.items.length < 1;
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

    public removeSearchQuery() {
        this.searchQuery = "";
    }

    private getCarretClass() {
        return this._dropdownStatus.isopen ? "glyphicon glyphicon-chevron-up pull-right ui-select2-dropdown-icon" : "glyphicon glyphicon-chevron-down pull-right ui-select2-dropdown-icon";
    }

    private removeSelection($event) {
        $event.stopPropagation();

        this._selectedItem = this._chooseItemValue;
        this._selectedItems = [];
    }

    removeItemFromSelection($event, item:Select2Item) {
        $event.stopPropagation();

        var index = this._selectedItems.indexOf(item);
        if (index === -1) {
            return;
        }

        this._selectedItems.splice(index, 1);
    }

    public selectItem(item) {
        this._selectedItem = item;
        this._selectedItems.push(item);
    }

}

export class Select2Item {
    displayName:string;
    boundItem:Object;
    //selected:boolean;
}