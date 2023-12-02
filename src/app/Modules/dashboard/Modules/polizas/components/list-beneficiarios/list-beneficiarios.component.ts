import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'list-beneficiarios',
  templateUrl: './list-beneficiarios.component.html',
  styleUrls: ['./list-beneficiarios.component.css']
})
export class ListBeneficiariosComponent {


  @Output() messageSent: EventEmitter<string> = new EventEmitter<string>();



  changeUrlChild( id_ben : number ) {
    this.messageSent.emit(id_ben.toString());
  }


}
