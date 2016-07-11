/**
 * Created by NicolaeB on 7/11/2016.
 */

import {RouterConfig } from '@angular/router';
import {DemandsPage} from "./demandsPage";
import {NewDemandsListPage} from "./demandsListPage/newDemandsListPage";
import {AllDemandsListPage} from "./demandsListPage/allDemandsListPage";

export const DEMANDS_PAGE_ROUTE_PROVIDERS: RouterConfig = [
    {
        path: 'cereri',
        component: DemandsPage,
        children: [
            {
                path: 'newDemands',
                component: NewDemandsListPage,
            },
            {
                path: 'lista',
                component: AllDemandsListPage,
            }
        ]
    }
];