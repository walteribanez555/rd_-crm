import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'extra-detail',
  templateUrl: './extraDetail.component.html',
  styleUrls: ['./extraDetail.component.css'],
})
export class ExtraDetailComponent {
  constructor(private elementRef: ElementRef) {}

  @Input() title?: string;

  @Input() description?: string;

  @Input() icono?  : string;

  @Output() closeEvent = new EventEmitter();

  onClose() {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }
}
