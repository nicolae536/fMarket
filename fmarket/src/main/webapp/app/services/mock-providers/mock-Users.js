System.register(["../../models/user"], function(exports_1) {
    var user_1, user_2;
    var USERS;
    return {
        setters:[
            function (user_1_1) {
                user_1 = user_1_1;
                user_2 = user_1_1;
            }],
        execute: function() {
            exports_1("USERS", USERS = [
                new user_1.User(1, "asd", "def@def.com", "user", user_2.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
                new user_1.User(9, "asdg", "asd@def.com", "user", user_2.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
                new user_1.User(2, "zxcb", "gadf@def.com", "user", user_2.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
                new user_1.User(4, "qerg", "zxcb@def.com", "user", user_2.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
                new user_1.User(5, "bsdf", "q3t@def.com", "user", user_2.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
                new user_1.User(6, "adbv", "cxz@def.com", "user", user_2.AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10, "asd"),
            ]);
        }
    }
});
//# sourceMappingURL=mock-Users.js.map