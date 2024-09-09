import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import {
  Subject,
  switchMap,
  Observable,
  debounceTime,
  distinctUntilChanged,
  of,
} from 'rxjs';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { Reporte } from 'src/app/Modules/core/models/Reporte.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { ServiciosService } from 'src/app/Modules/core/services';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';
import { ReportesService } from 'src/app/Modules/core/services/reportes.service';
import {
  Size,
  PositionMessage,
} from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import * as Xlsx from 'xlsx';


@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  ngOnInit(): void {
    const process = new Subject();
    const observer = process.asObservable();

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
              this.ventasFiltered = resp;
            });

          return of();
        })
      )
      .subscribe((resp) => {});

    this.serviciosService
      .getAll()
      .pipe(
        switchMap((resp) => {
          this.servicios = resp;
          return this.officeService.getAll();
        })
      )
      .subscribe({
        next: (resp) => {
          this.oficina = resp;
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
              this.isWithFilter = true;
              const initialDate = new Date().toISOString().split('T')[0];
              this.onUpdateDir(initialDate, initialDate);

              this.fetchReport(initialDate, initialDate, observer, process);
              return;
            }

            this.onUpdateDir(init, end);
            this.fetchReport(init, end, observer, process);
          });
        },
      });


      this.searchTerm$.pipe(
        debounceTime(500), // Adjust the delay time here (in milliseconds)
        distinctUntilChanged(),
        switchMap((term) => (term ? this.reportesService.getByNroIdentificacion(term) : of(this.ventas)))
      ).subscribe( resp => {
        this.ventas = resp;
      });




  }

  searchTerm$ = new Subject<string>();



  onWriteInput( event : any) {
    if (event.target.value) {
      this.searchTerm$.next(event.target.value);
    }

  }

  searchTermByPoliza$ = new Subject<string>();

  searchByPoliza(event: any): void {
    if (event.target.value) {
      this.searchTermByPoliza$.next(event.target.value);
    }
  }

  fetchReport(
    init: string,
    end: string,
    observer: Observable<any>,
    process: Subject<any>
  ) {
    this.onLoading(observer);
    this.reportesService.get(init, end).subscribe({
      next: (resp) => {
        process.complete();
        this.ventas = resp.reverse();
        this.ventasFiltered = this.ventas;
      },
      error: (err) => {
        process.complete();
        this.onError(err);
      },
    });
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

  private route = inject(ActivatedRoute);
  private reportesService = inject(ReportesService);
  private officeService = inject(OficinasService);
  private serviciosService = inject(ServiciosService);
  ventas: Reporte[] = [];
  ventasFiltered: Reporte[] = [];
  servicios: Servicio[] = [];
  oficina: Oficina[] = [];

  filterForm = new FormGroup({
    initialDate: new FormControl(null, [Validators.required]),
    finalDate: new FormControl(null, [Validators.required]),
  });

  private notificacionModalService = inject(NotificationService);

  isWithFilter: boolean = false;

  onFilter(filterResp: string[]) {
    const process = new Subject();
    const observer = process.asObservable();

    this.fetchReport(filterResp[0], filterResp[1], observer, process);
  }

  getPriceByItem(item: number | string, quantity: string) {
    if (typeof item === 'string') {
      return parseFloat(item) / parseFloat(quantity);
    }

    return item / parseFloat(quantity);
  }

  getOficces(office_id: number) {
    console.log({ office_id });
    console.log(this.oficina);
    const oficcess = this.oficina
      .filter((ofi) => ofi.office_id == office_id)
      .map((ofi) => ofi.office_name);
    console.log({ oficcess });
    return oficcess;
  }

  getService(service_id: number) {
    return this.servicios
      .filter((servicio) => servicio.servicio_id == service_id)
      .map((servicio) => servicio.servicio);
  }

  getStatusClass(status: number) {
    return {
      success: status === 2,
      deleted: status === 3,
    };
  }

  getStatusString(status: number) {
    return status == 1 ? 'realizado' : 'proceso';
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
    const nameFile = 'reporte ventas-' + new Date().toISOString().split('T')[0]  + '.xlsx';

   const headers=  [
        'venta',
        'status',
        'Oficina',
        'username',
        'fecha venta',
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
        'efectivo',
        venta.cantidad,
        parseFloat(venta.precio).toFixed(2).toLocaleString(),
        parseFloat(venta.total).toFixed(2).toLocaleString(),
        venta.plus.toLocaleString(),
        parseFloat(venta.descuento).toFixed(2).toLocaleString(),
        venta.descuento_extra.toString().split(',').join('.'),
        venta.total_pago.toLocaleString(),
        venta.poliza_id,
        this.getStatusPoliza(venta),
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
