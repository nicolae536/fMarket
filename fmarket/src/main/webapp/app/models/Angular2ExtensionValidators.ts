/**
 * Created by nick_ on 4/16/2016.
 */
import {Control, AbstractControl, ControlGroup} from "@angular/common";
import {AccountStatus} from "./accountStatus";



export class CustomValidators {

    public static EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    public static PHONE_REGEX = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\. \\\/]?(\d+))?$/i;
    public static PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    public static INTEGER_REGEX = /^(0|[1-9][0-9]*)$/;

    public static checkPasswords(group:ControlGroup){
        let password;
        let reapeatPassword;

        if(group.controls['password']){
            password = group.controls['password'].value;
        }

        if(group.controls['repeat']){
            reapeatPassword = group.controls['repeat'].value;
        }

        if(reapeatPassword!="" && !reapeatPassword){
            return null;
        }

            if(password.length == reapeatPassword.length && password == reapeatPassword){
                return null
            }

            return {
                checkPasswords: {
                    valid: false
                }
            };

    }

    // public static validateEmail(c:AbstractControl) {
    //     return CustomValidators.EMAIL_REGEX.test(c.value) ? null : {
    //         validateEmail: {
    //             valid: false
    //         }
    //     };
    // }

    public static validateEmail(value:string){
        return CustomValidators.EMAIL_REGEX.test(value);
    }

    public static validatePassword(value:string){
        return CustomValidators.PASSWORD_REGEX.test(value);
    }
    // public static validatePassword(c:AbstractControl) {
    //     return CustomValidators.PASSWORD_REGEX.test(c.value) ? null : {
    //         validatePassword: {
    //             valid: false
    //         }
    //     };
    // }

    public static validatePhoneNumber(c:AbstractControl) {

        return CustomValidators.PHONE_REGEX.test(c.value) ? null : {
            validatePhoneNumber: {
                valid: false
            }
        };
    }


    public static validateAccountStatus(c:AbstractControl) {

        switch (c.value) {
            case AccountStatus.ACTIVE:
                return null;
            case AccountStatus.AUTO:
                return null;
            case AccountStatus.DISABLED:
                return null;
            case AccountStatus.PENDING:
                return null;
        }

        return {
            validateAccountStatus: {
                valid: false
            }
        };
    }

    public static validateCityId(c:AbstractControl) {
        if (c.value == -1) {
            return  {
                validateCityId: {
                    valid: false
                }
            };
        }

        return null;
    }

    public static validateInteger(c:Control){
        return CustomValidators.INTEGER_REGEX.test(c.value) ? null : {
            validateInteger: {
                valid: false
            }
        };
    }
}