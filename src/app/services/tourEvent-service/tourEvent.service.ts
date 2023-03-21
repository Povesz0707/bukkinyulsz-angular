import {BaseService} from "../base-service/base-service.service";
import {SubSection} from "../../model/subSection-model/subSection.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TourEvent} from "../../model/tourEvent-model/tourEvent.model";
@Injectable({
  providedIn: 'root'
})
export class TourEventService extends BaseService<TourEvent>{
  constructor(override http: HttpClient) {
    super("tourEvent");
  }
  getLatestActive(): Observable<TourEvent>{
    return this.http.get<TourEvent>(`${this.apiMethodDir}/get/getLatestActive`);
  }
  updateActiveStatus(tourEventList:TourEvent[], status:boolean): Observable<TourEvent>{
    return this.http.post<TourEvent>(`${this.apiMethodDir}/updateActiveStatus/${status}`,tourEventList);
  }
}
