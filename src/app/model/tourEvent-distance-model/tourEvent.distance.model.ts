import {BaseModel} from "../base-model/base.model";
import {Distance} from "../distance-model/distance";

export class TourEventDistance extends BaseModel{
  tourEvent?:TouchEvent
  distance?:Distance
}
