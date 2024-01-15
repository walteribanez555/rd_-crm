import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { SessionService } from 'src/app/Modules/auth/Services/session.service';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {


  ngOnInit(): void {
    this.loadItems();

  }


  getMonthsBetweenDates = (startDate  = this.getFirstDayOfYear(), endDate  = new Date()) : string[] =>{
    const monthNames: string[] = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];

    const monthsBetween: string[] = [];

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const currentMonthName = monthNames[currentDate.getMonth()];
      monthsBetween.push(currentMonthName);

      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return monthsBetween;
  }


  getFirstDayOfYear(): Date {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const firstDayOfYear = new Date(currentYear, 0, 1);
    return firstDayOfYear;
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
