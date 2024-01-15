import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rol, RolToPost } from '../models/Rol';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {


  private http = inject(HttpClient);


  private apiUrl = environment.apiAuthUrl+ '/roles';



  getAll() : Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl).pipe(
      map( rols => {

        return rols.filter(r => r.rol_name.startsWith('R_')).map(rol => {
              rol.rol_name = rol.rol_name.substring(2);
              return rol;
           });
      })
    );
  }


    // {
    //     "rol_id": 15,
    //     "rol_name": "Soporte",
    //     "rol_structure": "{\"permissions\":[{\"area\":\"Siniestros\",\"area_permissions\":[\"listado-siniestros\",\"siniestro/:id\"]},{\"area\":\"Reembolsos\",\"area_permissions\":[\"reembolso/:id\",\"listado-reembolso\"]}]}",
    //     "status": 1
    // }

  getById( id : string | number) : Observable<Rol[]> {

    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Rol[]>(this.apiUrl, { params}).pipe(
      map(
        rols => {
          return rols.filter(r => r.rol_name.startsWith('R_') && r.status !== 3).map(rol => {
            rol.rol_name = rol.rol_name.substring(2);
            return rol;
         });

        }
      )
    );
  }

  create ( rol : RolToPost ) {

    rol.rol_name = 'R_'+rol.rol_name;

    return this.http.post(this.apiUrl, rol);


  }


  update(id : string | number,  data : Rol) {


    data.rol_name = 'R_'+data.rol_name;

    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.put(this.apiUrl, data, {params});

  }

  delete( rol : Rol ) {

    let params = new HttpParams();
    params = params.append('id', rol.rol_id);

    rol.status =3;


    return this.http.put(this.apiUrl, rol, {params});

  }




  constructor() { }

}
