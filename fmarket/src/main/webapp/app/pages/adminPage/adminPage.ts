import {Component, AfterViewChecked, ViewChild} from "@angular/core";
import {Routes, Router, ROUTER_DIRECTIVES, Route, OnActivate, RouteSegment, RouteTree } from "@angular/router";
import {Location} from "@angular/common";
import {UsersPage} from "./usersPage/usersPage";
import {SubscribersPage} from "./subscribersPage/subscribersPage";
import {CategoriesPage} from "./categoriesPage/categoriesPage";
import {DemandsPage} from "./demandsPage/demandsPage";
import {CompaniesPage} from "./companiesPage/companiesPage";
import {CompaniesEditPage} from "./companiesPage/companiesEditPage/companiesEditPage";
import {DemandsEditPage} from "./demandsPage/demandsEditPage/demandsEditPage";
import {JqueryService} from "../../services/jqueryService";
import {ApplicationConstants} from "../../models/applicationConstansts";
import {NotificationService} from "../../services/notificationService";
import {AuthorizationService} from "../../services/authorizationService";
import {Role} from "../../models/Roles";
import {CompanieCreatePage} from "./companiesPage/companiesEditPage/companiesCreatePage";

var applicationPath:string = '/app/pages/adminPage';

@Component({
    selector: 'admin-Page',
    templateUrl: applicationPath + '/adminPage.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    new Route({
        path: '/users',
        component: UsersPage,
    }),
    new Route({
        path: '/subscribers',
        component: SubscribersPage,
    }),
    new Route({
        path: '/categorii',
        component: CategoriesPage,
    }),
    new Route({
        path: '/cereri',
        component: DemandsPage,
    }),
    new Route({
        path: '/cerere-detalii/:id',
        component: DemandsEditPage,
    }),
    new Route({
        path: '/companie/lista',
        component: CompaniesPage,
    }),
    new Route({
        path: '/companie/detalii/:id',
        component: CompaniesEditPage,
    }),
    new Route({
        path: '/companie/ceeaza',
        component: CompanieCreatePage,
    }),
])
export class AdminPage implements AfterViewChecked, OnActivate{

    @ViewChild('leftMenu') leftMenu;
    @ViewChild('rightMenu') rightMenu;
    location:Location;

    router:Router;
    private _notificationService:NotificationService;

    constructor(location:Location, router:Router, notificationService:NotificationService) {
        this.location = location;
        this.router = router;
        this._notificationService = notificationService;
        JqueryService.removeElementWithAnimation(document.getElementById(ApplicationConstants.LOADING_SPINNER));
    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        if(!(AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN))){
            this.router.navigate(['/login']);
            this._notificationService.emitSuccessNotificationToRootComponent("Nu aveti access la acest modul !!!",5)
        }
    }

    ngAfterViewChecked():any {
        // JqueryService.setAdminPageHeight(this.leftMenu.nativeElement, this.rightMenu.nativeElement);
        this._notificationService.removeLoading();
    }
    
    checkRoute(link){
        return JSON.stringify(this.router.createUrlTree([link])) == JSON.stringify(this.router.urlTree) ? 'active':''
    }
}
