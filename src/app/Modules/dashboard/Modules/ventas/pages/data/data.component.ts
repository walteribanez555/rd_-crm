import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, switchMap } from 'rxjs';
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

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  ngOnInit(): void {

    const process = new Subject();
    const observer = process.asObservable();

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

  fetchReport(init: string, end: string , observer : Observable<any>, process : Subject<any>) {


    this.onLoading(observer);
    this.reportesService
      .get(init, end).subscribe({
        next : (resp => {
          process.complete();
          this.ventas = resp;

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
      return parseInt(item) / parseInt(quantity);
    }

    return item / parseInt(quantity);
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
