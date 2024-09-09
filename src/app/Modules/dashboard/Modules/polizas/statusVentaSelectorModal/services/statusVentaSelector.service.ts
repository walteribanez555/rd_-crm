import { ComponentFactoryResolver, Inject, Injectable, Injector, inject } from '@angular/core';
import { StatusVentaSelectorModalComponent } from '../statusVentaSelectorModal.component';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StatusVentaSelectorService {

  constructor(
    @Inject(DOCUMENT) private documet : Document
  ) { }


  private resolser = inject(ComponentFactoryResolver);
  private injector = inject(Injector);
  private modalNotifier? : Subject<number | null>


  open( options : {  }){

    const  modalComponentFactory = this.resolser.resolveComponentFactory(StatusVentaSelectorModalComponent);
    const modalComponent = modalComponentFactory.create(this.injector);


    modalComponent.instance.closeEvent.subscribe( () => {
      this.closeModal();
    });

    modalComponent.instance.submitEvent.subscribe( ( status : number ) => {
      this.submitModal(status);
    })


    modalComponent.hostView.detectChanges();

    this.documet.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier.asObservable();
  }

  closeModal() {
    this.modalNotifier?.complete();

  }

  submitModal(status : number) {
    this.modalNotifier?.next(status);
    this.closeModal();
  }

}
