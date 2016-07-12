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

export const CATEGORIES_PAGE_ROUTE_PROVIDERS: RouterConfig = [
    {
        path: 'categorii',
        component: CategoriesPage,
        roles: [Role.ADMIN],
        children: [
            {
                path: 'meniu',
                component: CategoriesMenuPage,
                roles: [Role.ADMIN]
            },
            {
                path: 'firme',
                component: CompaniesPage,
                roles: [Role.ADMIN]
            },
            {
                path: 'domenii',
                component: DomainsPage,
                roles: [Role.ADMIN]
            },
        ]
    }
];