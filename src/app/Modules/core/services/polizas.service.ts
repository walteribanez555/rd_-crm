import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Poliza, PolizaToPost } from '../models/Poliza.model';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PolizasService implements CRUDService<Poliza> {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl +'/polizas';


  constructor() {}
  getAll(): Observable<Poliza[]> {
    return this.http.get<Poliza[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Poliza[]> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<Poliza[]>(this.apiUrl, { params }).pipe(
      map((resp: Poliza[]) => {
        if (resp.length === 0) {
          throw new Error("User Not Found");
        }
        return [resp[0]];
      })
    );


  }
  create(item: PolizaToPost): Observable<Poliza> {
    return this.http.post<Poliza>(this.apiUrl, item);
  }
  update(id: string | number, item: Poliza): Observable<Poliza> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
