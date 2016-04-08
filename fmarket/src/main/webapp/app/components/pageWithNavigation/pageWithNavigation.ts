export class PageWithNavigation {
    currentPageIndex:number = 1;
    pageNumbers:Array<number> = [];
    pageNumbsersSubset:Array<number> = [];

    constructor() {
        // code...
    }

    mapPageIndexes(pagesCount, currentPageIndex) {
        var pagesArray = [];
        for (var i = 1; i <= pagesCount; i++) {
            pagesArray[pagesArray.length] = 1;
        }

        this.currentPageIndex = currentPageIndex;
        this.pageNumbers = pagesArray;
        this.pageNumbsersSubset = this.pageNumbers.slice(0, 5);
        this.goToPage(this.currentPageIndex);
    }

    navigateLeft() {
        if (this.currentPageIndex - 1 > this.pageNumbers[0]) {
            return;
        }

        this.currentPageIndex = this.currentPageIndex - 1;
        this.goToPage(this.currentPageIndex);
    }

    navigateRight() {
        if (this.currentPageIndex + 1 === this.pageNumbers.length) {
            return;
        }

        this.currentPageIndex = this.currentPageIndex + 1;
        this.goToPage(this.currentPageIndex);
    }

    goToPageUsingIndex(pageIndex:number) {
        this.currentPageIndex = pageIndex;
        this.goToPage(this.currentPageIndex);
    }

    isPageActive(page:number) {
        if (page === this.currentPageIndex) {
            return 'btn btn-default active-page';
        }
        return 'btn btn-default';
    }

    goToPage(pageIndex:number) {
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
            //get users with filters from that page
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
            //get users with filters from that page
        }

        this.pageNumbsersSubset = auxArray;
    }
}