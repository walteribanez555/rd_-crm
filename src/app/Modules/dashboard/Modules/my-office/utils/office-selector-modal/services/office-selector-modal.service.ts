import { ComponentFactoryResolver, Inject, Injectable, Injector, inject } from '@angular/core';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { OfficeSelectorModalComponent } from '../office-selector-modal.component';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn : 'root'
})
export class OfficeSelectorModalService {

  constructor(
    @Inject(DOCUMENT) private documet : Document
  ) { }


  private resolser = inject(ComponentFactoryResolver);
  private injector = inject(Injector);
  private modalNotifier? : Subject<Oficina | null>


  open( options : {  listOficces : Oficina[] }){

    const  modalComponentFactory = this.resolser.resolveComponentFactory(OfficeSelectorModalComponent);
    const modalComponent = modalComponentFactory.create(this.injector);

    console.log({offices : options.listOficces});

    modalComponent.instance.offices = options.listOficces;

    modalComponent.instance.closeEvent.subscribe( () => {
      this.closeModal();
    });

    modalComponent.instance.submitEvent.subscribe( ( oficina : Oficina | null ) => {
      this.submitModal(oficina);
    })


    modalComponent.hostView.detectChanges();

    this.documet.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier.asObservable();
  }

  closeModal() {
    this.modalNotifier?.complete();

  }

  submitModal(oficina : Oficina | null) {
    this.modalNotifier?.next(oficina);
    this.closeModal();
  }

}
