import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
} from '@angular/core';
import { NotificationModalComponent } from './notification-modal.component';
import { Observable, Subject } from 'rxjs';
import { PositionMessage } from './enums/PositionMessage.enum';
import { Size } from './enums/SizeMessage.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private modalNotifier?: Subject<string>;
  private ComponentNotifier?: Observable<String>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  show(
    message: string,
    options?: {
      size: Size;
      duration?: number;
      imageUrl?: string;
      positions?: PositionMessage[];
      notifier?: Observable<string>;
      closeOnTouch?: boolean;
    }
  ) {
    console.log(message, options);

    const modalComponentFactory = this.resolver.resolveComponentFactory(
      NotificationModalComponent
    );

    const modalComponent = modalComponentFactory.create(this.injector, []);

    modalComponent.instance.duration = options?.duration;
    modalComponent.instance.message = message;
    modalComponent.instance.size = options?.size;
    modalComponent.instance.imageUrl = options?.imageUrl;
    modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
    modalComponent.instance.positions = options?.positions
      ?.map((position) => position.toString())
      .join(' ');
    modalComponent.instance.servicesNotifier = options?.notifier;
    modalComponent.instance.closeOnTouch = options?.closeOnTouch;

    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.modalNotifier?.complete();
  }
}
