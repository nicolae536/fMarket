System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var InputGroup, InputGroupOptions;
    return {
        setters:[],
        execute: function() {
            InputGroup = (function () {
                function InputGroup(type) {
                    this.type = "text";
                    this.type = type;
                }
                return InputGroup;
            }());
            exports_1("InputGroup", InputGroup);
            InputGroupOptions = (function () {
                function InputGroupOptions() {
                }
                return InputGroupOptions;
            }());
            exports_1("InputGroupOptions", InputGroupOptions);
        }
    }
});
//# sourceMappingURL=inputGroup.js.map