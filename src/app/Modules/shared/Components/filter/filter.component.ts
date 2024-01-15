import {  Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'filter',
  templateUrl : './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {


  filterForm = new FormGroup({
    initialDate: new FormControl(null, [Validators.required]),
    finalDate: new FormControl(null, [Validators.required]),
  });


  @Output()   onFilter = new EventEmitter();



  onFormSubmitFilter() {
    if (!this.filterForm.valid) {
      return;
    }

    const {initialDate, finalDate} = this.filterForm.value;

    this.onFilter.emit([initialDate!, finalDate!]);

  }




}
