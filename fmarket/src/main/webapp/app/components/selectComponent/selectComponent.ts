/**
 * Created by nick_ on 4/9/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, DoCheck, ElementRef} from "@angular/core";
import {DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {FilterPipe} from "./filterPipe";

@Component({
    selector: 'select-component',
    template: `
            <div dropdown [(isOpen)]="_dropdownStatus.isopen" [class.dropUp]="dropUp" [class.dropdown]="!dropUp" class="bs-ui-select-2 clearfix">
                <span #simpleSelectRef *ngIf="!muliSelect" dropdownToggle [style.pointerEvents]="checkItems()? 'none' : 'auto'" [disabled]="checkItems()" 
                    class="btn btn-default btn-secondary form-control ui-select-toggle dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">
                        <span *ngIf="!_selectedItem">Choose...</span>
                        <span *ngIf="_selectedItem && _selectedItem.displayName">{{_selectedItem.displayName}}</span>
                        <span [class]="getCarretClass()"></span>
                        <span class="glyphicon glyphicon-remove pull-right simple-dropdown" *ngIf="_selectedItem !== _chooseItemValue"(click)="removeSelection($event)"></span>
                </span>
                
                <button #multiSelectRef *ngIf="muliSelect" dropdownToggle [style.pointerEvents]="checkItems()? 'none' : 'auto'" [disabled]="checkItems()" 
                    class="btn btn-default btn-secondary form-control ui-select-toggle multiselect dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">
                    <div class="col-xs-10 col-md-10 clearfix">
                        <span *ngIf="_selectedItems.length < 1">Choose...</span>
                        <span class="label label-info pull-left" *ngFor="let item of _selectedItems">{{item.displayName}} <span (click)="removeItemFromSelection($event,item)">&times;</span></span>
                    </div>
                    <div class="col-xs-2 col-md-2">
                        <span [class]="getCarretClass()"></span>
                        <span *ngIf="_selectedItems.length > 0" class="glyphicon glyphicon-remove pull-right" (click)="removeSelection($event)"></span>
                    </div>
                </button>
                <div dropdownMenu class="ui-select2-list-container dropdown-menu" [class.dropdown-open]="_dropdownStatus.isopen">
                        <div class="ui-select2-search">
                            <div *ngIf="searchQuery.length > 0" class="ui-select2-search-right-icon">
                                <span class="glyphicon glyphicon-remove" (click)="removeSearchQuery()"></span>
                            </div>
                            <input class="form-control" [(ngModel)]="searchQuery" placeholder="Search.."/>
                        </div>
                        <div class="ui-select2-list">
                            <div *ngIf="!muliSelect" class="ui-select2-list-item" (click)="selectItem(_chooseItemValue)">{{_chooseItemValue.displayName}}</div>
                            <div class="ui-select2-list-item" *ngFor="let i of items|filterItems:searchQuery" (click)="selectItem(i)">{{i.displayName}}</div>
                        </div>
                </div>
            </div>
    `,
    pipes: [FilterPipe],
    directives: [DROPDOWN_DIRECTIVES]
})
export class SelectComponent implements OnInit, OnChanges, DoCheck {
    @ViewChild('simpleSelectRef') simpleSelectRef:ElementRef;
    @ViewChild('multiSelectRef') multiSelectRef:ElementRef;
    @Input('select-items') items:Array<Select2Item>;
    @Input('single-item-selected') _selectedItem:Select2Item;
    @Input('selected-items') _selectedItems:Array<Select2Item>;
    @Input('multi-select') muliSelect:boolean;
    @Output('loaded') loadedSelect:EventEmitter<SelectComponent> = new EventEmitter<SelectComponent>();
    _chooseItemValue = {displayName: 'Choose...', boundItem: null};

    private dropUp:boolean;
    private searchQuery = "";
    public _dropdownStatus:{isopen:boolean} = {isopen: false};

    ngOnInit():any {
        this.loadedSelect.emit(this);
        this._selectedItem = this._selectedItem ? this._selectedItem : this._chooseItemValue;
        this._selectedItems = this._selectedItems ? this._selectedItems : [];
    }

    ngOnChanges(changes:{}):any {
        if (changes.hasOwnProperty('_selectedItem')) {
            console.log('selected item change', this._selectedItem);
        }
    }

    ngDoCheck() {
        this.computeSelectView();
        console.log('checked');
    }

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
            this.dropUp = multiSelectRefPosition.top + 305 > documentHeight ? true : false;
        }
        if (simpleSelectRefPosition) {
            this.dropUp = simpleSelectRefPosition.top + 305 > documentHeight ? true : false;
        }
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
        return this._dropdownStatus.isopen ? "glyphicon glyphicon-chevron-up pull-right ui-select2-subscribeDatePicker-icon" : "glyphicon glyphicon-chevron-down pull-right ui-select2-subscribeDatePicker-icon";
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

    private getOffset(el) {
        let rect = el.getClientRects();
        rect = rect.length > 0 ? rect[0] :  rect;
        let scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        let scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
    }

}
//This definition will remain here so the component may be exported with his types
export class Select2Item {
    displayName:string;
    boundItem:Object;
    //selected:boolean;
}