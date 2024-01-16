import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { Observable, Subject, forkJoin, of, switchMap } from 'rxjs';
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

@Component({
  templateUrl: './list-poliza.component.html',
  styleUrls: ['./list-poliza.component.css'],
  animations: [loadingAnimation],
})
export class ListPolizaComponent implements OnInit {
  ngOnInit(): void {

    const process= new Subject();

    const observer = process.asObservable();

    this.onLoading(observer);

    this.officeService.getAll().pipe(
      switchMap( resp =>{
        this.oficina = resp;
        return this.serviciosService.getAll();

      })

    ).subscribe({
      next : (resp) => {
        this.servicios = resp;
        process.complete();

      },
      error : (err) => {
        process.complete();
        this.onError(err);

      },
      complete : ( ) => {

      }
    })

  }


  oficina : Oficina[] = [];
  ventas: Reporte[] = [];
  servicios : Servicio[] = [];
  private notificacionModalService = inject(NotificationService);
  private sessionService = inject(SessionService);
  private reportesService = inject(ReportesService);
  private officeService = inject(OficinasService);
  private serviciosService = inject(ServiciosService);


  onFilter(dates : string[]) {




    this.filter(dates[0], dates[1]);

  }


  filter(initialDate : string, finalDate : string) {
    const process = new Subject();
    const observerProcess  = process.asObservable();
    this.onLoading(observerProcess);


    this.reportesService.getByUsername(this.sessionService.getUser()!, initialDate, finalDate).subscribe({
      next: ( resp ) => {
        process.complete();
        this.ventas = resp.reverse();
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


  getOficces( office_id : number){
    return this.oficina.filter(ofi => ofi.office_id === office_id  ).map(ofi => ofi.office_name);

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
      headers: ["venta","status","Oficina","username","fecha venta","forma pago","cantidad","precio","total","plus","descuento","descuento extra","total_pago","poliza","destino","fecha salida","fecha retorno","beneficiario","nombres","apellidos","identificacion","fecha nacimiento","edad", "origen","email","telefono"]
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
