import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Cupon } from '../models/Cupon.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CuponesService implements CRUDService<Cupon> {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/cupones';


  constructor() {}
  getAll(): Observable<Cupon[]> {
    return this.http.get<Cupon[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Cupon[]> {
    throw new Error('Method not implemented.');
  }
  create(item: Cupon): Observable<Cupon> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Cupon): Observable<Cupon> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
