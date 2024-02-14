import { ComponentFactoryResolver, Inject, Injectable, Injector, inject } from '@angular/core';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { ModalBeneficiarioComponent } from './modalBeneficiario.component';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ModCardBenService {


  private modalNotifier? : Subject<any>;

  private resolver = inject(ComponentFactoryResolver);
  private injector = inject(Injector)


  constructor(@Inject(DOCUMENT) private document : Document) { }

  open(options : { beneficiario : Beneficiario , servicio : Servicio, travelDate : string }){
    const modalComponentFactory = this.resolver.resolveComponentFactory(ModalBeneficiarioComponent);
    const modalComponent = modalComponentFactory.create(this.injector,[]);

    modalComponent.instance.closeEvent.subscribe(() =>
      this.closeModal()
    );

    modalComponent.instance.submitEvent.subscribe((resp) => {
      this.submitModal(resp);
    })


    modalComponent.instance.beneficiario = options.beneficiario;
    modalComponent.instance.servicio = options.servicio;
    modalComponent.instance.travelDate = options.travelDate;

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
