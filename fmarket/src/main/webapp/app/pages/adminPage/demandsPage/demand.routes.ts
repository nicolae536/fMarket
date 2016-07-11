/**
 * Created by NicolaeB on 7/11/2016.
 */

import {RouterConfig } from '@angular/router';
import {DemandsPage} from "./demandsPage";
import {NewDemandsListPage} from "./demandsListPage/newDemandsListPage";
import {AllDemandsListPage} from "./demandsListPage/allDemandsListPage";
import {Role} from "../../../models/Roles";

export const DEMANDS_PAGE_ROUTE_PROVIDERS: RouterConfig = [
    {
        path: 'cereri',
        component: DemandsPage,
        roles: [Role.ADMIN],
        children: [
            {
                path: 'newDemands',
                roles: [Role.ADMIN],
                component: NewDemandsListPage,
            },
            {
                path: 'lista',
                roles: [Role.ADMIN],
                component: AllDemandsListPage,
            }
        ]
    }
];