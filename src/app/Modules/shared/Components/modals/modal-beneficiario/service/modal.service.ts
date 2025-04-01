
import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { ModalBeneficiarioComponent } from '../modal-beneficiario.component';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';
import { PolizaExtra } from 'src/app/Modules/core/models/PolizaExtra.model';
import { ExtraPolizaUi } from 'src/app/Modules/dashboard/Modules/polizas/pages/poliza/poliza.component';

@Injectable()
export class ModalBenService {

  private modalNotifier? : Subject<string>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  open(content: TemplateRef<any>, options?: { size?: string; title?: string , servicioUi: ServicioUi, beneficiario : Beneficiario, poliza : Poliza, venta : Venta, isWithPrice : boolean, polizaExtra? : ExtraPolizaUi[] }) {
    const modalComponentFactory = this.resolver.resolveComponentFactory(
      ModalBeneficiarioComponent
    );
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes,
    ]);

    modalComponent.instance.size = options?.size;
    modalComponent.instance.title = options?.title;
    modalComponent.instance.beneficiario = options?.beneficiario;
    modalComponent.instance.servicioUi = options?.servicioUi;
    modalComponent.instance.poliza = options?.poliza;
    modalComponent.instance.venta = options?.venta;
    modalComponent.instance.closeEvent.subscribe(()=> this.closeModal());
    modalComponent.instance.submitEvent.subscribe(() => this.submitModal());
    modalComponent.instance.isWithPrice = options?.isWithPrice;
    modalComponent.instance.polizaExtra = options?.polizaExtra;

    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();

  }

  closeModal() {
    this.modalNotifier?.complete();
  }

  submitModal() {
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }
}
