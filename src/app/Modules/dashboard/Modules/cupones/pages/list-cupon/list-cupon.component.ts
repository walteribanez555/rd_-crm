import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CuponesService } from 'src/app/Modules/core/services';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { Cupon } from 'src/app/Modules/shared/models/data/Cupon';

@Component({
  templateUrl: './list-cupon.component.html',
  styleUrls: ['./list-cupon.component.css'],
  animations : [
    loadingAnimation
  ]
})
export class ListCuponComponent {

  listado_Cupones : Cupon[] = [];
  hasLoaded = true;


  cuponesService  = inject(CuponesService);


  private notificacionesModalService = inject(NotificationService);




  constructor(
    // private cupones: CuponesService,
    private router : Router
  ){}


  ngOnInit(){


    const onProcces = new Subject();

    const observerProcess : Observable<any> = onProcces.asObservable();


    this.onLoading(observerProcess);


    this.cuponesService.getAll().subscribe({
      next : (data) => {
        onProcces.complete();
        this.listado_Cupones = data;
      },
      error : (err) => {
        onProcces.complete();
        console.log(err);

      },
      complete : () => {

      }
    })


  }



  createCupones(){
    this.router.navigate(['../dashboard/cupones/crear-cupones']);
  }

  showDetails(idCupon : number){
    this.router.navigate([`../dashboard/cupones/${idCupon}`]);

  }


  editDetails(idCupon : number){
    this.router.navigate([`../dashboard/cupones/${idCupon}/edit`]);

  }




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
