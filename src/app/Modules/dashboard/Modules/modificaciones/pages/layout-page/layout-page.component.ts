import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutPageComponent { }
