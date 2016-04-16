/**
 * Created by nick_ on 4/16/2016.
 */
import {Control, Validator, AbstractControl} from "angular2/common";
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PHONE_REGEX = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;

export class RegexValidation{
    regex(c:Control):{} {
        return EMAIL_REGEX.test(c.value);
    }
}

export class PhoneRegexValidator implements Validator{
    validate(c:AbstractControl):{} {
        return PHONE_REGEX.test(c.value);
    }
}