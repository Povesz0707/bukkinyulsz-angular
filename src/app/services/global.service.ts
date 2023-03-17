import {Injectable} from "@angular/core";
import {CheckpointService} from "./checkpoint-service/checkpoint.service";
import {DistanceService} from "./distance-service/distance.service";
import {MarkingService} from "./marking-service/marking.service";
import {RewardService} from "./reward-service/reward.service";
import {SubSectionService} from "./subSection-service/subSection.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(public checkpointService: CheckpointService, public distanceService: DistanceService, public markingService: MarkingService, public rewardService: RewardService, public subSectionService: SubSectionService) {
  }
}
