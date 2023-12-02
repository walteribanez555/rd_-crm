import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {


  private debouncer : Subject<string> = new Subject<string>();

  @Input() placeholder : string = '';

  @Output()
  public onValue =new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();




  ngOnInit(): void {

    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(
        value => {
          this.onDebounce.emit( value );
        }
      )


  }


  emitValue(value : string) : void {
    this.onValue.emit( value );
  }


  onKeyPress( searchTerm : string){
    this.debouncer.next( searchTerm );

  }

}
