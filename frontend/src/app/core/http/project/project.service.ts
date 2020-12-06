import { Injectable } from '@angular/core';
import { ApiService, InterceptorSkipHeader } from '../api.service';

import { Project } from "../../../shared/models/project";

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  ROUTE = 'project';
  constructor(private api: ApiService) { }

  get(avoidLangIntercep = false, id?: string) {
    var headers;
    avoidLangIntercep ? headers = InterceptorSkipHeader : headers = {};
    if (id) {
      return this.api.http.get<any>(`${this.api.URL}/${this.ROUTE}/${id}`, {headers});
    }
    return this.api.http.get<any>(`${this.api.URL}/${this.ROUTE}`, {headers});
  }
  
  create(project: Project) {
    return this.api.http.post<any>(`${this.api.URL}/${this.ROUTE}/create`, project);
  }
  
  update(project: Project) {
    return this.api.http.patch<any>(`${this.api.URL}/${this.ROUTE}/update`, project);
  }

  delete(id?: string){
    return this.api.http.delete<any>(`${this.api.URL}/${this.ROUTE}/${id}`, {});
  }
}
