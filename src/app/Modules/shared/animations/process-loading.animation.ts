import { trigger, state, style, animate, transition } from '@angular/animations';


export const LoadingProcessAnimation = trigger('process-loading', [
  state('loading', style({ opacity: 1 })),
  state('ready', style({ opacity: 0 })),
  transition('loading => ready', animate('1000ms ease-out')),
  transition('ready => loading', animate('1000ms ease-in'))
]);
