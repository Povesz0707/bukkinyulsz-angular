import {Injectable} from "@angular/core";
import {BaseService} from "../base-service/base-service.service";
import {SubSection} from "../../model/subSection-model/subSection.model";
import {SubSectionMarking} from "../../model/subSection-marking-model/subSection.marking.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubSectionMarkingService extends BaseService<SubSectionMarking>{
  constructor(override http: HttpClient) {
    super("subSectionMarking");
  }
}
