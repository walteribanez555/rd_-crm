import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { countries } from 'src/app/Modules/shared/utils/data/countries';
import {  state_cities } from 'src/app/Modules/shared/utils/data/states';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, AfterViewInit {
  @Output() onChangePage = new EventEmitter();
  @Output() onBackStep = new EventEmitter();

  private sanitizer = inject(DomSanitizer);

  isReadyPayment: boolean = false;

  checkoutForm?: FormGroup;

  constructor() {}

  private elRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);

  @Input() proccessForms!: FormGroup[];
  @Input() onPageChanged?: Observable<any>;
  createIntentPayment: number | null = null;

  ngAfterViewInit(): void {
    this.onPageChanged?.subscribe({
      next: (actualStep) => {
        if (actualStep === 7) {
          const formElement =
            this.elRef.nativeElement.querySelector('#ID-FORM');

          if (formElement) {
            this.renderer.listen(formElement, 'submit', (event) => {
              console.log(formElement);
              console.log(event);

              this.isReadyPayment = true;
              this.cdr.detectChanges();
            });
          }
        }
      },
    });
  }

  getPaymentIntentReady() {
    return this.isReadyPayment;
  }

  ngOnInit(): void {
    this.onPageChanged?.subscribe({
      next: (actualStep) => {
        if (actualStep === 7) {
          this.createIntentPayment = actualStep;
          this.payment_amount =
            this.proccessForms[5].get('ventaData')?.value.totalPago;
          this.htmlContent = this.createInjectPaymentForm();
          this.cdr.detectChanges();
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }



  citiesMappedToForm  = state_cities.map(city_state => `<option value=${city_state.name}>${city_state.name}</option>`);

  countriesMappedToForm = countries.map(country => `<option value=${country['Code']}>${country.Name}</option>`);





  createInjectPaymentForm() {
    return this.sanitizer
      .bypassSecurityTrustHtml(`<form target="payments"   action="https://www.livees.net/Checkout/api4" method="POST" id="ID-FORM">
  <input type="hidden" name="_"    value="7ivl54rybfz1eg2u864conm0sxb2th1a3k878waje5cqp961d">
  <input type="hidden" name="__" value="37iohn566gle80fmfqrcd4tx27wk439busaje3804pvy5b2z1">
  <input type="hidden" name="postURL" value="http://192.168.0.12:4300/landing-page/confirm-payment">
  <input type="hidden" name="amt2" value="${this.payment_amount}">
  <input type="hidden" name="currency" value="USD">
  <input type="hidden" name="invno" value="POLIZAS">
  <input type="text" name="name" value="" required placeholder="Nombres">
  <input type="text" name="lastname" required value="" placeholder="Apellidos">
  <input type="email" name="email" required value="" placeholder="redcard@gmail.com">
  <select name="pais" required >
      ${this.countriesMappedToForm}
  </select>
  <input type="text" required name="ciudad" value="Santa Cruz de la Sierra">
  <select name="estado_lbl" required >
      ${this.citiesMappedToForm}
  </select>
  <input type="text" name="direccion"  required value="" placeholder="direccion">
  <input type="text" name="zip" required value="" placeholder="zip">
  <input type="tel" name="phone" required value="" placeholder="591 77777777">
  <input type="hidden" required name="param2" value='[{"id":"1","name":"polizas","price":"${this.payment_amount}","quantity":"1"}]'>
  <input type="submit" value="Confirmar Detalles">
  </form>


  `);
  }

  payment_amount = 0;

  htmlContent: SafeHtml | null = null;

  paymentFragment = this.sanitizer
    .bypassSecurityTrustHtml(`<iframe id="payments" name="payments"     >
  </iframe>`);

  onChangeStep() {
    this.onChangePage.emit();
  }

  onBackStepBtn() {
    this.onBackStep.emit();
  }
}
