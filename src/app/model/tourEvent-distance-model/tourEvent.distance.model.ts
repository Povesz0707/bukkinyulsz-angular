import {BaseModel} from "../base-model/base.model";
import {Distance} from "../distance-model/distance";
import {TourEvent} from "../tourEvent-model/tourEvent.model";

export class TourEventDistance extends BaseModel{
  tourEvent:TourEvent
  distance?:Distance
}
