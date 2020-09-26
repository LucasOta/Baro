import { Injectable } from '@angular/core';
import { ApiService } from "../api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  login(email, password) {
    return this.api.http.post<any>(`${this.api.URL}/user/login`, { email, password });
  }
}
