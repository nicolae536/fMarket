System.register(['../../models/user'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_1;
    var STATUS;
    return {
        setters:[
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            exports_1("STATUS", STATUS = [
                { status: null, displayName: "Chose..." },
                { status: user_1.AccountStatus.AUTO, displayName: "AUTO" },
                { status: user_1.AccountStatus.ACTIVE, displayName: "ACTIVE" },
                { status: user_1.AccountStatus.DISABLED, displayName: "DISABLED" },
                { status: user_1.AccountStatus.DISABLED, displayName: "PENDING" }]);
        }
    }
});
//# sourceMappingURL=mock-Status.js.map