import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, switchMap } from 'rxjs';
import {
  CuponesService,
  ServiciosService,
} from 'src/app/Modules/core/services';
import {
  Size,
  PositionMessage,
} from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { ServicioUi } from '../../models/Servicio.ui.model';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { Cupon } from 'src/app/Modules/core/models/Cupon.model';

@Component({
  templateUrl: './edit-cupon.component.html',
  styleUrls: ['./edit-cupon.component.css'],
  animations: [loadingAnimation],
})
export class EditCuponComponent implements OnInit {
  ngOnInit(): void {
    this.hasLoaded = false;

    this.router.params.subscribe({
      next: (params) => {
        this.mapData(params);
      },
      error: () => {},
      complete: () => {},
    });
  }

  mapData(params: any) {
    const onProcces = new Subject();

    const observerProcess: Observable<any> = onProcces.asObservable();

    this.onLoading(observerProcess);

    this.serviciosService
      .getAll()
      .pipe(
        switchMap((servicios) => {
          this.list_servicios = servicios.map((servicio) => {
            return { isSelected: false, ...servicio };
          });
          return this.cuponesService.getOne(params['id']);
        })
      )
      .subscribe({
        next: (cupones: Cupon[]) => {
          onProcces.complete();
          this.list_cupones = cupones;

          this.list_servicios = this.list_servicios.map((servicio) => {
            const { isSelected, ...servicioData } = servicio;

            if (cupones[0].servicio_id === servicioData.servicio_id) {
              return {
                isSelected: true,
                ...servicioData,
              };
            } else {
              return servicio;
            }
          });


        },
        error: (err) => {
          onProcces.complete();
          this.onError(err);
        },
        complete: () => {
          this.mapToForm();
          this.hasLoaded = true;
        },
      });
  }

  private cuponesService = inject(CuponesService);
  private serviciosService = inject(ServiciosService);
  private notificacionesModalService = inject(NotificationService);
  private router = inject(ActivatedRoute);

  hasLoaded: boolean = false;

  list_servicios: ServicioUi[] = [];
  list_cupones: Cupon[] = [];

  mapToForm() {
    console.log(this.list_cupones[0]);

    this.servicio_id = new FormControl(
      this.list_cupones[0].servicio_id,
      Validators.required
    );
    this.oficina_id = new FormControl(null, Validators.required);
    this.tipo_valor = new FormControl(
      this.list_cupones[0].tipo_valor,
      Validators.required
    );
    this.nombre = new FormControl(
      this.list_cupones[0].nombre,
      Validators.required
    );
    this.valor = new FormControl(
      this.list_cupones[0].valor,
      Validators.required
    );
    this.fecha_desde = new FormControl(
      this.list_cupones[0].fecha_desde
        .split('T')[0]
        .split('-')
        .reverse()
        .join('-'),
      Validators.required
    );
    this.fecha_hasta = new FormControl(
      this.list_cupones[0].fecha_hasta
        .split('T')[0]
        .split('-')
        .reverse()
        .join('-'),
      Validators.required
    );

    this.editCuponForm = new FormGroup({
      servicio_id: this.servicio_id,
      oficina_id: this.oficina_id,
      tipo_valor: this.tipo_valor,
      nombre: this.nombre,
      valor: this.valor,
      fecha_desde: this.fecha_desde,
      fecha_hasta: this.fecha_hasta,
    });
  }

  onEditDiscount() {
    // const {servicio_id, oficina_id, tipo_valor,nombre, valor, fecha_desde, fecha_hasta} = this.editCuponForm?.value;

    const formData = this.editCuponForm?.value;

    const process = new Subject();

    const observerProcess = process.asObservable();

    this.onLoading(observerProcess);

    this.cuponesService
      .update(this.list_cupones[0].cupon_id, formData)
      .subscribe({
        next: (resp) => {
          process.complete();
          this.onSuccess('Cupon Actualizado');
        },
        error: (err) => {
          process.complete();
          this.onError(err);
        },

        complete: () => {},
      });
  }

  onUpdateState(state: number) {


    const process = new Subject();
    const observerProcess = process.asObservable();
    this.onLoading(observerProcess);

    const idCupon = this.list_cupones[0].cupon_id;

    this.cuponesService.update( idCupon, { status: state, valor : this.list_cupones[0].valor }).subscribe({
      next:  ( resp ) => {
        process.complete();
        this.onSuccess("Cupon Actualizado Correctamente");
      },
      error : (err) => {
        process.complete();
        this.onError(err);
      },
      complete : () => {

      }



    })


  }

  editCuponForm: FormGroup | null = null;

  servicio_id: FormControl | null = null;
  oficina_id: FormControl | null = null;
  tipo_valor: FormControl | null = null;
  nombre: FormControl | null = null;
  valor: FormControl | null = null;
  fecha_desde: FormControl | null = null;
  fecha_hasta: FormControl | null = null;
  status: FormControl | null = null;

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

  selectItem(servicio: any) {
    this.uncheckServices();
    servicio.selectedItem = !servicio.selectedItem;
    // this.onChangeForm();
  }

  uncheckServices() {
    this.list_servicios.forEach((servicio) => (servicio.isSelected = false));
  }

  oneAtLeast(): boolean {
    return this.list_servicios.some((servicio) => servicio.isSelected === true);
  }
}
