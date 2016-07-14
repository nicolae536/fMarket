/**
 * Created by nick_ on 5/6/2016.
 */
import {Input, Component, Output, EventEmitter} from "@angular/core";
import {CompanieDto} from "../../../models/companieDto";
import {DomainCompanieDto} from "../../../models/domainCompanieDto";
import {TOOLTIP_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

let template = require('./companieListComponent.html');

@Component({
    selector:'companie-list-component',
    template:template,
    directives:[TOOLTIP_DIRECTIVES]
})
export class CompanieListComponent {
    @Input('companies-list') _companieList:Array<DomainCompanieDto>;
    @Output('companie-selected') _companieSelectedEmitter:EventEmitter<CompanieDto> = new EventEmitter<CompanieDto>();

    tooltip = {visible:false};

    selectCompanie(companie){
        this._companieSelectedEmitter.emit(companie);
    }

    getImageTooltip(companie){
        return `<img class="logo-item" src="${companie}"/>`;
    }
}