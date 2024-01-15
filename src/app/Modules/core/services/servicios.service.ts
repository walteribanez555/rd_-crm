import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Servicio } from '../models/Servicio.model';
import { CRUDService } from '../interfaces/CRUD_service.interface';
@Injectable({
  providedIn: 'root',
})
export class ServiciosService implements CRUDService<Servicio> {
  private apiUrl = environment.apiUrl + '/servicios';
  private http = inject(HttpClient);

  constructor() {}
  getAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Servicio[]> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Servicio[]>(this.apiUrl, { params }).pipe(
      map((resp: Servicio[]) => {
        if (resp.length === 0) {
          throw new Error("User Not Found");
        }
        return [resp[0]];
      })
    );

  }
  create(item: Servicio): Observable<Servicio> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Servicio): Observable<Servicio> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
