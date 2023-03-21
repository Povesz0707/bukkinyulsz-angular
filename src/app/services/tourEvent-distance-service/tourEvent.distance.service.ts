import {BaseService} from "../base-service/base-service.service";
import {SubSection} from "../../model/subSection-model/subSection.model";
import {TourEventDistance} from "../../model/tourEvent-distance-model/tourEvent.distance.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {TourEvent} from "../../model/tourEvent-model/tourEvent.model";
import {Observable} from "rxjs";
import {Distance} from "../../model/distance-model/distance";
@Injectable({
  providedIn: 'root'
})
export class TourEventDistanceService extends BaseService<TourEventDistance>{
  constructor(override http: HttpClient) {
    super("tourEventDistance");
  }
  findAllByDistance(distance: Distance): Observable<TourEventDistance[]>{
    return this.http.post<TourEventDistance[]>(`${this.apiMethodDir}/getBy/distance`,distance);
  }
  findAllByTourEvent(tourEvent: TourEvent): Observable<TourEventDistance[]>{
    return this.http.post<TourEventDistance[]>(`${this.apiMethodDir}/getBy/tourEvent`,tourEvent);
  }
}
