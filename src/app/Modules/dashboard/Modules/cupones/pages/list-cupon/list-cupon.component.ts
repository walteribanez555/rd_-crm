import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cupon } from 'src/app/Modules/shared/models/data/Cupon';

@Component({
  templateUrl: './list-cupon.component.html',
  styleUrls: ['./list-cupon.component.css']
})
export class ListCuponComponent {

  listado_Cupones : Cupon[] = [];
  hasLoaded = true;






  constructor(
    // private cupones: CuponesService,
    private router : Router
  ){}


  ngOnInit(){

    // this.hasLoaded = false;
    // this.cupones.getCupones().subscribe(
    //   (data)=>{
    //     this.hasLoaded= true;
    //     this.listado_Cupones = data.filter(item => item.status!=2);
    //   }
    // )
  }



  createCupones(){
    this.router.navigate(['../dashboard/cupones/crear-cupones']);
  }

  showDetails(idCupon : number){
    this.router.navigate([`../dashboard/cupones/${idCupon}`]);

  }


  editDetails(idCupon : number){
    this.router.navigate([`../dashboard/cupones/${idCupon}/editar`]);

  }



}
