import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  inject,
} from '@angular/core';
import { ModalService } from '../modal-plan-details/services/modal-service';
import { Observable } from 'rxjs';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent implements OnInit {
  @Input() servicioUi!: ServicioUi;
  tags: string[] = [];

  @Output() onItemSelected = new EventEmitter<ServicioUi>();

  @Input() onSelectedItem?: Observable<ServicioUi>;

  priceWithDiscount = 0;

  private http = inject(HttpClient);

  getDiscount(servicioUi: ServicioUi) {
    if (servicioUi.listcupones.length > 0) {
      const totalAmountDiscount = servicioUi.listcupones.reduce(
        (acc, coupon) => {
          if (coupon.tipo_valor === 2 && !coupon.oficina_id) {
            // If coupon type is 1, add the fixed value to the accumulator
            return acc + coupon.valor;
          } else if (coupon.tipo_valor === 1 && !coupon.oficina_id) {
            // If coupon type is 2, calculate the percentage discount and subtract it from the accumulator
            return acc + (servicioUi.precioSelected! * coupon.valor) / 100;
          }
          return acc; // For unknown coupon types, return accumulator without any changes
        },
        0
      );


      this.priceWithDiscount = servicioUi.precioSelected! - totalAmountDiscount;

      if(servicioUi.precioSelected == this.priceWithDiscount) return false;

      return true;

    }

    return false;
  }

  constructor(private modalService: ModalService) {}
  ngOnInit(): void {
    this.tags = this.servicioUi.disponibilidad.split(',');

    this.onSelectedItem?.subscribe({
      next: (servicioSelected) => {
        if (servicioSelected.servicio_id != this.servicioUi.servicio_id) {
          this.servicioUi.isSelected = false;
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, this.servicioUi, {
        size: 'lg',
        title: this.servicioUi.servicio,
      })
      .subscribe((action: any) => {
        console.log('modalAction', action);
      });
  }

  changeState() {
    this.servicioUi.isSelected = !this.servicioUi.isSelected;

    this.onItemSelected.emit(this.servicioUi);
  }

  downloadPdf() {
    const pdfUrl = `/assets/pdf/${this.servicioUi.img}.pdf`;

    // Use HttpClient to fetch the PDF file as a Blob
    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.servicioUi.img}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Clean up resources
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}
