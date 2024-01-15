import { Component, inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Cupon } from 'src/app/Modules/core/models/Cupon.model';
import { Rol } from 'src/app/Modules/core/models/Rol';
import { CuponesService } from 'src/app/Modules/core/services';
import { RolesService } from 'src/app/Modules/core/services/roles.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {


  ngOnInit(): void {
    this.loadItems();

  }



  loadItems(){
    const process = new Subject();
    const observerProcess=  process.asObservable();


    this.onLoading(observerProcess);

    this.cuponService.getAll().subscribe({
      next : (resp) => {
        console.log({resp});
        process.complete();

        this.cupones = resp;
      },
      error : (err) => {
        process.complete();
        this.onError(err);
      },
      complete : () => {

      }

    });



    // this.rolService.getAll().subscribe({
    //   next : (resp) => {

    //     console.log(resp);
    //     process.complete();

    //     this.rols = resp;
    //   },
    //   error : (err) => {
    //     process.complete();
    //     this.onError(err);
    //   },
    //   complete : ( ) => {

    //   }

    // })
  }

  cupones : Cupon[] = [];

  private notificacionModalService = inject(NotificationService);
  private cuponService = inject(CuponesService);


  isClicked: boolean = false;
  isHideInfo: boolean = false;

  onChangeClick() {
    this.isClicked = !this.isClicked;
  }

  onClickInfo() {
    this.isHideInfo = !this.isHideInfo;
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
