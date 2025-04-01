import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { float } from 'html2canvas/dist/types/css/property-descriptors/float';
import { ngxCsv } from 'ngx-csv';
import { platform } from 'os';
import { Observable, Subject, of, switchMap } from 'rxjs';
import { Oficina, OficinaUi } from 'src/app/Modules/core/models/Oficina';
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
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {


  ngOnInit(): void {

    const locale = navigator.language; console.log(locale);
    var numero = 1548789.15.toLocaleString();
    console.log("Número: " + numero);

    const process = new Subject();
    const observer = process.asObservable();

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
              return;
            }

            this.fetchReport(init, end, observer, process);
            // console.log(this.getOfficeById(132));
            // this.findElementById(this.oficinaArbol, this.oficinaArbol)
          });
        },
      });
  }

  //   findElementById(oficces : OficinaUi[], office : Oficina) : OficinaUi | null {
  //     for (const item of oficces) {
  //         if (item.office_id === office.office_id) {
  //             return item;
  //         }
  //         if (item.hijos && item.hijos.length > 0) {
  //             const found = this.findElementById(item.hijos, this.getOffice(office.office_code)[0]);
  //             if (found) {
  //                 return found;
  //             }
  //         }
  //     }
  //     return null;
  // }

  buscarRegionPorEncima(
    idHijo: number,
    arreglo: OficinaUi[]
  ): OficinaUi | null {
    let elementoEncontrado = null;

    const office = this.getOfficeById(idHijo).map((ofi) => {
      const oficinaUi: OficinaUi = {
        hijos: [],
        ...ofi,
      };
      return oficinaUi;
    })[0];

    if (office.address === 'REGION') {
      return office;
    }

    // if (this.getOffice(idHijo)[0].address === 'REGION') {

    //
    // }

    for (let i = 0; i < arreglo.length; i++) {
      let elementoEncontrado = null;
      for (let i = 0; i < arreglo.length; i++) {
        const elemento = arreglo[i];
        if (elemento.hijos && elemento.hijos.length > 0) {
          const hijoEncontrado = elemento.hijos.find(
            (hijo) => hijo.office_id === idHijo
          );
          if (hijoEncontrado) {
            if (hijoEncontrado.address == 'REGION') {
              elementoEncontrado = hijoEncontrado;
            } else {
              elementoEncontrado = this.getOffice(
                hijoEncontrado.office_dep
              ).map((oficina) => {
                const oficinaUi: OficinaUi = {
                  hijos: [],
                  ...oficina,
                };
                return oficinaUi;
              })[0];
            }
            break;
          } else {
            // Si no se encuentra el hijo en este nivel, buscar en los hijos recursivamente
            elementoEncontrado = this.buscarRegionPorEncima(
              idHijo,
              elemento.hijos
            );
            if (elementoEncontrado) {
              break;
            }
          }
        }
      }
      return elementoEncontrado;
    }
    return elementoEncontrado;
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
        this.ventas = resp;
      },
      error: (err) => {
        process.complete();
        this.onError(err);
      },
    });
  }


  private route = inject(ActivatedRoute);
  private reportesService = inject(ReportesService);
  private officeService = inject(OficinasService);
  private serviciosService = inject(ServiciosService);
  ventas: Reporte[] = [];
  servicios: Servicio[] = [];
  oficina: Oficina[] = [];
  oficinaArbol: OficinaUi[] = [];

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
      return parseInt(item) / parseInt(quantity);
    }

    return item / parseInt(quantity);
  }

  getOficces(office_id: number) {
    const oficcess = this.oficina
      .filter((ofi) => ofi.office_id == office_id)
      .map((ofi) => ofi.office_name);
    return oficcess;
  }

  getOffice(office_code: string) {
    const oficcess = this.oficina.filter(
      (ofi) => ofi.office_code == office_code
    );
    return oficcess;
  }

  getOfficeById(office_id: number) {
    const oficcess = this.oficina.filter((ofi) => ofi.office_id == office_id);
    console.log(oficcess);
    return oficcess;
  }

  getService(service_id: number) {
    return this.servicios
      .filter((servicio) => servicio.servicio_id == service_id)
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

  getStatusString(status: number) {
    return status == 2 ? 'realizado' : 'proceso';
  }

  getStatusPoliza(venta: Reporte) {
    if (venta.poliza_st < 3 && venta.poliza_st > 1) {
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
      'reporte_ventas-' + new Date().toISOString().split('T')[0] + '.xlsx';

    const headers = [
      'venta',
      'fecha venta',
      'poliza',
      'oficina',
      'username',
      'plan',
      'tipo',
      'edad',
      'destino',
      'fecha salida',
      'fecha retorno',
      'dias',
      'cantidad',
      'precio',
      'total',
      'plus',
      'descuento',
      'descuentro extra',
      'total pago',
      'comision',
      'total voucher',
      'status poliza',
      'multiviaje',
      'representante',
      'nombres',
      'apellidos',
      'fecha nacimiento',
      'identificacion',
      'origen',
      'email',
      'telefono',
      'beneficiario',
      'forma pago',
      'status',
    ];

    console.log({ventas: this.ventas});

    const data = this.ventas.map((venta) => {
      return [
        venta.venta_id,
        venta.fecha_venta.split('T')[0],
        venta.poliza_id,
        this.getOfficeById(venta.office_id)[0].office_name,
        venta.username,
        this.getService(venta.servicio_id),
        this.getServiceType(venta.servicio_id),
        venta.edad,
        venta.destino,
        venta.fecha_salida.split('T')[0],
        venta.fecha_retorno.split('T')[0],
        venta.nro_dias,
        venta.cantidad,
        parseFloat(venta.precio).toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}),
        parseFloat(venta.total).toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}),
        venta.plus,
        parseFloat(venta.descuento).toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}),
        venta.descuento_extra.toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}),
          (venta.total_pago - (venta.comision ?? 0)).toLocaleString(undefined,
            {'minimumFractionDigits':2,'maximumFractionDigits':2}),

        venta.comision ? venta.comision.toLocaleString(undefined,
          {'minimumFractionDigits':2,'maximumFractionDigits':2}) :'0.00',
          (venta.total_pago).toLocaleString(undefined,
            {'minimumFractionDigits':2,'maximumFractionDigits':2}),
        this.getStatusPoliza(venta),
        venta.multiviaje > 1 ? "Aplica" : "No Aplica",
        this.buscarRegionPorEncima(venta.office_id, this.oficinaArbol)?.city,
        venta.primer_nombre,
        venta.primer_apellido,
        venta.fecha_nacimiento.split('T')[0],
        venta.nro_identificacion,
        venta.origen,
        venta.email,
        venta.telefono,
        venta.beneficiario_id,
        this.getFormaPago(venta.forma_pago),
        this.getStatusString(venta.status),
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
}
