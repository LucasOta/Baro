import { Injectable } from '@angular/core';
import { ApiService, InterceptorSkipHeader } from '../api.service';

import { Project } from "../../../shared/models/project";

@Injectable({
  providedIn: 'root'
})
const ROUTE = 'project';

export class ProjectService {

  constructor(private api: ApiService) { }

  get(avoidLangIntercep = false, id?: string) {
    var headers;
    avoidLangIntercep ? headers = InterceptorSkipHeader : headers = {};
    if (id) {
      return this.api.http.get<any>(`${this.api.URL}/${ROUTE}/${id}`, {headers});
    }
    return this.api.http.get<any>(`${this.api.URL}/${ROUTE}`, {headers});
  }
  
  create(project: Project) {
    return this.api.http.post<any>(`${this.api.URL}/${ROUTE}/create`, project);
  }
  
  update(project: Project) {
    return this.api.http.patch<any>(`${this.api.URL}/${ROUTE}/update`, project);
  }

  delete(id?: string){
    return this.api.http.delete<any>(`${this.api.URL}/${ROUTE}/${id}`, {});
  }
}
