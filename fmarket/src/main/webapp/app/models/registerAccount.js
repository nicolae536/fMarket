/**
 * Created by NicolaeB on 4/27/2016.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RegisterAccount;
    return {
        setters:[],
        execute: function() {
            RegisterAccount = (function () {
                function RegisterAccount() {
                    this.password = '';
                    this.email = '';
                    this.subscribe = false;
                    this.rememberMe = false;
                }
                return RegisterAccount;
            }());
            exports_1("RegisterAccount", RegisterAccount);
        }
    }
});
//# sourceMappingURL=registerAccount.js.map