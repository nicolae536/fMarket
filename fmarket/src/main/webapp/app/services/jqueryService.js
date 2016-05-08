"use strict";
var JqueryService = (function () {
    function JqueryService() {
    }
    JqueryService.animateScroll = function (element, animation, scrollSpeed) {
        $(element.nativeElement).animatescroll({ scrollSpeed: scrollSpeed, easing: animation });
    };
    return JqueryService;
}());
exports.JqueryService = JqueryService;
//# sourceMappingURL=jqueryService.js.map