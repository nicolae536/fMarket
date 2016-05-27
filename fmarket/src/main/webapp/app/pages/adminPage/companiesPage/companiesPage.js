var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by nick_ on 5/6/2016.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var companiesService_1 = require("../../../services/companiesService");
var notificationService_1 = require("../../../services/notificationService");
var companieListComponent_1 = require("../../../components/companieComponent/companieListComponent/companieListComponent");
var _ = require('underscore');
var applicationPath = '/app/pages/adminPage/companiesPage';
var CompaniesPage = (function () {
    function CompaniesPage(router, companiesService, notificationService) {
        this._router = router;
        this._companiesService = companiesService;
        this._notificationService = notificationService;
    }
    CompaniesPage.prototype.ngOnInit = function () {
        this.getCompaniesWithFilters();
    };
    CompaniesPage.prototype.referenceCompaniesDialog = function (_createCompanieDialog) {
        this._createCompanieDialog = _createCompanieDialog;
    };
    CompaniesPage.prototype.getCompaniesWithFilters = function () {
        var me = this;
        this._companiesService.getCompaniesForUsers(this.searchFilter)
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me._companiesList = me.splitViewInPiecesUsingScreen(response);
        }, function (error) {
            me._companiesList = me.splitViewInPiecesUsingScreen(me.getMockArray());
            me._notificationService.emitNotificationToRootComponent({ type: 'danger', dismisable: true, message: 'Eroare companiile nu pot fi afisate!', timeout: 5 });
        });
    };
    CompaniesPage.prototype.goToNewCompanyPage = function () {
        this._router.navigate(['/admin/companie/ceeaza']);
    };
    CompaniesPage.prototype.selectCompanie = function (id) {
        this._router.navigate(['/admin/detalii', { id: id }]);
    };
    CompaniesPage.prototype.submitSearch = function () {
        this.getCompaniesWithFilters();
    };
    CompaniesPage.prototype.chengeSearch = function ($event) {
        this.getCompaniesWithFilters();
    };
    CompaniesPage.prototype.getMockArray = function () {
        return [
            {
                domain: '1',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '2',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '3',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '4',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '5',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '6',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '7',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '8',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '9',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '11',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '12',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '13',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '14',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '15',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '16',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '17',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpgg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '17',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpgg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '17',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpgg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
        ];
    };
    CompaniesPage.prototype.splitViewInPiecesUsingScreen = function (mockArray) {
        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0]['clientWidth'];
        if (screenWidth <= 767) {
            return [mockArray];
        }
        var index = 0;
        var realIndex = 0;
        var collector = [];
        var columns = Math.round(mockArray.length / 4);
        _.each(mockArray, function (value, name) {
            if (realIndex == columns) {
                index++;
                realIndex = 0;
            }
            if (!collector[index]) {
                collector[index] = [];
            }
            collector[index].push(value);
            realIndex++;
        });
        return collector;
    };
    CompaniesPage = __decorate([
        core_1.Component({
            selector: 'compnaies-Page',
            templateUrl: applicationPath + '/companiesPage.html',
            styleUrls: [applicationPath + '/companiesPage.css'],
            directives: [companieListComponent_1.CompanieListComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router, companiesService_1.CompaniesService, notificationService_1.NotificationService])
    ], CompaniesPage);
    return CompaniesPage;
})();
exports.CompaniesPage = CompaniesPage;
//# sourceMappingURL=companiesPage.js.map