System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var STATUS;
    return {
        setters:[],
        execute: function() {
            exports_1("STATUS", STATUS = [
                { status: null, displayName: "Chose..." },
                { status: AccountStatus.AUTO, displayName: "AUTO" },
                { status: AccountStatus.ACTIVE, displayName: "ACTIVE" },
                { status: AccountStatus.DISABLED, displayName: "DISABLED" },
                { status: AccountStatus.DISABLED, displayName: "PENDING" }]);
        }
    }
});
//# sourceMappingURL=mock-Status.js.map