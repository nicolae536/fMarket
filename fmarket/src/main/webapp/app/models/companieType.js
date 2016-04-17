System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CompanieType;
    return {
        setters:[],
        execute: function() {
            CompanieType = (function () {
                function CompanieType(id, name, companies) {
                    this.isInEditMode = false;
                    this.id = id;
                    this.name = name;
                    //this.companies_no = companies;
                }
                return CompanieType;
            }());
            exports_1("CompanieType", CompanieType);
        }
    }
});
//# sourceMappingURL=companieType.js.map