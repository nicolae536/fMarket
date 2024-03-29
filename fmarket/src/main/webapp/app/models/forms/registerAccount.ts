/**
 * Created by NicolaeB on 4/27/2016.
 */
import {CustomValidators} from '../Angular2ExtensionValidators';

export class RegisterAccount {
    password:Field;
    repeat:Field;
    username:Field;
    subscribe:Field;
    rememberMe:Field;

    constructor(){
        this.password = new Field('password', true, '', CustomValidators.validatePassword);
        this.repeat = new Field('repeat', true, '',  CustomValidators.validatePassword);
        this.username = new Field('username', true, '', CustomValidators.validateEmail);
        this.subscribe = new Field('subscribe', true, false, ()=>{return true});
        this.rememberMe = new Field('rememberMe', true, false, ()=>{return true});
    }
}

/**
 * Field
 */
export class Field {
    key: string;
    valid:boolean; 
    validate: Function;
    value: Object;
    disabled: boolean

    constructor(key:string, valid:boolean, value?:any, validate?:Function, disabled?: boolean){
        this.key=key;
        this.valid = valid;
        this.value = value;
        this.validate = validate ? validate : ()=>{ return true };
        this.disabled = disabled === undefined || disabled === null ? false : disabled;
    }
}