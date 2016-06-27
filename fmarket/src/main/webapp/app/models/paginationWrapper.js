/**
 * Created by nick_ on 5/6/2016.
 */
var PaginationWrapper = (function () {
    function PaginationWrapper() {
        this.totalItems = 1;
        this.currentPage = 1;
        this.maxSize = 1;
        this.boundaryLinks = true;
        this.rotate = false;
    }
    return PaginationWrapper;
})();
exports.PaginationWrapper = PaginationWrapper;
//# sourceMappingURL=paginationWrapper.js.map