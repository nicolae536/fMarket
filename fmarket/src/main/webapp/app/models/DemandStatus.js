/**
 * Created by NicolaeB on 4/26/2016.
 */
"use strict";
var DemandStatus = (function () {
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
exports.DemandStatus = DemandStatus;
//# sourceMappingURL=DemandStatus.js.map