import { trigger, state, style, animate, transition } from '@angular/animations';

export const FadeInOut = trigger('fadeInOut', [
    state('void', style({ opacity: 0 })),
    transition(':enter, :leave', [
      animate('1s', style({ opacity: 1 })),
    ])
  ]);
