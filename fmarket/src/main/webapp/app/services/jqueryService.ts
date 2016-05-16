/**
 * Created by nick_ on 5/9/2016.
 */
import {ElementRef} from "@angular/core";
import * as $ from 'jquery';
import * as animateScroll from 'animateScroll';

_.extend($, {animateScroll: animateScroll});

export class JqueryService {
    public static animateScroll(element:ElementRef, animation:string, scrollSpeed:number) {
        let aditionalHeight = this.isMobile() ? 50 : 0;
        $(element.nativeElement)['animatescroll']({scrollSpeed: scrollSpeed, easing: animation, aditionalHeight:aditionalHeight})
    }

    static makeElementsOfSameHeight(nativeElement:any, param2:any[]) {
        let height = $(nativeElement).height();

        if(this.isMobile()){
            height +=height;
        }
        _.each(param2, (param)=> {
            $(param).height(height);
        })
    }

    static getElementHeight(nativeElement) {
        return $(nativeElement).height();
    }

    static setPageHeight(nativeElement){
        let height = $(window).height();

        if(this.isMobile()){
            return;
        }

        let pageHeight = height-50-101;

        $(nativeElement).height(pageHeight);
    }

    static fitChildItemsInContainer(nativeElement:any) {
        let height = $(nativeElement).height();


        let childrens = $(nativeElement).children();

        let childrenHeight = height / childrens.length;
        let childrenMarginBottom = 3.33 * height / 100;
        childrenHeight -= childrenMarginBottom;
        childrenHeight += childrenMarginBottom/(childrens.length-1);

        _.each($(nativeElement).children(), (child, index)=> {
            if(index=== childrens.length -1){
                childrenHeight=height-childrenHeight*(childrens.length-1)-childrenMarginBottom*(childrens.length-1);
                childrenMarginBottom = 0;
            }
            $(child).height(childrenHeight).css('marginBottom', childrenMarginBottom).css('maxHeight', childrenHeight);
        })
    }

    static isMobile(){
        if (sessionStorage['desktop']) // desktop storage
            return false;
        else if (localStorage['mobile']) // mobile storage
            return true;

        // alternative
        var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
        for (var i in mobile) if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;

        // nothing found.. assume desktop
        return false;
    }
}
