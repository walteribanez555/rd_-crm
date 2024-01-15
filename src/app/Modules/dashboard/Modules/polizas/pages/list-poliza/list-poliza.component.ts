import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
