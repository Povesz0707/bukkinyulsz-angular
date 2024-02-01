import {Injectable} from "@angular/core";
import {BaseService} from "../base-service/base-service.service";
import {Marking} from "../../model/marking-model/marking.model";
import {ActiveService} from "../base-service/active-service";
import {HttpClient} from "@angular/common/http";
import {GaleryImage} from "../../model/galeryImage-model/galeryImage.model";

@Injectable({
  providedIn: 'root'
})
export class GaleryImageService extends ActiveService<GaleryImage>{
  constructor(override http: HttpClient) {
    super("galeryImage");
  }

}
