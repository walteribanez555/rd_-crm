import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
