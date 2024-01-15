import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Siniestro, SiniestroPost } from '../models/Siniestro.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SiniestrosService implements CRUDService<Siniestro> {

  private http = inject(HttpClient);


  private apiUrl = environment.apiUrl+'/siniestros';

  constructor() {}
  getAll(): Observable<Siniestro[]> {
    return  this.http.get<Siniestro[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Siniestro[]> {
    console.log(id);
    let params = new HttpParams;
    params.append('id', id);

    return this.http.get<Siniestro[]>(this.apiUrl+`?id=${id}`);
  }
  create(item: SiniestroPost): Observable<Siniestro> {
    return this.http.post<Siniestro>(this.apiUrl, item);

  }
  update(id: string | number, item: Siniestro): Observable<Siniestro> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
