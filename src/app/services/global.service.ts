import {Injectable} from "@angular/core";
import {CheckpointService} from "./checkpoint-service/checkpoint.service";
import {DistanceService} from "./distance-service/distance.service";
import {MarkingService} from "./marking-service/marking.service";
import {RewardService} from "./reward-service/reward.service";
import {SubSectionService} from "./subSection-service/subSection.service";
import {TourEventService} from "./tourEvent-service/tourEvent.service";
import {TourEventDistanceService} from "./tourEvent-distance-service/tourEvent.distance.service";
import {DistanceSubsectionService} from "./distance-subSection-service/distance-subsection.service";
import {DialogService} from "./dialog-service/dialog.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(public checkpointService: CheckpointService, public distanceService: DistanceService, public markingService: MarkingService, public rewardService: RewardService,
              public subSectionService: SubSectionService, public tourEventService:TourEventService, public tourEventDistanceService:TourEventDistanceService,
              public distanceSubSectionService: DistanceSubsectionService, public dialogService: DialogService) {
  }
}
