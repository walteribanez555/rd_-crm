import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { ServicioUi } from '../../../models/Servicio.ui';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';




@Component({
  selector: 'poliza-pdf',
  templateUrl: './poliza-pdf.component.html',
  styleUrls: ['./poliza-pdf.component.css']
})
export class PolizaPdfComponent  implements OnInit {
  ngOnInit(): void {

    console.log(this.poliza);
    console.log(this.beneficiario);
    console.log(this.servicioUi);



    this.qrCode = `https://redcardassist.com.bo/confirm?polizas=${this.poliza?.poliza_id?? this.poliza?.id!}`
  }
  qrCode = "Holamundo";


  @Input() beneficiario? : Beneficiario;
  @Input() servicioUi? : ServicioUi;
  @Input() poliza? : Poliza;
  @Input() venta? : Venta;
  actualDate = new Date().toDateString();


  @Output()  isLoaded = new EventEmitter<number>()


  onLoadedQr(event :any ){
    this.isLoaded.emit(1);

  }




}
