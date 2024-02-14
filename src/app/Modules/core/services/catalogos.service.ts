import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Catalogo } from '../models/Catalogo.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService implements CRUDService<Catalogo> {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/catalogos';

  constructor() {}
  getAll(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.apiUrl + '?id=beneficios');
  }


  getAllExtras() : Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>(this.apiUrl+'?id=multiviajes');
  }

  getOne(id: string | number): Observable<Catalogo[]> {
    throw new Error('Method not implemented.');
  }
  create(item: Catalogo): Observable<Catalogo> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Catalogo): Observable<Catalogo> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
