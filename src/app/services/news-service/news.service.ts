import {Injectable} from "@angular/core";
import {ActiveService} from "../base-service/active-service";
import {GaleryImage} from "../../model/galeryImage-model/galeryImage.model";
import {HttpClient} from "@angular/common/http";
import {News} from "../../model/news-model/news.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService extends ActiveService<News>{
  constructor(override http: HttpClient) {
    super("news");
  }

  listActiveTop3(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiMethodDir}/active3`);
  }

}
