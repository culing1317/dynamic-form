import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state
} from '@angular/animations';

// Routable animations
export const OverlayAnimation =
  trigger('overlayTrigger', [
    state('closed', style({ transform: 'scale(0)' })),
    transition(':enter', [
      style({ transform: 'scale(.6)' }),
      animate(100)
    ]),
    transition('* => closed', [
      animate(100, style({ transform: 'scale(.6)' }))
    ])
  ]);

export const MaskAnimation =
  trigger('maskTrigger', [
    state('closed', style({
      opacity: 0
    })),
    transition(':enter', [
      style({ opacity: 0 }),
      animate(100, style({ opacity: 1 })),
    ]),
    transition('* => closed', [
      animate(100, style({ opacity: 0 })),
    ])
  ]);
