import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Extra } from '../models/Extra.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExtrasService implements CRUDService<Extra> {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/extras';

  constructor() {}
  getAll(): Observable<Extra[]> {
    return this.http.get<Extra[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Extra[]> {
    throw new Error('Method not implemented.');
  }
  create(item: Extra): Observable<Extra> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Extra): Observable<Extra> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
