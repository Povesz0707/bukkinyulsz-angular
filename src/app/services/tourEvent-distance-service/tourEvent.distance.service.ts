import {BaseService} from "../base-service/base-service.service";
import {SubSection} from "../../model/subSection-model/subSection.model";
import {TourEventDistance} from "../../model/tourEvent-distance-model/tourEvent.distance.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class TourEventDistanceService extends BaseService<TourEventDistance>{
  constructor(override http: HttpClient) {
    super("tourEvent");
  }
}
