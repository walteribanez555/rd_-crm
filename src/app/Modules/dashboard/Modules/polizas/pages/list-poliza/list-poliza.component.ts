import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  of,
  switchMap,
} from 'rxjs';
import { SessionService } from 'src/app/Modules/auth/Services/session.service';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Cliente } from 'src/app/Modules/core/models/Cliente.model';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Reporte } from 'src/app/Modules/core/models/Reporte.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';
import { ReportesService } from 'src/app/Modules/core/services/reportes.service';
import { ServiciosService } from 'src/app/Modules/core/services/servicios.service';
import {
  Size,
  PositionMessage,
} from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import * as Xlsx from 'xlsx';


@Component({
  templateUrl: './list-poliza.component.html',
  styleUrls: ['./list-poliza.component.css'],
  animations: [loadingAnimation],
})
export class ListPolizaComponent implements OnInit {
  ngOnInit(): void {
    const process = new Subject();

    const observer = process.asObservable();

    this.onLoading(observer);
    this.searchTermByNameBen$
    .pipe(
      debounceTime(500), // Adjust the delay time here (in milliseconds)
      distinctUntilChanged(),
      switchMap((term) => {
        console.log({ term });

        if (!term) {
          console.log('No hay info');
        }

        term.length <= 1
          ? (this.ventasFiltered = this.ventas)
          : this.reportesService.getByBen(term).subscribe((resp) => {
            console.log(resp);
            this.ventasFiltered = resp;
            this.ventasFiltered = resp.filter( item => item.username == localStorage.getItem('client_id'))
          });
        return of();
      })
    )
    .subscribe((resp) => {});

    this.searchTerm$
    .pipe(
      debounceTime(500), // Adjust the delay time here (in milliseconds)
      distinctUntilChanged(),
      switchMap((term) => {
        console.log({ term });

        if (!term) {
          console.log('No hay info');
        }

        term.length <= 1
          ? (this.ventasFiltered = this.ventas)
          : this.reportesService.getByNroIdentificacion(term).subscribe((resp) => {
            console.log(resp);
            this.ventasFiltered = resp;
            this.ventasFiltered = resp.filter( item => item.username == localStorage.getItem('client_id'))
          });
        return of();
      })
    )
    .subscribe((resp) => {});

    this.searchTermByPoliza$
      .pipe(
        debounceTime(500), // Adjust the delay time here (in milliseconds)
        distinctUntilChanged(),
        switchMap((term) => {
          console.log({ term });

          if (!term) {
            console.log('No hay info');
          }

          term.length <= 1
            ? (this.ventasFiltered = this.ventas)
            : this.reportesService.getByNumPoliza(term).subscribe((resp) => {
              console.log(resp);
              this.ventasFiltered = resp;
              this.ventasFiltered = resp.filter( item => item.username == localStorage.getItem('client_id'))
            });
          return of();
        })
      )
      .subscribe((resp) => {});

    this.officeService
      .getAll()
      .pipe(
        switchMap((resp) => {
          this.oficina = resp;
          return this.serviciosService.getAll();
        })
      )
      .subscribe({
        next: (resp) => {
          this.servicios = resp;
          process.complete();
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

  oficina: Oficina[] = [];
  ventas: Reporte[] = [];
  ventasFiltered: Reporte[] = [];

  servicios: Servicio[] = [];
  private notificacionModalService = inject(NotificationService);
  private sessionService = inject(SessionService);
  private reportesService = inject(ReportesService);
  private officeService = inject(OficinasService);
  private serviciosService = inject(ServiciosService);
  private route = inject(ActivatedRoute);


  onFilter(dates: string[]) {
    this.onUpdateDir(dates[0], dates[1]);

    this.filter(dates[0], dates[1]);
  }
  searchTerm$ = new Subject<string>();
  searchTermByPoliza$ = new Subject<string>();
  searchTermByNameBen$ = new Subject<string>();

  search(event: any): void {
    if (event.target.value) {
      this.searchTerm$.next(event.target.value);
    }
  }

  showEvent(event: any) {
    console.log(event);
  }

  searchByPoliza(event: any): void {
    if (event.target.value) {
      this.searchTermByPoliza$.next(event.target.value);
    }
  }

  searchByNameBen(event: any): void {
    if (event.target.value) {
      this.searchTermByNameBen$.next(event.target.value);
    }
  }

  private router = inject(Router);

  onUpdateDir(init : string, end : string) {
    const params = {
      init,
      end,
    }


     const urlTree = this.router.createUrlTree([], {
      queryParams : {...params},
      queryParamsHandling: 'merge', // Merge with existing query params
      preserveFragment: true
     })

     this.router.navigateByUrl(urlTree);

  }


  filter(initialDate: string, finalDate: string) {
    this.ventas = [];
    this.ventasFiltered = [];


    const process = new Subject();
    const observerProcess = process.asObservable();
    this.onLoading(observerProcess);

    this.reportesService
      .getByUsername(this.sessionService.getUser()!, initialDate, finalDate)
      .subscribe({
        next: (resp) => {
          process.complete();
          this.ventas = resp.reverse();
          this.ventasFiltered = this.ventas;
        },
        error: (err) => {
          process.complete();
          this.onError(err);
        },
        complete: () => {},
      });
  }

  getPriceByItem(item: number | string, quantity: string) {
    if (typeof item === 'string') {
      return parseInt(item) / parseInt(quantity);
    }

    return item / parseInt(quantity);
  }

  getOficces(office_id: number) {
    return this.oficina
      .filter((ofi) => ofi.office_id === office_id)
      .map((ofi) => ofi.office_name);
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

  getStatusString(status: number) {
    return status == 2 ? 'realizado' : 'proceso';
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

    if(venta.poliza_st < 3 ) {
      const actualDate = new Date();
      const outDate = new Date(venta.fecha_salida.split('T')[0]);
      const returnDate = new Date(venta.fecha_retorno.split('T')[0]);
      const expireDate = new Date(venta.fecha_caducidad.split('T')[0]);


      if((actualDate > returnDate && venta.multiviaje == 1) || (venta.multiviaje > 1 && actualDate > expireDate)) {
        return "vencida"
      }


      if(actualDate > outDate){
        return "activa";
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
      'reporte_ventas-' + new Date().toISOString().split('T')[0] + '.xlsx';

    const
      headers= [
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
        'total_pago',
        'poliza',
        'status poliza',
        'multiviajes',
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


    const data = this.ventas.map((venta) => {
      return [
        venta.venta_id,
        this.getStatusString(venta.status),
        this.getOficces(venta.office_id),
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
        venta.total_pago.toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}),
        venta.poliza_id,
        this.getStatusPoliza(venta),
        venta.multiviaje >1 ? "Aplica": "No Aplica",
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
