import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Descuento } from 'src/app/Modules/core/models/Descuento.model';
import { DescuentosService } from 'src/app/Modules/core/services';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';

@Component({
  styleUrls: ['./list.component.css'],
  templateUrl : './list.component.html',
  animations : [
    loadingAnimation
  ]
})
export class ListComponent  implements OnInit {
  ngOnInit(): void {
    const onProcces = new Subject();

    const observerProcess : Observable<any> = onProcces.asObservable();


    this.onLoading(observerProcess);

    this.descuentosService.getAll().subscribe({
      next:  (data) => {
        onProcces.complete();
        this.descuentos = data;
      },
      error : (err) => {
        onProcces.complete();
        this.onError(err);
      },
      complete: () => {

      }


    })
  }

  private descuentosService = inject(DescuentosService);
  private router = inject(Router);
  hasLoaded = true;
  descuentos : Descuento[]= [];





  showDetails(descuento_id : number){
    this.router.navigate([`../dashboard/descuentos/${descuento_id}`]);
  }

  editDetails(descuento_id: number){
    this.router.navigate([`../dashboard/descuentos/${descuento_id}/edit`]);
  }

  private notificacionesModalService = inject(NotificationService);




  onSuccess( message: string) {
    this.notificacionesModalService.show(message, {
      size: Size.normal,
      duration :3000,
      positions : [PositionMessage.center],
      imageUrl : 'assets/icons/check.svg',
      closeOnTouch : true,
    })
  }

  onError( message : string) {
    this.notificacionesModalService.show(message, {
      size : Size.normal,
      duration : 3000,
      positions : [PositionMessage.center],
      imageUrl : 'assets/icons/warning.svg',
      closeOnTouch : true,
    })
  }

  onLoading( observerProcess: Observable<any> ){
    this.notificacionesModalService.show("Cargando", {
      size: Size.normal,
      positions : [PositionMessage.center],
      imageUrl : 'assets/icons/loading.svg',
      closeOnTouch : true,
      notifier : observerProcess
    })
  }


}
