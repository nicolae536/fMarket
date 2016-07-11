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
import {CATEGORIES_PAGE_ROUTE_PROVIDERS} from "./categoriesPage/categories.routes";
import {DEMANDS_PAGE_ROUTE_PROVIDERS} from "./demandsPage/demand.routes";
import {Role} from "../../models/Roles";


export const ADMIN_PAGE_ROUTE_PROVIDERS: RouterConfig = [
    {
        path: 'admin',
        component: AdminPage,
        roles: [Role.ADMIN],
        children: [
            {
                path: 'users',
                component: UsersPage,
                roles: [Role.ADMIN]
            },
            {
                path: 'subscribers',
                component: SubscribersPage,
                roles: [Role.ADMIN]
            },
            {
                path: 'categorii',
                component: CategoriesPage,
                roles: [Role.ADMIN]
            },
            {
                path: 'cereri',
                component: DemandsPage,
                roles: [Role.ADMIN]
            },
            {
                path: 'cerere-detalii/:id',
                component: DemandsEditPage,
                roles: [Role.ADMIN]
            },
            {
                path: 'companii',
                component: CompaniesPage,
                roles: [Role.ADMIN]
            },
            {
                path: 'detalii-companie/:id',
                component: CompaniesEditPage,
                roles: [Role.ADMIN]
            },
            {
                path: 'ceeaza-companie/ceeaza',
                component: CompanieCreatePage,
                roles: [Role.ADMIN]
            },
            ...CATEGORIES_PAGE_ROUTE_PROVIDERS,
            ...DEMANDS_PAGE_ROUTE_PROVIDERS
        ]
    }
];