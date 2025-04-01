import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { ServicioUi } from '../../../models/Servicio.ui';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import { countrys } from '../../../utils/data/countries-lng';
import { Translations } from '../../../utils/data/countries-region.ts/country-region-lng';
import { obtenerNombreTraducido } from '../../../utils/filters/country-filter';
import { PolizaExtra } from 'src/app/Modules/core/models/PolizaExtra.model';
import { ExtraPolizaUi } from 'src/app/Modules/dashboard/Modules/polizas/pages/poliza/poliza.component';




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
    console.log({extrasPoliza : this.extrasPoliza});



    this.qrCode = `https://redcardassist.com.bo/confirm?polizas=${this.poliza?.poliza_id?? this.poliza?.id!}`
  }
  qrCode = "Holamundo";


  @Input() beneficiario? : Beneficiario;
  @Input() servicioUi? : ServicioUi;
  @Input() poliza? : Poliza;
  @Input() venta? : Venta;
  @Input() isWithPrice = true;
  @Input() extrasPoliza? : ExtraPolizaUi[];
  actualDate = new Date().toDateString();


  @Output()  isLoaded = new EventEmitter<number>()


  onLoadedQr(event :any ){
    this.isLoaded.emit(1);

  }




  getDestinyByIso2(iso2 : string){
    if(iso2.length > 2) {
      return iso2;
    }


    const country= countrys.filter( country =>  country.iso2 === iso2 )[0];

    const lang: keyof Translations | null = localStorage.getItem('lang') as keyof Translations | 'es';

    return obtenerNombreTraducido(country, lang!);

  }
  isWithEuros( iso2 : string) {
    const destinies = iso2.split(',');


    if(destinies[destinies.length -1].toLocaleLowerCase() == "cancun"){
      return false;
    }


    if(destinies[destinies.length -1].toLocaleLowerCase().startsWith('eur')){
      return true;
    }


    const country = countrys.filter( country => country.iso2.toLocaleLowerCase() === destinies[destinies.length -1].toLocaleLowerCase() )[0];

    if ( country.region.toLocaleLowerCase().startsWith('eur')){
      return true;
    }

    return false;

    // Europe



  }




}
