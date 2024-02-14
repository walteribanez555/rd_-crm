import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ExtraDetailComponent } from './extraDetail.component';

@Injectable({
  providedIn: 'root'
})
export class ExtraDetailService {


  private modalNotifier? : Subject<string>

  constructor(

    private resolver : ComponentFactoryResolver,
    private injector : Injector,
    @Inject(DOCUMENT) private document  : Document,

  ) { }



  open(content : TemplateRef<any>, options? : {title: string, description : string, icono : string}){
      const modalComponentFactory = this.resolver.resolveComponentFactory(
        ExtraDetailComponent
      );
      const contentViewRef = content.createEmbeddedView(null);
      const modalComponent = modalComponentFactory.create(this.injector,[
        contentViewRef.rootNodes,
      ])

      modalComponent.instance.title = options?.title;
      modalComponent.instance.description = options?.description;
      modalComponent.instance.icono = options?.icono;
      modalComponent.instance.closeEvent.subscribe(() => this.closeModal());

      modalComponent.hostView.detectChanges();

      this.document.body.appendChild(modalComponent.location.nativeElement);
      this.modalNotifier = new Subject();
      return this.modalNotifier.asObservable();
  }

  closeModal() {


    this.modalNotifier?.complete();
  }


}
