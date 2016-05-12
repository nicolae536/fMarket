"use strict";
var JqueryService = (function () {
    function JqueryService() {
    }
    JqueryService.animateScroll = function (element, animation, scrollSpeed) {
        $(element.nativeElement).animatescroll({ scrollSpeed: scrollSpeed, easing: animation });
    };
    JqueryService.makeElementsOfSameHeight = function (nativeElement, param2) {
        var height = $(nativeElement).height();
        _.each(param2, function (param) {
            $(param).height(height);
        });
    };
    JqueryService.getElementHeight = function (nativeElement) {
        return $(nativeElement).height();
    };
    JqueryService.fitChildItemsInContainer = function (nativeElement) {
        var height = $(nativeElement).height();
        var childrens = $(nativeElement).children();
        var childrenHeight = height / childrens.length;
        var childrenMarginBottom = 3.33 * height / 100;
        childrenHeight -= childrenMarginBottom;
        childrenHeight += childrenMarginBottom / (childrens.length - 1);
        _.each($(nativeElement).children(), function (child, index) {
            if (index === childrens.length - 1) {
                childrenHeight = height - childrenHeight * (childrens.length - 1) - childrenMarginBottom * (childrens.length - 1);
                childrenMarginBottom = 0;
            }
            $(child).height(childrenHeight).css('marginBottom', childrenMarginBottom);
        });
    };
    return JqueryService;
}());
exports.JqueryService = JqueryService;
//# sourceMappingURL=jqueryService.js.map