/**
 * Created by NicolaeB on 7/13/2016.
 */
/**
 * Created by NicolaeB on 7/13/2016.
 */

import {style, state, animate, transition, trigger} from "@angular/core";

/*
 @key @flyInOut
 add the key @flyInOut to your Dom element
 add the const as animations array
 */
export const FADE_IN_ANIMATION = [
    trigger('fadeInOut', [
        state('in', style({
            transform: 'translateX(0)',
            opacity: '1'
        })),
        transition('void => *', [
            style({
                transform: 'translateX(-100%)',
                opacity: '0'
            }),
            animate('700ms ease-in')
        ]),
        transition('* => void', [
            animate('700ms ease-in', style({
                transform: 'translateX(100%)',
                opacity: '0'
            }))
        ])
    ])
]