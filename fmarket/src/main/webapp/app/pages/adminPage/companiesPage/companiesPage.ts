/**
 * Created by nick_ on 5/6/2016.
 */
import {Component, OnInit} from "@angular/core";
import {CanActivate, Router} from "@angular/router-deprecated";
import {Role} from "../../../models/Roles";
import {AuthorizationService} from "../../../services/authorizationService";
import {CreateCompanieDialog} from "../../../components/companieComponent/createCompanieDialog/createCompanieDialog";
import {CompanieDto} from "../../../models/companieDto";
import {CompaniesService} from "../../../services/companiesService";
import {PaginationWrapper} from "../../../models/paginationWrapper";
import {NotificationService} from "../../../services/notificationService";
import {DomainCompanieDto} from "../../../models/domainCompanieDto";
import {CompanieListComponent} from "../../../components/companieComponent/companieListComponent/companieListComponent";
import * as _ from 'underscore';

let applicationPath='/app/pages/adminPage/companiesPage'
@Component({
    selector: 'compnaies-Page',
    templateUrl: applicationPath + '/companiesPage.html',
    styleUrls: [applicationPath + '/companiesPage.css'],
    directives:[CreateCompanieDialog, CompanieListComponent]
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})

export class CompaniesPage implements OnInit {
    private _createCompanieDialog:CreateCompanieDialog;

    private _notificationService:NotificationService;
    private _companiesService:CompaniesService;

    private _companiesList:Array<DomainCompanieDto>;
    // private _paginationWrapper:PaginationWrapper = new PaginationWrapper();

    private searchFilter:string;
    private _router:Router;

    constructor(router:Router ,companiesService:CompaniesService, notificationService:NotificationService){
        this._router = router;
        this._companiesService = companiesService;
        this._notificationService = notificationService;
    }
    
    ngOnInit(){
        // this._paginationWrapper.currentPage=1;
        this.getCompaniesWithFilters();
    }

    referenceCompaniesDialog(_createCompanieDialog:CreateCompanieDialog){
        this._createCompanieDialog = _createCompanieDialog;
    }

    private getCompaniesWithFilters() {
        let me=this;

        this._companiesService.getCompanies(this.searchFilter)
            .map(response =>{
                if(response.text().length>0){
                    return response.json();
                }
            })
            .subscribe(
                response=>{
                    me._companiesList = me.splitViewInPiecesUsingScreen(response);
                },
                error=>{
                    me._companiesList = me.splitViewInPiecesUsingScreen(me.getMockArray());
                    me._notificationService.emitNotificationToRootComponent({type:'danger', dismisable:true, message:'Eroare companiile nu pot fi afisate!', timeout:5});
                }
            )
    }

    selectCompanie(id){
        this._router.navigate(['Admin/CompanieDetails', {id:id}]);
    }

    submitSearch(){
        this.getCompaniesWithFilters();
    }

    chengeSearch($event){
        this.getCompaniesWithFilters();
    }

    getMockArray():Array<DomainCompanieDto> {
        return [
            {
                domain:'1',
                companiesList:[
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'2',
                companiesList:[
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'3',
                companiesList:[

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'4',
                companiesList:[

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'5',
                companiesList:[

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'6',
                companiesList:[
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'7',
                companiesList:[

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'8',
                companiesList:[
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'9',
                companiesList:[

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'11',
                companiesList:[

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'12',
                companiesList:[
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'13',
                companiesList:[

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'14',
                companiesList:[

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'15',
                companiesList:[

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'16',
                companiesList:[
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'17',
                companiesList:[
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpgg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'17',
                companiesList:[
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpgg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain:'17',
                companiesList:[
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },

                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpgg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    },
                    {
                        id:1,
                        logoSrc:'/staticResorces/demoIcon.jpg'
                    }
                ]
            },

        ]
    }

    splitViewInPiecesUsingScreen(mockArray:Array<DomainCompanieDto>) {
        let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;

        if(screenWidth <= 767){
            return [mockArray]
        }

        let index = 0;
        let realIndex = 0;
        let collector = [];
        let columns = Math.round(mockArray.length / 4);
        _.each(mockArray, (value, name)=>{
            if(realIndex == columns){
                index ++;
                realIndex=0;
            }

            if(!collector[index]){
                collector[index] = [];
            }

            collector[index].push(value);
            realIndex++;
        });

        return collector;
    }
}
