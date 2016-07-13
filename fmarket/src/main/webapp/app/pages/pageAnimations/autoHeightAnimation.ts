/**
 * Created by NicolaeB on 7/13/2016.
 */
import {style, state, animate, transition, trigger} from "@angular/core";

/*
 @key @shrinkIn
 add the key @shrinkIn to your Dom element
 add the const as animations array
 */
export const AUTO_HEIGHT_ANIMATION = [
    trigger('shrinkIn', [
        state('in', style({height: '*'})),
        transition('void => *', [
            style({height: '*'}),
            animate(250, style({height: '*'}))
        ]),
        transition('* => *', [
            style({height: '*'}),
            animate(250, style({height: '*'}))
        ])
    ])
]