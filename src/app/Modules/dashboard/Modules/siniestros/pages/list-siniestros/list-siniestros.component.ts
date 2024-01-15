import { Component, inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ReporteSiniestro } from 'src/app/Modules/core/models/Reporte.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { ServiciosService } from 'src/app/Modules/core/services';
import { ReportesService } from 'src/app/Modules/core/services/reportes.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  templateUrl: './list-siniestros.component.html',
  styleUrls: ['./list-siniestros.component.css']
})
export class ListSiniestrosComponent {

  private notificationModalService = inject(NotificationService);
  private serviciosService = inject(ServiciosService);
  private reportesService = inject(ReportesService);

  siniestros: ReporteSiniestro[] = [];

  ngOnInit(): void {
    const client_id = localStorage.getItem('client_id');

    const process = new Subject();
    const observerProcess = process.asObservable();

    this.onLoading(observerProcess);

    this.serviciosService
      .getAll()
      .subscribe({
        next: (resp) => {
          console.log({resp});
          this.servicios = resp;
          process.complete();
        },
        error: (err) => {
          this.onError(err);
        },
        complete: () => {},
      });

    // this.onError("No implementado correctamente");
  }
  // private renderer: Renderer2, private elementRef: ElementRef

  screenWidth?: number;
  servicios: Servicio[] = [];

  mapQuantity(quantity: string) {
    return quantity
      .split(',')
      .reduce((prev, actual) => prev + parseInt(actual), 0);
  }

  mapService( servicio_id  : number){



    return this.servicios.filter( serv => serv.servicio_id === servicio_id)[0].servicio;
  }


  onFilter(filterResp : string[]) {



    const process = new Subject();
    const observer = process.asObservable();

    this.fetchReport(filterResp[0], filterResp[1], observer, process);
  }

  fetchReport(init: string, end: string , observer : Observable<any>, process : Subject<any>) {


    this.onLoading(observer);
    this.reportesService
      .getSiniestros(init, end).subscribe({
        next : (resp => {
          process.complete();
          this.siniestros = resp;

        }),
        error : (err) => {
          process.complete();
          this.onError(err);
        },

      })

  }

  getTotalPayment( total: string, quantity ="1" ) {
    const count = quantity
      .split(',')
      .reduce((prev, actual) => prev + parseInt(actual), 0);

    const price = total
      .split(',')
      .reduce((prev, actual) => prev + parseInt(actual), 0 );

    return price/count;
  }

  getAmountByQuantity( amount : number , quantity = "1"){
    const count = quantity
      .split(',')
      .reduce((prev, actual) => prev + parseInt(actual), 0);

    return amount/count;

  }

  onSuccess(message: string) {
    this.notificationModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/check.svg',
      closeOnTouch: true,
    });
  }

  onError(message: string) {
    this.notificationModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/warning.svg',
      closeOnTouch: true,
    });
  }

  onLoading(observerProcess: Observable<any>) {
    this.notificationModalService.show('Cargando', {
      size: Size.normal,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/loading.svg',
      closeOnTouch: false,
      notifier: observerProcess,
    });
  }

  getStatusClass(status: number) {
    return {
      success: status === 2,
      deleted: status === 3,
    };
  }

}
