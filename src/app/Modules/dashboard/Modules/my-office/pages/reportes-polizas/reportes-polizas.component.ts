import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  templateUrl: './reportes-polizas.component.html',
  styleUrls: ['./reportes-polizas.component.css'],
})
export class ReportesPolizasComponent implements OnInit {
  ngOnInit(): void {
    const process = new Subject();
    const observerProcess = process.asObservable();

    this.searchTerm$
      .pipe(
        debounceTime(500), // Adjust the delay time here (in milliseconds)
        distinctUntilChanged(),
        switchMap((term) => {
          term.length <= 1
            ? (this.ventasFiltered = this.ventas)
            : (this.ventasFiltered = this.ventas.filter((venta) =>
                venta.nro_identificacion.startsWith(term)
              ));

          return of();
        })
      )
      .subscribe((resp) => {});

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
            : (this.ventasFiltered = this.ventas.filter((venta) =>
                venta.poliza_id.toString().startsWith(term)
              ));

          return of();
        })
      )
      .subscribe((resp) => {});

    this.onLoading(observerProcess);
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.ventas = [];
          // console.log(params);

          return this.officeService.getAll();
        }),
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
        complete: () => {},
      });
  }

  ventas: Reporte[] = [];
  ventasFiltered: Reporte[] = [];
  oficina: Oficina[] = [];
  servicios: Servicio[] = [];
  oficinaArbol: OficinaUi[] = [];
  searchTerm$ = new Subject<string>();

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
    const offices = this.oficina.filter((ofi) => ofi.office_id === office_id);
    return offices[0];
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
    this.filter(dates[0], dates[1]);
  }

  filter(initialDate: string, finalDate: string) {
    const process = new Subject();
    const observerProcess = process.asObservable();
    this.onLoading(observerProcess);
    const office_id = this.activatedRoute.snapshot.params['id'];
    const office: Oficina = this.getOficceById(parseInt(office_id));



    if(office.address === "REGION"){

      const ofiArbol = this.encontrarSubarbol(
        this.oficinaArbol[0],
        office.office_id
      );

      const listOfiArbol = this.aplanarArbol(ofiArbol!);
      this.reportesService.get(initialDate, finalDate).pipe(
        switchMap( resp => {
          const listOficces_id = listOfiArbol.map( ofi => ofi.office_id);
          const filterList = resp.filter( venta =>  listOficces_id.includes(venta.office_id) );
          return of(filterList);
        })
      ).subscribe({
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
      })

    }else{
      this.reportesService
      .getByOffice(office_id, initialDate, finalDate)
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

    }

    // console.log(office);


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
  searchByPoliza(event: any): void {
    if (event.target.value) {
      this.searchTermByPoliza$.next(event.target.value);
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
    return status == 1 ? 'realizado' : 'proceso';
  }

  getStatusPoliza(state: number) {
    switch (state) {
      case 1:
        return 'Proceso';
      case 2:
        return 'Espera';
      case 3:
        return 'Activa';
      case 4:
        return 'Congelada';
      case 5:
        return 'Reembolso';
      case 6:
        return 'Anulada';
      default:
        return 'Vencida';
    }
  }

  makeCsvVen() {
    const nameFile = 'reporte ventas-' + new Date().toISOString().split('T')[0];

    var options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: 'locale',
      showLabels: true,
      showTitle: true,
      title: 'Report data',
      useBom: true,
      headers: [
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
      ],
    };

    const data = this.ventas.map((venta) => {
      return {
        venta: venta.venta_id,
        status: this.getStatusString(venta.status),
        oficina: this.getOficceById(venta.office_id).office_name,
        username: venta.username,
        'fecha venta': venta.fecha_venta.split('T')[0],
        'forma pago': 'efectivo',
        cantidad: venta.cantidad,
        precio: parseFloat(venta.precio),
        total: parseFloat(venta.total),
        plus: venta.plus,
        descuento: parseFloat(venta.descuento),
        'descuento extra': venta.descuento_extra,
        'total pagado': venta.total_pago,
        poliza: venta.poliza_id,
        statuspol: this.getStatusPoliza(venta.poliza_st),
        destino: venta.destino,
        dias: venta.nro_dias,
        'fecha salida': venta.fecha_salida.split('T')[0],
        'fecha retorno': venta.fecha_retorno.split('T')[0],
        beneficiario: venta.beneficiario_id,
        nombres: venta.primer_nombre,
        apellidos: venta.primer_apellido,
        identificacion: venta.nro_identificacion,
        'fecha nacimiento': venta.fecha_nacimiento.split('T')[0],
        edad: venta.edad,
        origen: venta.origen,
        email: venta.email,
        telefono: venta.telefono,
      };
    });

    new ngxCsv(data, nameFile, options);
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
