import {BaseService} from "../base-service/base-service.service";
import {Distance} from "../../model/distance-model/distance";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class DistanceService extends BaseService<Distance>{
  constructor(override http: HttpClient) {
    super("distance");
  }
}
