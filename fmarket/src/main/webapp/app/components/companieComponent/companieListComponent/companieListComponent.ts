/**
 * Created by nick_ on 5/6/2016.
 */
import {Input, Component, Output, EventEmitter} from "@angular/core";
import {CompanieDto} from "../../../models/companieDto";
import {PaginationWrapper} from "../../../models/paginationWrapper";
import {DomainCompanieDto} from "../../../models/domainCompanieDto";
import {TOOLTIP_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector:'companie-list-component',
    templateUrl:'/app/components/companieComponent/companieListComponent/companieListComponent.html',
})
export class CompanieListComponent {
    @Input('companies-list') _companieList:Array<DomainCompanieDto>;
    @Output('companie-selected') _companieSelectedEmitter:EventEmitter<CompanieDto> = new EventEmitter<CompanieDto>();

    selectCompanie(companie){
        this._companieSelectedEmitter.emit(companie);
    }

    getImageTitle(companie){
        return `<img src="${companie.logoSrc}" class="companie-logo" />`;
    }
}