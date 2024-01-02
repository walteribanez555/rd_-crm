import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Poliza, PolizaToPost } from '../models/Poliza.model';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PolizaExtra, PolizaExtraToPost } from '../models/PolizaExtra.model';

@Injectable({
  providedIn: 'root',
})
export class PolizasExtrasService implements CRUDService<PolizaExtra> {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl +'/polizasExtras';


  constructor() {}
  getAll(): Observable<PolizaExtra[]> {
    return this.http.get<PolizaExtra[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<PolizaExtra[]> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<PolizaExtra[]>(this.apiUrl, { params }).pipe(
      map((resp: PolizaExtra[]) => {
        if (resp.length === 0) {
          throw new Error("User Not Found");
        }
        return [resp[0]];
      })
    );


  }
  create(item: PolizaExtraToPost): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }
  update(id: string | number, item: PolizaExtra): Observable<PolizaExtra> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
