import {Injectable} from "@angular/core";
import {BaseService} from "../base-service/base-service.service";
import {Marking} from "../../model/marking-model/marking.model";
import {ActiveService} from "../base-service/active-service";
import {HttpClient} from "@angular/common/http";
import {GaleryImage} from "../../model/galeryImage-model/galeryImage.model";
import {Tender} from "../../model/render-model/tender.model";

@Injectable({
  providedIn: 'root'
})
export class TenderService extends ActiveService<Tender>{
  constructor(override http: HttpClient) {
    super("tender");
  }

}
