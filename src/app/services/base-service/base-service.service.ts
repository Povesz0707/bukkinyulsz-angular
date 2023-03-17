import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

export class BaseService<T> {
  apiMethodDir: string
  http: HttpClient
  protected constructor(serviceEndpoint: string) {
    this.apiMethodDir = environment.serverUrl +'/'+ serviceEndpoint;
  }

  list(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiMethodDir}/list`);
  }
  get(id: number): Observable<T>{
    return this.http.get<T>(`${this.apiMethodDir}/get/${id}`);
  }
  add(competition: T): Observable<T>{
    return this.http.post<T>(`${this.apiMethodDir}/add`,competition);
  }
  edit(competition: T): Observable<T>{
    return this.http.put<T>(`${this.apiMethodDir}/edit`,competition);
  }
  delete(id: number): Observable<T>{
    return this.http.delete<T>(`${this.apiMethodDir}/delete/${id}`);
  }
}
