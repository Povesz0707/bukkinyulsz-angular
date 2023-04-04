import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../model/payload/login/LoginRequest";
import {JwtResponse} from "../../model/payload/login/JwtResponse";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  apiMethodDir = environment.serverUrl +'/user';
  constructor(public http: HttpClient) {
  }
  logIn(loginRequest: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiMethodDir}/login`,loginRequest);
  }
}
