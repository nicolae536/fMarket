/**
 * Created by nick_ on 5/6/2016.
 */
import {Input, Component, Output, EventEmitter} from "@angular/core";
import {CompanieDto} from "../../../models/companieDto";
import {PaginationWrapper} from "../../../models/paginationWrapper";

@Component({
    selector:'companie-list-component',
    templateUrl:'/app/components/companieComponent/companieListComponent/companieListComponent.html',
})
export class CompanieListComponent {
    @Input('companies-list') _companieList:Array<CompanieDto>;
    @Input('pagination-wrapper') _paginationWrapper:PaginationWrapper;
    @Output('remove-companie') _removeCompanieEmitter:EventEmitter<CompanieDto> = new EventEmitter<CompanieDto>();
    @Output('page-changed') _pageChangedEmitter:EventEmitter<any> = new EventEmitter<any>();
    @Output('edit-companie') _companieEditEmitter:EventEmitter<any> = new EventEmitter<any>();

    removeCompanie(companie){
        this._removeCompanieEmitter.emit(companie);
    }

    pageChanged($event){
        this._pageChangedEmitter.emit($event);
    }

    editCompanie(id){
        this._companieEditEmitter.emit(id);
    }
}