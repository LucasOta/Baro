import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "../user/user.model";
import { GlobalService } from "../global/global.service";

import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private URL = "";

  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.URL = this.globalService.getURL();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    return this.http
      .post<any>(`${this.URL}/user/login`, { email, password })
      .pipe(
        map((res) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (res.ok) {
            localStorage.setItem("currentUser", JSON.stringify(res.user));
            this.currentUserSubject.next(res.user);
          }
          return res;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }
}
