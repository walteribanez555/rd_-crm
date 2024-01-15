import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, Observable } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Catalogo } from 'src/app/Modules/core/models/Catalogo.model';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { Siniestro } from 'src/app/Modules/core/models/Siniestro.model';
import { PolizasService, BeneficiariosService, ServiciosService, CatalogosService, PlanesService, SiniestrosService } from 'src/app/Modules/core/services';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { TipoSiniestro } from '../../models/TipoSiniestro.ui.model';
import { mapCatPlan } from '../../utils/mappers/typeSiniestro.mappers';
import { Plan } from 'src/app/Modules/core/models/Plan.model';

@Component({
  templateUrl: './siniestro.component.html',
  styleUrls: ['./siniestro.component.css']
})
export class SiniestroComponent {
  ngOnInit(): void {
    const { poliza_id, beneficiario_id, siniestro_id } = this.activatedRoute.snapshot.queryParams;

    const process =new Subject();
    const observer = process.asObservable();

    this.onLoading(observer);


    this.polizasService.getOne(poliza_id).pipe(
      switchMap( resp => {
        this.poliza = resp[0];
        return this.beneficiariosService.getOne(poliza_id)
      }),
      switchMap( resp => {
        this.beneficiario = resp[0];
        return this.servicioService.getOne(this.poliza!.servicio_id)
      }),
      switchMap( resp => {
        this.servicio=  resp[0];
        return this.planesService.getOne(this.servicio.servicio_id);
      }),
      switchMap( resp => {
        this.planes = resp;
        return this.siniestroService.getOne(siniestro_id);
      }),
      switchMap( resp => {
          console.log({resp}, "Resp");
          this.siniestro = resp[0];
          return this.catalogoService.getAll()
      } )
    ).subscribe({
      next : ( resp) => {
        this.catalogo = resp.filter( cat => cat.catalogo_id === this.siniestro?.tipo_siniestro)[0];
        this.tipoSiniestro = mapCatPlan(this.catalogo, this.planes);

        this.tipoSiniestro.isSelected= true;

        process.complete();


      },
      error : ( err) => {
        process.complete();
        this.onError(err);

      }
    })
  }


  private activatedRoute = inject(ActivatedRoute);
  private polizasService = inject(PolizasService);
  private beneficiariosService = inject(BeneficiariosService);
  private servicioService = inject(ServiciosService);
  private catalogoService = inject(CatalogosService);
  private planesService = inject(PlanesService);
  private siniestroService = inject(SiniestrosService);


  tipoSiniestro : TipoSiniestro | null = null;


  poliza : Poliza | null = null;
  beneficiario : Beneficiario | null = null;
  servicio : Servicio | null = null;
  planes : Plan[] = [];
  catalogo : Catalogo | null = null;
  siniestro : Siniestro | null = null;
  private notificationModalService = inject(NotificationService);





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
