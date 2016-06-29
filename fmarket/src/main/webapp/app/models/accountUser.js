/**
 * Created by nick_ on 6/2/2016.
 */
"use strict";
var AccountUser = (function () {
    function AccountUser() {
        this.email = '';
        this.name = '';
        this.phone = '';
        this.cityItem = '';
        this.lastPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
        this.cityId = -1;
    }
    return AccountUser;
}());
exports.AccountUser = AccountUser;
//# sourceMappingURL=accountUser.js.map