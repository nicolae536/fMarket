/**
 * Created by nick_ on 5/9/2016.
 */
import {ElementRef} from "@angular/core";

export class JqueryService {
    public static animateScroll(element:ElementRef, animation:string, scrollSpeed:number){
        $(element.nativeElement).animatescroll({scrollSpeed:scrollSpeed, easing:animation})
    }
}
