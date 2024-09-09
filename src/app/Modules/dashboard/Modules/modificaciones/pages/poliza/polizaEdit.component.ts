import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ModCardBenService } from '../../components/mod-card-beneficiario/modalBeneficiario/mod-card-ben.service';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import {
  BeneficiariosService,
  PolizasService,
  ServiciosService,
  VentasService,
} from 'src/app/Modules/core/services';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { ModCardPolizaService } from '../../components/mod-card-poliza/modalPoliza/mod-card-poliza.service';
import { ModCardVentaService } from '../../components/mod-card-venta/modalVenta/mod-card-venta.service';
import { ModModifierService } from '../../components/mod-modifier/mod-modifier.service';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import {
  Size,
  PositionMessage,
} from 'src/app/Modules/shared/Components/notification/enums';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { DatesAction } from 'src/app/Modules/shared/utils/dates/dates-action';
import { SessionService } from 'src/app/Modules/auth/Services/session.service';

@Component({
  templateUrl: './polizaEdit.component.html',
  styleUrls: ['./polizaEdit.component.css'],
})
export class PolizaEditComponent implements OnInit {
  private polizasService = inject(PolizasService);
  private ventasService = inject(VentasService);
  private serviciosService = inject(ServiciosService);
  private beneficiariosService = inject(BeneficiariosService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const process = new Subject();
    const observerProcess = process.asObservable();
    this.onLoading(observerProcess);




    this.loadData(process);
  }



  beneficiario?: Beneficiario;
  poliza?: Poliza;
  venta?: Venta;
  servicio?: Servicio;

  //MODAL ACTIONS
  private modalBenService = inject(ModCardBenService);
  private modalPolService = inject(ModCardPolizaService);
  private modalVenService = inject(ModCardVentaService);
  private modalModifierService = inject(ModModifierService);
  private sessionService = inject(SessionService);

  //LoadingActions
  private notificacionModalService = inject(NotificationService);

  editBen() {
    this.modalBenService
      .open({
        beneficiario: this.beneficiario!,
        servicio: this.servicio!,
        travelDate: this.poliza?.fecha_retorno!,
      })
      .subscribe({
        next: (data) => {
          // data.fecha_nacimiento
          const process= new Subject();
          const observer= process.asObservable();
          this.onLoading(observer);


          this.beneficiariosService
            .update(this.beneficiario?.beneficiario_id!, data)
            .subscribe({
              next: (resp) => {

                process.complete();

                this.beneficiario!.fecha_nacimiento = data.fecha_nacimiento;
                this.beneficiario!.origen = data.origen;
                this.beneficiario!.primer_apellido = data.primer_apellido;
                this.beneficiario!.primer_nombre = data.primer_nombre;
                this.beneficiario!.sexo = data.sexo;
                this.beneficiario!.telefono = data.telefono;
                this.onSuccess('Realizado');
              },
              error: (err) => {
                process.complete();

                this.onError(err);
              },
            });
        },
        error: (err) => {},
        complete: () => {},
      });
  }

  editPoliza() {
    this.modalPolService.open({ poliza: this.poliza! }).subscribe({
      next: (data) => {
        const process = new Subject();
        const observer = process.asObservable();
        this.onLoading(observer);
        this.polizasService.update( this.poliza!.poliza_id!, data).subscribe({
          next : ( resp) => {
            this.poliza!.fecha_salida = data.fecha_salida;
            this.poliza!.fecha_retorno = data.fecha_retorno;
            this.poliza!.nro_dias = data.dias;
            this.poliza!.destino = data.destino;

            process.complete();
            this.onSuccess("Poliza Actualizada Correctamente");
          },
          error : ( err) => {
            process.complete();
            this.onError("Occurrio un error");
          }
        })

      },
      error: (err) => {},
      complete: () => {},
    });
  }

  onChangeStatus( status : number , observacion : string) {
    const process = new Subject();
    const observer =process.asObservable();
    this.onLoading(observer);
    this.polizasService.update(this.poliza?.poliza_id!, {status , destino : this.poliza?.destino, fecha_salida : this.poliza?.fecha_salida, fecha_retorno : this.poliza?.fecha_retorno, username : this.sessionService.getUser(), observaciones : observacion , fecha_caducidad : this.poliza?.fecha_caducidad.split('T')[0] }).subscribe({
      next : ( resp ) => {
        process.complete();
        this.poliza!.status = status;
        this.onSuccess("Poliza Modificada correctamente");
      },
      error : ( err) => {
        process.complete();
        this.onError(err);
      }
    })

  }




  editVent() {
    this.modalVenService.open({ venta: this.venta!, poliza : this.poliza! }).subscribe({
      next: (data) => {
        const process = new Subject();
        const observer = process.asObservable();
        this.onLoading(observer);

        this.ventasService.onEdit(this.venta?.venta_id!, {
          total_pago : data.total_pago,
          descuento : data.descuento
        }).subscribe({
          next : ( resp ) => {
            process.complete();
            this.onSuccess("Venta Modificada correctamente");
          },
          error : ( err) => {
            process.complete();
            this.onError(err);
          }
        })


      },
      error: (err) => {},
      complete: () => {},
    });
  }

  loadData(process: Subject<any>) {
    const params = this.activatedRoute.snapshot.queryParams;

    const poliza_id = params['poliza_id'];

    if (poliza_id) {
      this.polizasService
        .getOne(poliza_id)
        .pipe(
          switchMap((resp: Poliza[]) => {
            this.poliza = resp[0];
            this.poliza.fecha_retorno = this.poliza.fecha_retorno.split('T')[0];
            this.poliza.fecha_salida = this.poliza.fecha_salida.split('T')[0];
            return this.ventasService.getOne(this.poliza!.venta_id);
          }),
          switchMap((resp: Venta[]) => {
            this.venta = resp[0];
            this.venta.fecha_venta = this.venta.fecha_venta.split('T')[0];
            return this.beneficiariosService.getOne(poliza_id);
          }),
          switchMap((resp: Beneficiario[]) => {
            this.beneficiario = resp[0];
            this.beneficiario.fecha_nacimiento =
              this.beneficiario.fecha_nacimiento.split('T')[0];
            return this.serviciosService.getOne(this.poliza!.servicio_id);
          })
        )
        .subscribe({
          next: (resp) => {
            this.servicio = resp[0];

            process.complete();
          },
          error: (err) => {
            console.log(err);
            process.complete();
          },
        });
    }
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
