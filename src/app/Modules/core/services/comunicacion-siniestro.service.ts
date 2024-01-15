import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ComunicacionSiniestro, ComunicacionSiniestroPost } from '../models/ComunicacionSiniestro.model';

@Injectable({
  providedIn: 'root',
})
export class ComunicacionSiniestroService
  implements CRUDService<ComunicacionSiniestro>
{

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl+'/comunicaciones';



  constructor() {}
  getAll(): Observable<ComunicacionSiniestro[]> {
    return this.http.get<ComunicacionSiniestro[]>(this.apiUrl);


  }
  getOne(id: string | number): Observable<ComunicacionSiniestro[]> {
    let params = new HttpParams();
    params.append('id', id);

    return this.http.get<ComunicacionSiniestro[]>(this.apiUrl, {params});


  }
  create(item: ComunicacionSiniestroPost): Observable<ComunicacionSiniestro> {

    return this.http.post<ComunicacionSiniestro>(this.apiUrl, item);

  }
  update(
    id: string | number,
    item: ComunicacionSiniestro
  ): Observable<ComunicacionSiniestro> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
