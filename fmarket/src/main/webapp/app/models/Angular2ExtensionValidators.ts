/**
 * Created by nick_ on 4/16/2016.
 */
import {Control} from "angular2/common";
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PHONE_REGEX = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

export class CustomValidators {
    public static validateEmail(c:Control) {
        return EMAIL_REGEX.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }

    public static validatePassword(c: Control){
        return PASSWORD_REGEX.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }

    public static validatePhoneNumber(c:Control) {

        return PHONE_REGEX.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }
}