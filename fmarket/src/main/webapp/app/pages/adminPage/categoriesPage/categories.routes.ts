/**
 * Created by NicolaeB on 7/11/2016.
 */
/**
 * Created by NicolaeB on 7/11/2016.
 */
import  {RouterConfig } from '@angular/router';
import {CategoriesPage} from "./categoriesPage";
import {CategoriesMenuPage} from "./categoriesMenuPage/categoriesMenuPage";
import {CompaniesPage} from "./companiesPage/companiesPage";
import {DomainsPage} from "./domainsPage/domainsPage";
import {Role} from "../../../models/Roles";
import {AuthorizationFilter} from "../../../services/AuthorizationFilter";

export const CATEGORIES_PAGE_ROUTE_PROVIDERS: RouterConfig = [
    {
        path: 'categorii',
        component: CategoriesPage,
        roles: [Role.ADMIN],
        canActivate: [AuthorizationFilter],
        children: [
            {
                path: 'meniu',
                component: CategoriesMenuPage,
                roles: [Role.ADMIN],
                canActivate:[AuthorizationFilter]
            },
            {
                path: 'firme',
                component: CompaniesPage,
                roles: [Role.ADMIN],
                canActivate:[AuthorizationFilter]
            },
            {
                path: 'domenii',
                component: DomainsPage,
                roles: [Role.ADMIN],
                canActivate:[AuthorizationFilter]
            },
        ]
    }
];