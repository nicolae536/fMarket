/**
 * Created by NicolaeB on 4/26/2016.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DemandStatus;
    return {
        setters:[],
        execute: function() {
            DemandStatus = (function () {
                function DemandStatus() {
                }
                DemandStatus.ACTIVE = "ACTIVE";
                DemandStatus.PENDING = "PENDING";
                DemandStatus.WAITING_FOR_REVIEW = "WAITING_FOR_REVIEW";
                DemandStatus.IN_REVIEW = "IN_REVIEW";
                DemandStatus.CLOSED = "CLOSED";
                DemandStatus.REJECTED = "REJECTED";
                return DemandStatus;
            }());
            exports_1("DemandStatus", DemandStatus);
        }
    }
});
//# sourceMappingURL=DemandStatus.js.map