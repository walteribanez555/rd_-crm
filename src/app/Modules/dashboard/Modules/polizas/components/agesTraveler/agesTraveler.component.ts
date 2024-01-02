import {  Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PositionMessage, Size, TypeMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  selector: 'ages-traveler',
  templateUrl : './agesTraveler.component.html',
  styleUrls: ['./agesTraveler.component.css'],
})
export class AgesTravelerComponent {

  @Output() onChangePage = new EventEmitter();
  @Output() onBackStep = new EventEmitter();

  private notificationService = inject(NotificationService);


  @Input() agesForm! : FormGroup;


  adultDate : number = 0;
  seniorDate : number = 0;


  onChangeStep() {

    this.agesForm.get('adultQuantity')?.setValue(this.adultDate);
    this.agesForm.get('seniorQuantity')?.setValue(this.seniorDate);

    this.onChangePage.emit();
  }

  onBackStepBtn() {
    this.onBackStep.emit();
  }

  onChangeAdultDate( item : number ){

    if(this.seniorDate>0) {
      this.onAlertMessage("Ya se ha seleccionado a adultos mayores");
      return;
    }

    if(this.adultDate === 0 && item === -1) {
      this.onAlertMessage("No puede ser menor que 0");
      return;
    }

    this.adultDate += item;
  }

  onChangeSeniorDate( item : number) {

    if(this.adultDate > 0) {
      this.onAlertMessage("Ya se ha seleccionado a adultos");
      return;
    }

    if(this.seniorDate === 0  && item === -1 ) {
      this.onAlertMessage("No puede ser menor que 0");
      return;
    }

    this.seniorDate += item;
  }


  onAlertMessage ( message : string) {


    this.notificationService.show(
      message,
      {
        size: Size.normal,
        imageUrl : TypeMessage.warning,
        duration : 2000,
        closeOnTouch : true,
        positions : [PositionMessage.center]
      }
    )

  }





 }
