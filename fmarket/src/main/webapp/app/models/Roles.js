System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Role;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by nick_ on 5/5/2016.
             */
            Role = (function () {
                function Role() {
                }
                Role.ADMIN = 'ADMIN';
                Role.USER = 'USER';
                Role.ANONYMUS = 'ANONYMUS';
                return Role;
            }());
            exports_1("Role", Role);
        }
    }
});
//# sourceMappingURL=Roles.js.map