import {BaseService} from "../base-service/base-service.service";
import {Checkpoint} from "../../model/checkpoint-model/checkpoint.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CheckpointService extends BaseService<Checkpoint>{
  constructor(override http: HttpClient) {
    super("checkpoint");
  }
}
