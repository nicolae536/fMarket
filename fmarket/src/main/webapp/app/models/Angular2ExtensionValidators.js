"use strict";
var accountStatus_1 = require("./accountStatus");
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var PHONE_REGEX = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\. \\\/]?(\d+))?$/i;
var PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
var INTEGER_REGEX = /^(0|[1-9][0-9]*)$/;
var CustomValidators = (function () {
    function CustomValidators() {
    }
    CustomValidators.checkPasswords = function (group) {
        var password;
        var reapeatPassword;
        if (group.controls['password']) {
            password = group.controls['password'].value;
        }
        if (group.controls['repeat']) {
            reapeatPassword = group.controls['repeat'].value;
        }
        if (reapeatPassword != "" && !reapeatPassword) {
            return null;
        }
        if (password.length == reapeatPassword.length && password == reapeatPassword) {
            return null;
        }
        return {
            checkPasswords: {
                valid: false
            }
        };
    };
    CustomValidators.validateEmail = function (c) {
        return EMAIL_REGEX.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    };
    CustomValidators.validatePassword = function (c) {
        return PASSWORD_REGEX.test(c.value) ? null : {
            validatePassword: {
                valid: false
            }
        };
    };
    CustomValidators.validatePhoneNumber = function (c) {
        return PHONE_REGEX.test(c.value) ? null : {
            validatePhoneNumber: {
                valid: false
            }
        };
    };
    CustomValidators.validateAccountStatus = function (c) {
        switch (c.value) {
            case accountStatus_1.AccountStatus.ACTIVE:
                return null;
            case accountStatus_1.AccountStatus.AUTO:
                return null;
            case accountStatus_1.AccountStatus.DISABLED:
                return null;
            case accountStatus_1.AccountStatus.PENDING:
                return null;
        }
        return {
            validateAccountStatus: {
                valid: false
            }
        };
    };
    CustomValidators.validateCityId = function (c) {
        if (c.value == -1) {
            return {
                validateCityId: {
                    valid: false
                }
            };
        }
        return null;
    };
    CustomValidators.validateInteger = function (c) {
        return INTEGER_REGEX.test(c.value) ? null : {
            validateInteger: {
                valid: false
            }
        };
    };
    return CustomValidators;
}());
exports.CustomValidators = CustomValidators;
//# sourceMappingURL=Angular2ExtensionValidators.js.map