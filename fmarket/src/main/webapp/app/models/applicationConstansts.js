System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ApplicationConstants;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by nick_ on 5/5/2016.
             */
            ApplicationConstants = (function () {
                function ApplicationConstants() {
                }
                ApplicationConstants.ACTIVE_USER_STATE = "ACTIVE-USER-STATE";
                ApplicationConstants.SECOND = 1000;
                ApplicationConstants.MINUTE = 60000;
                ApplicationConstants.HOUR = 3600000;
                return ApplicationConstants;
            }());
            exports_1("ApplicationConstants", ApplicationConstants);
        }
    }
});
//# sourceMappingURL=applicationConstansts.js.map