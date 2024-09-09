import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'status-venta-selector-modal',
  templateUrl : './statusVentaSelectorModal.component.html',
  styleUrls: ['./statusVentaSelectorModal.component.css'],
})
export class StatusVentaSelectorModalComponent implements OnInit {
  ngOnInit(): void {
  }

  private cdr = inject(ChangeDetectorRef);


  private elementRef =inject(ElementRef);



  selectedStatus = new FormControl<number >(2, [Validators.required]);


  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter<number>();


  close() {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(){
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit(this.selectedStatus.value!);
  }

  onSelect( status : number){

    this.selectedStatus.setValue(status);
  }
}
