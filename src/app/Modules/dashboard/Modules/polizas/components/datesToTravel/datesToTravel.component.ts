import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { locationTravel } from './locationTravel';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dates-to-travel',
  // template: `<p>datesToTravel works!</p>`,
  templateUrl : 'datesToTravel.component.html',
  styleUrls: ['./datesToTravel.component.css'],
})
export class DatesToTravelComponent {

  @Output() onChangePage = new EventEmitter();


  locations : locationTravel[] = [

  ];

  @Input() places! : FormGroup;


  tags : String[] = [];


  changeLocation(positionSelected : number) {

    this.locations.splice(positionSelected, 1);
    this.places.get('toLocation')?.setValue(this.locations.map(location => location.location).join(', '));

  }


  onChangeStep() {

    this.onChangePage.emit();
  }

  onSelectedDestiny( destiny : string) {
    this.locations.push({
      location : destiny,
      isSelected : true,
    })

    this.places.get('toLocation')?.setValue(this.locations.map(location => location.location).join(', '));
  }

  onSelectedOrigen( place : string) {
    this.places.get('fromLocation')?.setValue(place);
  }

}
