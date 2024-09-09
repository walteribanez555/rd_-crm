import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';
import { Oficina, OficinaUi } from 'src/app/Modules/core/models/Oficina';
import { Reporte } from 'src/app/Modules/core/models/Reporte.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import {
  ClientesService,
  ServiciosService,
  VentasService,
} from 'src/app/Modules/core/services';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';
import { ReportesService } from 'src/app/Modules/core/services/reportes.service';
import {
  Size,
  PositionMessage,
} from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import * as Xlsx from 'xlsx';

@Component({
  templateUrl: './reportes-polizas.component.html',
  styleUrls: ['./reportes-polizas.component.css'],
})
export class ReportesPolizasComponent implements OnInit {
  ngOnInit(): void {
    const process = new Subject();
    const observerProcess = process.asObservable();

    // this.reportesService.getByNumPoliza(950).subscribe((resp) => {
    //   console.log({ resp }, 'POLIZA OBTENIDA');
    // });

    this.searchTermByNameBen$.pipe(
      debounceTime(500), // Adjust the delay time here (in milliseconds)
      distinctUntilChanged(),
      switchMap((term) => {
        if (!term) {
          console.log('No hay info');
        }

        // term.length <= 1
        //   ? (this.ventasFiltered = this.ventas)
        //   : this.reportesService.getByNroIdentificacion(term).subscribe((resp) => {
        //       console.log(resp);
        //       this.ventasFiltered = resp;
        //       this.ventasFiltered = resp.filter((item) =>
        //         this.isIndexMatchingNumber(this.listOfiArbol, item.office_id)
        //       );
        //     });

        // return of();
        term.length <= 1
          ? (this.ventasFiltered = this.ventas)
          : this.reportesService.getByBen(term).subscribe((resp) => {
              this.ventasFiltered = resp;
              this.ventasFiltered = resp.filter((item) =>
                this.isIndexMatchingNumber(this.listOfiArbol, item.office_id)
              );
            });

        return of();
      })
    ).subscribe((resp) => {})

    this.searchTerm$.pipe(
      debounceTime(500), // Adjust the delay time here (in milliseconds)
      distinctUntilChanged(),
      switchMap((term) => {
        if (!term) {
          console.log('No hay info');
        }

        term.length <= 1
          ? (this.ventasFiltered = this.ventas)
          : this.reportesService.getByNroIdentificacion(term).subscribe((resp) => {
              console.log(resp);
              this.ventasFiltered = resp;
              this.ventasFiltered = resp.filter((item) =>
                this.isIndexMatchingNumber(this.listOfiArbol, item.office_id)
              );
            });

        return of();

      })
    ).subscribe((resp) => {})

    this.searchTermByPoliza$
      .pipe(
        debounceTime(500), // Adjust the delay time here (in milliseconds)
        distinctUntilChanged(),
        switchMap((term) => {
          if (!term) {
            console.log('No hay info');
          }

          term.length <= 1
            ? (this.ventasFiltered = this.ventas)
            : this.reportesService.getByNumPoliza(term).subscribe((resp) => {
                console.log(resp);
                this.ventasFiltered = resp;
                this.ventasFiltered = resp.filter((item) =>
                  this.isIndexMatchingNumber(this.listOfiArbol, item.office_id)
                );
              });

          return of();
        })
      )
      .subscribe((resp) => {});

    this.onLoading(observerProcess);
    this.ventas = [];
    // console.log(params);

    this.officeService
      .getAll()
      .pipe(
        switchMap((resp) => {
          this.oficina = resp;
          const oficces = this.ordenarArbol(
            resp.map((oficina) => {
              const oficinaUi: OficinaUi = {
                hijos: [],
                ...oficina,
              };
              return oficinaUi;
            }),
            'NO'
          );

          this.oficinaArbol = oficces;
          return this.servicioService.getAll();
        })
      )
      .subscribe({
        next: (resp) => {
          process.complete();
          this.servicios = resp;
        },
        error: (err) => {
          process.complete();
          this.onError(err);
        },
        complete: () => {
          this.route.queryParams.subscribe((queryParams) => {
            this.ventas = [];

            const { init, end } = this.route.snapshot.queryParams;

            if (!init || !end) {
              // this.isWithFilter = true;
              const initialDate = new Date().toISOString().split('T')[0];
              this.onUpdateDir(initialDate, initialDate);

              this.filter(initialDate, initialDate);
              return;
            }

            this.onUpdateDir(init, end);
            this.filter(init, end);
          });
        },
      });
  }

  private route = inject(ActivatedRoute);
  ventas: Reporte[] = [];
  ventasFiltered: Reporte[] = [];
  oficina: Oficina[] = [];
  servicios: Servicio[] = [];
  oficinaArbol: OficinaUi[] = [];
  searchTerm$ = new Subject<string>();
  listOfiArbol: OficinaUi[] = [];

  private notificacionModalService = inject(NotificationService);
  private activatedRoute = inject(ActivatedRoute);
  private reportesService = inject(ReportesService);
  private servicioService = inject(ServiciosService);

  // private ventasService = inject(VentasService);
  // private clienteService = inject(ClientesService);
  private officeService = inject(OficinasService);

  filterForm = new FormGroup({
    initialDate: new FormControl(null, [Validators.required]),
    finalDate: new FormControl(null, [Validators.required]),
  });

  getOficceById(office_id: number) {
    const offices = this.oficina.find((ofi) => ofi.office_id === office_id);
    return offices ? offices : this.oficina[0];
  }

  ordenarArbol(elementos: OficinaUi[], parentId: string): OficinaUi[] {
    const elementosOrdenados: OficinaUi[] = [];

    for (const elemento of elementos) {
      if (elemento.office_dep === parentId) {
        const hijos = this.ordenarArbol(elementos, elemento.office_code);
        if (hijos.length > 0) {
          elemento.hijos = hijos;
        }
        elementosOrdenados.push(elemento);
      }
    }

    return elementosOrdenados;
  }

  onFilter(dates: string[]) {
    this.onUpdateDir(dates[0], dates[1]);

    this.filter(dates[0], dates[1]);
  }

  private router = inject(Router);

  onUpdateDir(init: string, end: string) {
    const params = {
      init,
      end,
    };

    const urlTree = this.router.createUrlTree([], {
      queryParams: { ...params },
      queryParamsHandling: 'merge', // Merge with existing query params
      preserveFragment: true,
    });

    this.router.navigateByUrl(urlTree);
  }

  filter(initialDate: string, finalDate: string) {
    const process = new Subject();
    const observerProcess = process.asObservable();
    this.onLoading(observerProcess);
    const office_id = this.activatedRoute.snapshot.params['id'];
    const office: Oficina = this.getOficceById(parseInt(office_id));

    if (office.address === 'REGION') {
      const ofiArbol = this.encontrarSubarbol(
        this.oficinaArbol[0],
        office.office_id
      );

      this.listOfiArbol = this.aplanarArbol(ofiArbol!);

      this.reportesService
        .get(initialDate, finalDate)
        .pipe(
          switchMap((resp) => {
            const listOficces_id = this.listOfiArbol.map(
              (ofi) => ofi.office_id
            );
            const filterList = resp.filter((venta) =>
              listOficces_id.includes(venta.office_id)
            );
            return of(filterList);
          })
        )
        .subscribe({
          next: (resp) => {
            process.complete();
            this.ventas = resp;
            this.ventasFiltered = this.ventas;
          },
          error: (err) => {
            process.complete();
            this.onError(err);
          },
          complete: () => {},
        });
    } else {
      this.reportesService
        .getByOffice(office_id, initialDate, finalDate)
        .subscribe({
          next: (resp) => {
            const ofiArbol = this.encontrarSubarbol(
              this.oficinaArbol[0],
              office.office_id
            );

            this.listOfiArbol = this.aplanarArbol(ofiArbol!);

            process.complete();
            this.ventas = resp;
            this.ventasFiltered = this.ventas;
          },
          error: (err) => {
            process.complete();
            this.onError(err);
          },
          complete: () => {},
        });
    }
  }

  encontrarSubarbol(
    raiz: OficinaUi,
    target_office_id: number
  ): OficinaUi | null {
    if (raiz.office_id === target_office_id) {
      return raiz;
    }

    for (const hijo of raiz.hijos) {
      const subarbol = this.encontrarSubarbol(hijo, target_office_id);
      if (subarbol !== null) {
        return subarbol;
      }
    }

    return null;
  }

  isIndexMatchingNumber(array: OficinaUi[], number: number) {
    console.log({array, number});

    for (let i = 0; i < array.length; i++) {
      if (array[i].office_id === number) {
        return true; // Index matched the number
      }
    }
    return false; // Index didn't match any object's index property
  }

  aplanarArbol(raiz: OficinaUi): OficinaUi[] {
    const resultado: OficinaUi[] = [];

    function dfs(nodo: OficinaUi) {
      resultado.push({
        hijos: [], // Los hijos se excluyen aquí para evitar la repetición
        office_id: nodo.office_id,
        office_level: nodo.office_level,
        office_name: nodo.office_name,
        address: nodo.address,
        country: nodo.country,
        city: nodo.city,
        phone: nodo.phone,
        email: nodo.email,
        office_code: nodo.office_code,
        office_dep: nodo.office_dep,
        status: nodo.status,
      });
      nodo.hijos.forEach(dfs);
    }

    dfs(raiz);

    return resultado;
  }

  search(event: any): void {
    if (event.target.value) {
      this.searchTerm$.next(event.target.value);
    }
  }
  searchTermByPoliza$ = new Subject<string>();
  searchTermByNameBen$ = new Subject<string>();
  searchByPoliza(event: any): void {
    if (event.target.value) {
      this.searchTermByPoliza$.next(event.target.value);
    }
  }

  searchTermByNameBen(event  : any) : void{
    if(event.target.value)  {
      this.searchTermByNameBen$.next(event.target.value);
    }
  }

  getPriceByItem(item: number | string, quantity: string) {
    if (typeof item === 'string') {
      return parseInt(item) / parseInt(quantity);
    }

    return item / parseInt(quantity);
  }

  getService(service_id: number) {
    return this.servicios
      .filter((servicio) => servicio.servicio_id === service_id)
      .map((servicio) => servicio.servicio);
  }


  getServiceType(service_id : number) {
    return this.servicios
      .filter( (servicio) => servicio.servicio_id === service_id)
      .map( (servicio ) =>
        servicio.status == 1 ? 'NORMAL' : 'NETO'
      )
  }

  getStatusClass(status: number) {
    return {
      success: status === 2,
      deleted: status === 3,
    };
  }

  getClientName(id: number | string) {
    // return this.clienteService.getOne(id);
  }

  getStatusString(status: number) {
    return status == 2 ?  'realizado' : 'proceso';
  }

  getFormaPago(tipo: number) {
    switch (tipo) {
      case 1:
        return 'oficina';
      case 2:
        return 'web';
      case 3:
        return 'comparaBien.pe';
      case 4:
        return 'comparaBien.mx';
      case 5:
        return 'comparaBien.br';
      case 6 :
        return 'comparaBien.co';
      case 7 :
        return 'comparaBien.es';
        default:
        return 'oficina';
    }
  }
  getStatusPoliza(venta: Reporte) {
    if (venta.poliza_st < 3) {
      const actualDate = new Date();
      const outDate = new Date(venta.fecha_salida.split('T')[0]);
      const returnDate = new Date(venta.fecha_retorno.split('T')[0]);
      const expireDate = new Date(venta.fecha_caducidad.split('T')[0]);

      if((actualDate > returnDate && venta.multiviaje == 1) || (venta.multiviaje > 1 && actualDate > expireDate)) {
        return "vencida"
      }

      if (actualDate > outDate) {
        return 'activa';
      }
    }

    switch (venta.poliza_st) {
      case 1:
        return 'proceso';
      case 2:
        return 'espera';
      case 3:
        return 'activa';
      case 4:
        return 'congelada';
      case 5:
        return 'reembolso';
      case 6:
        return 'anulada';
      default:
        return 'vencida';
    }
  }

  makeCsvVen() {
    const nameFile =
      'reporte ventas-' + new Date().toISOString().split('T')[0] + '.xlsx';

    const headers = [
      'venta',
      'status',
      'Oficina',
      'username',
      'fecha venta',
      'plan',
      'tipo',
      'forma pago',
      'cantidad',
      'precio',
      'total',
      'plus',
      'descuento',
      'descuento extra',
      'comision',
      'total_pago',
      'poliza',
      'status poliza',
      'multiviaje',
      'destino',
      'dias',
      'fecha salida',
      'fecha retorno',
      'beneficiario',
      'nombres',
      'apellidos',
      'identificacion',
      'fecha nacimiento',
      'edad',
      'origen',
      'email',
      'telefono',
    ];

    const data = this.ventasFiltered.map((venta) => {
      return [
        venta.venta_id,
        this.getStatusString(venta.status),
        this.getOficceById(venta.office_id).office_name,
        venta.username,
        venta.fecha_venta.split('T')[0],
        this.getService(venta.servicio_id),
        this.getServiceType(venta.servicio_id),
        this.getFormaPago(venta.forma_pago),
        venta.cantidad,
        parseFloat(venta.precio).toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}),
        parseFloat(venta.total).toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}),
        venta.plus.toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}),
        parseFloat(venta.descuento).toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}),
        venta.descuento_extra.toString().split(',').join('.'),
        venta.comision ? venta.comision.toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}) : '0',
        venta.total_pago.toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}),
        venta.poliza_id,
        this.getStatusPoliza(venta),
        venta.multiviaje > 1 ? "Aplica" : "No aplica",
        venta.destino,
        venta.nro_dias,
        venta.fecha_salida.split('T')[0],
        venta.fecha_retorno.split('T')[0],
        venta.beneficiario_id,
        venta.primer_nombre,
        venta.primer_apellido,
        venta.nro_identificacion,
        venta.fecha_nacimiento.split('T')[0],
        venta.edad,
        venta.origen,
        venta.email,
        venta.telefono,
      ];
    });

    const wb = Xlsx.utils.book_new();
    const ws = Xlsx.utils.aoa_to_sheet([headers, ...data]);

    Xlsx.utils.book_append_sheet(wb, ws, 'Report Data');
    Xlsx.writeFile(wb, nameFile);
  }

  onSuccess(message: string) {
    this.notificacionModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/check.svg',
      closeOnTouch: true,
    });
  }

  onError(message: string) {
    this.notificacionModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/warning.svg',
      closeOnTouch: true,
    });
  }

  onLoading(observerProcess: Observable<any>) {
    this.notificacionModalService.show('Cargando', {
      size: Size.normal,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/loading.svg',
      closeOnTouch: false,
      notifier: observerProcess,
    });
  }
}
