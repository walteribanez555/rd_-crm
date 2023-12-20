import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Precio } from '../models/Precio.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PreciosService implements CRUDService<Precio> {


  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/precios';


  constructor() {}
  getAll(): Observable<Precio[]> {
    return this.http.get<Precio[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Precio[]> {
    throw new Error('Method not implemented.');
  }
  create(item: Precio): Observable<Precio> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Precio): Observable<Precio> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
