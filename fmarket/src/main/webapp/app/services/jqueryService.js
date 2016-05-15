"use strict";
var $ = require('jquery');
var animateScroll = require('animateScroll');
_.extend($, { animateScroll: animateScroll });
var JqueryService = (function () {
    function JqueryService() {
    }
    JqueryService.animateScroll = function (element, animation, scrollSpeed) {
        var aditionalHeight = this.isMobile() ? 50 : 0;
        $(element.nativeElement)['animatescroll']({ scrollSpeed: scrollSpeed, easing: animation, aditionalHeight: aditionalHeight });
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
    JqueryService.setPageHeight = function (nativeElement) {
        var height = $(window).height();
        if (this.isMobile()) {
            return;
        }
        var pageHeight = height - 50 - 101;
        $(nativeElement).height(pageHeight);
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
    JqueryService.isMobile = function () {
        if (sessionStorage['desktop'])
            return false;
        else if (localStorage['mobile'])
            return true;
        // alternative
        var mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
        for (var i in mobile)
            if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0)
                return true;
        // nothing found.. assume desktop
        return false;
    };
    return JqueryService;
}());
exports.JqueryService = JqueryService;
//# sourceMappingURL=jqueryService.js.map