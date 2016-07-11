/**
 * Created by NicolaeB on 7/11/2016.
 */
import  {RouterConfig } from '@angular/router';

import {AccountEditPage} from "./accountEditPage/accountEditPage";
import {AccountDemandsPage} from "./accountDemandsPage/accountDemandsPage";
import {AccountSettingsPage} from "./accountSettingsPage";
import {Role} from "../../models/Roles";

export const ACCOUNT_SETTINGS_PAGE_ROUTE_PROVIDERS: RouterConfig = [
    {
        path: 'account',
        component: AccountSettingsPage,
        roles: [Role.USER],
        children: [
            {
                path: 'details',
                component: AccountEditPage,
            },
            {
                path: 'demands',
                component: AccountDemandsPage,
            }
        ]
    }
];