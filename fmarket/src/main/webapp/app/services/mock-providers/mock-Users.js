System.register(["../../models/user"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_1;
    var USERS;
    return {
        setters:[
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            exports_1("USERS", USERS = [
                new user_1.User(1, "asd", "def@def.com", "user", "Active", new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10),
                new user_1.User(9, "asdg", "asd@def.com", "user", "Active", new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10),
                new user_1.User(2, "zxcb", "gadf@def.com", "user", "Active", new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10),
                new user_1.User(4, "qerg", "zxcb@def.com", "user", "Active", new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10),
                new user_1.User(5, "bsdf", "q3t@def.com", "user", "Active", new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10),
                new user_1.User(6, "adbv", "cxz@def.com", "user", "Active", new Date(), new Date(), new Date(), new Date(), new Date(), 12, "Cluj", 10, 10),
            ]);
        }
    }
});
//# sourceMappingURL=mock-Users.js.map