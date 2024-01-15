import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserToPost } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiAuthUrl + '/users';

  getUser(username: string): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('id', username);

    return this.http.get<User[]>(this.apiUrl, { params });
  }


  getAll( ) : Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(userToPost : UserToPost)  {
    return this.http.post(this.apiUrl, userToPost);
  }

  updateUser( username: string | number, data : any) {
    let params = new HttpParams();
    params = params.append('id', username);

    return this.http.put(this.apiUrl, data, {params});

  }

  deleteUser( id: string) {

  }

}
