import {BaseService} from "../base-service/base-service.service";
import {Marking} from "../../model/marking-model/marking.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MarkingService extends BaseService<Marking>{
  constructor(override http: HttpClient) {
    super("marking");
  }
}
