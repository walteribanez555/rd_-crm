import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  inject,
} from '@angular/core';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import { ServicioUi } from '../../models/Servicio.ui';
import { ModalBenService } from '../modals/modal-beneficiario/service/modal.service';
import { PolizaExtra } from 'src/app/Modules/core/models/PolizaExtra.model';
import { ExtraPolizaUi } from 'src/app/Modules/dashboard/Modules/polizas/pages/poliza/poliza.component';

@Component({
  selector: 'card-beneficiario',
  styleUrls: ['./card-beneficiario.component.css'],
  templateUrl: './card-beneficiario.component.html',
})
export class CardBeneficiarioComponent implements OnInit {
  constructor(private modalService: ModalBenService) {}
  ngOnInit(): void {
    this.cdr.detectChanges();




  }

  private cdr = inject(ChangeDetectorRef);

  @Input() beneficiario?: Beneficiario;
  @Input() servicioUi?: ServicioUi;
  @Input() poliza?: Poliza;
  @Input() venta?: Venta;
  @Input() isWithPrice: boolean = true;
  @Input() polizasExtra? : ExtraPolizaUi[];

  openModal(modalTemplate: TemplateRef<any>) {

    if(this.beneficiario!.segundo_apellido.includes("2")){
      this.isWithPrice = false;
   }



    this.modalService
      .open(modalTemplate, {
        size: 'lg',
        title: 'Walter Ronny Ibañez Saucedo',
        servicioUi: this.servicioUi!,
        beneficiario: this.beneficiario!,
        poliza: this.poliza!,
        venta: this.venta!,
        isWithPrice: this.isWithPrice,
        polizaExtra : this.polizasExtra,
      })
      .subscribe((action: any) => {
        console.log('modalAction', action);
      });
  }
}
