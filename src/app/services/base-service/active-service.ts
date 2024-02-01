import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BaseService} from "./base-service.service";
import {Observable} from "rxjs";

export class ActiveService<T> extends BaseService<T>{
  listActive(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiMethodDir}/active`);
  }
}
