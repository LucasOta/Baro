import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = '';

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.URL = this.globalService.getURL();
  }

  getAll() {
    return this.http.get<User[]>(`${this.URL}/user`);
  }

  register(user: User) {
    return this.http.post(`${this.URL}/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.URL}/users/${id}`);
  }
}
