import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tag',
  template: `
    <span class="tag">
      {{ tag }}
    </span>
  `,
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
  @Input() tag!: string;
}
