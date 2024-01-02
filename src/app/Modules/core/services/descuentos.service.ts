import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Descuento, DescuentoToPost } from '../models/Descuento.model';

@Injectable({
  providedIn: 'root',
})
export class DescuentosService implements CRUDService<Descuento> {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/descuentos';



  constructor() {}
  getAll(): Observable<Descuento[]> {
    return this.http.get<Descuento[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Descuento[]> {
    let params  = new HttpParams;

    params = params.append('id', id);


    return this.http.get<Descuento[]>(this.apiUrl, {params});

  }
  create(item: DescuentoToPost): Observable<Descuento> {
    return this.http.post<Descuento>(this.apiUrl, item);
  }


  update(id: string | number, item: DescuentoToPost): Observable<Descuento> {

    return this.http.put<Descuento>(this.apiUrl +`?id=${id}`,item);

  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
