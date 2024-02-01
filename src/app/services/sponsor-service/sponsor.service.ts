import {Injectable} from "@angular/core";
import {BaseService} from "../base-service/base-service.service";
import {Marking} from "../../model/marking-model/marking.model";
import {ActiveService} from "../base-service/active-service";
import {HttpClient} from "@angular/common/http";
import {GaleryImage} from "../../model/galeryImage-model/galeryImage.model";
import {Sponsor} from "../../model/sponsor-model/sponsor.model";

@Injectable({
  providedIn: 'root'
})
export class SponsorService extends ActiveService<Sponsor>{
  constructor(override http: HttpClient) {
    super("sponsor");
  }

}
