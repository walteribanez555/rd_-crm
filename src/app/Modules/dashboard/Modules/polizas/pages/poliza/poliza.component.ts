import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.css']
})
export class PolizaComponent implements OnInit {

  onEditPoliza : boolean = false;




  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('ben');
    if(!this.id){
      console.log("No Hay usuario");
    }
    if(this.id){
      console.log(this.id);
    }
  }

  actualChild : string | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id  : string | null = null;


  receiveBenId( ben_id : string){
    this.actualChild = ben_id;

  }



}
