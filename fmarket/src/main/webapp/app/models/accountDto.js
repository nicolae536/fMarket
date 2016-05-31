"use strict";
/**
 * Created by NicolaeB on 4/27/2016.
 */
var AccountDto = (function () {
    function AccountDto(id, email, type, status, creationDate, closedDate, activationDate, lastPasswordChangeDate, lastLoginDate, lastAutoLoginDate, name, cityId, city, loginTimes, autoLoginTimes, cityItem, newPassword) {
        this.id = id;
        this.email = email;
        this.accountType = type;
        this.status = status;
        this.creationDate = creationDate;
        this.closedDate = closedDate;
        this.activationDate = activationDate;
        this.lastPasswordChangeDate = lastPasswordChangeDate;
        this.lastLoginDate = lastLoginDate;
        this.lastAutoLoginDate = lastAutoLoginDate;
        this.name = name;
        this.cityId = cityId;
        this.city = city;
        this.loginTimes = loginTimes;
        this.autoLoginTimes = autoLoginTimes;
        this.cityItem = cityItem;
        this.newPassword = newPassword;
    }
    AccountDto.getEmptyInstance = function () {
        return new AccountDto(-1, '', '', '', (new Date()).toLocaleDateString(), (new Date()).toLocaleDateString(), (new Date()).toLocaleDateString(), (new Date()).toLocaleDateString(), (new Date()).toLocaleDateString(), (new Date()).toLocaleDateString(), '', null, '', 0, 0, null, '');
    };
    return AccountDto;
}());
exports.AccountDto = AccountDto;
//# sourceMappingURL=accountDto.js.map