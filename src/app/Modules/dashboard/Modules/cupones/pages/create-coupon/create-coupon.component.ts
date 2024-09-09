import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, forkJoin, switchMap } from 'rxjs';
import {
  CatalogosService,
  CuponesService,
  ServiciosService,
} from 'src/app/Modules/core/services';
import {
  Size,
  PositionMessage,
} from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationModalComponent } from 'src/app/Modules/shared/Components/notification/notification-modal.component';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { Cupon, CuponToPost } from 'src/app/Modules/core/models/Cupon.model';
import { DatesAction } from 'src/app/Modules/shared/utils/dates/dates-action';
import { ServicioUi } from '../../models/Servicio.ui.model';
import { Catalogo } from 'src/app/Modules/core/models/Catalogo.model';
import { url } from 'inspector';

@Component({
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css'],
  animations: [loadingAnimation],
})
export class CreateCouponComponent implements OnInit {
  hasLoaded: boolean = true;

  ngOnInit(): void {
    this.hasLoaded = false;

    const onProcces = new Subject();

    const observerProcess: Observable<any> = onProcces.asObservable();

    this.onLoading(observerProcess);

    this.serviciosService.getAll().subscribe({
      next: (servicios) => {
        this.list_servicios = servicios.map((servicio) => {
          return { isSelected: false, ...servicio };
        });
      },
      error: (err) => {},
      complete: () => {
        this.createCuponForm = new FormGroup({
          oficina_id: this.oficina_id,
          tipo_valor: this.tipo_valor,
          nombre: this.nombre,
          valor: this.valor,
          fecha_desde: this.fecha_desde,
          fecha_hasta: this.fecha_hasta,
          status: new FormControl(1, Validators.required),
          isCode: this.isCode,
        });

        onProcces.complete();
        onProcces.unsubscribe();

        this.hasLoaded = true;
      },
    });


    this.catalogoService.getAllUrls().subscribe({
      next: (resp) => {
        this.list_urls = resp;
      }
    })
  }

  selectItem(servicio: any) {
    // this.uncheckServices();
    servicio.isSelected = !servicio.isSelected;
    // this.onChangeForm();
  }

  uncheckServices() {
    this.list_servicios!.forEach((servicio) => (servicio.isSelected = false));
  }

  oneAtLeast(): boolean {
    return this.list_servicios!.some(
      (servicio) => servicio.isSelected === true
    );
  }

  list_servicios: ServicioUi[] | null = null;
  list_urls  : Catalogo[] = [];

  createCuponForm: FormGroup | null = null;

  oficina_id = new FormControl('[1,2,3]', Validators.required);
  tipo_valor = new FormControl(null, Validators.required);
  nombre = new FormControl(null, Validators.required);
  valor = new FormControl(null, Validators.required);
  fecha_desde = new FormControl(null, Validators.required);
  fecha_hasta = new FormControl(null, Validators.required);
  status = new FormControl(null, Validators.required);
  isCode = new FormControl(false, Validators.required);
  urlDestiny  = new FormControl(null, Validators.required);



  onSuccess(message: string) {
    this.notificacionesModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/check.svg',
      closeOnTouch: true,
    });
  }

  onError(message: string) {
    this.notificacionesModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/warning.svg',
      closeOnTouch: true,
    });
  }

  onLoading(observerProcess: Observable<any>) {
    this.notificacionesModalService.show('Cargando', {
      size: Size.normal,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/loading.svg',
      closeOnTouch: false,
      notifier: observerProcess,
    });
  }

  createCupon() {

    if (this.oneAtLeast()) {
      const requests: any[] = [];

      this.list_servicios?.forEach((serv) => {
        if (serv.isSelected) {
          const cuponToPost: CuponToPost = this.mapServToCupon(
            serv,
            this.createCuponForm?.value,
            this.urlDestiny.value!
          );

          console.log({cuponToPost});
          requests.push(this.cuponesService.create(cuponToPost));
        }
      });
      this.callTheRequest(requests);
    }
  }

  callTheRequest(requests: any[]) {
    const onProcces = new Subject();

    const observerProcess: Observable<any> = onProcces.asObservable();

    this.onLoading(observerProcess);

    forkJoin(requests).subscribe({
      next: (resp) => {
        onProcces.complete();
        this.onSuccess('Cupon Creado exitosamente');
      },
      error: (err) => {
        onProcces.complete();
        this.onError(err);
      },
      complete: () => {
        onProcces.complete();

      },
    });
  }

  mapServToCupon(serv: ServicioUi, infoCuponForm: any, urlDestiny : string): CuponToPost {




    const cuponToPost: CuponToPost = {
      servicio_id: serv.servicio_id,
      oficina_id: infoCuponForm.oficina_id,
      tipo_valor: infoCuponForm.tipo_valor,
      nombre: (infoCuponForm.isCode as boolean) ? `CODE_${infoCuponForm.nombre}-${urlDestiny}` :  `${infoCuponForm.nombre}-${urlDestiny}`,
      valor: infoCuponForm.valor,
      fecha_hasta:this.fecha_hasta.value!,
      fecha_desde: this.fecha_desde.value!,
      status: 1,
    };
    return cuponToPost;
  }

  private cuponesService = inject(CuponesService);
  private serviciosService = inject(ServiciosService);
  private notificacionesModalService = inject(NotificationService);
  private catalogoService = inject(CatalogosService);
}
