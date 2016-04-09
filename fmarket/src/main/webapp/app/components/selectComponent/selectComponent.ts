/**
 * Created by nick_ on 4/9/2016.
 */
import {Component, OnInit, Pipe, Input, Output} from 'angular2/core';
import {FilterPipe} from './filterPipe';

@Component({
    selector: 'select-component',
    template: `
            <div class="bs-ui-select-2">
                <span class="btn btn-default btn-secondary form-control ui-select-toggle" (click)="toggleSelectDropdown()">
                    <span>{{selectedItem.displayName}}</span>
                    <span [class]="getCarretClass()"></span>
                </span>
                <div class="list-group ui-select2-list-container" [style.display]="dropdownState ? 'block' : 'none'">
                <div class="ui-select2-search">
                    <div *ngIf="searchQuery.length > 0" class="ui-select2-search-right-icon">
                        <span class="glyphicon glyphicon-remove" (click)="removeSearchQuery()"></span>
                    </div>
                    <input class="form-control" [(ngModel)]="searchQuery" placeholder="Search.."/>
                </div>
                <div class="ui-select2-list">
                    <div class="ui-select2-list-item" (click)="selectItem(chooseItemValue)">{{chooseItemValue.displayName}}</div>
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

        .ui-select2-list-container{
            padding: 0 5px 0 5px;
            padding-bottom: 6px;
            position:absolute;
            border:1px solid #ccc;
            width:100%;
            background-color:white;
            top:32px;
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

.ui-select2-dropdown-icon{
    padding-top: 2px;
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
        //encapsulation: ViewEncapsulation.None,
    pipes:[FilterPipe]
})
export class SelectComponent implements OnInit {
    @Input('select-items') items:Array<Select2Item>;
    @Input('selected-item') selectedItem = this.chooseItemValue;
    private chooseItemValue = {displayName:'Choose..', id:-1};
    private searchQuery="";
    private dropdownState:boolean =false;

    ngOnInit():any {

    }


    toggleSelectDropdown(){
        this.dropdownState = !this.dropdownState;
    }

        removeSearchQuery(){
        this.searchQuery = "";
    }

        getCarretClass(){
        return this.dropdownState ? "glyphicon glyphicon-chevron-up pull-right ui-select2-dropdown-icon" : "glyphicon glyphicon-chevron-down pull-right ui-select2-dropdown-icon";
    }


    selectItem(item){
        this.selectedItem = item;
        this.toggleSelectDropdown();
    }
}

export interface Select2Item{
    displayName:string;
    boundItem:Object;
    //selected:boolean;
}