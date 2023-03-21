import {Injectable} from "@angular/core";
import {BaseService} from "../base-service/base-service.service";
import {TourEvent} from "../../model/tourEvent-model/tourEvent.model";
import {DistanceSubSection} from "../../model/distance-subSection-model/distance.subSection.model";
import {HttpClient} from "@angular/common/http";
import {Distance} from "../../model/distance-model/distance";
import {Observable} from "rxjs";
import {TourEventDistance} from "../../model/tourEvent-distance-model/tourEvent.distance.model";
import {SubSection} from "../../model/subSection-model/subSection.model";

@Injectable({
  providedIn: 'root'
})
export class DistanceSubsectionService extends BaseService<DistanceSubSection>{
  constructor(override http: HttpClient) {
    super("distanceSubSection");
  }

  findAllByDistance(distance: Distance): Observable<DistanceSubSection[]>{
    return this.http.post<DistanceSubSection[]>(`${this.apiMethodDir}/getBy/distance`,distance);
  }
  findAllBySubSection(subSection: SubSection): Observable<DistanceSubSection[]>{
    return this.http.post<DistanceSubSection[]>(`${this.apiMethodDir}/getBy/subSection`,subSection);
  }
}
