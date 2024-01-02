import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Cliente,  ClienteToPost } from '../models/Cliente.model';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService implements CRUDService<Cliente> {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/clientes';

  constructor() {}
  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Cliente[]> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<Cliente[]>(this.apiUrl, { params }).pipe(
      map((resp: Cliente[]) => {
        if (resp.length === 0) {
          throw new Error("User Not Found");
        }
        return [resp[0]];
      })
    );
  }
  create(item: ClienteToPost): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, item);
  }
  update(id: string | number, item: Cliente): Observable<Cliente> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
