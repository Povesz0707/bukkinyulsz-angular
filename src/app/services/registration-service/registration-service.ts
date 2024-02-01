import {Injectable} from "@angular/core";
import {BaseService} from "../base-service/base-service.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(public   http: HttpClient) {
  }
}
