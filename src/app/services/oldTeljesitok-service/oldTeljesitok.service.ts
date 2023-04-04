import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OldTeljesitokData} from "../../model/oldTeljesitok-model/oldTeljesitok.data.model";
import {OldTeljesitok} from "../../model/oldTeljesitok-model/oldTeljesitok.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class OldTeljesitokService{

  constructor(public   http: HttpClient) {
  }
  getOldTeljesitok(): Observable<OldTeljesitok>{
    return this.http.get<OldTeljesitok>(`https://bukkinyulsz.hu/event/server/api/kimutatas?stat=teljesitok`);
  }
  getOklevel(id: number){
    return this.http.get<any>(`https://bukkinyulsz.hu/event/server/oklevel/get/2122`);
  }

}
