import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Inject, Injectable, Injector, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import { ModalVentaComponent } from './modalVenta.component';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';

@Injectable({
  providedIn: 'root'
})
export class ModCardVentaService {

  private modalNotifier? : Subject<any>;

  private resolver = inject(ComponentFactoryResolver);
  private injector = inject(Injector)


  constructor(@Inject(DOCUMENT) private document : Document) { }

  open(options : { venta : Venta, poliza : Poliza }){
    const modalComponentFactory = this.resolver.resolveComponentFactory(ModalVentaComponent);
    const modalComponent = modalComponentFactory.create(this.injector,[]);

    modalComponent.instance.closeEvent.subscribe(() =>
      this.closeModal()
    );

    modalComponent.instance.submitEvent.subscribe((resp) => {
      this.submitModal(resp);
    })


    modalComponent.instance.venta = options.venta;
    modalComponent.instance.poliza = options.poliza;

    modalComponent.hostView.detectChanges();


    this.document.body.appendChild(modalComponent.location.nativeElement);

    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();

  }

  closeModal() {
    this.modalNotifier?.complete();
  }

  submitModal(resp : any) {
    this.modalNotifier?.next(resp);
    this.closeModal();
  }


}
