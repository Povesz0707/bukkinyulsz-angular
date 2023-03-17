import {BaseService} from "../base-service/base-service.service";
import {Reward} from "../../model/reward-model/reward.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RewardService extends BaseService<Reward>{
  constructor(override http: HttpClient) {
    super("reward");
  }
}
