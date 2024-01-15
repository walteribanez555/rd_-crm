import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { locationTravel } from './locationTravel';
import { FormGroup } from '@angular/forms';
import { CountryRegion } from 'src/app/Modules/shared/utils/data/countries-region.ts/countries-region';

@Component({
  selector: 'dates-to-travel',
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
    this.places.get('toLocation')?.setValue(this.locations.map(location => location.location));

  }


  onChangeStep() {

    this.onChangePage.emit();
  }

  onSelectedDestiny( destiny : CountryRegion) {


    this.locations.push({
      location : destiny,
      isSelected : true,
    })

    this.places.get('toLocation')?.setValue(this.locations.map(location => location.location));

  }

  onSelectedOrigen( place : CountryRegion) {
    this.places.get('fromLocation')?.setValue(place);
  }

}
