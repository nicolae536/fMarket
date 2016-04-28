System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Demand;
    return {
        setters:[],
        execute: function() {
            Demand = (function () {
                function Demand() {
                    this.title = '';
                    this.message = '';
                    this.email = '';
                    this.termsAgreed = false;
                    this.phone = '';
                    this.name = '';
                    this.agreePhoneContact = false;
                    this.agreeEmailContact = false;
                    this.allCities = false;
                    this.isInEditMode = false;
                }
                return Demand;
            }());
            exports_1("Demand", Demand);
        }
    }
});
//# sourceMappingURL=demand.js.map