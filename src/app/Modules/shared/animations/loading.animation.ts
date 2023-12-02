import { trigger, state, style, transition, animate } from '@angular/animations';

export const loadingAnimation = trigger('loadingAnimation', [
  state('show', style({
    opacity: 1
  })),
  state('hide', style({
    opacity: 0,
    display: 'none'
  })),
  transition('show <=> hide', animate('500ms ease-in-out'))
]);