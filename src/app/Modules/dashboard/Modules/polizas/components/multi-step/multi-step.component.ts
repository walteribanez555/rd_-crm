import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import {
  Beneficiario,
  BeneficiarioToPost,
} from 'src/app/Modules/core/models/Beneficiario.model';
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
import { MapToServicioUi } from 'src/app/Modules/shared/utils/mappers/servicio.mappers';
import { SessionService } from 'src/app/Modules/auth/Services/session.service';
import { ModalService } from '../modal-plan-details/services/modal-service';
import { OfficeSelectorModalService } from '../../../my-office/utils/office-selector-modal/services/office-selector-modal.service';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { BeneficiarioUi } from '../../../../../shared/models/Beneficiario.ui';
import { hasValidDestinies } from 'src/app/Modules/shared/utils/data/countries-region.ts/filter-countries.region';
import { getExpirationDate, mapMultiviaje } from 'src/app/Modules/shared/utils/mappers/multiviaje.mappers';
import { CountryRegionLng } from 'src/app/Modules/shared/utils/data/countries-region.ts/country-region-lng';
import { StatusVentaSelectorService } from '../../statusVentaSelectorModal/services/statusVentaSelector.service';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';
import { ComisionVentaSelectorService } from '../../comisionVentaSelectorModal/services/comisionVentaSelector.service';

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
  private catalogosService = inject(CatalogosService);
  private notificacionesModalService = inject(NotificationService);
  private polizasExtrasService = inject(PolizasExtrasService);
  private beneficiariosService = inject(BeneficiariosService);
  private sessionService = inject(SessionService);
  private officeSelectorModalService = inject(OfficeSelectorModalService);
  private statusVentaSelectorService = inject(StatusVentaSelectorService);
  private comisionVentaSelectorService = inject(ComisionVentaSelectorService);
  private oficinaService = inject(OficinasService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);


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
    youngQuantity: new FormControl(0, [Validators.required]),
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
    beneficiariosData : new FormControl<BeneficiarioUi[] | null>(null,[Validators.required]),
  })


  ventaRespForm = new FormGroup({
    ventRespData : new FormControl< VentaResp| null>(null, [Validators.required]),
  })


  beneficiariosRespForm = new FormGroup({
    polizaRespForm : new FormControl<Poliza | null>(null, [Validators.required]),
  })

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
  multiviajes : Catalogo[] = [];


  listPolizas : Poliza[] = [];


  serviciosToUi: ServicioUi[] | null = null;

  destinyList: string = "";
  origen? : CountryRegionLng

  onSelectDataToPlans?: Subject<ServicioUi[]>;
  onSelectedPlan?: Subject<ServicioUi>;
  onShowDetails?: Subject<any>;

  observerServiciosUi?: Observable<ServicioUi[]>;
  observerOnSelectedPlan?: Observable<ServicioUi>;
  observerOnShowDetails?: Observable<any>;

  onLoadProcess?: Subject<any>;
  observerProcess?: Observable<any>;
  oficcesPerUser : Oficina[] = [];

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
      this.beneficiariosForm,
      this.ventaRespForm,
      this.beneficiariosRespForm,
    );

    this.onSelectDataToPlans = new Subject();
    this.onSelectedPlan = new Subject();
    this.onShowDetails = new Subject();

    this.observerServiciosUi = this.onSelectDataToPlans.asObservable();
    this.observerOnSelectedPlan = this.onSelectedPlan.asObservable();
    this.observerOnShowDetails = this.onShowDetails.asObservable();

    this.getOficceFromUser().subscribe({
      next : ( resp) => {
        this.oficcesPerUser = [resp];
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
          return this.catalogosService.getAllExtras();
        }),
        switchMap((data) => {
          this.multiviajes = data;
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
              this.cupones,
              this.multiviajes,
              this.oficcesPerUser[0].country
            )
          );


        },
        error: (err) => {
          console.log(err);

          this.notificationService.show(
            err.message,
            {
              size: Size.big,
              imageUrl: TypeMessage.error,
              positions: [PositionMessage.center],
              duration : 1500
            }
          );
        },
        complete: () => {},
      })

      }
    })

    ;

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

    console.log({formsFiltered});

    if(this.locationsForm.get('fromLocation')?.value) {
      this.origen = (this.locationsForm.get('fromLocation')!.value as unknown as CountryRegionLng);
    }

    if(this.locationsForm.get('toLocation')?.value){

      this.destinyList = ((this.locationsForm.get('toLocation')!.value as unknown) as CountryRegionLng[]).map(dest => dest.iso2).join(',');
    }


    if (this.datesForm.get('quantityDays')!.value) {
      this.serviciosToUi?.forEach((servicio) => {
        servicio.precioSelected = this.preciosFilter.filterByDay(
          servicio,
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



    if (posStep == 0 || posStep >= 9) {
      return;
    }

    if (posStep == 8) {
      this.createIntentPayment();
    }else{
      this.actualStep = posStep;
      this.onShowDetails?.next(this.actualStep);
    }
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


  isCreatingPayment = false;

  createIntentPayment() {

    if(this.isCreatingPayment){
      return;
    }

    const beneficiariosData: BeneficiarioUi[] =
      this.listForms[6].value.beneficiariosData;

    const titularBeneficiario = beneficiariosData[0];
    this.isCreatingPayment = true;




        this.clientesService
      .getOne(titularBeneficiario.nro_identificacion)
      .subscribe({
        next: (cliente) => {
          this.createVenta(cliente[0], this.listForms, this.oficcesPerUser[0]);
        },
        error: (_) => {
          console.log(_);

          const nuevoCliente: ClienteToPost = {
            nombre: titularBeneficiario.primer_nombre,
            apellido: titularBeneficiario.primer_apellido,
            tipo_cliente: 1,
            nro_identificacion: titularBeneficiario.nro_identificacion,
            origen: titularBeneficiario.origen.iso2,
            email: titularBeneficiario.email,
            nro_contacto: titularBeneficiario.telefono,
            status: 1,
            office_id : this.oficcesPerUser[0].office_id ?? 2,
            contacto : 2,
            persona_contacto: "ADMIN"
          };

          this.clientesService.create(nuevoCliente).subscribe({
            next: (cliente: Cliente) => {
              this.createVenta(cliente, this.listForms, this.oficcesPerUser[0]);
            },
            error: (err) => {
              this.isCreatingPayment = false;

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


  isWithPrice = true;

  createVenta(cliente: Cliente, forms: FormGroup[], oficina : Oficina) {
    const username = this.sessionService.getUser();
    const multiviajes =(this.listForms[3].value.planSelected as ServicioUi).multiviajes.filter( m => m.isSelected === true );
    const beneficiarios: BeneficiarioUi[] = this.listForms[6].value
            .beneficiariosData as BeneficiarioUi[];

    console.log(this.listForms);

          const rols : string[] = localStorage.getItem('rol_id')!.split(',');


          if(rols.includes('41')){
            this.isWithPrice = false;
          }


        this.sessionService.isActionValidForUser("status").pipe(
          switchMap( (isValid)  => {

            if(isValid) {
              return this.statusVentaSelectorService.open({})
            }


            return of(2);
          } )


        ).subscribe({
          next : ( statusVenta: number | null) => {
            this.onLoadProcess = new Subject();

            this.observerProcess = this.onLoadProcess.asObservable();

            this.onLoading(this.observerProcess);
            const requests : any[] = beneficiarios.map( (ben, index) => {

              const nuevaVenta: VentaToPost = {
                username: username!,
                office_id: oficina.office_id ?? 2,
                cliente_id: cliente.id ?? cliente.cliente_id!,
                tipo_venta: 2,
                forma_pago: 1,
                cantidad: `1`,
                servicio_id: `${this.listForms[3].value.planSelected.servicio_id}`,
                extras_id: `${(
                  this.listForms[5].value.ventaData.selectedExtras as Extra[]
                )
                  .map((selectedExtra: Extra) => selectedExtra.beneficio_id)
                  .join(',')}`,
                fecha_salida: this.listForms[1].value.initialDate as string,
                fecha_retorno: this.listForms[1].value.finalDate,
                status: statusVenta!,
                plus: 0,
                descuento: `${(this.listForms[5].value.ventaData.total_cupones[index]) + this.listForms[5].value.ventaData.codigoDescuento / beneficiarios.length}`,
                tipo_descuento: `${this.listForms[5].value.ventaData.tipo_cupones}`,
                  multiviajes : mapMultiviaje(this.listForms[3].value.planSelected, this.listForms[1].value.finalDate),
                  comision : parseFloat(this.listForms[5].value.ventaData.comision)/beneficiarios.length,
              };


              return this.ventasService
              .create(nuevaVenta)
              .pipe(
                // mergeMap((respFromVentas: VentaResp) => {
                //   return this.ventasService
                //     .update(respFromVentas.venta_id ?? respFromVentas.id!, {
                //       status: 2,
                //       order_id: 'CRM',
                //     })
                //     .pipe(
                //       catchError((err) => throwError(err)),
                //       map(() => respFromVentas)
                //     );
                // }),
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
                      destino: (this.listForms[0].value.toLocation as  CountryRegionLng[]).map(dest => dest.iso2).join(','),
                      fecha_salida: this.listForms[1].value.initialDate,
                      fecha_retorno: this.listForms[1].value.finalDate,
                      extra: (forms[5].value.ventaData.selectedExtras as Extra[])
                        .length,
                      status: statusVenta!,
                      nro_poliza : 1,
                      multiviaje : multiviajes.length > 0 ? 2 : 1,
                      fecha_caducidad : getExpirationDate(this.listForms[1].value.initialDate),
                      username : 'WEBREDCARD'

                    };

                    return this.polizasService.create(nuevaPoliza);
                }),
                switchMap((poliza: Poliza) => {
                  this.listPolizas.push(poliza);
                  this.listForms[8].get('polizaRespForm')?.setValue(poliza);

                    const beneficiarioToPost : BeneficiarioToPost = {
                      poliza_id : poliza.poliza_id ?? poliza.id!,
                      primer_apellido : ben.primer_apellido,
                      primer_nombre : ben.primer_nombre,
                      segundo_apellido : this.isWithPrice ? '1' : '2',
                      segundo_nombre : ben.segundo_nombre,
                      fecha_nacimiento : ben.fecha_nacimiento,
                      sexo : parseInt(ben.sexo),
                      origen : ben.origen.iso2,
                      email : ben.email,
                      telefono : ben.telefono,
                      nro_identificacion : ben.nro_identificacion,

                    }


                    console.log({beneficiarioToPost});

                   return this.beneficiariosService.create(beneficiarioToPost);


                }),
                catchError((error) => {
                  console.error('Error occurred:', error.message);
                  return throwError(error);
                })
              )

            })

            forkJoin(requests).subscribe({
              next: (resp: Beneficiario[]) => {
                this.onLoadProcess?.complete();
                this.isCreatingPayment = false;
                this.onSuccess(
                  'Venta Realizada Correctamente, redirigiendo a listado'
                );
                this.router.navigate(['../dashboard/poliza/detail'], {
                  queryParams: {
                    polizas :  this.listPolizas.map(poliza => poliza.id ?? poliza.poliza_id!).join(',')
                  },
                });
              },
              error: (err) => {
                console.log(err);
                this.onLoadProcess?.complete();
                this.onError('Ocurrio un error');
              },
              complete: () => {},
            });








          },
          error : (err ) => {

          },
          complete : () => {

          }

        })














    // const nuevaVenta: VentaToPost = {
    //   username: username!,
    //   office_id: oficina.office_id ?? 2,
    //   cliente_id: cliente.id ?? cliente.cliente_id!,
    //   tipo_venta: 2,
    //   forma_pago: 1,
    //   cantidad: `${this.listForms[6].value.beneficiariosData.length}`,
    //   servicio_id: `${this.listForms[3].value.planSelected.servicio_id}`,
    //   extras_id: `${(
    //     this.listForms[5].value.ventaData.selectedExtras as Extra[]
    //   )
    //     .map((selectedExtra: Extra) => selectedExtra.beneficio_id)
    //     .join(',')}`,
    //   fecha_salida: this.listForms[1].value.initialDate as string,
    //   fecha_retorno: this.listForms[1].value.finalDate,
    //   status: 1,
    //   plus: 0,
    //   descuento: `${this.listForms[5].value.ventaData.total_cupones}`,
    //   tipo_descuento: `${this.listForms[5].value.ventaData.tipo_cupones}`,
    // };

    // this.ventasService
    //   .create(nuevaVenta)
    //   .pipe(
    //     mergeMap((respFromVentas: VentaResp) => {
    //       return this.ventasService
    //         .update(respFromVentas.venta_id ?? respFromVentas.id!, {
    //           status: 2,
    //           order_id: 'CRM',
    //         })
    //         .pipe(
    //           catchError((err) => throwError(err)),
    //           map(() => respFromVentas)
    //         );
    //     }),
    //     mergeMap((respFromVentas: VentaResp) => {
    //       return this.createExtras(respFromVentas, this.listForms).pipe(
    //         catchError((err) => throwError(err)),
    //         map(() => respFromVentas)
    //       );
    //     }),
    //     mergeMap((respFromVentas: VentaResp) => {
    //       const beneficiarios: BeneficiarioUi[] = this.listForms[6].value
    //         .beneficiariosData as BeneficiarioUi[];

    //       const requests : any[] = beneficiarios.map( beneficiario => {
    //         const nuevaPoliza: PolizaToPost = {
    //           venta_id: respFromVentas.id ?? respFromVentas.venta_id!,
    //           servicio_id: (this.listForms[3].value.planSelected as ServicioUi)
    //             .servicio_id,
    //           destino: (this.listForms[0].value.toLocation as  CountryRegion[]).map(dest => dest.country).join(','),
    //           fecha_salida: this.listForms[1].value.initialDate,
    //           fecha_retorno: this.listForms[1].value.finalDate,
    //           extra: (forms[5].value.ventaData.selectedExtras as Extra[]).length,
    //           status: 4,
    //         };

    //         return this.polizasService.create(nuevaPoliza);
    //       })


    //       return forkJoin(requests);
    //     }),
    //     switchMap((polizas: any[]) => {
    //       console.log(polizas);
    //       this.listForms[8].get('polizaRespForm')?.setValue(polizas);

    //       const beneficiarios: BeneficiarioUi[] = this.listForms[6].value
    //         .beneficiariosData as BeneficiarioUi[];

    //       const beneficiariosToIt: BeneficiarioToPost[] = polizas.map(
    //         (poliza , index) => {
    //           return {
    //             poliza_id: poliza.poliza_id ?? poliza.id!,
    //             primer_apellido: beneficiarios[index].primer_apellido,
    //             primer_nombre: beneficiarios[index].primer_nombre,
    //             segundo_apellido: beneficiarios[index].segundo_apellido,
    //             segundo_nombre: beneficiarios[index].segundo_nombre,
    //             fecha_nacimiento: DatesAction.invert_date(
    //               beneficiarios[index].fecha_nacimiento
    //             ),
    //             sexo: parseInt(beneficiarios[index].sexo),
    //             origen: beneficiarios[index].origen.country,
    //             email: beneficiarios[index].email,
    //             telefono: beneficiarios[index].telefono,
    //             nro_identificacion: beneficiarios[index].nro_identificacion,
    //           };
    //         }
    //       );

    //       const requests: any[] = beneficiariosToIt.map((beneficiario) =>
    //         this.beneficiariosService.create(beneficiario)
    //       );

    //       return forkJoin(requests);
    //     }),
    //     catchError((error) => {
    //       console.error('Error occurred:', error.message);
    //       return throwError(error);
    //     })
    //   )




  }

  getOficceFromUser(): Observable<Oficina> {

    return this.sessionService.getOfficesFromUser().pipe(
      switchMap((officesFromUser) => {
        if (officesFromUser.length > 1) {
          return this.officeSelectorModalService
            .open({ listOficces: officesFromUser })
            .pipe(
              map((resp) => {
                if (!resp) {
                  throwError('No se seleccionno ninguna oficina');
                }
                return resp as Oficina;
              })
            );
        }

        return of(officesFromUser[0]);
      })
    );
  }

  getStatusOnSold(): Observable<number> {
    return this.sessionService.isActionValidForUser("status").pipe(
      switchMap((isValid) => {
        if(isValid) {
          return of(2);
        }

        return of(2);
      })
    )
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
