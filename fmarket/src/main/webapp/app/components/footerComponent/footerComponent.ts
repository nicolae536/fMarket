/**
 * Created by nick_ on 5/6/2016.
 */

import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

let directoryPath = '/app/components/footerComponent';
@Component({
    selector: 'footer-component',
    templateUrl: directoryPath + '/footerComponent.html',
    directives: [ROUTER_DIRECTIVES]
})

export class FooterComponent {

}