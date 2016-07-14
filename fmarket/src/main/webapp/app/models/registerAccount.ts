/**
 * Created by NicolaeB on 4/27/2016.
 */

export class RegisterAccount {
    passwords:PasswordField;
    email:string = '';
    subscribe:boolean = false;
    rememberMe:boolean = false;
}

export interface PasswordField{
    password:string;
    repeat:string;
}