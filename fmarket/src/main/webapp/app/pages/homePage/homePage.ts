/**
 * Created by nick_ on 4/12/2016.
 */
import {Component, OnInit, OnChanges} from 'angular2/core';

const folderPath = '/app/pages/homePage';

@Component({
    selector:'home-page',
    templateUrl:folderPath + '/homePage.html'
})
export class HomePage implements OnInit, OnChanges{

    constructor(){

    }

    ngOnInit():any {

    }

    ngOnChanges(changes:{}):any {

    }

}