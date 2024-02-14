import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { Subject, switchMap, Observable, debounceTime, distinctUntilChanged, of } from 'rxjs';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { Reporte } from 'src/app/Modules/core/models/Reporte.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { ServiciosService } from 'src/app/Modules/core/services';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';
import { ReportesService } from 'src/app/Modules/core/services/reportes.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  templateUrl : './list.component.html',
  styleUrls : ['./list.component.css']
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
          : (this.ventasFiltered = this.ventas.filter((venta) =>
              venta.poliza_id.toString().startsWith(term)
            ));

        return of();
      })
    )
    .subscribe((resp) => {});

    this.serviciosService.getAll().pipe(
      switchMap( resp => {
        this.servicios = resp;
        return this.officeService.getAll()
      })
    ).subscribe({
      next : (resp ) => {
        this.oficina = resp;
      },
      error : ( err) => {
        process.complete();
        this.onError(err);
      } ,
      complete : () => {
        this.route.queryParams.subscribe((queryParams) => {
          this.ventas = [];



          const { init, end } = this.route.snapshot.queryParams;

          if (!init || !end) {
            this.isWithFilter = true;
            return;
          }

          this.fetchReport(init, end, observer, process);
        });

      }
    })






  }

  searchTermByPoliza$ = new Subject<string>();


  searchByPoliza(event: any): void {
    if (event.target.value) {
      this.searchTermByPoliza$.next(event.target.value);
    }
  }


  fetchReport(init: string, end: string , observer : Observable<any>, process : Subject<any>) {


    this.onLoading(observer);
    this.reportesService
      .get(init, end).subscribe({
        next : (resp => {
          process.complete();
          this.ventas = resp.reverse();
          this.ventasFiltered = this.ventas;

        }),
        error : (err) => {
          process.complete();
          this.onError(err);
        },

      })

  }

  private route = inject(ActivatedRoute);
  private reportesService = inject(ReportesService);
  private officeService = inject(OficinasService);
  private serviciosService = inject(ServiciosService);
  ventas: Reporte[] = [];
  ventasFiltered : Reporte[]= [];
  servicios: Servicio[] = [];
  oficina: Oficina[] = [];

  filterForm = new FormGroup({
    initialDate: new FormControl(null, [Validators.required]),
    finalDate: new FormControl(null, [Validators.required]),
  });

  private notificacionModalService = inject(NotificationService);

  isWithFilter: boolean = false;

  onFilter(filterResp : string[]) {



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


  getStatusString(status : number){
    return status ==1 ? "realizado" : "proceso";

  }


  getStatusPoliza(state: number) {
    switch (state) {
      case 1:
        return "Proceso"
      case 2:
        return "Espera"
      case 3:
        return "Activa"
      case 4:
        return "Congelada"
      case 5:
        return "Reembolso"
      case 6:
        return "Anulada"
      default :
        return "Vencida"
    }
  }



  makeCsvVen(){

    const nameFile = "reporte ventas-"+new Date().toISOString().split('T')[0];

    var options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: 'locale',
      showLabels: true,
      showTitle: true,
      title: 'Report data',
      useBom: true,
      headers: ["venta","status","Oficina","username","fecha venta","forma pago","cantidad","precio","total","plus","descuento","descuento extra","total_pago","poliza","status poliza","destino","dias","fecha salida","fecha retorno","beneficiario","nombres","apellidos","identificacion","fecha nacimiento","edad", "origen","email","telefono"]
    };

    const data = this.ventas.map(venta => {
      return {
        venta : venta.venta_id,
        status:  this.getStatusString(venta.status),
        oficina : this.getOficces(venta.office_id),
        username : venta.username,
        'fecha venta' : venta.fecha_venta.split('T')[0],
        'forma pago' : 'efectivo',
        cantidad : venta.cantidad,
        precio : parseFloat(venta.precio),
        total : parseFloat(venta.total),
        plus : venta.plus,
        descuento : parseFloat(venta.descuento),
        'descuento extra' : venta.descuento_extra,
        'total pagado' : venta.total_pago,
        'poliza' : venta.poliza_id,
        'status poliza' : this.getStatusPoliza( venta.poliza_st),
        destino : venta.destino,
        dias : venta.nro_dias,
        'fecha salida' : venta.fecha_salida.split('T')[0],
        'fecha retorno' : venta.fecha_retorno.split('T')[0],
        beneficiario : venta.beneficiario_id,
        nombres : venta.primer_nombre,
        apellidos : venta.primer_apellido,
        identificacion : venta.nro_identificacion,
        'fecha nacimiento' : venta.fecha_nacimiento.split('T')[0],
        edad : venta.edad,
        origen : venta.origen,
        email : venta.email,
        telefono : venta.telefono



      }


    })

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
