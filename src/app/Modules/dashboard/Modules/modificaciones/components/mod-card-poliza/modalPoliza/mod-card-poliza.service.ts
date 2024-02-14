import { ComponentFactoryResolver, Inject, Injectable, Injector, inject } from '@angular/core';
import { ModalPolizaComponent } from './modalPoliza.component';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';

@Injectable({
  providedIn: 'root'
})
export class ModCardPolizaService {


  private modalNotifier? : Subject<any>;

  private resolver = inject(ComponentFactoryResolver);
  private injector = inject(Injector)


  constructor(@Inject(DOCUMENT) private document : Document) { }

  open(options : { poliza : Poliza }){
    const modalComponentFactory = this.resolver.resolveComponentFactory(ModalPolizaComponent);
    const modalComponent = modalComponentFactory.create(this.injector,[]);

    modalComponent.instance.closeEvent.subscribe(() =>
      this.closeModal()
    );

    modalComponent.instance.submitEvent.subscribe((resp) => {
      this.submitModal(resp);
    })


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
