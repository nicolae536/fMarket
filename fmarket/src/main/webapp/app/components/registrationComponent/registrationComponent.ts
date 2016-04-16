/**
 * Created by nick_ on 4/16/2016.
 */
import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from "angular2/common";

const APPLICATION_PATH='/app/components/registrationComponent';
@Component({
    selector:'registration-component',
    templateUrl:APPLICATION_PATH +'/registrationComponent.html',
    directives:[FORM_DIRECTIVES]
})
export class RegistrationComponent implements OnInit{

    ngOnInit():any {
        return undefined;
    }

}

export class RegisterAccount{
    password:string='';
    email:string='';
    
}