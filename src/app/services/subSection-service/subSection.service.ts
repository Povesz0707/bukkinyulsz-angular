import {BaseService} from "../base-service/base-service.service";
import {SubSection} from "../../model/subSection-model/subSection.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubSectionService extends BaseService<SubSection>{
  constructor(override http: HttpClient) {
    super("subSection");
  }
}
