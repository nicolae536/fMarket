/**
 * Created by NicolaeB on 7/11/2016.
 */

import {RouterConfig } from '@angular/router';
import {AdminPage} from "./adminPage";
import {UsersPage} from "./usersPage/usersPage";
import {SubscribersPage} from "./subscribersPage/subscribersPage";
import {CategoriesPage} from "./categoriesPage/categoriesPage";
import {DemandsPage} from "./demandsPage/demandsPage";
import {DemandsEditPage} from "./demandsPage/demandsEditPage/demandsEditPage";
import {CompaniesPage} from "./categoriesPage/companiesPage/companiesPage";
import {CompaniesEditPage} from "./companiesPage/companiesEditPage/companiesEditPage";
import {CompanieCreatePage} from "./companiesPage/companiesEditPage/companiesCreatePage";
import {CompaniesPage as CompaniesListPage} from "./companiesPage/companiesPage";
import {CATEGORIES_PAGE_ROUTE_PROVIDERS} from "./categoriesPage/categories.routes";
import {DEMANDS_PAGE_ROUTE_PROVIDERS} from "./demandsPage/demand.routes";
import {Role} from "../../models/Roles";
import {AuthorizationFilter} from "../../services/AuthorizationFilter";


export const ADMIN_PAGE_ROUTE_PROVIDERS: RouterConfig = [
    {
        path: 'admin',
        component: AdminPage,
        roles: [Role.ADMIN],
        canActivate: [AuthorizationFilter],
        children: [
            {
                path: 'users',
                component: UsersPage,
                roles: [Role.ADMIN],
                canActivate: [AuthorizationFilter]
            },
            {
                path: 'subscribers',
                component: SubscribersPage,
                roles: [Role.ADMIN],
                canActivate: [AuthorizationFilter]
            },
            {
                path: 'categorii',
                component: CategoriesPage,
                roles: [Role.ADMIN],
                canActivate: [AuthorizationFilter]
            },
            {
                path: 'cereri',
                component: DemandsPage,
                roles: [Role.ADMIN],
                canActivate: [AuthorizationFilter]
            },
            {
                path: 'cerere-detalii/:id',
                component: DemandsEditPage,
                roles: [Role.ADMIN],
                canActivate: [AuthorizationFilter]
            },
            {
                path: 'companii',
                component: CompaniesListPage,
                roles: [Role.ADMIN],
                canActivate: [AuthorizationFilter]
            },
            {
                path: 'detalii-companie/:id',
                component: CompaniesEditPage,
                roles: [Role.ADMIN],
                redirectTo: '',
                canActivate: [AuthorizationFilter]
            },
            {
                path: 'ceeaza-companie/ceeaza',
                component: CompanieCreatePage,
                roles: [Role.ADMIN],
                canActivate: [AuthorizationFilter]
            },
            ...CATEGORIES_PAGE_ROUTE_PROVIDERS,
            ...DEMANDS_PAGE_ROUTE_PROVIDERS
        ]
    }
];