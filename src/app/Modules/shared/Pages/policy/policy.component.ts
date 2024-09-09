import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent { }
