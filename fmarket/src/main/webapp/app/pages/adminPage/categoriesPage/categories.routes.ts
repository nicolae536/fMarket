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

export const CATEGORIES_PAGE_ROUTE_PROVIDERS: RouterConfig = [
    {
        path: 'categorii',
        component: CategoriesPage,
        children: [
            {
                path: 'meniu',
                component: CategoriesMenuPage,
            },
            {
                path: 'firme',
                component: CompaniesPage,
            },
            {
                path: 'domenii',
                component: DomainsPage,
            },
        ]
    }
];