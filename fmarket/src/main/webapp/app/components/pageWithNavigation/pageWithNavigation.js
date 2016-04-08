System.register([], function(exports_1) {
    var PageWithNavigation;
    return {
        setters:[],
        execute: function() {
            PageWithNavigation = (function () {
                function PageWithNavigation() {
                    this.currentPageIndex = 1;
                    this.pageNumbers = new Array();
                    this.pageNumbsersSubset = new Array();
                    // code...
                }
                PageWithNavigation.prototype.mapPageIndexes = function (pagesCount, currentPageIndex) {
                    var pagesArray = [];
                    for (var i = 1; i <= pagesCount; i++) {
                        pagesArray[pagesArray.length] = 1;
                    }
                    this.currentPageIndex = currentPageIndex;
                    this.pageNumbers = pagesArray;
                    this.pageNumbsersSubset = this.pageNumbers.slice(0, 5);
                    this.goToPage(this.currentPageIndex);
                };
                PageWithNavigation.prototype.navigateLeft = function () {
                    if (this.currentPageIndex - 1 > this.pageNumbers[0]) {
                        return;
                    }
                    this.currentPageIndex = this.currentPageIndex - 1;
                    this.goToPage(this.currentPageIndex);
                };
                PageWithNavigation.prototype.navigateRight = function () {
                    if (this.currentPageIndex + 1 === this.pageNumbers.length) {
                        return;
                    }
                    this.currentPageIndex = this.currentPageIndex + 1;
                    this.goToPage(this.currentPageIndex);
                };
                PageWithNavigation.prototype.goToPageUsingIndex = function (pageIndex) {
                    this.currentPageIndex = pageIndex;
                    this.goToPage(this.currentPageIndex);
                };
                PageWithNavigation.prototype.isPageActive = function (page) {
                    if (page === this.currentPageIndex) {
                        return 'btn btn-default active-page';
                    }
                    return 'btn btn-default';
                };
                PageWithNavigation.prototype.goToPage = function (pageIndex) {
                    if (this.pageNumbsersSubset.length === this.pageNumbers.length) {
                        //get users with filters from that page
                        return;
                    }
                    var elementIndex = this.pageNumbsersSubset.indexOf(this.currentPageIndex);
                    var auxArray = JSON.parse(JSON.stringify(this.pageNumbsersSubset));
                    if (elementIndex > 2) {
                        var lastElement = auxArray[auxArray.length - 1];
                        var indexOfItemToTake = this.pageNumbers.indexOf(lastElement) + 1;
                        if (indexOfItemToTake === this.pageNumbers.length) {
                            this.currentPageIndex = this.pageNumbers[this.pageNumbers.length - 1];
                            return;
                        }
                        auxArray = auxArray.slice(1, 5);
                        auxArray[auxArray.length] = this.pageNumbers[indexOfItemToTake];
                    }
                    if (elementIndex < 2) {
                        var firstElement = auxArray[0];
                        var indexOfItemToTake = this.pageNumbers.indexOf(firstElement) - 1;
                        if (indexOfItemToTake === -1) {
                            this.currentPageIndex = 0;
                            return;
                        }
                        auxArray = auxArray.slice(0, 4);
                        auxArray.unshift(this.pageNumbers[indexOfItemToTake]);
                    }
                    this.pageNumbsersSubset = auxArray;
                };
                return PageWithNavigation;
            })();
            exports_1("PageWithNavigation", PageWithNavigation);
        }
    }
});
//# sourceMappingURL=pageWithNavigation.js.map