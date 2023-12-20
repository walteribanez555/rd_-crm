import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Plan } from '../models/Plan.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlanesService implements CRUDService<Plan> {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/planes';

  constructor() {}
  getAll(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.apiUrl);
  }

  //Get with the id_service
  getOne(id: string | number): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.apiUrl + `?id=${id}`);
  }
  create(item: Plan): Observable<Plan> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Plan): Observable<Plan> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
