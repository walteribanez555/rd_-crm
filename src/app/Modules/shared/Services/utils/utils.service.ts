import { Injectable } from '@angular/core';
// import { cotizacionDataForm } from '../../models/Pages/cotizacionDataForm.model';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Servicio } from '../../models/Data/Servicio';
// import { Precio } from '../../models/Data/Precio';
// import { Catalogo } from '../../models/Data/Catalogo';
// import { Plan } from '../../models/Data/Plan';
// import { catalogoBeneficio } from '../../models/Pages/catalogoBeneficio.model';
// import { Beneficio } from '../../models/Data/Beneficio';
// import { catalogoBeneficioData } from '../../models/Pages/catalogoBeneficioData.model';
// import { Cupon } from '../../models/Data/Cupon';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {}

   //Generar los grupos para los menores de 75 y los mayores de 75
  DivideByAge(listCotizaciones : any[]){
    const cotizaciones : any = [];
    const cotizacionesMayores: any = [];
    let minPlanes =0;


    listCotizaciones.forEach(cotizacion => {

      if(cotizacion.age*1 < 75*1){
        cotizaciones.push(cotizacion);
      }else{
        cotizacionesMayores.push(cotizacion);
      }
    });

    if(cotizaciones.length> 0){
      minPlanes++
    }

    if(cotizacionesMayores.length> 0) {
      minPlanes++;
    }

    return {
      cotizacionesMenores : cotizaciones,
      cotizacionesMayores : cotizacionesMayores,
      minPlanes : minPlanes
    }
  }

  //Comparar las fechas
  compararFechas(initialDate : string, finalDate : string){
    const date1: Date = new Date(initialDate);
    const date2: Date = new Date(finalDate);




      // Get the difference in milliseconds
      const diffInMs = Math.abs(date2.getTime() - date1.getTime());

      // Convert the difference to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if(!isNaN(diffInDays)){
        return diffInDays+1;

      }
      return -1;
   }


   //Si el plan tiene los requisitos que en este caso son los paises destinos
  //  haveRequirements( plan : Servicio, tags : string[]){

  //   if(!plan.disponibilidad){
  //     return false;
  //   }

  //   const countries : string [] = plan.disponibilidad.split(",");




  //   return   tags.every((string) => countries.includes(string));
  // }


  // //Si el plan tiene los requisitos que en este caso son los dias necesarios
  // haveRange(servicio : Servicio, diffDays: number, precios : Precio[] ):Boolean{
  //   const dias : number = diffDays;

  //     const haveArange : Precio[] =  precios.filter(precio => {



  //         if(this.betweenTheRange(precio.limite_inferior, precio.limite_superior ,dias)  && precio.servicio_id*1 === servicio.servicio_id*1){
  //           return true;
  //         }
  //         return false;

  //     });


  //     if(haveArange.length>0){

  //       return true


  //     }


  //     return false;
  // }


  // createItemForm(): FormGroup {
  //   return new FormGroup({
  //     age: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),

  //   });
  // }

   //Comprobar de que este en el rango un numero
  betweenTheRange( liInf: number, liSup: number, diffd : number ) : boolean{

    return diffd*1 >= liInf*1 && diffd*1 <= liSup*1;
  }


  getDate(value : string){
    const dateToStringMapped = value.split('T')[0].split('-').join('/');
    return  dateToStringMapped;
  }

  getDateDto(fechaDto : string){
    const fechaString = this.getDate(fechaDto);
    const partesFecha = fechaString.split('/');
    const anio = Number(partesFecha[0]);
    const mes = Number(partesFecha[1]) - 1; // Los meses en JavaScript empiezan en 0
    const dia = Number(partesFecha[2]);
    const fecha = new Date(anio, mes, dia);

    return fecha;

  }

  // obtenerCostoPlan( precios : Precio[], servicio_id : number, diffd : number){


  //   const rangoPrecio =  precios.find(precio => {


  //     if((+precio.servicio_id === +servicio_id)  && this.betweenTheRange(precio.limite_inferior, precio.limite_superior, diffd)){
  //       return true;
  //     }


  //     return false;
  //   });


  //   if(rangoPrecio){
  //     const costo= this.realizarCalculo(rangoPrecio, diffd) ;
  //     return costo;
  //   }


  //   return -1;

  // }

  // realizarCalculo(rangoPrecio : Precio, diffDays : number){
  //   let precio :number = 0;
  //   if(rangoPrecio.tipo_ecuacion*1 ===1){
  //     precio=this.ecuacionCurva(rangoPrecio, diffDays)*1 * diffDays*1;
  //   }
  //   if(rangoPrecio.tipo_ecuacion*1 ===2){
  //     precio = this.ecuacionRecta(rangoPrecio, diffDays)*1 *diffDays*1;
  //   }

  //   return precio;

  // }



//   ecuacionCurva(rangoPrecio : Precio, dias : number){
//     const valor = Math.pow(dias, rangoPrecio.intercepto)
//     return valor*1*rangoPrecio.pendiente*1;

//   }


//   ecuacionRecta( rangoPrecio : Precio, dias: number){



//       const valor = (rangoPrecio.pendiente*dias)*1 + rangoPrecio.intercepto*1;

//       return valor;

//   }


//   //Mapear los listados de beneficio por cada plan
//   mapListBeneficio(listPlan : Plan[], beneficios : Catalogo[]){

//     const listCatBeneficio : catalogoBeneficio[] = [];
//     beneficios.forEach(beneficio=> {
//       const planesByBeneficio : Plan[] = listPlan.filter( plan => plan.tipo_beneficio === beneficio.valor);
//       const catyBeneficio = {
//         tipo_beneficio : beneficio,
//         beneficios :  planesByBeneficio,
//         isSubDropdownOpen: false,
//       }
//       listCatBeneficio.push(catyBeneficio);
//     })

//     return listCatBeneficio
//    }

//    //Mapear los listados de beneficios por cada categoria
//    mapListBeneficioCat(listBeneficios : Beneficio[], beneficiosData : Catalogo[] ){
//     const listCatBeneficio : catalogoBeneficioData[] = [];
//     beneficiosData.forEach(cat=> {
//       const catbyBeneficio : Beneficio[] = listBeneficios.filter( beneficio => beneficio.tipo_beneficio === cat.valor);
//       const catyBeneficio = {
//         tipo_beneficio : cat,
//         beneficios :  catbyBeneficio,
//         subDropdownOpen: false,
//       }

//       listCatBeneficio.push(catyBeneficio);
//     })

//     return listCatBeneficio

//  }

//  filterCouponsByDates( cupones : Cupon[]){

//   return cupones.filter( cupon => {
//     const fechaActual = new Date();

//     const fechaInicial = new Date(cupon.fecha_desde);
//     const fechaFinal = new Date(cupon.fecha_hasta);

//     return fechaActual>= fechaActual && fechaActual < fechaFinal
//   })


//  }


}
