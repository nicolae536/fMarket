/**
 * Created by nick_ on 5/6/2016.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PaginationWrapper;
    return {
        setters:[],
        execute: function() {
            PaginationWrapper = (function () {
                function PaginationWrapper() {
                    this.totalItems = 1;
                    this.currentPage = 1;
                    this.maxSize = 1;
                    this.boundaryLinks = true;
                    this.rotate = false;
                }
                return PaginationWrapper;
            }());
            exports_1("PaginationWrapper", PaginationWrapper);
        }
    }
});
//# sourceMappingURL=paginationWrapper.js.map