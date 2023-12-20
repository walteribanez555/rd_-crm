import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `<p>loading works!</p>`,
  styleUrls: ['./loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
