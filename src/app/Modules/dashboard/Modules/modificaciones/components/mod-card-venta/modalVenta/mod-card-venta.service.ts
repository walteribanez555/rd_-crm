import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Inject, Injectable, Injector, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import { ModalVentaComponent } from './modalVenta.component';

@Injectable({
  providedIn: 'root'
})
export class ModCardVentaService {

  private modalNotifier? : Subject<Venta>;

  private resolver = inject(ComponentFactoryResolver);
  private injector = inject(Injector)


  constructor(@Inject(DOCUMENT) private document : Document) { }

  open(options : { venta : Venta }){
    const modalComponentFactory = this.resolver.resolveComponentFactory(ModalVentaComponent);
    const modalComponent = modalComponentFactory.create(this.injector,[]);

    modalComponent.instance.closeEvent.subscribe(() =>
      this.closeModal()
    );

    modalComponent.instance.submitEvent.subscribe((resp) => {
      this.submitModal(resp);
    })


    modalComponent.instance.venta = options.venta;

    modalComponent.hostView.detectChanges();


    this.document.body.appendChild(modalComponent.location.nativeElement);

    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();

  }

  closeModal() {
    this.modalNotifier?.complete();
  }

  submitModal(resp : Venta) {
    this.modalNotifier?.next(resp);
    this.closeModal();
  }


}
