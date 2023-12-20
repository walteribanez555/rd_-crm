import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Size } from './enums/SizeMessage.enum';
import { Observable } from 'rxjs';

@Component({
  styleUrls: ['./notification-modal.component.css'],
  templateUrl: './notification-modal.component.html',
})
export class NotificationModalComponent implements OnInit {
  private elementRef = inject(ElementRef);

  ngOnInit(): void {
    if (this.duration) {
      setTimeout(() => {
        this.onFinish();
      }, this.duration);
    }

    this.servicesNotifier?.subscribe({
      complete: () => {
        this.onFinish();
      },
    });
  }

  @Input() servicesNotifier?: Observable<string>;
  @Input() size? = Size.normal;
  @Input() message?: string;
  @Input() duration?: number | null = null;
  @Input() imageUrl?: string = '';
  @Input() positions?: string = 'center';
  @Input() closeOnTouch?: boolean = false;

  @Output() closeEvent = new EventEmitter();

  onTouchModal() {
    if (this.closeOnTouch) {
      this.onFinish();
    }
  }

  onFinish() {
    this.elementRef.nativeElement.remove();

    this.closeEvent.emit();
  }
}
