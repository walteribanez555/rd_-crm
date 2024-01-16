import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { Observable, Subject, switchMap } from 'rxjs';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { Reporte } from 'src/app/Modules/core/models/Reporte.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import { ClientesService, ServiciosService, VentasService } from 'src/app/Modules/core/services';
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

    this.onLoading(observerProcess);
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.ventas = [];

          return this.officeService.getById(params['id']);

        }),
        switchMap((resp) => {
          this.oficina = resp;
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
  oficina: Oficina[] = [];
  servicios : Servicio[] = [];

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

  onFilter(dates : string[]) {


    this.filter(dates[0], dates[1]);

  }


  filter(initialDate : string, finalDate : string) {
    const process = new Subject();
    const observerProcess  = process.asObservable();
    this.onLoading(observerProcess);
    this.reportesService.getByOffice(this.oficina[0].office_id, initialDate, finalDate).subscribe({
      next: ( resp ) => {
        process.complete();
        this.ventas = resp;
      },
      error : (err) => {
        process.complete();
        this.onError(err);
      },
      complete : () => {

      }
    })

  }

  getPriceByItem( item : number | string , quantity : string ){

    if(typeof item === 'string'){
      return parseInt(item) / parseInt(quantity);
    }

    return item /  parseInt(quantity);
  }

  getService( service_id : number) {
    return this.servicios.filter(servicio => servicio.servicio_id === service_id).map(servicio => servicio.servicio);
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

  getStatusString(status : number){
    return status ==1 ? "realizado" : "proceso";

  }

  getStatusPoliza( status : number) {
    return "Activa";
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
        oficina : this.oficina[0].office_name,
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
