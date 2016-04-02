System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RequestType;
    return {
        setters:[],
        execute: function() {
            RequestType = (function () {
                function RequestType(id, name, companies) {
                    this.isInEditMode = false;
                    this.id = id;
                    this.name = name;
                    this.companies = companies;
                }
                return RequestType;
            }());
            exports_1("RequestType", RequestType);
        }
    }
});
//# sourceMappingURL=requestType.js.map