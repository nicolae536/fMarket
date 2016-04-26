System.register(["../../models/user", "../../models/accountStatus"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_1, accountStatus_1;
    var USERS;
    return {
        setters:[
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (accountStatus_1_1) {
                accountStatus_1 = accountStatus_1_1;
            }],
        execute: function() {
            exports_1("USERS", USERS = [
                new user_1.User(1, "asd", "def@def.com", "user", accountStatus_1.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
                new user_1.User(9, "asdg", "asd@def.com", "user", accountStatus_1.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
                new user_1.User(2, "zxcb", "gadf@def.com", "user", accountStatus_1.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
                new user_1.User(4, "qerg", "zxcb@def.com", "user", accountStatus_1.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
                new user_1.User(5, "bsdf", "q3t@def.com", "user", accountStatus_1.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
                new user_1.User(6, "adbv", "cxz@def.com", "user", accountStatus_1.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
            ]);
        }
    }
});
//# sourceMappingURL=mock-Users.js.map