
import {AccountStatus} from "../../models/accountStatus";
export var STATUS = [
    {status: null, displayName: "Chose..."},
    {status: AccountStatus.AUTO, displayName: "AUTO"},
    {status: AccountStatus.ACTIVE, displayName: "ACTIVE"},
    {status: AccountStatus.DISABLED, displayName: "DISABLED"},
    {status: AccountStatus.PENDING, displayName: "PENDING"}];