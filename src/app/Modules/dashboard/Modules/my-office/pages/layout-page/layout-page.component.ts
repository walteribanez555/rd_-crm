import { Component, inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SessionService } from 'src/app/Modules/auth/Services/session.service';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  selector: 'app-layout-page',
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


    this.sessionService.getOfficesFromUser().subscribe({
      next : ( oficces ) =>{
        process.complete();
        this.oficces = oficces;
      },
      error : (err ) => {
        process.complete();
        this.onError(err);
      },
      complete : ( ) => {

      }
    })
  }

  oficces : Oficina[]  = [];


  private notificacionModalService = inject(NotificationService);
  private sessionService = inject(SessionService);



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
