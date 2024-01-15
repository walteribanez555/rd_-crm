import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Rol } from 'src/app/Modules/core/models/Rol';
import { RolesService } from 'src/app/Modules/core/services/roles.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  templateUrl : 'LayoutPage.component.html',
  styleUrls: ['./LayoutPage.component.css'],
})
export class LayoutPageComponent implements  OnInit {
  ngOnInit(): void {
    this.loadItems();

  }



  loadItems(){
    const process = new Subject();
    const observerProcess=  process.asObservable();


    this.onLoading(observerProcess);

    this.rolService.getAll().subscribe({
      next : (resp) => {

        console.log(resp);
        process.complete();

        this.rols = resp;
      },
      error : (err) => {
        process.complete();
        this.onError(err);
      },
      complete : ( ) => {

      }

    })
  }

  rols : Rol[]  = [];


  private rolService = inject(RolesService);
  private notificacionModalService = inject(NotificationService);


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
