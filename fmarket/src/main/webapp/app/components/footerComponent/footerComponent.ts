/**
 * Created by nick_ on 5/6/2016.
 */

import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";

let directoryPath = '/app/components/footerComponent';
@Component({
    selector: 'footer-component',
    templateUrl: directoryPath + '/footerComponent.html',
    directives: [ROUTER_DIRECTIVES]
})

export class FooterComponent {

}