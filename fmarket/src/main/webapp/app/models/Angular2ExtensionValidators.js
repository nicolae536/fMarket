System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EMAIL_REGEX, PHONE_REGEX, RegexValidation, PhoneRegexValidator;
    return {
        setters:[],
        execute: function() {
            EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            PHONE_REGEX = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
            RegexValidation = (function () {
                function RegexValidation() {
                }
                RegexValidation.prototype.regex = function (c) {
                    return EMAIL_REGEX.test(c.value);
                };
                return RegexValidation;
            }());
            exports_1("RegexValidation", RegexValidation);
            PhoneRegexValidator = (function () {
                function PhoneRegexValidator() {
                }
                PhoneRegexValidator.prototype.validate = function (c) {
                    return PHONE_REGEX.test(c.value);
                };
                return PhoneRegexValidator;
            }());
            exports_1("PhoneRegexValidator", PhoneRegexValidator);
        }
    }
});
//# sourceMappingURL=Angular2ExtensionValidators.js.map