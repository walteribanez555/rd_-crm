import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Beneficio } from '../models/Beneficio.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BeneficiosService implements CRUDService<Beneficio> {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/beneficios';

  constructor() {}
  getAll(): Observable<Beneficio[]> {
    return this.http.get<Beneficio[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Beneficio[]> {
    throw new Error('Method not implemented.');
  }
  create(item: Beneficio): Observable<Beneficio> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Beneficio): Observable<Beneficio> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
