/**
 * Created by nick_ on 5/6/2016.
 */
import {Input, Component, Output, EventEmitter} from "@angular/core";
import {CompanieDto} from "../../../models/companieDto";

let template = require('./companiesAdminListComponent.html');

@Component({
    selector:'companie-admin-list-component',
    template:template,
})
export class CompanieAdmminListComponent {
    @Input('admin-companies-list') _companieList:Array<Object>;
    @Output('admin-companie-selected') _companieSelectedEmitter:EventEmitter<CompanieDto> = new EventEmitter<CompanieDto>();
    @Output('admin-companie-removed') _companieRemovedEmitter:EventEmitter<CompanieDto> = new EventEmitter<CompanieDto>();

    selectCompanie(companie){
        this._companieSelectedEmitter.emit(companie);
    }

    removeCompanie($event,companie){
        $event.stopPropagation();
        this._companieRemovedEmitter.emit(companie);
    }
}