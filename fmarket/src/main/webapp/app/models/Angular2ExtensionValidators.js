System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EMAIL_REGEX, PHONE_REGEX, PASSWORD_REGEX, CustomValidators;
    return {
        setters:[],
        execute: function() {
            EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            PHONE_REGEX = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
            PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
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
                        validateEmail: {
                            valid: false
                        }
                    };
                };
                CustomValidators.validatePhoneNumber = function (c) {
                    return PHONE_REGEX.test(c.value) ? null : {
                        validateEmail: {
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