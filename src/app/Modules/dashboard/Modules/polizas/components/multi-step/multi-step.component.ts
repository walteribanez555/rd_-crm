import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  Subject,
  catchError,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { BeneficiarioToPost } from 'src/app/Modules/core/models/Beneficiario.model';
import { Beneficio } from 'src/app/Modules/core/models/Beneficio.model';
import { Catalogo } from 'src/app/Modules/core/models/Catalogo.model';
import {
  Cliente,
  ClienteToPost,
} from 'src/app/Modules/core/models/Cliente.model';
import { Cupon } from 'src/app/Modules/core/models/Cupon.model';
import { Descuento } from 'src/app/Modules/core/models/Descuento.model';
import { Extra } from 'src/app/Modules/core/models/Extra.model';
import { Plan } from 'src/app/Modules/core/models/Plan.model';
import { Poliza, PolizaToPost } from 'src/app/Modules/core/models/Poliza.model';
import { PolizaExtraToPost } from 'src/app/Modules/core/models/PolizaExtra.model';
import { Precio } from 'src/app/Modules/core/models/Precio.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import {
  Venta,
  VentaResp,
  VentaToPost,
} from 'src/app/Modules/core/models/Venta.model';
import {
  ServiciosService,
  CatalogosService,
  BeneficiosService,
  PlanesService,
  DescuentosService,
  ExtrasService,
  PreciosService,
  CuponesService,
  ClientesService,
  PolizasService,
  VentasService,
  BeneficiariosService,
} from 'src/app/Modules/core/services';
import { PolizasExtrasService } from 'src/app/Modules/core/services/polizas-extras.service';
import { ServiciosFilter } from 'src/app/Modules/core/utils/filters';
import { PreciosFilter } from 'src/app/Modules/core/utils/filters/precios.filters';

import {
  Size,
  TypeMessage,
  PositionMessage,
} from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { DatesAction } from 'src/app/Modules/shared/utils/dates/dates-action';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';
import { BeneficiarioUi } from 'src/app/Modules/shared/models/Beneficiario.ui';
import { MapToServicioUi } from 'src/app/Modules/shared/utils/mappers/servicio.mappers';


export interface ServByPlan {
  servicio: Servicio;
  planes: Plan[];
}

@Component({
  selector: 'multi-step',
  templateUrl: './multi-step.component.html',
  styleUrls: ['./multi-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiStepComponent implements OnInit {
  private serviciosService = inject(ServiciosService);
  private catalogosService = inject(CatalogosService);
  private beneficiosService = inject(BeneficiosService);
  private planesService = inject(PlanesService);
  private notificationService = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private serviciosFilter = new ServiciosFilter();
  private preciosFilter = new PreciosFilter();
  private descuentosService = inject(DescuentosService);
  private extrasService = inject(ExtrasService);
  private preciosService = inject(PreciosService);
  private cuponesService = inject(CuponesService);
  private clientesService = inject(ClientesService);
  private polizasService = inject(PolizasService);
  private ventasService = inject(VentasService);
  private notificacionesModalService = inject(NotificationService);
  private polizasExtrasService = inject(PolizasExtrasService);
  private beneficiariosService = inject(BeneficiariosService);

  locationsForm = new FormGroup({
    fromLocation: new FormControl(null, [Validators.required]),
    toLocation: new FormControl(null, [Validators.required]),
  });

  datesForm = new FormGroup({
    initialDate: new FormControl(null, [Validators.required]),
    finalDate: new FormControl(null, [Validators.required]),
    quantityDays: new FormControl<number | null>(null, [Validators.required]),
  });

  quantityForm = new FormGroup({
    adultQuantity: new FormControl(0, [Validators.required]),
    seniorQuantity: new FormControl(0, [Validators.required]),
  });

  planForm = new FormGroup({
    planSelected: new FormControl<ServicioUi | null>(null, [
      Validators.required,
    ]),
  });

  ventaForm = new FormGroup({
    ventaData: new FormControl<Venta | null>(null, [Validators.required]),
  });

  beneficiariosForm = new FormGroup({
    beneficiariosData: new FormControl<BeneficiarioUi[] | null>(null, [
      Validators.required,
    ]),
  });

  extrasForm = new FormGroup({});

  listForms: FormGroup[] = [];
  beneficios: Beneficio[] = [];
  servicios: Servicio[] = [];
  catalogos: Catalogo[] = [];
  planes: Plan[] = [];
  descuentos: Descuento[] = [];
  extras: Extra[] = [];
  precios: Precio[] = [];
  cupones: Cupon[] = [];

  serviciosToUi: ServicioUi[] | null = null;

  onSelectDataToPlans?: Subject<ServicioUi[]>;
  onSelectedPlan?: Subject<ServicioUi>;
  onShowDetails?: Subject<any>;

  observerServiciosUi?: Observable<ServicioUi[]>;
  observerOnSelectedPlan?: Observable<ServicioUi>;
  observerOnShowDetails?: Observable<any>;

  onLoadProcess?: Subject<any>;
  observerProcess?: Observable<any>;

  userWeb: string | null = null;

  constructor() {}

  actualStep: number = 1;

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.userWeb = params.get('id');
    });

    this.listForms.push(
      this.locationsForm,
      this.datesForm,
      this.quantityForm,
      this.planForm,
      this.extrasForm,
      this.ventaForm,
      this.beneficiariosForm
    );

    this.onSelectDataToPlans = new Subject();
    this.onSelectedPlan = new Subject();
    this.onShowDetails = new Subject();

    this.observerServiciosUi = this.onSelectDataToPlans.asObservable();
    this.observerOnSelectedPlan = this.onSelectedPlan.asObservable();
    this.observerOnShowDetails = this.onShowDetails.asObservable();



    this.beneficiosService
      .getAll()
      .pipe(
        switchMap((data) => {
          this.beneficios = data;
          return this.preciosService.getAll();
        }),
        switchMap((data) => {
          this.precios = data;
          return this.cuponesService.getAll();
        }),
        switchMap((data) => {
          this.cupones = data;
          return this.catalogosService.getAll();
        }),
        switchMap((data) => {
          this.catalogos = data;
          return this.serviciosService.getAll();
        }),
        switchMap((servicios: Servicio[]) => {
          this.servicios = servicios;
          return this.descuentosService.getAll();
        }),
        switchMap((descuentos: Descuento[]) => {
          this.descuentos = descuentos;
          return this.extrasService.getAll();
        }),
        mergeMap((extras: Extra[]) => {
          this.extras = extras;
          const planesRequests: Observable<any>[] = [];

          this.servicios.forEach((servicio) => {
            planesRequests.push(
              this.planesService.getOne(servicio.servicio_id).pipe(
                map((planesData) => {
                  return { servicio: servicio, planes: planesData };
                })
              )
            );
          });

          return forkJoin(planesRequests);
        })
      )
      .subscribe({
        next: (data: any[]) => {
          this.serviciosToUi = data.map((item) =>
            MapToServicioUi(
              this.catalogos,
              this.beneficios,
              this.extras,
              item,
              this.precios,
              this.cupones
            )
          );
        },
        error: (err) => {
          this.notificationService.show(
            'Error en el servidor, por favor volver mas despues',
            {
              size: Size.big,
              imageUrl: TypeMessage.error,
              positions: [PositionMessage.center],
            }
          );
        },
        complete: () => {},
      });

    this.descuentosService.getAll().subscribe((data) => {});
  }

  isClicked: boolean = false;
  isHideInfo: boolean = false;

  onStepClicked(postStep: number) {
    this.onChangeClick();
    this.onChangeStep(postStep);
  }

  onChangeStep(posStep: number) {
    const formsFiltered: FormGroup[] = this.listForms.slice(0, posStep - 1);
    const isComplete = formsFiltered.every((form) => form.valid);

    if (!isComplete) {
      this.notificationService.show('Debe completar correctamente', {
        size: Size.normal,
        positions: [PositionMessage.center],
        imageUrl: TypeMessage.error,
        duration: 2000,
        closeOnTouch: true,
      });

      return;
    }

    if (this.datesForm.get('quantityDays')!.value) {
      this.serviciosToUi?.forEach((servicio) => {
        servicio.precioSelected = this.preciosFilter.filterByDays(
          servicio.servicio_id,
          servicio.precios,
          this.datesForm.get('quantityDays')!.value!
        );
      });
    }

    if (this.serviciosToUi) {
      const filteredServiciosUi: ServicioUi[] =
        this.serviciosFilter.filterByActions(
          formsFiltered,
          posStep - 1,
          this.serviciosToUi
        );
      this.onSelectDataToPlans?.next(filteredServiciosUi);
    }

    if (posStep == 8) {
      this.createIntentPayment();
    }

    if (posStep == 0 || posStep >= 8) {
      return;
    }

    this.actualStep = posStep;

    this.onShowDetails?.next(this.actualStep);
  }

  onPlanSelected(servicioUi: ServicioUi) {
    this.onSelectedPlan?.next(servicioUi);
  }

  onChangeClick() {
    this.isClicked = !this.isClicked;
  }

  onClickInfo() {
    this.isHideInfo = !this.isHideInfo;
  }

  createIntentPayment() {
    const beneficiariosData: BeneficiarioUi[] =
      this.listForms[6].value.beneficiariosData;

    const titularBeneficiario = beneficiariosData[0];

    // console.log({titularBeneficiario});

    this.onLoadProcess = new Subject();

    this.observerProcess = this.onLoadProcess.asObservable();

    this.onLoading(this.observerProcess);

    this.clientesService
      .getOne(titularBeneficiario.nro_identificacion)
      .subscribe({
        next: (cliente) => {
          this.createVenta(cliente[0], this.listForms);
        },
        error: (_) => {
          console.log(_);

          const nuevoCliente: ClienteToPost = {
            nombre: titularBeneficiario.primer_nombre,
            apellido: titularBeneficiario.primer_apellido,
            tipo_cliente: 1,
            nro_identificacion: titularBeneficiario.nro_identificacion,
            origen: titularBeneficiario.origen,
            email: titularBeneficiario.email,
            nro_contacto: titularBeneficiario.telefono,
            status: 1,
          };

          this.clientesService.create(nuevoCliente).subscribe({
            next: (cliente: Cliente) => {
              this.createVenta(cliente, this.listForms);
            },
            error: (err) => {
              this.onLoadProcess?.complete();
              this.onError(
                'El email ya esta registrado a otro pasaporte o nro identificacion'
              );
            },
            complete: () => {
              console.log('Completado');
            },
          });
        },
      });
  }

  createVenta(cliente: Cliente, forms: FormGroup[]) {
    console.log(this.listForms);

    const nuevaVenta: VentaToPost = {
      username: 'raforios',
      oficina_id: 1,
      cliente_id: cliente.id ?? cliente.cliente_id!,
      tipo_venta: 1,
      forma_pago: 1,
      cantidad: `${this.listForms[6].value.beneficiariosData.length}`,
      servicio_id: `${this.listForms[3].value.planSelected.servicio_id}`,
      extras_id: `${(
        this.listForms[5].value.ventaData.selectedExtras as Extra[]
      )
        .map((selectedExtra: Extra) => selectedExtra.beneficio_id)
        .join(',')}`,
      fecha_salida: this.listForms[1].value.initialDate as string,
      fecha_retorno: this.listForms[1].value.finalDate,
      status: 1,
      plus: 0,
      descuento: `${this.listForms[5].value.ventaData.total_cupones}`,
      tipo_descuento: `${this.listForms[5].value.ventaData.tipo_cupones}`,
    };

    this.ventasService
      .create(nuevaVenta)
      .pipe(
        mergeMap((respFromVentas: VentaResp) => {
          return this.ventasService
                  .update(respFromVentas.venta_id ?? respFromVentas.id!, {
                    status: 1,
                    order_id: 'CRM',
                  }).pipe(
                    catchError((err) => throwError(err)),
                    map(() => respFromVentas)
                  );
        }),
        mergeMap((respFromVentas: VentaResp) => {
          return this.createExtras(respFromVentas, this.listForms).pipe(
            catchError((err) => throwError(err)),
            map(() => respFromVentas)
          );
        }),
        mergeMap((respFromVentas: VentaResp) => {
          const nuevaPoliza: PolizaToPost = {
            venta_id: respFromVentas.id ?? respFromVentas.venta_id!,
            servicio_id: (this.listForms[3].value.planSelected as ServicioUi)
              .servicio_id,
            destino: this.listForms[0].value.toLocation.toUpperCase(),
            fecha_salida: this.listForms[1].value.initialDate,
            fecha_retorno: this.listForms[1].value.finalDate,
            extra: 1,
            status: 4,
          };
          return this.polizasService.create(nuevaPoliza);
        }),
        switchMap((poliza: Poliza) => {
          const beneficiarios: BeneficiarioUi[] = this.listForms[6].value
            .beneficiariosData as BeneficiarioUi[];

          const beneficiariosToIt: BeneficiarioToPost[] = beneficiarios.map(
            (beneficiario) => {
              return {
                poliza_id: poliza.poliza_id ?? poliza.id!,
                primer_apellido: beneficiario.primer_apellido,
                primer_nombre: beneficiario.primer_nombre,
                segundo_apellido: beneficiario.segundo_apellido,
                segundo_nombre: beneficiario.segundo_nombre,
                fecha_nacimiento: DatesAction.invert_date(
                  beneficiario.fecha_nacimiento
                ),
                sexo: parseInt(beneficiario.sexo),
                origen: beneficiario.origen,
                email: beneficiario.email,
                telefono: beneficiario.telefono,
                nro_identificacion: beneficiario.nro_identificacion,
              };
            }
          );

          const requests: any[] = beneficiariosToIt.map((beneficiario) =>
            this.beneficiariosService.create(beneficiario)
          );

          return forkJoin(requests);
        }),
        catchError((error) => {
          console.error('Error occurred:', error.message);
          return throwError(error);
        })
      )
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.onLoadProcess?.complete();
          this.onSuccess('Venta Realizada Correctamente');
        },
        error: (err) => {
          this.onLoadProcess?.complete();
          this.onError('Ocurrio un error');
        },
        complete: () => {},
      });
  }

  createExtras = (venta: VentaResp, forms: FormGroup[]): Observable<any> => {
    if (venta.extras_total.length === 0) {
      return of(true);
    }

    const polizaExtraToPost: PolizaExtraToPost = {
      venta_id: venta.venta_id ?? venta.id!,
      beneficio_id: `${(forms[5].value.ventaData.selectedExtras as Extra[])
        .map((selectedExtra: Extra) => selectedExtra.beneficio_id)
        .join(',')}`,
      monto_adicional: venta.extras_total,
    };

    return this.polizasExtrasService.create(polizaExtraToPost);
  };

  onSuccess(message: string) {
    this.notificacionesModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/check.svg',
      closeOnTouch: true,
    });
  }

  onError(message: string) {
    this.notificacionesModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/warning.svg',
      closeOnTouch: true,
    });
  }

  onLoading(observerProcess: Observable<any>) {
    this.notificacionesModalService.show('Cargando', {
      size: Size.normal,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/loading.svg',
      closeOnTouch: false,
      notifier: observerProcess,
    });
  }
}
