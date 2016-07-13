/**
 * Created by NicolaeB on 7/13/2016.
 */

import {style, state, animate, transition, trigger} from "@angular/core";

/*
    @key @flyInOut
    add the key @flyInOut to your Dom element
    add the const as animations array
*/
export const ENTER_LEAVE_ANIMATION = [
    trigger('flyInOut', [
        state('in', style({transform: 'translateX(0)'})),
        transition('void => *', [
            style({transform: 'translateX(-100%)'}),
            animate(100)
        ]),
        transition('* => void', [
            animate(100, style({transform: 'translateX(100%)'}))
        ])
    ])
]