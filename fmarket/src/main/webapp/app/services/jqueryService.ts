/**
 * Created by nick_ on 5/9/2016.
 */
import {ElementRef} from "@angular/core";

export class JqueryService {
    public static animateScroll(element:ElementRef, animation:string, scrollSpeed:number) {
        $(element.nativeElement).animatescroll({scrollSpeed: scrollSpeed, easing: animation})
    }

    static makeElementsOfSameHeight(nativeElement:any, param2:any[]) {
        let height = $(nativeElement).height();

        _.each(param2, (param)=> {
            $(param).height(height);
        })
    }

    static getElementHeight(nativeElement) {
        return $(nativeElement).height();
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
            $(child).height(childrenHeight).css('marginBottom', childrenMarginBottom);
        })
    }
}
