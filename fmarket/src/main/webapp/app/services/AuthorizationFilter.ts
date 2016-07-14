/**
 * Created by NicolaeB on 7/12/2016.
 */

import {AuthorizationService} from "./authorizationService";
import {Role} from "../models/Roles";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthorizationFilter implements CanActivate{
    canActivate(activatedRoute:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
        let requiredUserRoles = activatedRoute['_routeConfig'] ? activatedRoute['_routeConfig'].roles : null;
        return this.authorizeRoute(requiredUserRoles);
    }


    authorizeRoute(requiredRoles:Array<string>):boolean {
        let authorized = false;
        let activeUserRole = AuthorizationService.getUserRole();

        if (!requiredRoles) {
            requiredRoles = [Role.ANONYMUS, Role.USER, Role.ADMIN];
        }

        if (!activeUserRole) {
            activeUserRole = Role.ANONYMUS;
        }

        return requiredRoles.indexOf(activeUserRole) !== -1;
    }
}