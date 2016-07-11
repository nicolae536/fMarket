/**
 * Created by NicolaeB on 7/11/2016.
 */
import {ViewContainerRef, ComponentFactoryResolver, Directive} from "@angular/core";
import {RouterOutlet, ActivatedRoute, RouterOutletMap} from "@angular/router";
import {AuthorizationService} from "../../services/authorizationService";
import {Role} from "../../models/Roles";

@Directive({
    selector: 'router-outlet'
})
export class APPLICATION_ROUTER_DIRECTIVE extends RouterOutlet {
    constructor(parentOutletMap:RouterOutletMap, location:ViewContainerRef, componentFactoryResolver:ComponentFactoryResolver, name:string) {
        super(parentOutletMap, location, componentFactoryResolver, name);
    }

    activate(activatedRoute:ActivatedRoute, providers, outletMap) {
        let requiredUserRoles = activatedRoute.snapshot['_routeConfig'] ? activatedRoute.snapshot['_routeConfig'].roles : null;
        if (this.authorizeRoute(requiredUserRoles)) {
            return super.activate(activatedRoute, providers, outletMap);
        }
        else {
            let activeUserRole = AuthorizationService.getUserRole();
            switch (activeUserRole) {
                case null:
                case Role.ANONYMUS:
                case Role.USER: {
                    window.location.href = '/#';
                    break;
                }
                case Role.ADMIN: {
                    window.location.href = '/#/admin/users';
                    break;
                }
            }
        }
    }

    authorizeRoute(requiredRoles:Array<string>):boolean {
        let authorized = false;
        let activeUserRole = AuthorizationService.getUserRole();

        if (!requiredRoles) {
            requiredRoles = [Role.ANONYMUS, Role.USER];
        }

        if (!activeUserRole) {
            activeUserRole = Role.ANONYMUS;
        }

        return requiredRoles.indexOf(activeUserRole) !== -1;
    }

}