/**
 * Created by nick_ on 5/6/2016.
 */

import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

let template = require('./footerComponent.html');
@Component({
    selector: 'footer-component',
    template: template,
    directives: [ROUTER_DIRECTIVES]
})

export class FooterComponent {

}