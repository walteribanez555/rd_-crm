import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl : './comisionVentaSelectorModal.component.html',
  styleUrls: ['./comisionVentaSelectorModal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComisionVentaSelectorModalComponent implements OnInit {

  ngOnInit(): void {
  }

  private cdr = inject(ChangeDetectorRef);


  private elementRef =inject(ElementRef);



  selectedStatus = new FormControl<number >(0, [Validators.required]);


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
