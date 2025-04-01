import {  Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, forkJoin, map, switchMap } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Beneficio } from 'src/app/Modules/core/models/Beneficio.model';
import { Catalogo } from 'src/app/Modules/core/models/Catalogo.model';
import { Cupon } from 'src/app/Modules/core/models/Cupon.model';
import { Descuento } from 'src/app/Modules/core/models/Descuento.model';
import { Extra } from 'src/app/Modules/core/models/Extra.model';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Precio } from 'src/app/Modules/core/models/Precio.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import { BeneficiariosService, BeneficiosService, CatalogosService, CuponesService, ExtrasService, PlanesService, PolizasService, PreciosService, ServiciosService, VentasService } from 'src/app/Modules/core/services';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { ServByPlan } from '../../components/multi-step/multi-step.component';
import { MapToServicioUi } from 'src/app/Modules/shared/utils/mappers/servicio.mappers';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { PolizaExtra } from 'src/app/Modules/core/models/PolizaExtra.model';
import { PolizasExtrasService } from 'src/app/Modules/core/services/polizas-extras.service';
import { ExtraPolizaUi } from '../poliza/poliza.component';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent  implements OnInit {
  private oficinaService = inject( OficinasService);


  isWithPrice = true;

  ngOnInit(): void {
    const data = this.activeParams.snapshot.queryParams['polizas']

    const polizas_id : string[]   = data.split(',');
    const requests : any[] = [];




    const process = new Subject();
    const observerProcess = process.asObservable();
    this.onLoading(observerProcess);


    polizas_id.forEach(poliza =>
        requests.push(this.polizasService.getOne(poliza))
      )

    forkJoin(requests).pipe(
      switchMap( resp => {
        this.polizas = resp.flat();
        const requests = this.polizas.map( poliza => this.ventaService.getOne(poliza.venta_id));
        return forkJoin(requests);
      } ),
      switchMap( resp => {
        this.ventas = resp.flat();
        const requests = polizas_id.map( poliza => this.beneficiarioService.getOne(poliza))
        return forkJoin(requests);
      }),
      switchMap( resp => {
        this.beneficiarios = resp.flat();
        return this.servicioService.getOne(this.polizas[0].servicio_id);
      }),
      switchMap((resp: Servicio[]) => {
        this.servicio = resp[0];
        return this.planesService.getOne(this.servicio!.servicio_id).pipe(
          map((planesData) => {
            return { servicio: this.servicio, planes: planesData };
          })
        );
      }),
      switchMap((resp: any) => {
        this.planes = resp;
        return this.cuponesService.getAll();
      }),
      switchMap((resp: Cupon[]) => {
        console.log({ resp });
        this.cupones = resp;
        return this.catalogosService.getAll();
      }),
      switchMap((resp: Catalogo[]) => {
        this.catalogos = resp;
        return this.catalogosService.getAllExtras();
      }),
      switchMap((resp: Catalogo[]) => {
        this.multiviajes = resp;
        return this.extrasService.getAll();
      }),
      switchMap((resp: Extra[]) => {
        this.extras = resp;
        return this.beneficiosService.getAll();
      }),
      switchMap((resp: Beneficio[]) => {
        this.beneficios = resp;
        return this.preciosService.getAll();
      }),
      switchMap(( resp : Precio[]) => {
        this.precios = resp;
        return this.extraPolizaService.getAll();
      }),

      switchMap((resp: PolizaExtra[]) => {

        console.log({resp});
        // this.servicio = resp[0];
        this.polizaExtraUi = resp.filter( e => e.venta_id === this.polizas[0]?.venta_id).map( e => {
          return {
            ...e,
            extra: this.extras.filter( ex => ex.beneficio_id === e.beneficio_id)[0]
          }
        })

        return this.oficinaService.getById(this.ventas[0]?.office_id!);
      }),



    ).subscribe({
      next: ( data  ) => {

        this.isWithPrice = !((data as Oficina[])[0].phone.includes(";"));

        if(!this.isWithPrice){
          console.log("Sin precio");
        }




        // this.precios = data as Precio[];

        this.servicioUi = MapToServicioUi(
          this.catalogos,
          this.beneficios,
          this.extras,
          this.planes!,
          this.precios,
          this.cupones,
          this.multiviajes,
          "DEFAULT"
        );

        this.servicioUi.precioSelected =
          this.ventas[0]!.total_pago / parseInt(this.ventas[0]!.cantidad);

        // console.log('))))))))');
        // console.log(this.servicioUi);
        // console.log(this.polizas);
        // console.log(this.ventas);
        // console.log(this.beneficiarios);
        // console.log('))))))))');
          process.complete();

      },
      error : ( err ) => {
        process.complete();
        console.log({err});
      }
    })

  }


  polizas : Poliza[] = [];
  beneficiarios : Beneficiario[] = [];
  ventas : Venta[] = [];
  servicio: Servicio | null = null;
  planes: ServByPlan | null = null;
  cupones: Cupon[] = [];
  catalogos: Catalogo[] = [];
  precios: Precio[] = [];
  descuentos: Descuento[] = [];
  extras: Extra[] = [];
  beneficios: Beneficio[] = [];
  servicioUi: ServicioUi | null = null;
  multiviajes: Catalogo[] = [];
  polizaExtraUi : ExtraPolizaUi[] = [];



  private ventaService = inject(VentasService);
  private notificationModalService = inject(NotificationService);
  private polizasService = inject(PolizasService);
  private servicioService = inject(ServiciosService);
  private extrasService = inject(ExtrasService);
  private planesService = inject(PlanesService);
  private beneficiarioService = inject(BeneficiariosService);
  private cuponesService = inject(CuponesService);
  private preciosService = inject(PreciosService);
  private catalogosService = inject(CatalogosService);
  private beneficiosService = inject(BeneficiosService);
  private extraPolizaService = inject(PolizasExtrasService);

  private activeParams = inject(ActivatedRoute);


  onSuccess(message: string) {
    this.notificationModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/check.svg',
      closeOnTouch: true,
    });
  }

  onError(message: string) {
    this.notificationModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/warning.svg',
      closeOnTouch: true,
    });
  }

  onLoading(observerProcess: Observable<any>) {
    this.notificationModalService.show('Cargando', {
      size: Size.normal,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/loading.svg',
      closeOnTouch: false,
      notifier: observerProcess,
    });
  }


}
