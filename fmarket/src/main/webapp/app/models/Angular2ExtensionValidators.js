System.register(["./accountStatus"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var accountStatus_1;
    var EMAIL_REGEX, PHONE_REGEX, PASSWORD_REGEX, INTEGER_REGEX, CustomValidators;
    return {
        setters:[
            function (accountStatus_1_1) {
                accountStatus_1 = accountStatus_1_1;
            }],
        execute: function() {
            EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            PHONE_REGEX = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
            PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
            INTEGER_REGEX = /^(0|[1-9][0-9]*)$/;
            CustomValidators = (function () {
                function CustomValidators() {
                }
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
            exports_1("CustomValidators", CustomValidators);
        }
    }
});
//# sourceMappingURL=Angular2ExtensionValidators.js.map