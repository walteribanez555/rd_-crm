import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, switchMap, map, catchError, throwError } from 'rxjs';
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
import { VentasService, PolizasService, ServiciosService, ExtrasService, PlanesService, BeneficiariosService, CuponesService, PreciosService, CatalogosService, BeneficiosService } from 'src/app/Modules/core/services';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { MapToServicioUi } from 'src/app/Modules/shared/utils/mappers/servicio.mappers';
import { ServByPlan } from '../../components/multi-step/multi-step.component';
import { Location } from '@angular/common';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';

@Component({
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.css']
})
export class PolizaComponent implements OnInit {

  private notificationModalService = inject(NotificationService);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  private ventaService = inject(VentasService);
  private polizasService = inject(PolizasService);
  private servicioService = inject(ServiciosService);
  private extrasService = inject(ExtrasService);
  private planesService = inject(PlanesService);
  private beneficiarioService = inject(BeneficiariosService);
  private cuponesService = inject(CuponesService);
  private preciosService = inject(PreciosService);
  private catalogosService = inject(CatalogosService);
  private beneficiosService = inject(BeneficiosService);

  constructor( ){



  }


  beneficiario_id : number |null = null;
  poliza_id : number | null = null;
  venta_id : number | null = null;

  listBeneficiarios: Beneficiario[] = [];
  venta: Venta | null = null;
  poliza: Poliza | null = null;
  servicio: Servicio | null = null;
  planes: ServByPlan | null = null;
  cupones: Cupon[] = [];
  catalogos: Catalogo[] = [];
  precios: Precio[] = [];
  descuentos: Descuento[] = [];
  extras: Extra[] = [];
  beneficios: Beneficio[] = [];
  servicioUi: ServicioUi | null = null;


  onLoadProcess?: Subject<any>;
  observerProcess?: Observable<any>;

  isReady = false;

  isClient = false;

  ngOnInit(): void {
    this.onLoadProcess = new Subject();

    this.observerProcess = this.onLoadProcess.asObservable();

    this.onLoading(this.observerProcess);

    this.activatedRoute.params.pipe(
      switchMap(
        (params : any) => {
          this.venta_id = params.id
          return this.activatedRoute.queryParams;
        }
      ),
      switchMap( (queryParams : any) => {
        this.beneficiario_id = queryParams.beneficiario_id;
        this.poliza_id = queryParams.poliza_id;
        return this.ventaService.getOne(this.venta_id!);
      }),
      switchMap((resp : Venta[]) => {
        this.venta = resp[0];
        return this.polizasService.getOne(this.poliza_id!);
      }),
      switchMap((resp: Poliza[]) => {
        this.poliza = resp[0];
        return this.beneficiarioService.getOne(this.poliza_id!);
      }),
      switchMap((resp : Beneficiario[]) => {
        this.listBeneficiarios= resp;
        return this.servicioService.getOne(this.poliza!.servicio_id);
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
        console.log({resp});
        this.planes = resp;
        return this.cuponesService.getAll();
      }),
      switchMap((resp: Cupon[]) => {
        this.cupones = resp;
        return this.catalogosService.getAll();
      }),
      switchMap((resp: Catalogo[]) => {
        this.catalogos = resp;
        return this.extrasService.getAll();
      }),
      switchMap((resp: Extra[]) => {
        this.extras = resp;
        return this.beneficiosService.getAll();
      }),
      catchError((error) => {
        console.error('Error in switchMap chain:', error);
        return throwError(error); // Rethrow the error to propagate it to the outer subscription
      })
    ).subscribe({
      next: (resp: any) => {
        this.beneficios = resp;

        this.servicioUi = MapToServicioUi(
          this.catalogos,
          this.beneficios,
          this.extras,
          this.planes!,
          this.precios,
          this.cupones
        );

        this.servicioUi.precioSelected =
          this.venta!.total_pago / parseInt(this.venta!.cantidad);

        this.onLoadProcess?.complete();
        this.isReady = true;
      },
      error: (err) => {
        this.onLoadProcess?.complete();
        this.onError(err);
      },
    });
  }

  onBackBtn( ) {
    this.location.back();
  }

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
