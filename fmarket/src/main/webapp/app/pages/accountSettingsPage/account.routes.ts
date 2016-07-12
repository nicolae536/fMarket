import {AccountSettingsPage} from "./accountSettingsPage";
import {AccountEditPage} from "./accountEditPage/accountEditPage";
import {AccountDemandsPage} from "./accountDemandsPage/accountDemandsPage";
import {Role} from "../../models/Roles";
import {RouterConfig} from "@angular/router";

export const ACCOUNT_SETTINGS_PAGE_ROUTE_PROVIDERS:RouterConfig = [
    {
        path: 'account',
        component: AccountSettingsPage,
        roles: [Role.USER],
        children: [
            {
                path: 'details',
                component: AccountEditPage,
                roles: [Role.USER]
            },
            {
                path: 'demands',
                component: AccountDemandsPage,
                roles: [Role.USER]
            }
        ]
    }
];
